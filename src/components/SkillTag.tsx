
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SkillTagProps {
  skill: string;
  onRemove?: () => void;
  removable?: boolean;
}

const SkillTag = ({ skill, onRemove, removable = true }: SkillTagProps) => {
  return (
    <Badge 
      variant="secondary"
      className="flex items-center gap-1 py-1.5 px-3"
    >
      <span>{skill}</span>
      {removable && onRemove && (
        <button 
          onClick={onRemove}
          className="ml-1 hover:bg-secondary-foreground/10 rounded-full p-0.5"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
};

export default SkillTag;
