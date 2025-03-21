
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Download, Share2, BookmarkPlus } from 'lucide-react';
import TransitionWrapper from '@/components/TransitionWrapper';
import CareerCard from '@/components/CareerCard';
import Header from '@/components/Header';

// Sample careers data
const careerData = [
  {
    id: 1,
    title: "UX/UI Designer",
    description: "Design and improve user interfaces and experiences for websites and applications.",
    matchScore: 92,
    salary: "$75,000 - $120,000",
    growth: "13% (Faster than average)",
    education: "Bachelor's degree",
    industries: ["Technology", "Marketing", "E-commerce", "Entertainment", "Healthcare"]
  },
  {
    id: 2,
    title: "Data Scientist",
    description: "Analyze and interpret complex data to help organizations make better decisions.",
    matchScore: 88,
    salary: "$95,000 - $150,000",
    growth: "22% (Much faster than average)",
    education: "Master's degree",
    industries: ["Technology", "Finance", "Healthcare", "Research", "Retail"]
  },
  {
    id: 3,
    title: "Digital Marketing Specialist",
    description: "Create and implement strategies to promote brands across digital platforms.",
    matchScore: 85,
    salary: "$50,000 - $95,000",
    growth: "10% (Average)",
    education: "Bachelor's degree",
    industries: ["Marketing", "Advertising", "Technology", "Retail", "Entertainment"]
  },
  {
    id: 4,
    title: "Product Manager",
    description: "Guide product development from conception to launch, balancing user needs with business goals.",
    matchScore: 81,
    salary: "$85,000 - $145,000",
    growth: "8% (Average)",
    education: "Bachelor's degree",
    industries: ["Technology", "E-commerce", "Finance", "Healthcare", "Entertainment"]
  },
  {
    id: 5,
    title: "Software Developer",
    description: "Design, create, and maintain software applications and systems.",
    matchScore: 78,
    salary: "$70,000 - $140,000",
    growth: "25% (Much faster than average)",
    education: "Bachelor's degree",
    industries: ["Technology", "Finance", "Healthcare", "Retail", "Entertainment"]
  },
  {
    id: 6,
    title: "Human Resources Specialist",
    description: "Recruit, screen, and interview job applicants and facilitate employee relations.",
    matchScore: 76,
    salary: "$50,000 - $90,000",
    growth: "7% (Average)",
    education: "Bachelor's degree",
    industries: ["Corporate", "Healthcare", "Education", "Government", "Non-profit"]
  }
];

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [careerOptions, setCareerOptions] = useState(careerData);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  
  // Check if we have answers from the assessment
  useEffect(() => {
    if (location.state?.answers) {
      setUserAnswers(location.state.answers);
      
      // Simulate an API call or processing
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      // If we don't have answers, redirect to assessment
      navigate('/assessment');
    }
  }, [location.state, navigate]);
  
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 px-6 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-panel rounded-2xl p-10 max-w-md"
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
                    />
                  </div>
                </div>
                
                <h2 className="text-2xl font-medium mb-4">Analyzing Your Results</h2>
                <p className="text-muted-foreground mb-6">
                  We're matching your skills and preferences with potential career paths.
                </p>
                
                <div className="space-y-2 w-full">
                  {['Identifying strengths', 'Matching skills', 'Ranking opportunities'].map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.5 }}
                      className="flex items-center"
                    >
                      <div className="h-2 bg-primary/20 rounded-full flex-1">
                        <motion.div
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5, delay: i * 0.5 }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                      <span className="ml-3 text-sm">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </>
    );
  }
  
  return (
    <>
      <Header />
      <TransitionWrapper>
        <main className="min-h-screen pt-24 px-6">
          <div className="max-w-7xl mx-auto">
            <section className="py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-panel rounded-2xl p-8 mb-10"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <div className="text-primary font-medium mb-2">Your Personal Results</div>
                    <h1 className="text-3xl font-bold mb-2">Career Recommendations</h1>
                    <p className="text-muted-foreground max-w-xl">
                      Based on your assessment, we've identified these career paths that align with your skills,
                      interests, and values.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" className="gap-1">
                      <BookmarkPlus size={16} />
                      <span>Save Results</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Share2 size={16} />
                      <span>Share</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download size={16} />
                      <span>Export PDF</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
              
              <div className="mb-10">
                <Tabs defaultValue="recommended" className="w-full">
                  <TabsList className="mb-8">
                    <TabsTrigger value="recommended">Recommended</TabsTrigger>
                    <TabsTrigger value="all">All Matches</TabsTrigger>
                    <TabsTrigger value="saved">Saved</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="recommended">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {careerOptions.slice(0, 3).map((career, index) => (
                        <CareerCard key={career.id} career={career} index={index} />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="all">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {careerOptions.map((career, index) => (
                        <CareerCard key={career.id} career={career} index={index} />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="saved">
                    <div className="text-center py-16">
                      <div className="glass-panel inline-block rounded-full p-6 mb-4">
                        <BookmarkPlus size={32} className="text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No saved careers yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Save careers you're interested in to compare them later.
                      </p>
                      <Button>
                        Explore Recommendations <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-panel rounded-2xl p-8 mb-6"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium mb-3">Next Steps</h3>
                    <p className="text-muted-foreground mb-6">
                      Continue your career exploration with these recommended actions.
                    </p>
                    
                    <div className="space-y-4">
                      {[
                        "Explore education requirements for your top matches",
                        "Learn about specific skills needed for your preferred careers",
                        "Discover professionals in your field for informational interviews"
                      ].map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-medium mb-3">Your Assessment Summary</h3>
                    <p className="text-muted-foreground mb-4">
                      Based on your responses, you seem to value:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Creativity</span>
                          <span className="text-sm text-muted-foreground">85%</span>
                        </div>
                        <div className="h-2 bg-secondary-foreground/10 rounded-full">
                          <div className="h-full bg-primary rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>
                      
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Problem-Solving</span>
                          <span className="text-sm text-muted-foreground">75%</span>
                        </div>
                        <div className="h-2 bg-secondary-foreground/10 rounded-full">
                          <div className="h-full bg-primary rounded-full" style={{ width: '75%' }} />
                        </div>
                      </div>
                      
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Leadership</span>
                          <span className="text-sm text-muted-foreground">60%</span>
                        </div>
                        <div className="h-2 bg-secondary-foreground/10 rounded-full">
                          <div className="h-full bg-primary rounded-full" style={{ width: '60%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <div className="text-center mt-12">
                <Button variant="outline" onClick={() => navigate('/assessment')}>
                  Retake Assessment
                </Button>
              </div>
            </section>
          </div>
        </main>
      </TransitionWrapper>
    </>
  );
};

export default Results;
