'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, Loader2, FileCheck2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleCompress = async () => {
    if (!file) {
      toast({
        title: 'No File Selected',
        description: 'Please upload a file to compress.',
        variant: 'destructive',
      });
      return;
    }

    setIsCompressing(true);
    
    // Placeholder for compression logic
    setTimeout(() => {
        toast({
            title: 'Compression not implemented',
            description: "We're still working on the compression logic.",
        });
        setIsCompressing(false);
    }, 2000);
  };
  
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
      handleFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background font-body">
      <div className="w-full max-w-2xl p-8 space-y-8">
        <header className="text-center space-y-4">
          <div className="inline-block">
            <Logo />
          </div>
          <h1 className="text-4xl font-bold tracking-tight font-headline">FileCompressor Pro</h1>
          <p className="text-lg text-muted-foreground">
            Compress your images, documents, and other files with ease.
          </p>
        </header>

        <main>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Upload Your File</CardTitle>
              <CardDescription>Drag and drop or select a file to start the compression.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
              />
              <label
                htmlFor="file-upload"
                className={cn(
                  'flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors',
                  isDragging ? 'border-primary bg-muted' : 'border-border'
                )}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center text-center p-6">
                  <FileUp className="w-12 h-12 mb-4 text-primary" />
                  {file ? (
                    <>
                      <p className="font-semibold text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                      <span className="mt-4 text-sm text-primary font-semibold">Ready to compress!</span>
                    </>
                  ) : (
                    <>
                      <p className="mb-2 text-md text-foreground">
                        <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-sm text-muted-foreground">Any file type (Images, PDF, DOCX, etc.)</p>
                    </>
                  )}
                </div>
              </label>
              
              <Button size="lg" className="w-full" onClick={handleCompress} disabled={isCompressing || !file}>
                {isCompressing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Compressing...
                  </>
                ) : (
                  'Compress File'
                )}
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
