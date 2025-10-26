import { Calendar, MapPin } from "lucide-react";

interface ExperienceCardProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export function ExperienceCard({
  title,
  company,
  location,
  period,
  description,
}: ExperienceCardProps) {
  return (
    <div className="border-l-2 border-slate-200 pl-6 pb-8 last:pb-0">
      <div className="relative -left-[33px] w-4 h-4 bg-slate-900 rounded-full" />
      <div className="mt-2">
        <h3 className="mb-1">{title}</h3>
        <p className="text-slate-700 mb-2">{company}</p>
        <div className="flex flex-wrap gap-4 text-slate-600 text-sm mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {period}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </span>
        </div>
        <ul className="space-y-2">
          {description.map((item, index) => (
            <li key={index} className="text-slate-600 flex gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
