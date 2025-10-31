import { FileCheck2 } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
      <div className="bg-primary text-primary-foreground p-2 rounded-lg shadow-md">
        <FileCheck2 className="size-6" />
      </div>
      <span className="font-headline text-2xl font-bold text-primary">
        RuleWise AI
      </span>
    </Link>
  );
}
