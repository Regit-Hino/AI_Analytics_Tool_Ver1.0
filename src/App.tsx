import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';
import Survey from './components/Survey';
import Results from './components/Results';
import { questions, calculateScore, getTier } from './data/questions';

type AppState = 'welcome' | 'survey' | 'results';

interface SurveyData {
  answers: Record<number, number | string>;
  currentQuestion: number;
  completed: boolean;
  score?: number;
  tier?: string;
  remarks?: string;
}

function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [remarks, setRemarks] = useState<string>(() => {
    return localStorage.getItem('ai-survey-remarks') || '';
  });
  const [surveyData, setSurveyData] = useState<SurveyData>(() => {
    const saved = localStorage.getItem('ai-survey-data');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.completed) {
        return {
          answers: {},
          currentQuestion: 0,
          completed: false
        };
      }
      return data;
    }
    return {
      answers: {},
      currentQuestion: 0,
      completed: false
    };
  });

  useEffect(() => {
    localStorage.setItem('ai-survey-data', JSON.stringify(surveyData));
  }, [surveyData]);

  useEffect(() => {
    localStorage.setItem('ai-survey-remarks', remarks);
  }, [remarks]);

  const handleStartSurvey = () => {
    setAppState('survey');
  };

  const handleSurveyComplete = (answers: Record<number, number | string>) => {
    const score = calculateScore(answers);
    const tier = getTier(score);
    setSurveyData({
      answers,
      currentQuestion: questions.length - 1,
      completed: true,
      score,
      tier
    });
    setAppState('results');
  };

  const handleRestart = () => {
    setSurveyData({
      answers: {},
      currentQuestion: 0,
      completed: false
    });
    setRemarks('');
    localStorage.removeItem('ai-survey-data');
    localStorage.removeItem('ai-survey-remarks');
    setAppState('welcome');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="fixed top-0 left-0 p-6 z-50">
        <button
          onClick={handleRestart}
          className="transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
        >
          <img 
            src={`${import.meta.env.BASE_URL}logo-regit.png`}
            alt="REGIT Logo" 
            className="h-10 md:h-12 w-auto"
            style={{ maxWidth: '200px' }}
          />
        </button>
      </header>
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
        {appState === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-2xl"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-primary rounded-full p-6">
                <Bot size={64} className="text-dark" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-dark mb-4">AI 即日診断</h1>
            <p className="text-xl text-gray-600 mb-8">
              20の質問に答えて、あなたの組織のAI活用準備度を診断します
            </p>
            <button
              onClick={handleStartSurvey}
              className="bg-secondary text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-secondary/90 transition-colors"
            >
              診断を開始する
            </button>
            {surveyData.currentQuestion > 0 && !surveyData.completed && (
              <button
                onClick={() => setAppState('survey')}
                className="block mx-auto mt-4 text-secondary underline"
              >
                診断を再開する（質問 {surveyData.currentQuestion + 1} から）
              </button>
            )}
          </motion.div>
        )}

        {appState === 'survey' && (
          <Survey
            onComplete={handleSurveyComplete}
            initialData={surveyData}
            onUpdateData={setSurveyData}
            remarks={remarks}
            onRemarksChange={setRemarks}
          />
        )}

        {appState === 'results' && surveyData.score !== undefined && surveyData.tier && (
          <Results
            score={surveyData.score}
            tier={surveyData.tier}
            answers={surveyData.answers}
            remarks={remarks}
            onRestart={handleRestart}
          />
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;