import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { questions, getIndustry } from '../data/questions';
import { mockRecommendations, getTierFromScore, Industry } from '../lib/mock';
import { sendDiagnosisData, prepareDiagnosisData } from '../lib/send';

interface ResultsProps {
  score: number;
  tier: string;
  answers: Record<number, number | string>;
  remarks: string;
  onRestart: () => void;
}

interface Recommendation {
  comment: string;
  levers: string[];
  usecases: string[];
}

const Results: React.FC<ResultsProps> = ({ score, tier, answers, remarks, onRestart }) => {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  console.log('=== Results Component Props ===');
  console.log('remarks prop:', remarks);
  console.log('remarks type:', typeof remarks);
  console.log('remarks length:', remarks ? remarks.length : 0);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const endpoint = import.meta.env.VITE_AI_ENDPOINT;
        if (!endpoint) {
          // エンドポイントが設定されていない場合は、業種別のモックデータを使用
          const industry = getIndustry(answers) as Industry;
          const tierLevel = getTierFromScore(score);
          const mockData = mockRecommendations[industry][tierLevel];
          
          setRecommendation(mockData);
          setLoading(false);
          return;
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ score, answers }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch recommendation');
        }

        const data = await response.json();
        setRecommendation(data);
      } catch (err) {
        console.error('Error fetching recommendation:', err);
        // エラーメッセージを表示せず、業種別のモックデータを使用
        const industry = getIndustry(answers) as Industry;
        const tierLevel = getTierFromScore(score);
        const mockData = mockRecommendations[industry][tierLevel];
        
        setRecommendation(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [score, answers]);

  useEffect(() => {
    // Send data to Google Apps Script if endpoint is configured
    const saveEndpoint = import.meta.env.VITE_SAVE_ENDPOINT;
    if (saveEndpoint) {
      const company = answers[-4] as string || '';
      const headcount = answers[-3] as string || '';
      const name = answers[-2] as string || '';
      const email = answers[-1] as string || '';
      const industry = getIndustry(answers);
      
      // 選択肢のテキストを取得
      const answerTexts: Record<number, string> = {};
      questions.forEach(q => {
        if (q.options && answers[q.id] !== undefined) {
          const selectedOption = q.options.find(opt => opt.value === answers[q.id]);
          if (selectedOption) {
            answerTexts[q.id] = selectedOption.label;
          }
        }
      });
      
      const diagnosisData = prepareDiagnosisData(
        company,
        industry,
        headcount,
        name,
        email,
        answers,
        score,
        tier,
        remarks,
        answerTexts
      );
      
      console.log('=== REMARKS DEBUG ===');
      console.log('remarks value:', remarks);
      console.log('remarks length:', remarks ? remarks.length : 0);
      console.log('Full diagnosis data:', diagnosisData);
      
      sendDiagnosisData(diagnosisData).then(success => {
        if (success) {
          console.log('Diagnosis data saved successfully');
          setSaveSuccess(true);
        }
      });
    }
  }, [score, tier, answers, remarks]);


  const downloadCSV = () => {
    const headers = ['質問ID', 'カテゴリ', '質問', '回答'];
    const industry = getIndustry(answers);
    const rows = questions.map(q => {
      const answer = answers[q.id];
      const answerText = q.isIndustry 
        ? answer 
        : q.options?.find(opt => opt.value === answer)?.label || answer;
      return [
        q.id,
        q.category,
        q.question,
        answerText
      ];
    });
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
      '',
      `業種,${industry}`,
      `総合スコア,${score}`,
      `評価,${tier}`
    ].join('\n');
    
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ai-診断結果.csv';
    link.click();
  };

  const renderStars = () => {
    const starCount = tier.length;
    return (
      <div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <Star
            key={i}
            size={32}
            className={i < starCount ? 'fill-primary text-primary' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-4xl"
    >
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-4">診断結果</CardTitle>
          <div className="flex justify-center items-center gap-4 mb-4">
            <span className="text-lg text-gray-600">業種: {getIndustry(answers)}</span>
            <div className="flex">{renderStars()}</div>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="text-6xl font-bold text-secondary mb-2"
          >
            {score}点
          </motion.div>
          <p className="text-xl text-gray-600">AI活用準備度</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
              <p className="mt-4 text-gray-600">推奨事項を生成中...</p>
            </div>
          )}


          {!loading && recommendation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold mb-3">総評</h3>
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-1 bg-green-500 mb-3 rounded-full"
                  />
                )}
                <p className="text-gray-700 leading-relaxed">{recommendation.comment}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">重点施策</h3>
                <ul className="space-y-2">
                  {recommendation.levers.map((lever, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="text-secondary mr-2">▶</span>
                      <span>{lever}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">推奨ユースケース</h3>
                <ul className="space-y-2">
                  {recommendation.usecases.map((usecase, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="text-secondary mr-2">▶</span>
                      <span>{usecase}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* ヒアリングメモ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-6"
          >
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-3">ヒアリングメモ</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {remarks || <span className="text-gray-400">（未記入）</span>}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
              onClick={downloadCSV} 
              variant="outline" 
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Download size={20} />
              CSVダウンロード
            </Button>
            <Button 
              onClick={onRestart} 
              variant="ghost" 
              className="flex-1 flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              もう一度診断する
            </Button>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Results;