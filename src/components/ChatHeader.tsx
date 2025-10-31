'use client'

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { FileDown, FilePlus2 } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

interface ChatHeaderProps {
  onNewAnalysis: () => void;
}

export function ChatHeader({ onNewAnalysis }: ChatHeaderProps) {
  const { analysisResult } = useAppContext();
  const { toast } = useToast();

  const handleDownloadReport = () => {
    if (!analysisResult?.report) {
      toast({
        title: 'Report Not Ready',
        description: 'The analysis report is not yet available.',
        variant: 'destructive',
      });
      return;
    }

    const blob = new Blob([analysisResult.report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'RuleWiseAI-Report.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({
      title: 'Report Downloaded',
      description: 'Your report has been successfully downloaded.',
    });
  };

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <Logo />
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onNewAnalysis}>
          <FilePlus2 className="mr-2" />
          New Analysis
        </Button>
        <Button onClick={handleDownloadReport} disabled={!analysisResult?.report}>
          <FileDown className="mr-2" />
          Generate Report
        </Button>
      </div>
    </header>
  );
}
