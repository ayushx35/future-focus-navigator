
import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, BookOpen, Building, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CareerCardProps {
  career: {
    id: number;
    title: string;
    description: string;
    matchScore: number;
    salary: string;
    growth: string;
    education: string;
    industries: string[];
  };
  index: number;
}

const CareerCard = ({ career, index }: CareerCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-panel rounded-xl overflow-hidden"
    >
      <div className="px-6 py-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-primary/80 mb-1">Career Path</div>
            <h3 className="text-xl font-medium">{career.title}</h3>
          </div>
          <div className="flex items-center gap-1 bg-primary/10 text-primary font-medium rounded-full px-3 py-1 text-sm">
            <span>{career.matchScore}%</span>
            <span className="text-xs">match</span>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4">{career.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-muted-foreground" />
            <span className="text-sm">{career.salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-muted-foreground" />
            <span className="text-sm">{career.growth} growth</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-muted-foreground" />
            <span className="text-sm">{career.education}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building size={16} className="text-muted-foreground" />
            <span className="text-sm">{career.industries.length} industries</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {career.industries.slice(0, 3).map((industry, i) => (
            <span 
              key={i}
              className="bg-secondary text-secondary-foreground text-xs rounded-full px-3 py-1"
            >
              {industry}
            </span>
          ))}
          {career.industries.length > 3 && (
            <span className="bg-secondary text-secondary-foreground text-xs rounded-full px-3 py-1">
              +{career.industries.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex-1">
            Save
          </Button>
          <Button size="sm" className="flex-1">
            Explore
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CareerCard;
