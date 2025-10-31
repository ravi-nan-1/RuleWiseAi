'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/context/AppContext';
import { FileCode2, FileText, Loader2, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';

function FileInputCard({
  title,
  description,
  Icon,
  file,
  onFileChange,
  accept,
  id,
}: {
  title: string;
  description: string;
  Icon: React.ElementType;
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept: string;
  id: string;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Icon className="size-6 text-primary" />
          <CardTitle className="font-headline">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <input
          type="file"
          id={id}
          className="hidden"
          onChange={(e) => onFileChange(e.target.files ? e.target.files[0] : null)}
          accept={accept}
        />
        <label
          htmlFor={id}
          className={cn(
            'flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors',
            isDragging ? 'border-primary bg-muted' : 'border-border'
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
            {file ? (
              <p className="font-semibold text-primary">{file.name}</p>
            ) : (
              <>
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">{accept.toUpperCase()} file</p>
              </>
            )}
          </div>
        </label>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [xmlFile, setXmlFile] = useState<File | null>(null);
  const [txtFile, setTxtFile] = useState<File | null>(null);
  const { setFiles } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleAnalyze = async () => {
    if (!xmlFile || !txtFile) {
      toast({
        title: 'Missing Files',
        description: 'Please upload both an XML rule file and a TXT content file.',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      try {
        await setFiles(xmlFile, txtFile);
        router.push('/chat');
      } catch (error) {
        toast({
          title: 'File Reading Error',
          description: 'There was an error reading the files. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-4xl p-8 space-y-8">
        <header className="text-center space-y-4">
          <div className="inline-block">
            <Logo />
          </div>
          <h1 className="text-4xl font-bold tracking-tight font-headline">Welcome to RuleWise AI</h1>
          <p className="text-lg text-muted-foreground">
            Upload your XML rules and TXT content to start analyzing and get AI-powered suggestions.
          </p>
        </header>

        <main className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <FileInputCard
              id="xml-upload"
              title="XML Rule File"
              description="Upload the XML file containing the validation rules."
              Icon={FileCode2}
              file={xmlFile}
              onFileChange={setXmlFile}
              accept=".xml"
            />
            <FileInputCard
              id="txt-upload"
              title="TXT Content File"
              description="Upload the TXT file you want to analyze against the rules."
              Icon={FileText}
              file={txtFile}
              onFileChange={setTxtFile}
              accept=".txt"
            />
          </div>

          <div className="text-center">
            <Button size="lg" onClick={handleAnalyze} disabled={isPending || !xmlFile || !txtFile}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Files & Start Chat'
              )}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
