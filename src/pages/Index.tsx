
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ClipboardList, Briefcase } from 'lucide-react';
import TransitionWrapper from '@/components/TransitionWrapper';
import Header from '@/components/Header';
import ResumeUpload from '@/components/ResumeUpload';
import SkillTag from '@/components/SkillTag';

const Index = () => {
  const navigate = useNavigate();
  const [resumeSkills, setResumeSkills] = useState<string[]>([]);
  const [isResumeProcessed, setIsResumeProcessed] = useState(false);

  const handleResumeProcessed = (keywords: string[]) => {
    setResumeSkills(keywords);
    setIsResumeProcessed(true);
    
    // Save extracted skills to sessionStorage to use in assessment
    sessionStorage.setItem('resumeSkills', JSON.stringify(keywords));
  };

  const handleRemoveSkill = (indexToRemove: number) => {
    const updatedSkills = resumeSkills.filter((_, index) => index !== indexToRemove);
    setResumeSkills(updatedSkills);
    sessionStorage.setItem('resumeSkills', JSON.stringify(updatedSkills));
  };

  return (
    <>
      <Header />
      <TransitionWrapper>
        <main className="min-h-screen pt-24 px-6">
          <div className="max-w-7xl mx-auto">
            <section className="py-16 md:py-24">
              <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-center">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                      Discover Your Ideal <span className="text-primary">Career Path</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                      Take our assessment to find career recommendations tailored to your unique skills,
                      interests, and values. Or upload your resume for even more personalized matches.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex gap-4">
                        <Button 
                          size="lg" 
                          onClick={() => navigate('/assessment')}
                          className="group"
                        >
                          <ClipboardList className="mr-2 h-5 w-5" />
                          Start Assessment
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                        
                        {isResumeProcessed && (
                          <Button 
                            variant="outline" 
                            size="lg"
                            onClick={() => navigate('/results')}
                          >
                            <Briefcase className="mr-2 h-5 w-5" />
                            View Recommendations
                          </Button>
                        )}
                      </div>
                      
                      {isResumeProcessed && resumeSkills.length > 0 && (
                        <div className="pt-4">
                          <p className="text-sm mb-2">Skills extracted from your resume:</p>
                          <div className="flex flex-wrap gap-2">
                            {resumeSkills.map((skill, index) => (
                              <SkillTag 
                                key={index} 
                                skill={skill} 
                                onRemove={() => handleRemoveSkill(index)} 
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
                
                <div className="flex-1">
                  <ResumeUpload onResumeProcessed={handleResumeProcessed} />
                </div>
              </div>
            </section>
          </div>
        </main>
      </TransitionWrapper>
    </>
  );
};

export default Index;
