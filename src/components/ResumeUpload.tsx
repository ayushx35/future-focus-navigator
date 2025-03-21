
import { useState } from 'react';
import { Upload, FileText, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const ResumeUpload = ({ 
  onResumeProcessed 
}: { 
  onResumeProcessed: (keywords: string[]) => void 
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if file is PDF or DOCX
      const fileType = selectedFile.type;
      if (fileType === 'application/pdf' || 
          fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid file format",
          description: "Please upload a PDF or DOCX file.",
          variant: "destructive"
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Simulate file upload with progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 150));
      }
      
      setIsUploading(false);
      setIsProcessing(true);
      
      // Simulate resume processing/analysis
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example extracted keywords from resume
      // In a real application, this would use NLP or an API to extract relevant information
      const mockKeywords = [
        "javascript", 
        "react", 
        "typescript", 
        "user experience", 
        "project management", 
        "data analysis"
      ];
      
      onResumeProcessed(mockKeywords);
      
      setIsProcessing(false);
      
      toast({
        title: "Resume processed successfully",
        description: "Your career recommendations have been updated based on your resume.",
      });
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "There was an error processing your resume. Please try again.",
        variant: "destructive"
      });
      setIsUploading(false);
      setIsProcessing(false);
    }
  };

  return (
    <div className="rounded-xl glass-panel p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Upload Your Resume</h3>
        <p className="text-muted-foreground text-sm">
          Upload your resume to get more accurate career recommendations based on your skills and experience.
        </p>
      </div>
      
      {!file ? (
        <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-10 w-10 text-primary/60" />
            <p className="text-sm font-medium mb-1">Drag and drop your resume here</p>
            <p className="text-xs text-muted-foreground mb-4">PDF or DOCX files only</p>
            
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
            />
            <label htmlFor="resume-upload">
              <Button variant="outline" className="cursor-pointer" size="sm" asChild>
                <span>Browse Files</span>
              </Button>
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
            <div className="bg-primary/10 p-2 rounded-full">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setFile(null)}
              disabled={isUploading || isProcessing}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}
          
          {isProcessing && (
            <div className="flex items-center gap-2 text-sm">
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
              <span>Analyzing resume content...</span>
            </div>
          )}
          
          {!isUploading && !isProcessing && (
            <Button 
              onClick={handleUpload} 
              className="w-full"
            >
              Process Resume
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
