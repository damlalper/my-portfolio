import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Presentation, FileText, BookOpen } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BlogCardProps {
  id: string;
  title: string;
  content: string;
  type: 'conference' | 'medium' | 'presentation';
  tags: string[];
  link?: string;
  createdAt: string;
  image?: string;
  onClick?: () => void;
}

export function BlogCard({
  title,
  content,
  type,
  tags,
  link,
  createdAt,
  image,
  onClick,
}: BlogCardProps) {
  const typeConfig = {
    conference: { icon: FileText, label: 'Conference', color: 'text-primary' },
    medium: { icon: BookOpen, label: 'Article', color: 'text-blue-400' },
    presentation: { icon: Presentation, label: 'Presentation', color: 'text-accent' },
  };

  const { icon: Icon, label, color } = typeConfig[type];

  return (
    <Card 
      className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <ImageWithFallback 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${color}`} />
            <Badge variant="secondary" className="font-mono text-xs">
              {label}
            </Badge>
          </div>
          <span className="text-muted-foreground text-sm font-mono">
            {new Date(createdAt).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
        </div>
        
        <h3 className="mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {content}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="font-mono text-xs border-primary/20 text-primary"
            >
              #{tag}
            </Badge>
          ))}
        </div>
        
        {link && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:text-primary/80"
            onClick={(e) => {
              e.stopPropagation();
              window.open(link, '_blank');
            }}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Link
          </Button>
        )}
      </div>
    </Card>
  );
}
