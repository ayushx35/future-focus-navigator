
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface AssessmentQuestionProps {
  question: {
    id: number;
    text: string;
    options: string[];
  };
  onAnswer: (questionId: number, answer: string) => void;
  isActive: boolean;
  onComplete: () => void;
}

const AssessmentQuestion = ({ 
  question, 
  onAnswer, 
  isActive, 
  onComplete 
}: AssessmentQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showNext, setShowNext] = useState(false);
  
  useEffect(() => {
    setSelectedOption(null);
    setShowNext(false);
  }, [question.id]);
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onAnswer(question.id, option);
    
    // Delay showing the next button to allow the animation to complete
    setTimeout(() => {
      setShowNext(true);
    }, 400);
  };
  
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="mb-8">
            <div className="text-sm text-primary mb-2">Question {question.id}</div>
            <h2 className="text-2xl font-medium text-balance mb-8">{question.text}</h2>
            
            <div className="space-y-3 max-w-xl">
              {question.options.map((option, index) => (
                <motion.div
                  key={option}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full text-left px-6 py-4 rounded-xl border transition-all ${
                      selectedOption === option
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30 hover:bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {selectedOption === option && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-primary text-white rounded-full p-1"
                        >
                          <Check size={14} />
                        </motion.div>
                      )}
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
          
          <AnimatePresence>
            {showNext && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  onClick={onComplete}
                  className="px-8"
                >
                  Next
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AssessmentQuestion;
