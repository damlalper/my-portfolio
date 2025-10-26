import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Github, Star } from "lucide-react";

interface CodeBlockProps {
  username: string;
  timeAgo: string;
  description?: string;
  code: string;
  language?: string;
  stars?: number;
  details?: boolean;
}

export function CodeBlock({
  username,
  timeAgo,
  description,
  code,
  language = "typescript",
  stars = 0,
  details = true,
}: CodeBlockProps) {
  return (
    <Card className="bg-[#0d1b2a] border-border overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-mono text-sm">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm text-primary font-mono">{username}</p>
            <p className="text-xs text-muted-foreground">Created {timeAgo}</p>
          </div>
        </div>
        {details && (
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground text-sm">
              details
            </button>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star className="w-4 h-4" />
              <span className="text-sm">{stars} stars</span>
            </div>
          </div>
        )}
      </div>
      {description && (
        <div className="px-4 py-3 border-b border-border">
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      )}
      <div className="p-4 font-mono text-sm">
        <pre className="text-foreground/90 overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </Card>
  );
}
