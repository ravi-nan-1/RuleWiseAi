'use client';

import { useAppContext } from '@/context/AppContext';
import { useEffect, useState, useRef, useTransition, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { analyzeFileAndSuggestFixes, AnalyzeFileAndSuggestFixesOutput } from '@/ai/flows/analyze-file-and-suggest-fixes';
import { chatAboutFileAnalysis } from '@/ai/flows/chat-about-file-analysis';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send, Bot, User, FileDown } from 'lucide-react';
import { ChatHeader } from '@/components/ChatHeader';
import { ChatMessage } from '@/components/ChatMessage';
import { Card, CardContent } from '@/components/ui/card';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string | React.ReactNode;
};

export default function ChatPage() {
  const router = useRouter();
  const { xmlContent, txtContent, analysisResult, setAnalysisResult, clearState } = useAppContext();
  const { toast } = useToast();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [isAnalyzing, startAnalyzingTransition] = useTransition();

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    if (!xmlContent || !txtContent) {
      router.replace('/');
      return;
    }

    if (!analysisResult) {
      startAnalyzingTransition(async () => {
        try {
          const result = await analyzeFileAndSuggestFixes({ contentFile: txtContent, xmlRules: xmlContent });
          setAnalysisResult(result);
        } catch (error) {
          console.error('Analysis failed:', error);
          toast({
            title: 'Analysis Failed',
            description: 'The initial file analysis could not be completed. Please try again.',
            variant: 'destructive',
          });
          router.replace('/');
        }
      });
    }
  }, [xmlContent, txtContent, analysisResult, setAnalysisResult, router, toast]);

  useEffect(() => {
    if (analysisResult && messages.length === 0) {
      const initialAnalysisContent = (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold font-headline">Initial File Analysis Complete</h3>
          <div>
            <h4 className="font-semibold text-accent-foreground mb-1">Analysis Summary:</h4>
            <p className="text-sm">{analysisResult.analysis}</p>
          </div>
          <div>
            <h4 className="font-semibold text-accent-foreground mb-1">Suggestions:</h4>
            <pre className="bg-muted p-3 rounded-md text-sm whitespace-pre-wrap font-code">{analysisResult.suggestions}</pre>
          </div>
          <p className="text-sm text-muted-foreground pt-2">You can now ask questions about the analysis or request a full report.</p>
        </div>
      );
      
      setMessages([{ id: 'initial-analysis', role: 'assistant', content: initialAnalysisContent }]);
    }
  }, [analysisResult, messages.length]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAiResponding || isAnalyzing) return;

    const newUserMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsAiResponding(true);

    try {
      const response = await chatAboutFileAnalysis({
        question: input,
        analysisResult: JSON.stringify(analysisResult),
        xmlRules: xmlContent!,
        txtFileContent: txtContent!,
      });
      const aiMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat failed:', error);
      toast({
        title: 'Chat Error',
        description: 'Failed to get a response from the AI. Please try again.',
        variant: 'destructive',
      });
       setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsAiResponding(false);
    }
  };

  const handleNewAnalysis = () => {
    clearState();
    router.push('/');
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader onNewAnalysis={handleNewAnalysis} />
      <main className="flex-1 overflow-hidden p-4 md:p-6">
        <Card className="h-full w-full flex flex-col shadow-lg">
          <CardContent className="flex-1 p-0 flex flex-col">
            <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollAreaRef}>
              <div className="space-y-6">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <p className="text-lg font-semibold font-headline">Analyzing your files...</p>
                    <p>The AI is reviewing your XML rules and TXT content.</p>
                  </div>
                ) : (
                  messages.map((message) => <ChatMessage key={message.id} message={message} />)
                )}
                {isAiResponding && (
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                       <Bot className="size-6" />
                     </div>
                     <div className="p-3 rounded-lg bg-card flex items-center space-x-2">
                       <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                       <span className="text-sm text-muted-foreground">AI is typing...</span>
                     </div>
                   </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-4 border-t bg-card">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about the file analysis..."
                  className="flex-1"
                  disabled={isAiResponding || isAnalyzing}
                />
                <Button type="submit" size="icon" disabled={!input.trim() || isAiResponding || isAnalyzing}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
