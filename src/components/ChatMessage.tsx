'use client';

import type { Message } from '@/app/chat/page';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={cn('flex items-start gap-4', isUser && 'justify-end')}>
      {!isUser && (
        <Avatar className="flex-shrink-0 size-10">
           <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="size-6" />
           </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-xl rounded-lg p-4 shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-card border'
        )}
      >
        {typeof message.content === 'string' ? (
           <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        ) : (
          message.content
        )}
      </div>
      {isUser && (
        <Avatar className="flex-shrink-0 size-10">
           <AvatarFallback className="bg-accent text-accent-foreground">
            <User className="size-6" />
           </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
