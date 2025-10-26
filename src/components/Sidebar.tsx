import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";

interface SidebarProps {
  title: string;
  items: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
  }>;
}

export function Sidebar({ title, items }: SidebarProps) {
  return (
    <div className="w-64 border-r border-border bg-card/50 h-full">
      <div className="p-4 border-b border-border">
        <h3 className="font-mono text-primary">
          <span className="text-muted-foreground">▸</span> {title}
        </h3>
      </div>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="p-4 space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-2">
              <Checkbox
                id={item.id}
                checked={item.checked}
                onCheckedChange={item.onChange}
                className="border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor={item.id}
                className="text-sm font-mono text-muted-foreground hover:text-foreground cursor-pointer transition-colors flex items-center gap-2"
              >
                {item.icon}
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
