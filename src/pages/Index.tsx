
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Lightbulb, Compass } from 'lucide-react';
import TransitionWrapper from '@/components/TransitionWrapper';
import Header from '@/components/Header';

const Index = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const handleGetStarted = () => {
    navigate('/assessment');
  };
  
  const features = [
    {
      icon: Briefcase,
      title: 'Career Discovery',
      description: 'Find career paths that match your unique skills and personality traits.'
    },
    {
      icon: Lightbulb,
      title: 'Personalized Insights',
      description: 'Get customized recommendations based on your strengths and interests.'
    },
    {
      icon: Compass,
      title: 'Future Guidance',
      description: 'Explore educational pathways and requirements for your dream career.'
    }
  ];
  
  return (
    <>
      <Header />
      <TransitionWrapper>
        <main className="min-h-screen pt-24 px-6">
          <div className="max-w-7xl mx-auto">
            <section className="py-16 md:py-24 flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="mb-4"
              >
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Your Career Journey Starts Here
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl text-balance"
              >
                Discover Your Perfect Career Path with Precision
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-xl text-muted-foreground max-w-2xl mb-10 text-balance"
              >
                Our intelligent system analyzes your skills, interests, and values to recommend
                career paths tailored just for you.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <Button 
                  onClick={handleGetStarted} 
                  size="lg" 
                  className="text-lg px-8 rounded-full h-14"
                >
                  Get Started <ArrowRight className="ml-2" size={18} />
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-24 relative"
              >
                <div className="glass-panel rounded-2xl overflow-hidden p-6 md:p-10">
                  <div className="absolute -top-4 -right-4 bg-primary text-white rounded-full px-4 py-2 text-sm font-medium">
                    Interactive Demo
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.8 + (i * 0.1) }}
                        className="flex flex-col items-center text-center"
                      >
                        <div className="bg-primary/10 text-primary p-4 rounded-full mb-6">
                          <feature.icon size={24} />
                        </div>
                        <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        </main>
      </TransitionWrapper>
    </>
  );
};

export default Index;
