import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { questions } from '../data/questions';

interface SurveyProps {
  onComplete: (answers: Record<number, number | string>) => void;
  initialData: {
    answers: Record<number, number | string>;
    currentQuestion: number;
  };
  onUpdateData: (data: any) => void;
  remarks: string;
  onRemarksChange: (remarks: string) => void;
}

const Survey: React.FC<SurveyProps> = ({ onComplete, initialData, onUpdateData, remarks, onRemarksChange }) => {
  const [answers, setAnswers] = useState<Record<number, number | string>>(initialData.answers);
  const [currentQuestion, setCurrentQuestion] = useState(initialData.currentQuestion);
  const [selectedValue, setSelectedValue] = useState<number | string | null>(
    initialData.answers[questions[initialData.currentQuestion]?.id] || null
  );

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    onUpdateData({
      answers,
      currentQuestion,
      completed: false
    });
  }, [answers, currentQuestion, onUpdateData]);

  const handleAnswer = (value: number | string) => {
    setSelectedValue(value);
  };

  const handleNext = () => {
    if (selectedValue !== null) {
      const newAnswers = { ...answers, [question.id]: selectedValue };
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedValue(newAnswers[questions[currentQuestion + 1]?.id] || null);
      } else {
        onComplete(newAnswers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedValue(answers[questions[currentQuestion - 1]?.id] || null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="w-full max-w-3xl"
    >
      <Card className="shadow-xl">
        <CardHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">質問 {currentQuestion + 1} / {questions.length}</CardTitle>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {question.category}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-medium mb-6">{question.question}</h3>
            {question.isText ? (
              <input
                type={question.inputType || 'text'}
                value={(selectedValue as string) || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder={question.placeholder}
                className="w-full p-4 rounded-lg border-2 border-gray-200 focus:border-secondary focus:outline-none transition-colors"
              />
            ) : (
              <div className="space-y-3">
                {question.options?.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedValue === option.value
                        ? 'border-secondary bg-secondary/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{option.label}</span>
                      {typeof option.value === 'number' && (
                        <span className="text-sm text-gray-500">({option.value}点)</span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={20} />
              前の質問
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedValue === null || (question.isText && !selectedValue)}
              className="flex items-center gap-2"
            >
              {currentQuestion === questions.length - 1 ? '診断結果を見る' : '次の質問'}
              <ChevronRight size={20} />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* ヒアリングメモ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-2">
              ヒアリングメモ（任意）
            </label>
            <p className="text-sm text-gray-500 mb-3">
              困っている業務内容や、改善したいことなどがあればご自由にご記入ください
            </p>
            <textarea
              id="remarks"
              value={remarks}
              onChange={(e) => onRemarksChange(e.target.value)}
              rows={4}
              className="w-full p-4 rounded-lg border-2 border-gray-200 focus:border-secondary focus:outline-none transition-colors resize-y"
              placeholder="例：在庫管理に時間がかかっている、顧客データの管理が大変..."
            />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Survey;