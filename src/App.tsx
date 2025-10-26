import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { BlogCard } from "./components/BlogCard";
import { Sidebar } from "./components/Sidebar";
import { CodeBlock } from "./components/CodeBlock";
import { LeaveTraceCard } from "./components/LeaveTraceCard";
import { Toaster } from "./components/ui/sonner";
import { Label } from "./components/ui/label";
import { projectId, publicAnonKey } from './utils/supabase/info';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Terminal,
  Plus,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  content: string;
  type: 'conference' | 'medium' | 'presentation';
  tags: string[];
  link?: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
};

export default function App() {
  const [activeTab, setActiveTab] = useState("hello");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['conference', 'medium', 'presentation']);
  
  // Static blog posts
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Speaking at React Summit 2024',
      content: 'Had an amazing experience presenting my research on state management patterns at React Summit. The conference brought together developers from around the world to discuss the future of React and modern web development. Key topics included Server Components, Suspense, and performance optimization strategies.',
      type: 'conference',
      tags: ['React', 'Conference', 'State Management', 'Performance'],
      link: 'https://example.com/react-summit',
      createdAt: '2024-09-15T10:00:00Z',
      updatedAt: '2024-09-15T10:00:00Z',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NjE0MTk4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      title: 'Building Scalable APIs with TypeScript',
      content: 'Deep dive into best practices for building type-safe, scalable REST and GraphQL APIs using TypeScript and Node.js. Learn about dependency injection, error handling patterns, validation strategies, and testing approaches that ensure reliability in production environments.',
      type: 'medium',
      tags: ['TypeScript', 'API', 'Node.js', 'GraphQL'],
      link: 'https://medium.com/@example/scalable-apis',
      createdAt: '2024-08-22T14:30:00Z',
      updatedAt: '2024-08-22T14:30:00Z',
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBsYXB0b3B8ZW58MXx8fHwxNzYxNDE2MjE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '3',
      title: 'Modern Frontend Architecture Patterns',
      content: 'Presentation slides from my talk at the Web Dev Meetup covering modern architecture patterns including micro-frontends, component-driven development, and the JAMstack approach. Includes real-world examples and performance metrics from production applications.',
      type: 'presentation',
      tags: ['Architecture', 'Frontend', 'Design Patterns', 'Micro-frontends'],
      link: 'https://slides.com/example/frontend-architecture',
      createdAt: '2024-07-10T09:00:00Z',
      updatedAt: '2024-07-10T09:00:00Z',
      image: 'https://images.unsplash.com/photo-1560439514-0fc9d2cd5e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzZW50YXRpb24lMjBzbGlkZXN8ZW58MXx8fHwxNzYxMzY5OTYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '4',
      title: 'Optimizing Developer Experience with Modern Tools',
      content: 'Explore how modern development tools and practices can dramatically improve developer productivity and code quality. Topics include setting up efficient development environments, leveraging AI-powered coding assistants, automated testing strategies, and continuous integration workflows.',
      type: 'medium',
      tags: ['DX', 'Productivity', 'DevTools', 'Automation'],
      link: 'https://medium.com/@example/developer-experience',
      createdAt: '2024-06-18T16:45:00Z',
      updatedAt: '2024-06-18T16:45:00Z',
      image: 'https://images.unsplash.com/photo-1558181445-eca4774b2a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxMzk3ODE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];
  
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);

  // Tech stack filters for projects
  const [selectedTech, setSelectedTech] = useState<string[]>([
    'React', 'TypeScript', 'Python', 'Node.js'
  ]);

  const techStack = [
    { id: 'react', label: 'React' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'python', label: 'Python' },
    { id: 'nodejs', label: 'Node.js' },
    { id: 'vue', label: 'Vue' },
    { id: 'angular', label: 'Angular' },
    { id: 'go', label: 'Go' },
    { id: 'rust', label: 'Rust' },
  ];

  const blogTypes = [
    { id: 'conference', label: 'Conference' },
    { id: 'medium', label: 'Articles' },
    { id: 'presentation', label: 'Presentations' },
  ];

  // Filter posts when selection changes
  useEffect(() => {
    if (selectedTypes.length === 0) {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => selectedTypes.includes(post.type)));
    }
  }, [selectedTypes]);

  const toggleTech = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const skills = {
    languages: ["Python", "JavaScript", "TypeScript", "Java", "C++", "Go", "Rust"],
    frameworks: ["React", "Node.js", "Next.js", "Django", "Flask", "Vue.js"],
    tools: ["Git", "Docker", "Kubernetes", "AWS", "PostgreSQL", "MongoDB"],
  };

  const projects = [
    {
      id: '1',
      title: "Project 1",
      subtitle: "ut-animations",
      description: "Duis aute irure dolor in velit esse cillum dolore.",
      image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYxMzM0MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tech: ['React', 'TypeScript'],
    },
    {
      id: '2',
      title: "Project 2",
      subtitle: "tetris-game",
      description: "Duis aute irure dolor in velit esse cillum dolore.",
      image: "https://images.unsplash.com/photo-1618902345120-77758161d808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9ufGVufDF8fHx8MTc2MTM5NTM3MXww&ixlib=rb-4.1.0&q=80&w=1080",
      tech: ['React', 'Node.js'],
    },
    {
      id: '3',
      title: "Project 3",
      subtitle: "nimbus",
      description: "Duis aute irure dolor in velit esse cillum dolore.",
      image: "https://images.unsplash.com/photo-1608742213509-815b97c30b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwdGVybWluYWx8ZW58MXx8fHwxNzYxMzg1MjUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      tech: ['Python', 'TypeScript'],
    },
  ];

  const experiences = [
    {
      title: "Software Engineering Intern",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      period: "May 2024 - Aug 2024",
      description: [
        "Developed and deployed 3 full-stack features for the company's SaaS platform",
        "Optimized database queries reducing API response time by 40%",
        "Collaborated with senior engineers to implement CI/CD pipelines",
      ],
    },
    {
      title: "Full Stack Developer Intern",
      company: "StartupXYZ",
      location: "Remote",
      period: "Jan 2024 - Apr 2024",
      description: [
        "Built responsive web applications using React and Node.js",
        "Integrated third-party APIs including Stripe and SendGrid",
        "Participated in Agile ceremonies and sprint planning",
      ],
    },
  ];

  const filteredProjects = projects.filter(project =>
    project.tech.some(t => selectedTech.includes(t))
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveTab("hello")}
              className="font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              micheal-weaver
            </button>
            <nav className="hidden md:flex items-center gap-8">
              {[
                { id: 'hello', label: '_hello' },
                { id: 'about', label: '_about-me' },
                { id: 'projects', label: '_projects' },
                { id: 'blog', label: '_blog' },
                { id: 'skills', label: '_skills' },
                { id: 'certificates', label: '_certificates' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-mono transition-colors relative pb-1 ${
                    activeTab === tab.id
                      ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
            <button
              onClick={() => setActiveTab("contact")}
              className="font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              _contact-me
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {/* Hello Tab */}
        {activeTab === "hello" && (
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)] px-6 py-12">
            <div>
              <p className="text-muted-foreground mb-4">Hi all. I am</p>
              <h1 className="text-5xl mb-4 text-foreground">Micheal Weaver</h1>
              <h2 className="text-2xl text-primary mb-8">
                <span className="text-accent">&gt;</span> Front-end developer
              </h2>
              
              <div className="space-y-2 mb-8 font-mono text-sm text-muted-foreground">
                <p>// leave your mark on this site</p>
                <p>// find my profile on GitHub:</p>
                <p>
                  <span className="text-primary">const</span>{" "}
                  <span className="text-blue-400">githubLink</span> ={" "}
                  <a 
                    href="https://github.com/example" 
                    className="text-accent hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    "https://github.com/example"
                  </a>
                </p>
              </div>
            </div>

            <LeaveTraceCard />
          </div>
        )}

        {/* About Tab */}
        {activeTab === "about" && (
          <div className="flex h-[calc(100vh-5rem)]">
            <Sidebar
              title="personal-info"
              items={[
                { id: 'bio', label: 'bio', checked: true },
                { id: 'interests', label: 'interests', checked: false },
                { id: 'education', label: 'education', checked: true },
                { id: 'contacts', label: 'contacts', checked: false },
              ]}
            />
            
            <div className="flex-1 grid md:grid-cols-2 gap-8 p-8 overflow-y-auto">
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3 text-muted-foreground font-mono text-sm">
                    <span className="text-primary">personal-info</span>
                    <span>/</span>
                    <span>bio</span>
                  </div>
                  <div className="font-mono text-sm leading-relaxed">
                    <p className="text-muted-foreground mb-2">/**</p>
                    <p className="text-muted-foreground">* About me</p>
                    <p className="text-foreground">* I have 5 years of experience in web</p>
                    <p className="text-foreground">* development lorem ipsum dolor sit amet,</p>
                    <p className="text-foreground">* consectetur adipiscing elit, sed do eiusmod</p>
                    <p className="text-foreground">* tempor incididunt ut labore et dolore</p>
                    <p className="text-foreground">* magna aliqua. Ut enim ad minim veniam,</p>
                    <p className="text-foreground">* quis nostrud exercitation ullamco laboris</p>
                    <p className="text-foreground">* nisi ut aliquip ex ea commodo consequat.</p>
                    <p className="text-foreground">* Duis aute irure dolor in reprehenderit in</p>
                    <p className="text-foreground">* voluptate velit esse cillum dolore eu fugiat</p>
                    <p className="text-foreground">* nulla pariatur. Excepteur sint occaecat</p>
                    <p className="text-foreground">* officia deserunt mollit anim id est laborum.</p>
                    <p className="text-muted-foreground">*/</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-4 pb-4 border-b border-border">
                  <p className="font-mono text-sm text-muted-foreground">
                    // Code snippet showcase:
                  </p>
                </div>
                
                <div className="space-y-4">
                  <CodeBlock
                    username="@username"
                    timeAgo="5 months ago"
                    stars={4}
                    code={`function initializeModelChunk<T>(chunk: ResolvedModelChunk): T {
  const value: T = parseModel(chunk._response, chunk._value);
  const initializedChunk: InitializedChunk<T> = (chunk: any);
  initializedChunk._status = INITIALIZED;
  initializedChunk._value = value;
  return value;
}`}
                  />

                  <CodeBlock
                    username="@username"
                    timeAgo="2 months ago"
                    stars={2}
                    code={`export function parseModelTuple(
  response: Response,
  value: {[key: string]: JSONValue} | $ReadOnlyArray<JSONValue>,
): any {
  const tuple: [mixed, mixed, mixed, mixed] = (value: any);
  
  return tuple;
}`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="flex h-[calc(100vh-5rem)]">
            <Sidebar
              title="projects"
              items={techStack.map(tech => ({
                id: tech.id,
                label: tech.label,
                checked: selectedTech.includes(tech.label),
                onChange: () => toggleTech(tech.label),
              }))}
            />
            
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4 text-muted-foreground font-mono text-sm">
                  <span className="text-primary">projects</span>
                  <span>/</span>
                  <span>{selectedTech.join('; ') || 'all'}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all"
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary text-primary-foreground font-mono text-xs">
                          {project.tech[0]}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1">
                        <span className="text-accent">{project.title}</span>{" "}
                        <span className="text-muted-foreground font-mono text-sm">
                          // _{project.subtitle}
                        </span>
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {project.description}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full font-mono border-primary/30 text-primary hover:bg-primary/10"
                      >
                        view-project
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === "blog" && (
          <div className="flex h-[calc(100vh-5rem)]">
            <Sidebar
              title="blog-types"
              items={blogTypes.map(type => ({
                id: type.id,
                label: type.label,
                checked: selectedTypes.includes(type.id),
                onChange: () => toggleType(type.id),
              }))}
            />
            
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground font-mono text-sm">
                  <span className="text-primary">blog</span>
                  <span>/</span>
                  <span>{selectedTypes.join(', ') || 'all'}</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Conference papers, Medium articles, and presentations
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} {...post} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="flex h-[calc(100vh-5rem)]">
            <Sidebar
              title="skill-categories"
              items={[
                { id: 'languages', label: 'Languages', checked: true },
                { id: 'frameworks', label: 'Frameworks', checked: true },
                { id: 'tools', label: 'Tools & Platforms', checked: true },
              ]}
            />
            
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4 text-muted-foreground font-mono text-sm">
                  <span className="text-primary">skills</span>
                  <span>/</span>
                  <span>technical-stack</span>
                </div>
              </div>

              <div className="space-y-8">
                {/* Languages */}
                <div>
                  <h3 className="mb-4 text-accent">
                    <span className="text-muted-foreground">▸</span> Languages
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {skills.languages.map((skill) => (
                      <div
                        key={skill}
                        className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-foreground group-hover:text-primary transition-colors">
                            {skill}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Frameworks */}
                <div>
                  <h3 className="mb-4 text-accent">
                    <span className="text-muted-foreground">▸</span> Frameworks & Libraries
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {skills.frameworks.map((skill) => (
                      <div
                        key={skill}
                        className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-foreground group-hover:text-primary transition-colors">
                            {skill}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h3 className="mb-4 text-accent">
                    <span className="text-muted-foreground">▸</span> Tools & Platforms
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {skills.tools.map((skill) => (
                      <div
                        key={skill}
                        className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-foreground group-hover:text-primary transition-colors">
                            {skill}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === "certificates" && (
          <div className="min-h-[calc(100vh-5rem)] px-6 py-12">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 text-muted-foreground font-mono text-sm">
                  <span className="text-primary">certifications</span>
                  <span>/</span>
                  <span>professional-development</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'AWS Certified Developer - Associate',
                    issuer: 'Amazon Web Services',
                    date: 'October 2024',
                    credentialId: 'AWS-DEV-2024-1234',
                    skills: ['AWS', 'Cloud Computing', 'Serverless'],
                  },
                  {
                    title: 'Professional Scrum Master I (PSM I)',
                    issuer: 'Scrum.org',
                    date: 'August 2024',
                    credentialId: 'PSM-2024-5678',
                    skills: ['Agile', 'Scrum', 'Project Management'],
                  },
                  {
                    title: 'MongoDB Certified Developer',
                    issuer: 'MongoDB University',
                    date: 'June 2024',
                    credentialId: 'MONGO-DEV-9012',
                    skills: ['MongoDB', 'NoSQL', 'Database Design'],
                  },
                  {
                    title: 'React Developer Certification',
                    issuer: 'Meta',
                    date: 'March 2024',
                    credentialId: 'META-REACT-3456',
                    skills: ['React', 'JavaScript', 'Frontend'],
                  },
                ].map((cert, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="mb-2 text-primary">{cert.title}</h3>
                        <p className="text-muted-foreground text-sm mb-1">{cert.issuer}</p>
                        <p className="text-muted-foreground text-sm">Issued: {cert.date}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4 p-3 bg-muted/30 rounded border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Credential ID:</p>
                      <code className="text-sm text-primary">{cert.credentialId}</code>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="outline"
                          className="font-mono text-xs border-primary/20 text-primary"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="min-h-[calc(100vh-5rem)] px-6 py-12">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl mb-4">_contact-me</h2>
                <p className="text-muted-foreground font-mono">
                  // Get in touch via email or social media
                </p>
              </div>

              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-mono text-sm text-muted-foreground">Email</p>
                    <a href="mailto:micheal@example.com" className="text-foreground hover:text-primary transition-colors">
                      micheal@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                  <Github className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-mono text-sm text-muted-foreground">GitHub</p>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                      @michealweaver
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                  <Linkedin className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-mono text-sm text-muted-foreground">LinkedIn</p>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                      Micheal Weaver
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                  <Twitter className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-mono text-sm text-muted-foreground">Twitter</p>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                      @michealweaver
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="mb-4 font-mono">Send a message</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="font-mono text-muted-foreground">Name</Label>
                    <Input
                      id="name"
                      className="bg-input-background border-border font-mono"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-mono text-muted-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      className="bg-input-background border-border font-mono"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="font-mono text-muted-foreground">Message</Label>
                    <Textarea
                      id="message"
                      className="bg-input-background border-border font-mono min-h-[120px]"
                      placeholder="Your message..."
                    />
                  </div>
                  <Button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-mono">
                    send-message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-muted-foreground text-sm font-mono">find me in:</p>
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
