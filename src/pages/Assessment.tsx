
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import TransitionWrapper from '@/components/TransitionWrapper';
import AssessmentQuestion from '@/components/AssessmentQuestion';
import Header from '@/components/Header';

// Sample assessment questions
const assessmentQuestions = [
  {
    id: 1,
    text: "Which of these activities do you enjoy the most?",
    options: [
      "Solving complex problems or puzzles",
      "Creating or designing things",
      "Helping or teaching others",
      "Leading teams or organizing activities"
    ]
  },
  {
    id: 2,
    text: "In a work environment, which of these qualities do you value most?",
    options: [
      "Innovation and creativity",
      "Structure and stability",
      "Collaboration and teamwork",
      "Independence and autonomy"
    ]
  },
  {
    id: 3,
    text: "Which of these skills do you feel most confident in?",
    options: [
      "Analytical thinking and problem-solving",
      "Communication and interpersonal skills",
      "Technical and specialized knowledge",
      "Creative and artistic abilities"
    ]
  },
  {
    id: 4,
    text: "What type of work environment appeals to you most?",
    options: [
      "Fast-paced and dynamic",
      "Structured and organized",
      "Collaborative and team-oriented",
      "Independent and autonomous"
    ]
  },
  {
    id: 5,
    text: "Which value is most important to you in your career?",
    options: [
      "Making a positive impact on society",
      "Financial stability and growth",
      "Work-life balance and wellbeing",
      "Recognition and achievement"
    ]
  }
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Calculate progress as a percentage
    const progressValue = (Object.keys(answers).length / assessmentQuestions.length) * 100;
    setProgress(progressValue);
  }, [answers]);
  
  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // When all questions are answered, navigate to results
      navigate('/results', { state: { answers } });
    }
  };
  
  const isLastQuestion = currentQuestionIndex === assessmentQuestions.length - 1;
  
  return (
    <>
      <Header />
      <TransitionWrapper>
        <main className="min-h-screen pt-24 px-6">
          <div className="max-w-3xl mx-auto">
            <section className="py-8">
              <div className="mb-12">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
                  </div>
                  <div className="text-sm font-medium">
                    {Math.round(progress)}% Complete
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="glass-panel rounded-2xl p-8 mb-12">
                {assessmentQuestions.map((question, index) => (
                  <AssessmentQuestion
                    key={question.id}
                    question={question}
                    onAnswer={handleAnswer}
                    isActive={currentQuestionIndex === index}
                    onComplete={handleNextQuestion}
                  />
                ))}
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (currentQuestionIndex > 0) {
                      setCurrentQuestionIndex(prev => prev - 1);
                    } else {
                      navigate('/');
                    }
                  }}
                >
                  {currentQuestionIndex === 0 ? 'Back to Home' : 'Previous Question'}
                </Button>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {isLastQuestion && Object.keys(answers).length === assessmentQuestions.length && (
                    <Button
                      onClick={() => navigate('/results', { state: { answers } })}
                    >
                      View Results
                    </Button>
                  )}
                </motion.div>
              </div>
            </section>
          </div>
        </main>
      </TransitionWrapper>
    </>
  );
};

export default Assessment;
