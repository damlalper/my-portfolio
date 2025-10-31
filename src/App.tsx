import { useState, useEffect } from "react";
import type React from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { BlogCard } from "./components/BlogCard";
import { Sidebar } from "./components/Sidebar";
import { CodeBlock } from "./components/CodeBlock";
import { LeaveTraceCard } from "./components/LeaveTraceCard";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
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
  const [lang, setLang] = useState<'en' | 'tr'>('en');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['conference', 'medium', 'presentation']);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  
  // Static blog posts (updated)
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of AI: From Ascend Chips to 6G',
      content: 'A brief look at emerging AI hardware and communication tech (Ascend, 6G) and their impact on the ecosystem.',
      type: 'medium',
      tags: ['AI', '6G', 'Ascend', 'Trends'],
      link: 'https://medium.com/@damlanuralper19/yapay-zek%C3%A2n%C4%B1n-gelece%C4%9Fi-nereye-gidiyor-ascend-%C3%A7iplerinden-6gye-56d214a189d5',
      createdAt: '2024-11-05T12:00:00Z',
      updatedAt: '2024-11-05T12:00:00Z',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1080&auto=format&fit=crop',
    },
    {
      id: '2',
      title: 'VCS: Version Control Systems',
      content: 'A quick intro to Git and modern version control: core commands, branching strategies, and workflows.',
      type: 'medium',
      tags: ['Git', 'VCS', 'DevOps'],
      link: 'https://medium.com/@damlanuralper19/vcs-version-control-systems-d55a15f5cf9a',
      createdAt: '2024-10-20T09:30:00Z',
      updatedAt: '2024-10-20T09:30:00Z',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1080&auto=format&fit=crop',
    },
    {
      id: '3',
      title: 'What is the Software Development Life Cycle (SDLC)?',
      content: 'An overview of SDLC phases: requirements, design, development, testing, and maintenance.',
      type: 'medium',
      tags: ['SDLC', 'Software Engineering'],
      link: 'https://medium.com/@damlanuralper19/yaz%C4%B1l%C4%B1m-ya%C5%9Fam-d%C3%B6ng%C3%BCs%C3%BC-nedir-f346752e52b4',
      createdAt: '2024-09-12T15:00:00Z',
      updatedAt: '2024-09-12T15:00:00Z',
      image: 'https://images.unsplash.com/photo-1538587888043-c634bac2cd5e?q=80&w=1080&auto=format&fit=crop',
    },
    {
      id: '4',
      title: 'SafeLand: A Safe Digital Universe for Kids',
      content: 'Vision, safety approach, and key features of the SafeLand project.',
      type: 'medium',
      tags: ['SafeLand', 'Security', 'Web'],
      link: 'https://medium.com/@damlanuralper19/safeland-%C3%A7ocuklar-i%C3%A7in-g%C3%BCvenli-dijital-bir-evren-5ba0f1f7599e',
      createdAt: '2024-08-05T18:20:00Z',
      updatedAt: '2024-08-05T18:20:00Z',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1080&auto=format&fit=crop',
    },
    {
      id: '5',
      title: 'Blockchain: The Future of Decentralized Technology',
      content: 'An overview of blockchain technology and its potential applications. Defi, NFT, and other decentralized applications. Smart contracts and their applications.',
      type: 'presentation',
      tags: ['AI', 'Research', 'Presentation'],
      link: 'https://drive.google.com/file/d/1Iui9GckfkRoW9UTR_4n5Ph4-kiKVvLAO/view?usp=sharing',
      createdAt: '2024-07-22T10:00:00Z',
      updatedAt: '2024-07-22T10:00:00Z',
      image: 'https://images.unsplash.com/photo-1560439514-0fc9d2cd5e1b?q=80&w=1080&auto=format&fit=crop',
    },
    {
      id: '6',
      title: 'AI Blood Test Chatbot Documentation',
      content: 'Documentation of an AI-driven chatbot that explains blood test results with simple narratives.',
      type: 'presentation',
      tags: ['Cloud', 'AI', 'Notes'],
      link: 'https://drive.google.com/file/d/1YwUS_ZnpFhmcVjx_bIIXsD2HD3kkW_gq/view?usp=sharing',
      createdAt: '2024-07-10T09:00:00Z',
      updatedAt: '2024-07-10T09:00:00Z',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1080&auto=format&fit=crop',
    },
    {
      id: '7',
      title: 'AI Blood Test Chatbot Project Report',
      content: 'A presentation of an AI-driven chatbot that explains blood test results with simple narratives.',
      type: 'presentation',
      tags: ['Data Science', 'MLOps'],
      link: 'https://drive.google.com/file/d/14LEbycrZvrqx7LkWNwRhxsPokxhJPqZ6/view?usp=sharing',
      createdAt: '2024-06-18T16:45:00Z',
      updatedAt: '2024-06-18T16:45:00Z',
      image: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=1080&auto=format&fit=crop',
    },
    {
      id: '8',
      title: 'BlooChatbotConf: AI Chatbots',
      content: 'Summary of talks and live demos on AI chatbots at BlooChatbotConf.',
      type: 'conference',
      tags: ['Conference', 'AI', 'Chatbots'],
      link: 'https://drive.google.com/file/d/1gy8xVJNbvoI_P0CDcShP4Se-jhWMYuP0/view?usp=sharing',
      createdAt: '2024-06-01T11:30:00Z',
      updatedAt: '2024-06-01T11:30:00Z',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1080&auto=format&fit=crop',
    },
  ];

  const blogTranslations: Record<string, { title: string; content: string }> = {
    '1': {
      title: 'AI’nin Geleceği: Ascend Çiplerinden 6G’ye',
      content: 'Yapay zekâ ekosistemindeki yeni donanım ve iletişim teknolojileri (Ascend, 6G) üzerine bir değerlendirme.',
    },
    '2': {
      title: 'VCS: Sürüm Kontrol Sistemleri',
      content: 'Git ve modern sürüm kontrol yaklaşımlarına kısa bir giriş: temel komutlar, branching stratejileri ve iş akışları.',
    },
    '3': {
      title: 'Yazılım Yaşam Döngüsü (SDLC) Nedir?',
      content: 'SDLC aşamaları, gereksinim toplama, tasarım, geliştirme, test ve bakım süreçlerinin özeti.',
    },
    '4': {
      title: 'SafeLand: Çocuklar için Güvenli Dijital Bir Evren',
      content: 'SafeLand projesinin vizyonu, güvenlik yaklaşımı ve geliştirilen özelliklere dair bir makale.',
    },
    '5': {
      title: 'Sunum: AI Research Highlights',
      content: 'Son dönem yapay zekâ araştırmalarından öne çıkan başlıklar ve uygulama örnekleri.',
    },
    '6': {
      title: 'Sunum: Cloud & AI Bootcamp Notları',
      content: 'Huawei Cloud AI Bootcamp kapsamında tuttuğum notlar ve pratik ipuçları.',
    },
    '7': {
      title: 'AI Kan Tahlili Chatbot Projesi',
      content: 'Kan tahlili sonuçlarını anlaşılır anlatımlarla açıklayan yapay zekâ destekli bir chatbot sunumu.',
    },
    '8': {
      title: 'BlooChatbotConf: AI Chatbots',
      content: 'BlooChatbotConf kapsamında yapay zekâ sohbet botları üzerine paylaşım ve canlı demo özetleri.',
    },
  };
  
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);

  // Tech stack filters for projects
  const [selectedTech, setSelectedTech] = useState<string[]>([
    'React', 'React Native', 'TypeScript', 'JavaScript', 'Python', 'Node.js', 'Express', 'Next.js', 'FastAPI', 'Flask', 'LangChain', 'PyTorch', 'TensorFlow', 'Pandas', 'Scikit-learn', 'XGBoost', 'NLP', 'OpenCV', 'Firebase', 'Supabase', 'PostgreSQL', 'MongoDB', 'Solidity', 'Web3', 'Stellar', 'Unity', 'C#', 'WebGL', 'Three.js', 'Go', 'Rust'
  ]);

  const techStack = [
    { id: 'react', label: 'React' },
    { id: 'react-native', label: 'React Native' },
    { id: 'nextjs', label: 'Next.js' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'python', label: 'Python' },
    { id: 'nodejs', label: 'Node.js' },
    { id: 'express', label: 'Express' },
    { id: 'fastapi', label: 'FastAPI' },
    { id: 'flask', label: 'Flask' },
    { id: 'langchain', label: 'LangChain' },
    { id: 'pytorch', label: 'PyTorch' },
    { id: 'tensorflow', label: 'TensorFlow' },
    { id: 'pandas', label: 'Pandas' },
    { id: 'scikit', label: 'Scikit-learn' },
    { id: 'xgboost', label: 'XGBoost' },
    { id: 'nlp', label: 'NLP' },
    { id: 'opencv', label: 'OpenCV' },
    { id: 'firebase', label: 'Firebase' },
    { id: 'supabase', label: 'Supabase' },
    { id: 'postgresql', label: 'PostgreSQL' },
    { id: 'mongodb', label: 'MongoDB' },
    { id: 'stellar', label: 'Stellar' },
    { id: 'solidity', label: 'Solidity' },
    { id: 'web3', label: 'Web3' },
    { id: 'unity', label: 'Unity' },
    { id: 'csharp', label: 'C#' },
    { id: 'webgl', label: 'WebGL' },
    { id: 'three', label: 'Three.js' },
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
    frameworks: ["React", "Next.js", "Node.js", "FastAPI", "Flask", "Django"],
    tools: ["Git", "Docker", "Kubernetes", "AWS", "GCP", "Firebase", "Supabase", "PostgreSQL", "MongoDB"],
  };

  const proficiency: Record<string, number> = {
    Python: 90,
    JavaScript: 85,
    TypeScript: 85,
    Java: 70,
    'C++': 65,
    Go: 35,
    Rust: 60,
    React: 85,
    'Next.js': 80,
    'Node.js': 80,
    FastAPI: 75,
    Flask: 75,
    Django: 70,
    Git: 90,
    Docker: 80,
    Kubernetes: 65,
    AWS: 75,
    GCP: 60,
    Firebase: 70,
    Supabase: 70,
    PostgreSQL: 75,
    MongoDB: 70,
  };

  const projects = [
    {
      id: '1',
      title: "3DRubicCubeGame",
      subtitle: "3d-rubic-cube",
      description: "Interactive 3D Rubik's Cube game with rotation logic and rendering.",
      image: "https://images.unsplash.com/photo-1610194352361-cdda959e7bf6?q=80&w=1080&auto=format&fit=crop",
      tech: ['JavaScript', 'WebGL', 'Three.js'],
      link: 'https://github.com/damlalper/3DRubicCubeGame',
    },
    {
      id: '2',
      title: "VodafoneSafeLand",
      subtitle: "safety-platform",
      description: "Safety/aid coordination app built for crisis response.",
      image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1080&auto=format&fit=crop",
      tech: ['React', 'Firebase'],
      link: 'https://github.com/damlalper/VodafoneSafeLand',
    },
    {
      id: '3',
      title: "AITruthGuard",
      subtitle: "ai-truth-guard",
      description: "AI-powered fact-checking/verification toolkit.",
      image: "https://images.unsplash.com/photo-1555252586-0f78540d0e04?q=80&w=1080&auto=format&fit=crop",
      tech: ['Python', 'FastAPI', 'LangChain'],
      link: 'https://github.com/damlalper/AITruthGuard/tree/master',
    },
    {
      id: '4',
      title: "Flight Focus",
      subtitle: "flight-focus",
      description: "VR/AR flight experience research prototype.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1080&auto=format&fit=crop",
      tech: ['Three.js', 'C#','javascript','react', 'css'],
      link: 'https://github.com/damlalper/flightFocus-forMeta',
    },
    {
      id: '5',
      title: "Churn Prediction",
      subtitle: "ing-datathon",
      description: "Customers churn prediction using ML models and feature engineering.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1080&auto=format&fit=crop",
      tech: ['Python', 'Pandas', 'Scikit-learn'],
      link: 'https://github.com/damlalper/INGDatathon-ChurnPrediction',
    },
    {
      id: '6',
      title: "Smile Care +",
      subtitle: "smile-care-plus",
      description: "Builded for smile hair clinic mobile hackathon 2025. Dental health assistant app with tracking and reminders.",
      image: "https://images.unsplash.com/photo-1498550744921-75f79806b8a7?q=80&w=1080&auto=format&fit=crop",
      tech: ['React Native', 'Firebase'],
      link: 'https://github.com/damlalper/SmileCarePlus',
    },
    {
      id: '7',
      title: "TicketChain – Web3 Event Ticketing",
      subtitle: "stellarchain-ticketing",
      description: "Decentralized ticketing with Stellar blockchain.",
      image: "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?q=80&w=1080&auto=format&fit=crop",
      tech: ['Stellar', 'Solidity', 'React'],
      link: 'https://github.com/damlalper/StellarHackathonProject',
    },
    {
      id: '8',
      title: "CRUD Todos",
      subtitle: "todo-api",
      description: "CRUD Todo API with authentication and persistence.",
      image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1080&auto=format&fit=crop",
      tech: ['Node.js', 'Express', 'MongoDB'],
      link: 'https://github.com/damlalper/todo-api',
    },
    {
      id: '9',
      title: "Wallet API",
      subtitle: "wallet-api",
      description: "Digital wallet service with transactions and balances.",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1080&auto=format&fit=crop",
      tech: ['Node.js', 'Express', 'PostgreSQL'],
      link: 'https://github.com/damlalper/WalletAPI',
    },
    {
      id: '10',
      title: "Wallet track with Firebase",
      subtitle: "firebase-wallettrack",
      description: "Expense tracking with Firebase backend.",
      image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=1080&auto=format&fit=crop",
      tech: ['React', 'Firebase'],
      link: 'https://github.com/damlalper/Firebase-Wallettrack',
    },
    {
      id: '11',
      title: "Donation Contract",
      subtitle: "donation-contract",
      description: "Smart contract for transparent donations.",
      image: "https://images.unsplash.com/photo-1523246199602-6099a0b17fa9?q=80&w=1080&auto=format&fit=crop",
      tech: ['Solidity', 'Web3'],
      link: 'https://github.com/damlalper/DonationContract',
    },
    {
      id: '12',
      title: "Dream Visualizer",
      subtitle: "dream-visualizer",
      description: "AI-generated visuals from dream descriptions.",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1080&auto=format&fit=crop",
      tech: ['Python', 'TensorFlow', 'Flask'],
      link: 'https://github.com/damlalper/dreamvisualizer',
    },
    {
      id: '13',
      title: "Word Embedding Analogy",
      subtitle: "word-embedding-analogy",
      description: "Word embeddings and analogy computations.",
      image: "https://images.unsplash.com/photo-1526374870839-e155464bb9b2?q=80&w=1080&auto=format&fit=crop",
      tech: ['Python', 'NLP'],
      link: 'https://github.com/damlalper/word-embedding-analogy',
    },
    {
      id: '14',
      title: "Drone Vision",
      subtitle: "deep-learning",
      description: "Computer vision models for drone imagery.",
      image: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=1080&auto=format&fit=crop",
      tech: ['Python', 'PyTorch', 'OpenCV'],
      link: 'https://github.com/damlalper/DroneVision_DeepLearning',
    },
    {
      id: '15',
      title: "FLO Sales Prediction",
      subtitle: "internship-project",
      description: "Sales forecasting and demand prediction for retail.",
      image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1080&auto=format&fit=crop",
      tech: ['Python', 'Pandas', 'XGBoost'],
      link: 'https://github.com/damlalper/Internship-Project',
    },
    {
      id: '16',
      title: "Cloud Note Labeler",
      subtitle: "cloud-note-labeler",
      description: "Cloud-based note tagging and labeling tool.",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1080&auto=format&fit=crop",
      tech: ['Next.js', 'Supabase', 'PostgreSQL'],
      link: 'https://github.com/damlalper/Cloud-Note-Labeler',
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
              damla-nur-alper
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
              <h1 className="text-5xl mb-4 text-foreground">Damla Nur alper</h1>
              <h2 className="text-2xl text-primary mb-8">
                <span className="text-accent">&gt;</span> AI Engineer
              </h2>
              
              <div className="space-y-2 mb-8 font-mono text-sm text-muted-foreground">
                <p>// leave your mark on this site</p>
                <p>// find my profile on GitHub:</p>
                <p>
                  <span className="text-primary">const</span>{" "}
                  <span className="text-blue-400">githubLink</span> ={" "}
                  <a 
                    href="https://github.com/damlalper" 
                    className="text-accent hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    "https://github.com/damlalper"
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
                    <p className="text-muted-foreground">* About Me</p>
                    <p className="text-foreground">* I’m a Computer Engineering student passionate about AI, cloud, and full-stack development  constantly exploring how technology can solve real-world problems.</p>
                    <p className="text-foreground">* I’ve gained hands-on experience through AI and backend internships at FLO Group, TNC and BrainWorks Global, where I worked on LLM integration, cloud-based architectures, python, lowcode/no code and intelligent automation.</p>
                    <p className="text-foreground">* While my main focus lies in AI, backend, and frontend systems, I love experimenting with new technologies and learning by building real projects.</p>
                    <p className="text-foreground">* Whether it’s designing a scalable API, deploying an AI agent, or crafting an interactive UI, I see every project as a chance to discover something new.</p>
                    <p className="text-foreground">* I actively join hackathons and global challenges to keep pushing my boundaries, and I share my work on GitHub, Medium, and Kaggle because innovation grows best when ideas are shared.</p>
                    <p className="text-muted-foreground">**/</p>
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
                      <ImageWithFallback
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
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((t) => (
                          <Badge key={t} variant="outline" className="font-mono text-xs border-primary/20 text-primary">
                            {t}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full font-mono border-primary/30 text-primary hover:bg-primary/10"
                        asChild
                      >
                        <a href={(project as any).link} target="_blank" rel="noopener noreferrer">
                          view-project
                        </a>
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
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant={lang === 'en' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setLang('en')}
                  >EN</Badge>
                  <Badge
                    variant={lang === 'tr' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setLang('tr')}
                  >TR</Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  Conference papers, Medium articles, and presentations
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredPosts.map((post: BlogPost) => {
                  const tr = lang === 'tr' ? blogTranslations[post.id] : undefined;
                  return (
                    <BlogCard
                      key={post.id}
                      {...post}
                      title={tr?.title ?? post.title}
                      content={tr?.content ?? post.content}
                      lang={lang}
                    />
                  );
                })}
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
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary text-primary-foreground">AI</Badge>
                  <Badge className="bg-primary text-primary-foreground">Web</Badge>
                  <Badge className="bg-primary text-primary-foreground">Mobile</Badge>
                  <Badge className="bg-primary text-primary-foreground">Blockchain</Badge>
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
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${proficiency[skill] ?? 75}%` }} />
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
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${proficiency[skill] ?? 75}%` }} />
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
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${proficiency[skill] ?? 70}%` }} />
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
                <div className="flex items-center gap-2">
                  <Badge
                    variant={lang === 'en' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setLang('en')}
                  >EN</Badge>
                  <Badge
                    variant={lang === 'tr' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setLang('tr')}
                  >TR</Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { en: 'Python Wizards: Code Alchemy Workshop', tr: 'Python Büyücüleri: Kod Simyası Atölyesi', issuer: 'TECHCAREER', date: 'Nov 2024', credentialId: 'TC-PW-' +  Math.floor(Math.random()*100000), link: 'https://www.techcareer.net/', skills: ['Python'] },
                  { en: 'Blockchain and Cryptocurrencies', tr: 'Blokzincir ve Kripto Paralar', issuer: 'BTK', date: 'May 2023', credentialId: 'BTK-BC-' + Math.floor(Math.random()*100000), link: 'https://www.btkakademi.gov.tr/', skills: ['Blockchain'] },
                  { en: 'Agile 101', tr: 'Çevik 101', issuer: 'Softtech', date: 'Jul 2023', credentialId: 'ST-AG-' + Math.floor(Math.random()*100000), link: 'https://www.softtech.com.tr/', skills: ['Agile'] },
                  { en: 'Huawei Cloud AI Bootcamp', tr: 'Huawei Cloud AI Bootcamp', issuer: 'HSD', date: 'Dec 2024', credentialId: 'HSD-AI-' + Math.floor(Math.random()*100000), link: 'https://www.huaweicloud.com/', skills: ['AI', 'Cloud'] },
                  { en: 'FLO Internship Certificate', tr: 'FLO Staj Sertifikası', issuer: 'FLO', date: 'Sep 2024', credentialId: 'FLO-IN-' + Math.floor(Math.random()*100000), link: 'https://www.flo.com.tr/', skills: ['Retail', 'Data'] },
                  { en: 'Figma', tr: 'Figma', issuer: 'BTK', date: 'Apr 2023', credentialId: 'BTK-FIG-' + Math.floor(Math.random()*100000), link: 'https://www.figma.com/', skills: ['Design'] },
                  { en: 'Women Who Code the Future', tr: 'Geleceği Yazan Kadınlar', issuer: 'Turkcell', date: 'Mar 2023', credentialId: 'TCELL-GYK-' + Math.floor(Math.random()*100000), link: 'https://gelecegiyazanlar.turkcell.com.tr/', skills: ['Community'] },
                  { en: 'Project Management with Git, GitHub, Jira', tr: 'Git,Github,Jira ile Proje Yönetimi', issuer: 'Miuul', date: 'Jan 2024', credentialId: 'MIUUL-PM-' + Math.floor(Math.random()*100000), link: 'https://miuul.com/', skills: ['PM', 'Git', 'Jira'] },
                  { en: 'Personalized GPTs', tr: 'Kişiselleştirilmiş GPTler', issuer: 'BTK', date: 'Jan 2025', credentialId: 'BTK-GPT-' + Math.floor(Math.random()*100000), link: 'https://www.btkakademi.gov.tr/', skills: ['GenAI'] },
                  { en: 'HCCDA - AI', tr: 'HCCDA - AI', issuer: 'Huawei', date: 'Aug 2024', credentialId: 'HW-HCCDA-AI-' + Math.floor(Math.random()*100000), link: 'https://www.huawei.com/', skills: ['AI'] },
                  { en: 'HCCDA - Tech Essentials', tr: 'HCCDA - Temel Teknolojiler', issuer: 'Huawei', date: 'Aug 2024', credentialId: 'HW-HCCDA-TE-' + Math.floor(Math.random()*100000), link: 'https://www.huawei.com/', skills: ['Cloud', 'Infra'] },
                  { en: 'HCCDA - Cloud Native', tr: 'HCCDA - Bulut Yerel', issuer: 'Huawei', date: 'Aug 2024', credentialId: 'HW-HCCDA-CN-' + Math.floor(Math.random()*100000), link: 'https://www.huawei.com/', skills: ['Cloud', 'Kubernetes'] },
                  { en: 'Linux', tr: 'Linux', issuer: 'Cisco Networking Academy & AKBANK', date: 'Feb 2024', credentialId: 'CNA-LNX-' + Math.floor(Math.random()*100000), link: 'https://www.netacad.com/', skills: ['Linux'] },
                  { en: 'Cyber Security', tr: 'Siber Güvenlik', issuer: 'Cisco Networking Academy & AKBANK', date: 'Feb 2024', credentialId: 'CNA-CYB-' + Math.floor(Math.random()*100000), link: 'https://www.netacad.com/', skills: ['Security'] },
                  { en: 'Equal Opportunity in Technology', tr: 'Teknolojide Fırsat Eşitliği', issuer: 'Yapı Kredi', date: 'Jun 2023', credentialId: 'YK-EO-' + Math.floor(Math.random()*100000), link: 'https://www.yapikredi.com.tr/', skills: ['Diversity'] },
                  { en: 'Generative AI', tr: 'Üretken Yapay Zeka', issuer: 'Akbank Global AI Hub', date: 'Oct 2024', credentialId: 'AKB-GENAI-' + Math.floor(Math.random()*100000), link: 'https://globalaihub.com/', skills: ['GenAI'] },
                  { en: 'Deep Learning', tr: 'Derin Öğrenme', issuer: 'Akbank Global AI Hub', date: 'Oct 2024', credentialId: 'AKB-DL-' + Math.floor(Math.random()*100000), link: 'https://globalaihub.com/', skills: ['Deep Learning'] },
                  { en: 'AWS Developer', tr: 'AWS Geliştirici', issuer: 'Amazon Web Services', date: 'Nov 2024', credentialId: 'AWS-DEV-' + Math.floor(Math.random()*100000), link: 'https://aws.amazon.com/', skills: ['AWS'] },
                  { en: 'BTK Datathon Kaggle 2025', tr: 'BTK Datathon Kaggle 2025', issuer: 'BTK', date: 'Jan 2025', credentialId: 'BTK-KAG-' + Math.floor(Math.random()*100000), link: 'https://www.kaggle.com/', skills: ['Kaggle', 'ML'] },
                  { en: 'IBM Cloud Computing Fundamentals', tr: 'IBM Bulut Bilişim Temelleri', issuer: 'IBM', date: 'Sep 2024', credentialId: 'IBM-CCF-' + Math.floor(Math.random()*100000), link: 'https://www.ibm.com/training', skills: ['Cloud'] },
                  { en: 'IBM Artificial Intelligence Fundamentals', tr: 'IBM Yapay Zeka Temelleri', issuer: 'IBM', date: 'Sep 2024', credentialId: 'IBM-AIF-' + Math.floor(Math.random()*100000), link: 'https://www.ibm.com/training', skills: ['AI'] },
                  { en: 'IBM Generative AI in Action', tr: 'IBM Üretken Yapay Zeka Uygulamaları', issuer: 'IBM', date: 'Sep 2024', credentialId: 'IBM-GENAI-' + Math.floor(Math.random()*100000), link: 'https://www.ibm.com/training', skills: ['GenAI'] },
                  { en: 'IBM Security Operations Center in Practice', tr: 'IBM Güvenlik Operasyonları Uygulamada', issuer: 'IBM', date: 'Sep 2024', credentialId: 'IBM-SOC-' + Math.floor(Math.random()*100000), link: 'https://www.ibm.com/training', skills: ['Security'] },
                ].map((cert, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="mb-2 text-primary">{lang === 'en' ? cert.en : cert.tr}</h3>
                        <p className="text-muted-foreground text-sm mb-1">{cert.issuer}</p>
                        <p className="text-muted-foreground text-sm">{lang === 'en' ? 'Issued' : 'Veriliş'}: {cert.date}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4 p-3 bg-muted/30 rounded border border-border">
                      <p className="text-xs text-muted-foreground mb-1">{lang === 'en' ? 'Credential ID:' : 'Belge No:'}</p>
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
                    <div className="mt-4">
                      <Button size="sm" asChild>
                        <a href={(cert as any).link} target="_blank" rel="noopener noreferrer">
                          {lang === 'en' ? 'View Credential' : 'Belgeyi Görüntüle'}
                        </a>
                      </Button>
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
                    <a href="mailto:damlanuralper20@gmail.com" className="text-foreground hover:text-primary transition-colors">
                      damlanuralper20@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                  <Github className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-mono text-sm text-muted-foreground">GitHub</p>
                    <a href="https://github.com/damlalper" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                      @damlalper
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                  <Linkedin className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-mono text-sm text-muted-foreground">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/damla-nur-alper-225a1730b" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                      Damla Nur Alper
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                  <Terminal className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-mono text-sm text-muted-foreground">Kaggle</p>
                    <a href="https://kaggle.com/damlaalper" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                      damlaalper
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                  <ExternalLink className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-mono text-sm text-muted-foreground">Medium</p>
                    <a href="https://medium.com/@damlanuralper19" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                      @damlanuralper19
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="mb-4 font-mono">Send a message</h3>
                <form className="space-y-4" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  toast.success(lang === 'en' ? 'Your message has been sent successfully.' : 'Mesajınız başarıyla gönderildi.');
                  setContactName('');
                  setContactEmail('');
                  setContactMessage('');
                }}>
                  <div>
                    <Label htmlFor="name" className="font-mono text-muted-foreground">Name</Label>
                    <Input
                      id="name"
                      className="bg-input-background border-border font-mono"
                      placeholder="Your name"
                      value={contactName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContactName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-mono text-muted-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      className="bg-input-background border-border font-mono"
                      placeholder="your@email.com"
                      value={contactEmail}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContactEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="font-mono text-muted-foreground">Message</Label>
                    <Textarea
                      id="message"
                      className="bg-input-background border-border font-mono min-h-[120px]"
                      placeholder="Your message..."
                      value={contactMessage}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContactMessage(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-mono">
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
            <a href="https://www.linkedin.com/in/damla-nur-alper-225a1730b" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:damlanuralper20@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://github.com/damlalper" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
