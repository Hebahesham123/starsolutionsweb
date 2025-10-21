"use client"

import * as React from "react"

import { useState, useEffect, useRef, type FormEvent } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  ArrowRight,
  Code,
  TrendingUp,
  Shield,
  CheckCircle,
  Star,
  Play,
  Menu,
  X,
  Users,
  Award,
  Sparkles,
  Rocket,
  Target,
  Brain,
  MessageSquare,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ExternalLink,
  Clock,

  Settings,
  FileText,
  ArrowLeft,
  Monitor,
  Smartphone,
  Database,
  Video,
  Camera,
  Mic,
  ShoppingBag,
  Cloud,
  Terminal,
  Cpu,
  Code2,
  Server,
  Layers,
  GitBranch,
  Package,
  Activity,
  BarChart3,
  Heart,
  Bookmark,
  Mail,
  Phone,

  Briefcase,
  GraduationCap,
  BadgeIcon as Certificate,
  Trophy,
  Lightbulb,
  Tablet,
  Laptop,
} from "lucide-react"

// Define types for form data
interface ContactFormData {
  name: string
  email: string
  company: string
  budget: string
  message: string
}

// Modal content interfaces
interface ServiceDetail {
  title: string
  description: string
  features: string[]
  technologies: string[]
  process: string[]

  timeline: string
  benefits: string[]
}

interface PortfolioDetail {
  title: string
  category: string
  description: string
  challenge: string
  solution: string
  results: string[]
  technologies: string[]
  timeline: string
  testimonial: string
  images: string[]
}

interface TeamMemberDetail {
  name: string
  role: string
  expertise: string
  bio: string
  experience: string
  education: string[]
  certifications: string[]
  projects: string[]
  social: { linkedin: string; github: string; twitter: string }
}

interface StatDetail {
  number: string
  label: string
  icon: any
  details: string
  metrics: string[]
  achievements: string[]
}

interface TestimonialDetail {
  name: string
  role: string
  company: string
  content: string
  rating: number
  image: string
  results: string[]
  projectType: string
  duration: string
  satisfaction: string
}

interface InsightDetail {
  title: string
  description: string
  date: string
  author: string
  readTime: string
  category: string
  tags: string[]
  content: string
  relatedTopics: string[]
}

export default function AdvancedTechWebsite() {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [modalData, setModalData] = useState<any>(null)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState<Partial<ContactFormData>>({})
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    services: false,
    company: false,
  })
  const [showAllTechnologies, setShowAllTechnologies] = useState(false)
  const [activePolicy, setActivePolicy] = useState<string | null>(null)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: "",
    rating: 0,
    feedback: "",
  })
  const [feedbackErrors, setFeedbackErrors] = useState<Record<string, string>>({})

  // Refs for sections
  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    services: useRef<HTMLElement>(null),
    solutions: useRef<HTMLElement>(null),
    portfolio: useRef<HTMLElement>(null),
    team: useRef<HTMLElement>(null),
    insights: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  }

  // Horizontal scroller refs
  const servicesScrollRef = useRef<HTMLDivElement | null>(null)
  const portfolioScrollRef = useRef<HTMLDivElement | null>(null)
  const testimonialsScrollRef = useRef<HTMLDivElement | null>(null)
  const teamScrollRef = useRef<HTMLDivElement | null>(null)

  const scrollHorizontally = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    const node = ref.current
    if (!node) return
    const amount = node.clientWidth * 0.8
    node.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" })
  }

  const { toast } = useToast()

  // Toggle expanded sections
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Policy modal functions
  const openPolicy = (policy: string) => {
    setActivePolicy(policy)
  }

  const closePolicy = () => {
    setActivePolicy(null)
  }

  // Scroll animations removed

  // Service details data
  const serviceDetails: Record<string, ServiceDetail> = {
    "Software Development": {
      title: "Custom Software Development",
      description:
        "End-to-end software development services that transform your business ideas into powerful digital solutions.",
      features: [
        "Custom Web Applications",
        "Mobile App Development (iOS/Android)",
        "Enterprise Software Solutions",
        "API Development & Integration",
        "Database Design & Optimization",
        "Cloud Migration & Deployment",
        "DevOps & CI/CD Implementation",
        "Quality Assurance & Testing",
      ],
      technologies: ["React", "Next.js", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "PostgreSQL"],
      process: [
        "Requirements Analysis & Planning",
        "UI/UX Design & Prototyping",
        "Development & Implementation",
        "Testing & Quality Assurance",
        "Deployment & Launch",
        "Maintenance & Support",
      ],
      
      timeline: "8-16 weeks",
      benefits: [
        "Scalable Architecture",
        "Modern Tech Stack",
        "24/7 Support",
        "Performance Optimization",
        "Security Best Practices",
        "Documentation & Training",
      ],
    },
    "Digital Marketing": {
      title: "Digital Marketing & Growth",
      description: "Data-driven marketing strategies that amplify your brand and drive measurable business growth.",
      features: [
        "Search Engine Optimization (SEO)",
        "Pay-Per-Click Advertising (PPC)",
        "Social Media Marketing",
        "Content Marketing Strategy",
        "Email Marketing Automation",
        "Conversion Rate Optimization",
        "Analytics & Reporting",
        "Brand Strategy & Development",
      ],
      technologies: ["Google Analytics", "Google Ads", "Facebook Ads", "HubSpot", "Mailchimp", "SEMrush"],
      process: [
        "Market Research & Analysis",
        "Strategy Development",
        "Campaign Creation & Launch",
        "Performance Monitoring",
        "Optimization & Scaling",
        "Reporting & Analysis",
      ],
      
      timeline: "4-8 weeks setup",
      benefits: [
        "Increased Brand Visibility",
        "Higher Conversion Rates",
        "Better ROI",
        "Targeted Audience Reach",
        "Data-Driven Insights",
        "Continuous Optimization",
      ],
    },
    "AI & Machine Learning": {
      title: "AI & Machine Learning Solutions",
      description: "Intelligent automation and predictive analytics to give your business a competitive edge.",
      features: [
        "Predictive Analytics Models",
        "Natural Language Processing",
        "Computer Vision Solutions",
        "Recommendation Systems",
        "Process Automation",
        "Chatbots & Virtual Assistants",
        "Data Mining & Analysis",
        "Machine Learning Consulting",
      ],
      technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI", "AWS ML", "Azure AI", "Scikit-learn"],
      process: [
        "Data Assessment & Strategy",
        "Model Development & Training",
        "Testing & Validation",
        "Integration & Deployment",
        "Monitoring & Optimization",
        "Scaling & Enhancement",
      ],
      
      timeline: "12-20 weeks",
      benefits: [
        "Automated Decision Making",
        "Improved Efficiency",
        "Cost Reduction",
        "Predictive Insights",
        "Competitive Advantage",
        "Scalable Solutions",
      ],
    },
    "Media Production": {
      title: "Professional Media Production",
      description: "High-quality video, audio, and visual content production that captivates audiences and elevates your brand.",
      features: [
        "Video Production & Editing",
        "Audio Recording & Mixing",
        "Photography & Visual Design",
        "Motion Graphics & Animation",
        "Live Streaming & Broadcasting",
        "Podcast Production",
        "Content Strategy & Planning",
        "Brand Visual Identity",
      ],
      technologies: ["Adobe Creative Suite", "Final Cut Pro", "DaVinci Resolve", "OBS Studio", "Pro Tools", "Cinema 4D"],
      process: [
        "Creative Brief & Concept Development",
        "Pre-production Planning",
        "Production & Filming",
        "Post-production & Editing",
        "Quality Review & Revisions",
        "Final Delivery & Distribution",
      ],
      
      timeline: "2-8 weeks",
      benefits: [
        "Professional Quality Content",
        "Enhanced Brand Perception",
        "Increased Engagement",
        "Multi-platform Distribution",
        "Creative Storytelling",
        "Consistent Visual Identity",
      ],
    },
  }

  // Portfolio details data
  const portfolioDetails: Record<string, PortfolioDetail> = {
    "Hollywood Clinic System": {
      title: "Hollywood Clinic Management System",
      category: "Healthcare Technology",
      description: "Comprehensive Flutter app with backend system for modern clinic management and patient care.",
      challenge:
        "Healthcare providers face increasing pressure to manage sensitive patient data securely while ensuring seamless appointment scheduling and medical compliance. Building a reliable clinic management system that protects patient information and streamlines operations is a major challenge for modern clinics and hospitals.",
      solution:
        "We developed a comprehensive Flutter-based clinic management app with a powerful backend system. The solution includes secure patient management, appointment scheduling, and medical compliance tools, delivering a robust platform for clinics to improve efficiency, enhance patient care, and maintain healthcare standards.",
      results: [
        "Streamlined appointment management",
        "Enhanced patient experience",
        "Medical compliance achieved",
        "Improved operational efficiency",
        "Fast and user-friendly interface",
      ],
      technologies: ["Flutter", "Dart", "Node.js", "PostgreSQL", "Firebase", "REST APIs"],
      timeline: "16 weeks",
      testimonial:
        "The platform built for our clinic made managing appointments and patients much easier. The app is fast, easy to use, and medically compliant. An excellent experience with a professional team.",
      images: [], // Remove images
    },
    "CourierX Platform": {
      title: "CourierX Integrated Courier System",
      category: "Logistics Technology",
      description: "Fully integrated courier platform with real-time tracking and smart dispatch system.",
      challenge:
        "In the fast-paced logistics and courier industry, businesses need more than just delivery—they need real-time package tracking, intelligent dispatching, and a user-friendly dashboard to streamline operations. Developing a reliable courier management system that improves delivery efficiency while enhancing customer experience is a critical challenge for modern logistics providers.",
      solution:
        "We created CourierX, a fully integrated Next.js courier management platform designed for smart logistics operations. The system features real-time package tracking, an AI-powered dispatch solution, and a comprehensive dashboard for operators and customers. This modern courier technology solution ensures seamless operations, improved efficiency, and higher customer satisfaction.",
      results: [
        "Real-time package tracking",
        "Intelligent dispatch system",
        "User-friendly dashboard",
        "Operational efficiency improved",
        "Customer satisfaction increased",
      ],
      technologies: ["Next.js", "React", "Node.js", "MongoDB", "Socket.io", "Google Maps API"],
      timeline: "20 weeks",
      testimonial:
        "We worked with the team on a fully integrated courier platform. Everything was precise: real-time tracking, an easy dashboard, and a smart dispatch system. They truly transformed how we work.",
      images: [], // Remove images
    },
    "Beauty Bar E-commerce": {
      title: "Beauty Bar Luxury E-commerce",
      category: "E-commerce Technology",
      description: "High-end Shopify e-commerce website for luxury beauty brands with advanced features.",
      challenge:
        "In the competitive luxury beauty e-commerce market, creating an online store is not enough—brands need a premium digital experience that reflects their elegance and exclusivity. The challenge was to design a high-end Shopify e-commerce platform that could effectively showcase luxury beauty brands, deliver advanced product filtering, and highlight products with elegant presentation to attract discerning customers",
      solution:
        "We developed a sophisticated Shopify e-commerce website tailored for luxury beauty brands, combining custom design, advanced filtering features, and seamless product presentation. Using Shopify’s robust ecosystem, including Liquid templates, Shopify APIs, and secure payment integrations, the platform delivers a luxurious shopping experience that enhances brand positioning, increases sales, and delights customers with an outstanding user experience",
      results: [
        "Increased sales significantly",
        "Luxurious brand presentation",
        "Advanced product filtering",
        "Outstanding customer experience",
        "Enhanced brand positioning",
      ],
      technologies: ["Shopify", "Liquid", "JavaScript", "CSS3", "Shopify APIs", "Payment Integration"],
      timeline: "12 weeks",
      testimonial:
        "The new website looks extremely luxurious and helped increase sales significantly. The advanced filtering and elegant product presentation made the customer experience outstanding. Thank you for the professional work.",
      images: [], // Remove images
    },
    "Montre Watch Collection": {
      title: "Montre Luxury Watch E-commerce",
      category: "E-commerce Technology",
      description: "Premium Shopify e-commerce platform for luxury watch collections and timepieces.",
      challenge:
        "In the luxury watch e-commerce market, customers expect more than just an online shop—they look for a sophisticated digital experience that mirrors the exclusivity of premium timepieces. The challenge was to build a high-end Shopify platform that could showcase luxury watches with elegant design, detailed product presentation, and a premium user experience that reinforces the prestige of luxury watch brands.",
      solution:
        "We developed a premium Shopify e-commerce website tailored for luxury watch collections and timepieces. The platform features a custom Shopify theme, elegant product showcases, and sophisticated brand presentation. Leveraging Shopify Plus, Liquid, and advanced customizations, we ensured a luxurious shopping journey that highlights craftsmanship, enhances customer engagement, and strengthens luxury brand positioning.",
      results: [
        "Premium brand presentation",
        "Elegant product showcases",
        "Enhanced user experience",
        "Increased customer engagement",
        "Luxury positioning achieved",
      ],
      technologies: ["Shopify", "Liquid", "JavaScript", "CSS3", "Shopify Plus", "Custom Themes"],
      timeline: "14 weeks",
      testimonial:
        "The luxury watch e-commerce platform perfectly captures our brand essence. The elegant design and sophisticated features have elevated our online presence significantly.",
      images: [], // Remove images
    },
    "TechCorp Brand Campaign": {
      title: "TechCorp Corporate Brand Campaign",
      category: "Media Production",
      description: "Comprehensive brand video campaign including corporate videos, product demos, and social media content for a leading tech company.",
      challenge:
        "In today’s competitive tech industry, establishing a strong corporate identity requires more than just a logo—it demands a cohesive brand campaign that reflects innovation and professionalism. The challenge was to showcase TechCorp’s cutting-edge products through a unified multimedia strategy, while maintaining corporate aesthetics across video content, product demos, and social media platforms.",
      solution:
        "We delivered a comprehensive brand video campaign designed to strengthen TechCorp’s corporate image and highlight its innovative technology solutions. The project included professional corporate videos, engaging product demonstrations, and dynamic social media content—all produced with consistent branding, high-quality visuals, and polished storytelling. Leveraging tools like Adobe Premiere Pro, After Effects, DaVinci Resolve, and Cinema 4D, we ensured a seamless media experience that resonates with both corporate audiences and end consumers",
      results: [
        "Enhanced brand perception",
        "Increased social media engagement",
        "Professional corporate presentation",
        "Consistent brand messaging",
        "Improved customer trust",
      ],
      technologies: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Cinema 4D", "Pro Tools", "Color Grading"],
      timeline: "8 weeks",
      testimonial:
        "The media production team delivered exceptional quality content that perfectly represents our brand. The videos have significantly improved our corporate image and customer engagement.",
      images: [], // Remove images
    },
    "RestaurantX Marketing Videos": {
      title: "RestaurantX Marketing Video Series",
      category: "Media Production",
      description: "Complete marketing video package including food photography, promotional videos, and social media content for a premium restaurant chain.",
      challenge:
        "In the competitive hospitality and fine dining industry, restaurants must stand out not only through food but also through their online brand presence. The challenge was to capture the essence of RestaurantX’s luxury dining experience, showcasing its premium atmosphere, gourmet dishes, and unique culinary journey. The goal was to produce engaging content that drives customer engagement, online visibility, and reservations.",
      solution:
        "We developed a complete video marketing package tailored for the restaurant industry. This included high-quality 4K promotional videos, professional food photography, behind-the-scenes storytelling, and customer testimonials to highlight RestaurantX’s premium dining experience. Leveraging the Adobe Creative Suite, advanced color grading, and social media optimization, we created compelling content that elevated the brand’s online presence and attracted new diners.",
      results: [
        "Increased social media following",
        "Enhanced online presence",
        "Improved customer engagement",
        "Professional food presentation",
        "Boosted reservation rates",
      ],
      technologies: ["4K Video Production", "Food Photography", "Adobe Creative Suite", "Color Grading", "Audio Enhancement", "Social Media Optimization"],
      timeline: "6 weeks",
      testimonial:
        "The video content has transformed how we present our restaurant online. The quality and creativity of the media production exceeded our expectations and has directly impacted our business growth.",
      images: [], // Remove images
    },
  }

  // Team member details
  const teamDetails: Record<string, TeamMemberDetail> = {
    "Heba Hesham": {
      name: "Heba Hesham",
      role: "Software Engineer",
      expertise: "Full-Stack Development & Scalable System Architecture",
      bio:"A highly skilled software engineer with 5+ years of experience in building enterprise-level web applications, robust backend systems, and cloud-based solutions. She specializes in React, Node.js, and AWS, combining modern frontend development with scalable backend architecture to deliver seamless, high-performing applications.",
      experience: "5+ years in software engineering and full-stack development",
      education: ["BS Computer Science", "Software Engineering Certification"],
      certifications: ["React Developer Professional", "Node.js Certified Developer", "AWS Cloud Practitioner"],
      projects: [
        "Led development of 20+ web applications",
        "Built scalable backend systems",
        "Implemented modern frontend solutions",
      ],
      social: { linkedin: "#", github: "#", twitter: "#" },
    },
  "Hams Assem": {
  name: "Hams Assem",
  role: "Software Engineer",
  expertise: "Full-Stack Development & Intelligent Systems",
  bio: "Hamsa Assem is a passionate software engineer with strong expertise in full-stack development and intelligent software solutions. She excels at building dynamic, user-friendly web applications and integrating smart technologies to create innovative digital experiences. With a background in Artificial Intelligence and Computer Engineering, she combines technical knowledge with creative problem-solving to deliver impactful software products.",
  experience: "Hands-on experience in modern web technologies and AI-powered solutions",
  education: [
    "BS in Computer Engineering (Artificial Intelligence specialization)",
    "Professional Training in Web & Mobile Development"
  ],
  certifications: [
    "JavaScript & React Advanced Certification",
    "Node.js Developer Certification",
    "Cloud Fundamentals (Azure & AWS)"
  ],
  projects: [
    "Developed and deployed multiple full-stack applications with modern frameworks",
    "Worked on AI-driven applications for smarter user experiences",
    "Built scalable APIs and integrated third-party services for cross-platform solutions"
  ],
  social: {
    "linkedin": "#",
    "github": "#",
    "twitter": "#"
  }
},

   "Ahmed Nassar": {
  name: "Ahmed Nassar",
  role: "(CEO)",
  expertise: "Business Strategy, Leadership & Digital Transformation",
  bio: "Ahmed Nassar is a visionary CEO with extensive experience in leading technology-driven organizations and driving sustainable growth. With a strong background in business strategy and innovation, he specializes in aligning technology solutions with corporate goals to maximize efficiency and market impact. Ahmed is known for his ability to build high-performing teams, foster strategic partnerships, and guide companies through digital transformation journeys.",
  experience: "10+ years in executive leadership and business development",
  education: [
    "MBA in Business Administration & Strategy",
    "Bachelor’s in Information Technology Management"
  ],
  certifications: [
    "Executive Leadership Certification",
    "Strategic Management Professional",
    "Digital Transformation Specialist"
  ],
  projects: [
    "Led the company’s expansion into multiple markets",
    "Successfully managed large-scale digital transformation initiatives",
    "Built strategic partnerships with leading global enterprises"
  ],
  social: {
    "linkedin": "#",
    "github": "#",
    "twitter": "#"
  }
},

"Ahmed Hussien": {
  name: "Ahmed Hussien",
  role: "Senior Software Engineer",
  expertise: "Advanced Full-Stack Development, Cloud Solutions & Technical Leadership",
  bio: "Ahmed Hussien is an experienced Senior Software Engineer with deep expertise in designing, developing, and optimizing large-scale applications. He excels in full-stack development, cloud-based solutions, and performance-driven system architecture. Known for mentoring junior developers and leading engineering teams, Ahmed plays a key role in delivering innovative software solutions that enhance business operations and customer experiences.",
  experience: "7+ years in software engineering and system design",
  education: [
    "BS in Computer Engineering",
    "Diploma in Advanced Software Architecture"
  ],
  certifications: [
    "Certified Kubernetes Administrator",
    "AWS Solutions Architect",
    "Professional React & Node.js Certification"
  ],
  projects: [
    "Architected and deployed enterprise-level applications",
    "Led development teams in agile environments",
    "Optimized cloud infrastructure for performance and scalability"
  ],
  social: {
    "linkedin": "#",
    "github": "#",
    "twitter": "#"
  }
},

"Mariam Khairy": {
  name: "Mariam Khairy",
  role: "Customer Service Specialist",
  expertise: "Customer Support, Client Relations & Communication",
  bio: "Mariam Khairy is a dedicated Customer Service Specialist with strong expertise in delivering exceptional client support and building lasting relationships. She excels at resolving customer inquiries, improving service quality, and ensuring a positive experience at every touchpoint. With a passion for communication and problem-solving, Mariam plays a vital role in enhancing customer satisfaction and fostering brand loyalty.",
  experience: "4+ years in customer service and client relationship management",
  education: [
    "BA in Business Communication",
    "Customer Service Management Diploma"
  ],
  certifications: [
    "Certified Customer Service Professional (CCSP)",
    "Conflict Resolution & Communication Skills Certification"
  ],
  projects: [
    "Improved customer satisfaction scores by implementing feedback-driven strategies",
    "Developed streamlined support workflows for faster response times",
    "Trained new customer service representatives to maintain service excellence"
  ],
  social: {
    "linkedin": "#",
    "github": "#",
    "twitter": "#"
  }
},

    "Farah Hawwas": {
      name: "Farah Hawwas",
      role: "Sales Manager",
      expertise: "Content Strategy & Creative Development",
      bio: "Fraha is a talented content creator who develops engaging content strategies that resonate with target audiences. She specializes in creating compelling visual and written content that drives engagement and supports marketing objectives.",
      experience: "3+ years in content creation",
      education: ["BS Communications", "Content Marketing Certification"],
      certifications: ["Content Marketing Specialist", "Social Media Content Creator", "Creative Writing Professional"],
      projects: [
        "Created content for 40+ brands",
        "Increased engagement rates by 300%",
        "Developed viral content campaigns",
      ],
      social: { linkedin: "#", github: "#", twitter: "#" },
    },
    "Ahmed Miery": {
  name: "Ahmed Miery",
  role: "Marketing Manager",
  expertise: "Digital Marketing, Brand Strategy & Campaign Management",
  bio: "Ahmed Miery is a results-driven Marketing Manager with proven expertise in creating and executing successful marketing strategies. He specializes in digital campaigns, brand positioning, and customer engagement, helping businesses strengthen their presence and drive measurable growth. With a creative mindset and data-driven approach, Ahmed ensures marketing initiatives deliver maximum impact and ROI.",
  experience: "7+ years in marketing and brand management",
  education: [
    "BA in Marketing & Business Administration",
    "Digital Marketing Certification"
  ],
  certifications: [
    "Google Ads Certified",
    "HubSpot Inbound Marketing Certification",
    "Facebook Blueprint Certification"
  ],
  projects: [
    "Led multiple brand campaigns that increased online visibility by 40%",
    "Developed and executed social media strategies for high engagement",
    "Optimized digital ad campaigns resulting in higher ROI and lead generation"
  ],
  social: {
    "linkedin": "#",
    "github": "#",
    "twitter": "#"
  }
},
"Ebtasam Olama": {
  name: "Ebtasam Olama",
  role: "Digital Content & Social Media Specialist",
  expertise: "Content Strategy, Social Media Management & Digital Marketing",
  bio: "Ebtasam is a creative Digital Content & Social Media Specialist with expertise in developing engaging content strategies and managing online brand presence. She excels at crafting compelling posts, visuals, and campaigns that drive audience engagement and strengthen brand identity.",
  experience: "4+ years in digital content and social media management",
  education: ["BA in Media & Communication", "Digital Marketing Diploma"],
  certifications: ["Social Media Marketing Certification", "Google Analytics Certified"],
  projects: [
    "Managed and grew multiple social media accounts with increased engagement rates",
    "Created digital content strategies that boosted brand visibility",
    "Executed successful paid ad campaigns across social platforms"
  ],
  social: { linkedin: "#", github: "#", twitter: "#" }
},

"Ganna Mohy": {
  name: "Ganna Mohy",
  role: " Senior Content Creator",
  expertise: "Digital Content Creation, Social Media Strategy & Brand Storytelling",
  bio: "Ganna Mohy is a creative Content Creator specializing in developing engaging digital content, social media campaigns, and brand storytelling. She excels at creating compelling visuals and copy that boost online presence, drive audience engagement, and strengthen brand identity. With a passion for creativity and innovation, Ganna helps brands connect with their audiences in meaningful ways.",
  experience: "3+ years in content creation and social media management",
  education: [
    "BA in Media & Communication",
    "Digital Marketing Certification"
  ],
  certifications: [
    "Content Marketing Certified",
    "Social Media Strategy Certification",
    "Adobe Creative Suite Training"
  ],
  projects: [
    "Produced content for multiple successful digital campaigns",
    "Boosted social media engagement by 40% through creative strategies",
    "Developed brand storytelling materials for diverse industries"
  ],
  social: {
    "linkedin": "#",
    "github": "#",
    "twitter": "#"
  }
},

"Maiar Mohammed": {
  name: "Maiar Mohammed",
  role: "Testing Engineer",
  expertise: "Software Testing, Quality Assurance & Test Automation",
  bio: "Maiar Mohammed is a dedicated Testing Engineer with expertise in ensuring the quality and reliability of software applications. She specializes in manual and automated testing, identifying bugs, and improving system performance to deliver flawless user experiences. With strong attention to detail and a passion for problem-solving, Maiar plays a key role in maintaining high software standards.",
  experience: "4+ years in software testing and quality assurance",
  education: [
    "BS in Computer Engineering",
    "Quality Assurance & Testing Certification"
  ],
  certifications: [
    "ISTQB Certified Tester",
    "Selenium WebDriver Certification",
    "Agile Testing Certification"
  ],
  projects: [
    "Performed end-to-end testing for 15+ software applications",
    "Implemented automated test scripts to reduce testing time by 30%",
    "Collaborated with developers to improve overall software quality"
  ],
  social: {
    "linkedin": "#",
    "github": "#",
    "twitter": "#"
  }
}
  }


  // Technology details
  const technologyDetails: Record<string, any> = {
    React: {
      name: "React",
      description: "A JavaScript library for building user interfaces with component-based architecture",
      category: "Frontend Framework",
      useCases: ["Single Page Applications", "Progressive Web Apps", "Mobile Apps with React Native"],
      benefits: ["Virtual DOM for performance", "Component reusability", "Large ecosystem"],
    },
    "Next.js": {
      name: "Next.js",
      description: "The React framework for production with server-side rendering and static site generation",
      category: "Full-Stack Framework",
      useCases: ["E-commerce platforms", "Corporate websites", "SaaS applications"],
      benefits: ["SEO optimization", "Performance optimization", "API routes"],
    },
    "Node.js": {
      name: "Node.js",
      description: "JavaScript runtime built on Chrome's V8 engine for server-side development",
      category: "Backend Runtime",
      useCases: ["REST APIs", "Real-time applications", "Microservices"],
      benefits: ["High performance", "Scalable", "Large package ecosystem"],
    },
    Python: {
      name: "Python",
      description: "High-level programming language perfect for AI, data science, and web development",
      category: "Programming Language",
      useCases: ["Machine Learning", "Data Analysis", "Web Development", "Automation"],
      benefits: ["Easy to learn", "Extensive libraries", "Versatile applications"],
    },
    AWS: {
      name: "Amazon Web Services",
      description: "Comprehensive cloud computing platform offering 200+ services",
      category: "Cloud Platform",
      useCases: ["Web hosting", "Data storage", "Machine learning", "IoT"],
      benefits: ["Global infrastructure", "Pay-as-you-go", "Enterprise security"],
    },
    Docker: {
      name: "Docker",
      description: "Platform for developing, shipping, and running applications in containers",
      category: "Containerization",
      useCases: ["Application deployment", "Microservices", "Development environments"],
      benefits: ["Consistent environments", "Resource efficiency", "Easy scaling"],
    },
    "Adobe Creative Suite": {
      name: "Adobe Creative Suite",
      description: "Comprehensive collection of creative software for design, video editing, and digital content creation",
      category: "Creative Software",
      useCases: ["Video Production", "Graphic Design", "Motion Graphics", "Photo Editing"],
      benefits: ["Industry standard tools", "Seamless integration", "Professional quality output"],
    },
    "DaVinci Resolve": {
      name: "DaVinci Resolve",
      description: "Professional video editing and color grading software used in Hollywood productions",
      category: "Video Editing",
      useCases: ["Feature Films", "Commercial Videos", "Documentaries", "Music Videos"],
      benefits: ["Professional color grading", "Advanced editing tools", "Free version available"],
    },
    "Cinema 4D": {
      name: "Cinema 4D",
      description: "Professional 3D modeling, animation, and rendering software for motion graphics and visual effects",
      category: "3D Animation",
      useCases: ["Motion Graphics", "Visual Effects", "Product Visualization", "Broadcast Graphics"],
      benefits: ["User-friendly interface", "Powerful rendering", "Industry integration"],
    },
  }

  // Stat details
  const statDetails: Record<string, StatDetail> = {
    "500+": {
      number: "500+",
      label: "Projects Delivered",
      icon: Target,
      details:
        "Successfully completed 500+ projects across various industries including fintech, healthcare, e-commerce, enterprise solutions, and media production.",
      metrics: ["95% On-time delivery", "98% Client satisfaction", "Zero critical bugs in production"],
      achievements: [
        "Delivered projects in 25+ countries",
        "Worked with Fortune 500 companies",
        "Built solutions serving 50M+ users",
      ],
    },
    "98%": {
      number: "98%",
      label: "Client Satisfaction",
      icon: Award,
      details:
        "Maintained 98% client satisfaction rate with continuous support, timely delivery, and exceptional quality standards.",
      metrics: ["4.9/5 average rating", "95% repeat clients", "24/7 support response"],
      achievements: [
        "Industry-leading satisfaction rate",
        "Long-term partnerships with 80% of clients",
        "Award-winning customer service",
      ],
    },
    "50+": {
      number: "50+",
      label: "Expert Team",
      icon: Users,
      details:
        "Our diverse team of 50+ experts includes senior developers, designers, AI specialists, digital marketing professionals, and media production specialists.",
      metrics: ["15+ years average experience", "20+ certifications per member", "Multilingual support"],
      achievements: [
        "Team members from top tech companies",
        "Published 100+ technical articles",
        "Speakers at major tech conferences",
      ],
    },
    "24/7": {
      number: "24/7",
      label: "Support Available",
      icon: Shield,
      details:
        "Round-the-clock technical support and maintenance services to ensure your digital empire runs smoothly.",
      metrics: ["<2 min response time", "99.9% uptime guarantee", "Global support coverage"],
      achievements: [
        "24/7 monitoring and alerting",
        "Proactive maintenance and updates",
        "Emergency response team available",
      ],
    },
  }

  // Updated testimonial details with your specific clients
  const testimonialDetails: Record<string, TestimonialDetail> = {
    "Beauty Bar": {
      name: "Ahmed Mohamed",
      role: "Owner",
      company: "Beauty Bar",
      content:
        "The new website looks extremely luxurious and helped increase sales significantly. The advanced filtering and elegant product presentation made the customer experience outstanding. Thank you for the professional work.",
      rating: 5,
      image: "", // Remove image reference
      results: ["Increased Sales Significantly", "Luxurious Brand Presentation", "Outstanding Customer Experience"],
      projectType: "Shopify E-commerce for High-End Beauty Brands",
      duration: "12 weeks",
      satisfaction: "Exceeded expectations",
    },
    "CourierX Egypt": {
      name: "Marina Mazhar",
      role: "Operations Manager",
      company: "CourierX Egypt",
      content:
        "We worked with the team on a fully integrated courier platform. Everything was precise: real-time tracking, an easy dashboard, and a smart dispatch system. They truly transformed how we work.",
      rating: 5,
      image: "", // Remove image reference
      results: ["Real-time Tracking System", "Smart Dispatch Integration", "Operational Transformation"],
      projectType: "Integrated Courier Platform Website",
      duration: "20 weeks",
      satisfaction: "Transformational results",
    },
    "Hollywood Clinic": {
      name: "Dr. Sara",
      role: "Medical Director",
      company: "Hollywood Clinic",
      content:
        "The platform built for our clinic made managing appointments and patients much easier. The app is fast, easy to use, and medically compliant. An excellent experience with a professional team.",
      rating: 5,
      image: "", // Remove image reference
      results: ["Streamlined Patient Management", "Medical Compliance Achieved", "Enhanced User Experience"],
      projectType: "Flutter Clinic Management System with Backend",
      duration: "16 weeks",
      satisfaction: "Excellent professional experience",
    },
    "TechCorp Media": {
      name: "Sarah Ahmed",
      role: "Marketing Director",
      company: "TechCorp Media",
      content:
        "The media production team delivered exceptional quality content that perfectly represents our brand. The videos have significantly improved our corporate image and customer engagement across all platforms.",
      rating: 5,
      image: "", // Remove image reference
      results: ["Enhanced Brand Perception", "Increased Social Media Engagement", "Professional Corporate Presentation"],
      projectType: "Corporate Brand Video Campaign",
      duration: "8 weeks",
      satisfaction: "Outstanding quality and creativity",
    },
  }

  // Insight details
  
  // Handle page load
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const element = ref.current
          const offsetTop = element.offsetTop
          const height = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle keyboard events for modals
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isFeedbackModalOpen) {
          closeFeedbackModal()
        } else if (activeModal) {
          closeModal()
        } else if (activePolicy) {
          closePolicy()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFeedbackModalOpen, activeModal, activePolicy])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs[sectionId as keyof typeof sectionRefs]?.current
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  // Handle modal opening
  const openModal = (modalType: string, data?: any) => {
    setActiveModal(modalType)
    setModalData(data)
    document.body.style.overflow = "hidden"
  }

  // Handle modal closing
  const closeModal = () => {
    setActiveModal(null)
    setModalData(null)
    document.body.style.overflow = "unset"
  }

  // Handle feedback modal
  const openFeedbackModal = () => {
    setIsFeedbackModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false)
    setFeedbackData({ name: "", email: "", rating: 0, feedback: "" })
    setFeedbackErrors({})
    document.body.style.overflow = "unset"
  }

  // Handle video modal
  const handleVideoPlay = () => {
    setIsVideoPlaying(true)
    document.body.style.overflow = "hidden"
  }

  const handleCloseVideo = () => {
    setIsVideoPlaying(false)
    document.body.style.overflow = "unset"
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const errors: Partial<ContactFormData> = {}

    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }
    if (!formData.message.trim()) errors.message = "Message is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Send email to info@starsolution.ai
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          to: "info@starsolution.ai",
        }),
      })

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24 hours.",
          duration: 5000,
        })

        setFormData({
          name: "",
          email: "",
          company: "",
          budget: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle feedback form submission
  const handleFeedbackSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate feedback form
    const errors: Record<string, string> = {}
    if (!feedbackData.name.trim()) errors.name = "Name is required"
    if (!feedbackData.email.trim()) errors.email = "Email is required"
    if (!feedbackData.email.includes("@")) errors.email = "Please enter a valid email"
    if (feedbackData.rating === 0) errors.rating = "Please select a rating"
    if (!feedbackData.feedback.trim()) errors.feedback = "Feedback is required"

    setFeedbackErrors(errors)
    if (Object.keys(errors).length > 0) return

    setIsSubmitting(true)

    try {
      // Send feedback email to info@starsolution.ai
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: feedbackData.name,
          email: feedbackData.email,
          message: `Feedback Rating: ${feedbackData.rating}/5 stars\n\nFeedback:\n${feedbackData.feedback}`,
          to: "info@starsolution.ai",
        }),
      })

      if (response.ok) {
        toast({
          title: "Feedback sent successfully!",
          description: "Thank you for your valuable feedback. We appreciate it!",
          duration: 5000,
        })
        // Close modal after a short delay to show the success message
        setTimeout(() => {
          closeFeedbackModal()
        }, 1000)
      } else {
        throw new Error("Failed to send feedback")
      }
    } catch (error) {
      toast({
        title: "Error sending feedback",
        description: "Please try again later.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  const codeAnimationVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-x-hidden relative">
      {/* Toast notifications */}
      <Toaster />


      {/* Enhanced Floating Code Elements with More Animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[
          { icon: Terminal, delay: 0, color: "text-cyan-400/30" },
          { icon: Code2, delay: 0.5, color: "text-purple-400/30" },
          { icon: Monitor, delay: 1, color: "text-pink-400/30" },
          { icon: Database, delay: 1.5, color: "text-blue-400/30" },
          { icon: Cloud, delay: 2, color: "text-green-400/30" },
          { icon: Cpu, delay: 2.5, color: "text-orange-400/30" },
          { icon: Server, delay: 3, color: "text-red-400/30" },
          { icon: GitBranch, delay: 3.5, color: "text-yellow-400/30" },
          { icon: Package, delay: 4, color: "text-indigo-400/30" },
          { icon: Layers, delay: 4.5, color: "text-teal-400/30" },
          { icon: Activity, delay: 5, color: "text-lime-400/30" },
          { icon: BarChart3, delay: 5.5, color: "text-rose-400/30" },
          { icon: Laptop, delay: 6, color: "text-violet-400/30" },
          { icon: Smartphone, delay: 6.5, color: "text-emerald-400/30" },
          { icon: Tablet, delay: 7, color: "text-amber-400/30" },
          { icon: Video, delay: 7.5, color: "text-red-400/30" },
          { icon: Camera, delay: 8, color: "text-pink-400/30" },
          { icon: Mic, delay: 8.5, color: "text-orange-400/30" },
        ].map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.color}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, -30, 0],
              rotate: [0, 360, -180, 0],
              scale: [0.5, 1.2, 0.8, 1],
              opacity: [0.1, 0.6, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            <item.icon className="w-12 h-12" />
          </motion.div>
        ))}
      </div>

      {/* Floating Binary Code Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400/20 font-mono text-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -200],
              opacity: [0, 1, 0],
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <Button
                  onClick={handleCloseVideo}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <h3 className="text-xl font-bold text-white">Star Solutions Demo</h3>
                <div className="w-16" />
              </div>
              <div className="aspect-video bg-slate-800 flex items-center justify-center">
                <div className="text-center p-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Terminal className="w-20 h-20 mx-auto mb-6 text-cyan-400" />
                  </motion.div>
                  <h4 className="text-2xl font-bold mb-4 text-white">Interactive Development Showcase</h4>
                  <p className="text-gray-300 mb-6 text-lg">
                    Watch our development process in action - from concept to deployment
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2 text-cyan-400">Live Coding Sessions:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Real-time development</li>
                        <li>• Code architecture walkthrough</li>
                        <li>• Best practices demonstration</li>
                        <li>• Problem-solving techniques</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2 text-purple-400">Technologies Featured:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• React & Next.js development</li>
                        <li>• Node.js backend creation</li>
                        <li>• Database design & optimization</li>
                        <li>• Cloud deployment strategies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Modal System */}
      <AnimatePresence>
        {activeModal && modalData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-6xl bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden my-8 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/10 bg-gradient-to-r from-cyan-900/20 to-purple-900/20">
                <Button
                  onClick={closeModal}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div className="text-center">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {modalData.title || modalData.name || "Details"}
                  </h2>
                  {modalData.category && (
                    <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 mt-2">
                      {modalData.category}
                    </Badge>
                  )}
                </div>
                <div className="w-16" />
              </div>

              {/* Modal Content */}
              <div className="p-8 max-h-[70vh] overflow-y-auto">
                {/* Service Modal */}
                {activeModal === "service" && (
                  <div>
                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">{modalData.description}</p>

                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold mb-4 flex items-center text-white">
                            <Settings className="w-6 h-6 mr-2 text-cyan-400" />
                            Key Features
                          </h3>
                          <div className="grid gap-3">
                            {modalData.features.map((feature: string, index: number) => (
                              <motion.div
                                key={index}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                onClick={() =>
                                  toast({
                                    title: feature,
                                    description: "Feature details would be shown in a real implementation.",
                                    duration: 3000,
                                  })
                                }
                              >
                                <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                <span className="text-gray-200">{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold mb-4 flex items-center text-white">
                            <Code className="w-6 h-6 mr-2 text-purple-400" />
                            Technologies Used
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {modalData.technologies.map((tech: string, index: number) => (
                              <motion.div
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1, type: "spring" as const }}
                              >
                                <Badge
                                  className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border-purple-500/30 cursor-pointer hover:bg-purple-500/30 transition-colors"
                                  onClick={() =>
                                    openModal(
                                      "technology",
                                      technologyDetails[tech] || {
                                        name: tech,
                                        description: `Learn more about ${tech}`,
                                      },
                                    )
                                  }
                                >
                                  {tech}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold mb-4 flex items-center text-white">
                            <FileText className="w-6 h-6 mr-2 text-pink-400" />
                            Our Process
                          </h3>
                          <div className="space-y-3">
                            {modalData.process.map((step: string, index: number) => (
                              <motion.div
                                key={index}
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                onClick={() =>
                                  toast({
                                    title: `Step ${index + 1}`,
                                    description: step,
                                    duration: 3000,
                                  })
                                }
                              >
                                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                  {index + 1}
                                </div>
                                <span className="text-gray-200">{step}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/5 p-4 rounded-lg cursor-pointer"
                            onClick={() =>
                              toast({
                                title: "Timeline Details",
                                description: "Timeline may vary based on project complexity.",
                                duration: 3000,
                              })
                            }
                          >
                            <div className="flex items-center mb-2">
                              <Clock className="w-5 h-5 text-blue-400 mr-2" />
                              <h4 className="font-semibold text-white">Timeline</h4>
                            </div>
                            <p className="text-2xl font-bold text-blue-400">{modalData.timeline}</p>
                          </motion.div>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold mb-4 flex items-center text-white">
                            <Award className="w-6 h-6 mr-2 text-yellow-400" />
                            Benefits
                          </h3>
                          <div className="grid gap-2">
                            {modalData.benefits.map((benefit: string, index: number) => (
                              <motion.div
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1, type: "spring" as const }}
                                className="flex items-center p-2 bg-white/5 rounded hover:bg-white/10 transition-colors cursor-pointer"
                                onClick={() =>
                                  toast({
                                    title: benefit,
                                    description: "Benefit details would be shown in a real implementation.",
                                    duration: 3000,
                                  })
                                }
                              >
                                <Star className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-200">{benefit}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Button
                        className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
                        onClick={() => {
                          closeModal()
                          scrollToSection("contact")
                        }}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Get Started
                      </Button>
                    </div>
                  </div>
                )}

                {/* Portfolio Modal */}
                {activeModal === "portfolio" && (
                  <div>
                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">{modalData.description}</p>

                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-red-400">The Challenge</h3>
                          <p className="text-gray-300 leading-relaxed">{modalData.challenge}</p>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-green-400">Our Solution</h3>
                          <p className="text-gray-300 leading-relaxed">{modalData.solution}</p>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-blue-400">Technologies Used</h3>
                          <div className="flex flex-wrap gap-2">
                            {modalData.technologies.map((tech: string, index: number) => (
                              <Badge
                                key={index}
                                className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-white border-blue-500/30 cursor-pointer hover:bg-blue-500/30 transition-colors"
                                onClick={() =>
                                  openModal(
                                    "technology",
                                    technologyDetails[tech] || {
                                      name: tech,
                                      description: `Learn more about ${tech}`,
                                    },
                                  )
                                }
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-yellow-400">Results Achieved</h3>
                          <div className="space-y-3">
                            {modalData.results.map((result: string, index: number) => (
                              <motion.div
                                key={index}
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                onClick={() =>
                                  toast({
                                    title: "Result Details",
                                    description: result,
                                    duration: 3000,
                                  })
                                }
                              >
                                <TrendingUp className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                <span className="text-gray-200">{result}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-white/5 p-6 rounded-lg cursor-pointer"
                          onClick={() =>
                            toast({
                              title: "Project Timeline",
                              description: `This project was completed in ${modalData.timeline}.`,
                              duration: 3000,
                            })
                          }
                        >
                          <h3 className="text-xl font-bold mb-3 text-white">Project Timeline</h3>
                          <div className="flex items-center">
                            <Clock className="w-5 h-5 text-cyan-400 mr-2" />
                            <span className="text-2xl font-bold text-cyan-400">{modalData.timeline}</span>
                          </div>
                        </motion.div>

                        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-lg border border-purple-500/20">
                          <h3 className="text-xl font-bold mb-3 text-white">Client Testimonial</h3>
                          <blockquote className="text-gray-300 italic">"{modalData.testimonial}"</blockquote>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Button
                        className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
                        onClick={() => {
                          closeModal()
                          scrollToSection("contact")
                        }}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Start Similar Project
                      </Button>

                    </div>
                  </div>
                )}

                {/* Team Modal */}
                {activeModal === "team" && (
                  <div>
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="flex items-center mb-6">
                          <div className="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mr-6">
                            <Users className="w-10 h-10 text-cyan-400" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-1 text-white">{modalData.name}</h3>
                            <p className="text-cyan-400 text-xl mb-2">{modalData.role}</p>
                            <p className="text-gray-300">{modalData.expertise}</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-white">About</h3>
                          <p className="text-gray-300 leading-relaxed">{modalData.bio}</p>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-white">Experience</h3>
                          <p className="text-gray-300">{modalData.experience}</p>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-white">Education</h3>
                          <div className="space-y-2">
                            {modalData.education.map((edu: string, index: number) => (
                              <motion.div
                                key={index}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center p-2 bg-white/5 rounded hover:bg-white/10 transition-colors cursor-pointer"
                                onClick={() =>
                                  toast({
                                    title: "Education Details",
                                    description: edu,
                                    duration: 3000,
                                  })
                                }
                              >
                                <GraduationCap className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-200">{edu}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-white">Certifications</h3>
                          <div className="space-y-2">
                            {modalData.certifications.map((cert: string, index: number) => (
                              <motion.div
                                key={index}
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center p-2 bg-white/5 rounded hover:bg-white/10 transition-colors cursor-pointer"
                                onClick={() =>
                                  toast({
                                    title: "Certification Details",
                                    description: cert,
                                    duration: 3000,
                                  })
                                }
                              >
                                <Certificate className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-200">{cert}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-white">Key Projects</h3>
                          <div className="space-y-2">
                            {modalData.projects.map((project: string, index: number) => (
                              <motion.div
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1, type: "spring" as const }}
                                className="flex items-center p-2 bg-white/5 rounded hover:bg-white/10 transition-colors cursor-pointer"
                                onClick={() =>
                                  toast({
                                    title: "Project Details",
                                    description: project,
                                    duration: 3000,
                                  })
                                }
                              >
                                <Target className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-200">{project}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}

                {/* Technology Modal */}
                {activeModal === "technology" && (
                  <div>
                    <div className="mb-6">
                      <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30 mb-4">
                        {modalData.category}
                      </Badge>
                      <p className="text-gray-300 text-lg leading-relaxed">{modalData.description}</p>
                    </div>

                    {modalData.useCases && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3 text-white">Use Cases</h3>
                        <div className="grid gap-2">
                          {modalData.useCases.map((useCase: string, index: number) => (
                            <motion.div
                              key={index}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center p-2 bg-white/5 rounded hover:bg-white/10 transition-colors cursor-pointer"
                              onClick={() =>
                                toast({
                                  title: "Use Case Details",
                                  description: useCase,
                                  duration: 3000,
                                })
                              }
                            >
                              <Target className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-200">{useCase}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {modalData.benefits && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3 text-white">Key Benefits</h3>
                        <div className="grid gap-2">
                          {modalData.benefits.map((benefit: string, index: number) => (
                            <motion.div
                              key={index}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1, type: "spring" as const }}
                              className="flex items-center p-2 bg-white/5 rounded hover:bg-white/10 transition-colors cursor-pointer"
                              onClick={() =>
                                toast({
                                  title: "Benefit Details",
                                  description: benefit,
                                  duration: 3000,
                                })
                              }
                            >
                              <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-200">{benefit}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-8">
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                        onClick={() => {
                          closeModal()
                          scrollToSection("contact")
                        }}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Discuss This Technology
                      </Button>
                    </div>
                  </div>
                )}

                {/* Stat Modal */}
                {activeModal === "stat" && (
                  <div>
                    <div className="text-center mb-8">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <modalData.icon className="w-12 h-12 text-cyan-400" />
                      </motion.div>
                      <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                        {modalData.number}
                      </h3>
                      <p className="text-xl text-gray-300">{modalData.label}</p>
                    </div>

                    <p className="text-gray-300 text-lg mb-8 leading-relaxed text-center">{modalData.details}</p>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xl font-bold mb-4 text-white">Key Metrics</h4>
                        <div className="space-y-3">
                          {modalData.metrics.map((metric: string, index: number) => (
                            <motion.div
                              key={index}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                              onClick={() =>
                                toast({
                                  title: "Metric Details",
                                  description: metric,
                                  duration: 3000,
                                })
                              }
                            >
                              <BarChart3 className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                              <span className="text-gray-200">{metric}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold mb-4 text-white">Achievements</h4>
                        <div className="space-y-3">
                          {modalData.achievements.map((achievement: string, index: number) => (
                            <motion.div
                              key={index}
                              initial={{ x: 20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                              onClick={() =>
                                toast({
                                  title: "Achievement Details",
                                  description: achievement,
                                  duration: 3000,
                                })
                              }
                            >
                              <Trophy className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                              <span className="text-gray-200">{achievement}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Testimonial Modal */}
                {activeModal === "testimonial" && (
                  <div>
                    <div className="flex items-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mr-6">
                        <Users className="w-10 h-10 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1 text-white">{modalData.name}</h3>
                        <p className="text-cyan-400 text-lg mb-1">{modalData.role}</p>
                        <p className="text-gray-300">{modalData.company}</p>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-bold mb-4 text-white">Client Testimonial</h4>
                          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-lg border border-purple-500/20">
                            <div className="flex mb-4">
                              {[...Array(modalData.rating)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <blockquote className="text-gray-300 italic text-lg leading-relaxed">
                              "{modalData.content}"
                            </blockquote>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xl font-bold mb-4 text-white">Project Results</h4>
                          <div className="space-y-3">
                            {modalData.results.map((result: string, index: number) => (
                              <motion.div
                                key={index}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                onClick={() =>
                                  toast({
                                    title: "Result Details",
                                    description: result,
                                    duration: 3000,
                                  })
                                }
                              >
                                <TrendingUp className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                <span className="text-gray-200">{result}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/5 p-4 rounded-lg cursor-pointer"
                            onClick={() =>
                              toast({
                                title: "Project Type",
                                description: modalData.projectType,
                                duration: 3000,
                              })
                            }
                          >
                            <div className="flex items-center mb-2">
                              <Briefcase className="w-5 h-5 text-blue-400 mr-2" />
                              <h5 className="font-semibold text-white">Project Type</h5>
                            </div>
                            <p className="text-blue-400 font-medium">{modalData.projectType}</p>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/5 p-4 rounded-lg cursor-pointer"
                            onClick={() =>
                              toast({
                                title: "Project Duration",
                                description: `Project completed in ${modalData.duration}`,
                                duration: 3000,
                              })
                            }
                          >
                            <div className="flex items-center mb-2">
                              <Clock className="w-5 h-5 text-green-400 mr-2" />
                              <h5 className="font-semibold text-white">Duration</h5>
                            </div>
                            <p className="text-green-400 font-medium">{modalData.duration}</p>
                          </motion.div>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-white/5 p-6 rounded-lg cursor-pointer"
                          onClick={() =>
                            toast({
                              title: "Client Satisfaction",
                              description: modalData.satisfaction,
                              duration: 3000,
                            })
                          }
                        >
                          <div className="flex items-center mb-2">
                            <Heart className="w-5 h-5 text-red-400 mr-2" />
                            <h5 className="font-semibold text-white">Client Satisfaction</h5>
                          </div>
                          <p className="text-red-400 font-medium">{modalData.satisfaction}</p>
                        </motion.div>

                        <div>
                          <h4 className="text-xl font-bold mb-4 text-white">Connect with Client</h4>
                          <div className="flex space-x-4">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                                onClick={() =>
                                  toast({
                                    title: "Contact Client",
                                    description: "Client contact would be available in a real implementation.",
                                    duration: 3000,
                                  })
                                }
                              >
                                <Mail className="w-4 h-4 mr-2" />
                                Contact
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                                onClick={() =>
                                  toast({
                                    title: "View Case Study",
                                    description: "Full case study would be shown in a real implementation.",
                                    duration: 3000,
                                  })
                                }
                              >
                                <FileText className="w-4 h-4 mr-2" />
                                Case Study
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Insight Modal */}
                {activeModal === "insight" && (
                  <div>
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                          {modalData.category}
                        </Badge>
                        <div className="text-gray-400 text-sm">{modalData.date}</div>
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="text-gray-300 mr-4">By {modalData.author}</div>
                        <div className="text-gray-400 text-sm">{modalData.readTime}</div>
                      </div>
                      <p className="text-gray-300 text-lg leading-relaxed">{modalData.description}</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <h4 className="text-xl font-bold mb-4 text-white">Article Content</h4>
                        <div className="bg-white/5 p-6 rounded-lg">
                          <p className="text-gray-300 leading-relaxed">{modalData.content}</p>
                        </div>

                        <div className="mt-6">
                          <h4 className="text-xl font-bold mb-4 text-white">Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {modalData.tags.map((tag: string, index: number) => (
                              <motion.div
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1, type: "spring" as const }}
                              >
                                <Badge
                                  className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-white border-blue-500/30 cursor-pointer hover:bg-blue-500/30 transition-colors"
                                  onClick={() =>
                                    toast({
                                      title: `Tag: ${tag}`,
                                      description: "Related articles would be shown in a real implementation.",
                                      duration: 3000,
                                    })
                                  }
                                >
                                  {tag}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold mb-4 text-white">Related Topics</h4>
                        <div className="space-y-3">
                          {modalData.relatedTopics.map((topic: string, index: number) => (
                            <motion.div
                              key={index}
                              initial={{ x: 20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                              onClick={() =>
                                toast({
                                  title: "Related Topic",
                                  description: `Learn more about ${topic}`,
                                  duration: 3000,
                                })
                              }
                            >
                              <div className="flex items-center">
                                <Lightbulb className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                                <span className="text-gray-200 text-sm">{topic}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-6">
                          <h4 className="text-xl font-bold mb-4 text-white">Share Article</h4>
                          <div className="flex space-x-3">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                                onClick={() =>
                                  toast({
                                    title: "Share on LinkedIn",
                                    description: "Article would be shared on LinkedIn in a real implementation.",
                                    duration: 3000,
                                  })
                                }
                              >
                                <Linkedin className="w-4 h-4" />
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                                onClick={() =>
                                  toast({
                                    title: "Share on Twitter",
                                    description: "Article would be shared on Twitter in a real implementation.",
                                    duration: 3000,
                                  })
                                }
                              >
                                <Twitter className="w-4 h-4" />
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                                onClick={() =>
                                  toast({
                                    title: "Bookmark Article",
                                    description: "Article would be bookmarked in a real implementation.",
                                    duration: 3000,
                                  })
                                }
                              >
                                <Bookmark className="w-4 h-4" />
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" as const }}
        className="fixed top-0 w-full z-40 backdrop-blur-xl bg-slate-950/30 border-b border-white/5"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center"
              >
                <Star className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Star Solutions
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {[
                { name: "Home", href: "home" },
                { name: "Services", href: "services" },
                { name: "Solutions", href: "solutions" },
                { name: "Portfolio", href: "portfolio" },
                { name: "Team", href: "team" },
                { name: "Insights", href: "insights" },
                { name: "Contact", href: "contact" },
              ].map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative text-gray-300 hover:text-white transition-all duration-300 ${
                    activeSection === item.href ? "text-cyan-400" : ""
                  }`}
                >
                  {item.name}
                  {activeSection === item.href && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
                    />
                  )}
                </motion.button>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 shadow-lg shadow-purple-500/25"
                  onClick={() => scrollToSection("contact")}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-2 rounded-lg bg-white/5 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden mt-4 pb-4 space-y-4 border-t border-white/10 pt-4"
              >
                {[
                  { name: "Home", href: "home" },
                  { name: "Services", href: "services" },
                  { name: "Solutions", href: "solutions" },
                  { name: "Portfolio", href: "portfolio" },
                  { name: "Team", href: "team" },
                  { name: "Insights", href: "insights" },
                  { name: "Contact", href: "contact" },
                ].map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`block text-left w-full text-gray-300 hover:text-white transition-colors py-2 ${
                      activeSection === item.href ? "text-cyan-400" : ""
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        ref={sectionRefs.home}
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-16"
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/30 to-pink-900/20"
          />

          {/* Animated Geometric Shapes */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"
          />

          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%20fill%3D%22white%22%20fill-opacity%3D%220.04%22/%3E%3C/svg%3E')] opacity-40" />
        </div>

        <motion.div className="relative z-10 text-center px-6 max-w-8xl mx-auto">

          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold mb-6 leading-tight"
          >
            <motion.span
              variants={itemVariants}
              className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent cursor-pointer"
              onClick={() =>
                toast({
                  title: "We Build",
                  description: "We create innovative solutions that transform businesses.",
                  duration: 3000,
                })
              }
            >
              We Build
            </motion.span>
            <motion.span
              variants={itemVariants}
              className="block text-white cursor-pointer"
              onClick={() =>
                toast({
                  title: "Digital",
                  description: "Digital transformation is at the core of everything we do.",
                  duration: 3000,
                })
              }
            >
              Digital
            </motion.span>
            <motion.span
              variants={itemVariants}
              className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer"
              onClick={() =>
                toast({
                  title: "Empire",
                  description: "Building digital empires that dominate markets.",
                  duration: 3000,
                })
              }
            >
              Empire
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed cursor-pointer"
            onClick={() =>
              toast({
                title: "Our Mission",
                description:
                  "Revolutionary software development, digital marketing strategies, and professional media production that transform your business into a digital empire.",
                duration: 5000,
              })
            }
          >
            Revolutionary software development, digital marketing strategies, and professional media production that transform your business into a digital empire
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-base px-8 py-6 rounded-2xl shadow-2xl shadow-purple-500/25 group relative overflow-hidden"
                onClick={() => scrollToSection("contact")}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <Rocket className="mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Launch Your Project
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 text-base px-8 py-6 rounded-2xl backdrop-blur-sm group bg-transparent"
                onClick={handleVideoPlay}
              >
                <Play className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Floating Stats */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {Object.entries(statDetails).map(([key, stat], index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.4 + index * 0.1, type: "spring" as const, stiffness: 200 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer aspect-square md:aspect-auto flex flex-col justify-center"
                onClick={() => openModal("stat", stat)}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                </motion.div>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Services Section */}
      <section ref={sectionRefs.services} id="services" className="py-2 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent" />

        <div className="container mx-auto px-2 relative z-10 max-w-8xl">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer inline-block"
              onClick={() =>
                toast({
                  title: "Our Expertise",
                  description: "We specialize in cutting-edge technology solutions.",
                  duration: 3000,
                })
              }
            >
              <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-500/30 px-6 py-2 text-sm font-medium mb-6">
                <Code className="w-4 h-4 mr-2" />
                Our Expertise
              </Badge>
            </motion.div>
            <motion.h2
              whileHover={{ scale: 1.02 }}
              className="text-5xl md:text-7xl font-bold mb-8 cursor-pointer"
              onClick={() =>
                toast({
                  title: "Premium Services",
                  description: "Comprehensive technology and media solutions designed to accelerate your business growth.",
                  duration: 3000,
                })
              }
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Premium Services
              </span>
            </motion.h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Comprehensive technology and media solutions designed to accelerate your business growth and establish market
              dominance
            </p>
          </motion.div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-gray-400 text-sm flex items-center justify-center">
              <ArrowRight className="w-4 h-4 mr-2 animate-pulse" />
              Scroll to explore all services
              <ArrowLeft className="w-4 h-4 ml-2 animate-pulse" />
            </p>
          </motion.div>

          <div className="relative">
            <button
              aria-label="Previous"
              onClick={() => scrollHorizontally(servicesScrollRef, "left")}
              className="flex items-center justify-center absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/30 bg-black/50 hover:bg-black/70 z-10"
            >
              <span className="sr-only">Previous</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-white"><path fillRule="evenodd" d="M15.78 3.72a.75.75 0 010 1.06L9.56 11l6.22 6.22a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 011.06 0z" clipRule="evenodd" /></svg>
            </button>
            <div ref={servicesScrollRef} className="flex gap-6 overflow-x-hidden pb-4 snap-x snap-mandatory">
            {[
              {
                icon: Code,
                title: "Software Development",
                description:
                  "Custom enterprise applications built with cutting-edge technologies, scalable architecture, and future-proof design principles",
                features: [
                  "Full-Stack Development",
                  "Cloud-Native Solutions",
                  "API Integration",
                  "Mobile Applications",
                  "DevOps & CI/CD",
                  "Microservices Architecture",
                ],
                color: "from-cyan-500 to-blue-600",
                bgColor: "from-cyan-500/10 to-blue-600/10",
              },
              {
                icon: TrendingUp,
                title: "Digital Marketing",
                description:
                  "Data-driven marketing strategies that amplify your brand presence and drive measurable ROI through innovative campaigns",
                features: [
                  "SEO & SEM",
                  "Social Media Strategy",
                  "Content Marketing",
                  "Marketing Automation",
                  "Analytics & Insights",
                  "Brand Development",
                ],
                color: "from-purple-500 to-pink-600",
                bgColor: "from-purple-500/10 to-pink-600/10",
              },
              {
                icon: Brain,
                title: "AI & Machine Learning",
                description:
                  "Intelligent solutions powered by artificial intelligence and machine learning to automate processes and unlock insights",
                features: [
                  "Predictive Analytics",
                  "Natural Language Processing",
                  "Computer Vision",
                  "Recommendation Systems",
                  "Process Automation",
                  "Data Science",
                ],
                color: "from-pink-500 to-orange-600",
                bgColor: "from-pink-500/10 to-orange-600/10",
              },
              {
                icon: Monitor,
                title: "Media Production",
                description:
                  "Professional video, audio, and visual content production that captivates audiences and elevates your brand presence",
                features: [
                  "Video Production & Editing",
                  "Audio Recording & Mixing",
                  "Photography & Visual Design",
                  "Motion Graphics & Animation",
                  "Live Streaming & Broadcasting",
                  "Podcast Production",
                ],
                color: "from-orange-500 to-red-600",
                bgColor: "from-orange-500/10 to-red-600/10",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative cursor-pointer w-96 snap-start flex-shrink-0"
                onClick={() => {
                  const serviceData = serviceDetails[service.title];
                  if (serviceData) {
                    openModal("service", serviceData);
                  } else {
                    // Fallback: create service data from the display array
                    const fallbackServiceData = {
                      title: service.title,
                      description: service.description,
                      features: service.features,
                      technologies: [],
                      process: [],
                      timeline: "Contact us for timeline",
                      benefits: []
                    };
                    openModal("service", fallbackServiceData);
                  }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl blur-sm group-hover:blur-md transition-all duration-500" />
                <Card className="relative bg-black/80 border border-white/30 transition-all duration-500 h-full rounded-3xl overflow-hidden">
                  <CardContent className="p-6 relative z-10">
                    <div className="mb-4">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`w-20 h-20 bg-gradient-to-r ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden cursor-pointer`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toast({
                            title: service.title,
                            description: "Click to learn more about this service.",
                            duration: 3000,
                          })
                        }}
                      >
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                        />
                        <service.icon className="w-10 h-10 text-white relative z-10" />
                      </motion.div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-cyan-300 transition-colors duration-300 text-white drop-shadow-lg">
                        {service.title}
                      </h3>
                      <p className="text-white mb-6 leading-relaxed text-base drop-shadow-lg">{service.description}</p>

                    </div>

                    <div className="space-y-2">
                      {service.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + i * 0.1 }}
                          whileHover={{ x: 5 }}
                          className="flex items-center text-white group-hover:text-cyan-300 transition-colors duration-300 cursor-pointer drop-shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation()
                            toast({
                              title: feature,
                              description: "Feature details would be shown in a real implementation.",
                              duration: 3000,
                            })
                          }}
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                            className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-4 flex-shrink-0`}
                          />
                          {feature}
                        </motion.div>
                      ))}
            </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4">
                      <Button
                          variant="outline"
                          className="w-full border-white/30 text-white hover:bg-white/20 bg-white/5 group/btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            const serviceData = serviceDetails[service.title];
                            if (serviceData) {
                              openModal("service", serviceData);
                            } else {
                              // Fallback: create service data from the display array
                              const fallbackServiceData = {
                                title: service.title,
                                description: service.description,
                                features: service.features,
                                technologies: [],
                                process: [],
                                timeline: "Contact us for timeline",
                                benefits: []
                              };
                              openModal("service", fallbackServiceData);
                            }
                          }}
                        >
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            </div>
            <button
              aria-label="Next"
              onClick={() => scrollHorizontally(servicesScrollRef, "right")}
              className="flex items-center justify-center absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/30 bg-black/50 hover:bg-black/70 z-10"
            >
              <span className="sr-only">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-white"><path fillRule="evenodd" d="M8.22 20.28a.75.75 0 010-1.06L14.44 13 8.22 6.78a.75.75 0 111.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 01-1.06 0z" clipRule="evenodd" /></svg>
            </button>
        </div>
        </div>
      </section>

      {/* Enhanced Solutions Section */}
      <section ref={sectionRefs.solutions} id="solutions" className="py-2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-cyan-900/10" />

        <div className="container mx-auto px-2 relative z-10 max-w-8xl">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2
              whileHover={{ scale: 1.02 }}
              className="text-5xl md:text-6xl font-bold mb-8 cursor-pointer"
              onClick={() =>
                toast({
                  title: "Technology Stack",
                  description: "Cutting-edge technologies and frameworks we use to build exceptional solutions.",
                  duration: 3000,
                })
              }
            >
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Technology Stack
              </span>
            </motion.h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge technologies and frameworks we use to build exceptional solutions
            </p>
          </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "React", icon: "⚛️", color: "from-blue-500 to-cyan-500" },
              { name: "Next.js", icon: "▲", color: "from-gray-700 to-gray-900" },
              { name: "TypeScript", icon: "📘", color: "from-blue-600 to-blue-800" },
              { name: "Node.js", icon: "🟢", color: "from-green-500 to-green-700" },
              { name: "Python", icon: "🐍", color: "from-yellow-500 to-blue-600" },
              { name: "AWS", icon: "☁️", color: "from-orange-500 to-yellow-500" },
              { name: "Docker", icon: "🐳", color: "from-blue-400 to-blue-600" },
              { name: "Kubernetes", icon: "⚙️", color: "from-blue-600 to-purple-600" },
              { name: "MongoDB", icon: "🍃", color: "from-green-600 to-green-800" },
              { name: "PostgreSQL", icon: "🐘", color: "from-blue-700 to-blue-900" },
              { name: "Redis", icon: "🔴", color: "from-red-500 to-red-700" },
              { name: "GraphQL", icon: "◉", color: "from-pink-500 to-purple-600" },
              { name: "Adobe", icon: "🎨", color: "from-purple-500 to-pink-600" },
              { name: "DaVinci", icon: "🎬", color: "from-orange-500 to-red-600" },
              { name: "Cinema 4D", icon: "🎭", color: "from-blue-500 to-purple-600" },
              { name: "Pro Tools", icon: "🎵", color: "from-green-500 to-blue-600" },
            ].slice(0, showAllTechnologies ? 16 : 4).map((tech, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" as const, stiffness: 200 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 text-center group cursor-pointer"
                onClick={() =>
                  openModal(
                    "technology",
                    technologyDetails[tech.name] || { name: tech.name, description: `Learn more about ${tech.name}` },
                  )
                }
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                  className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300"
                >
                  {tech.icon}
                </motion.div>
                <div className="text-gray-200 font-medium">{tech.name}</div>
                <motion.div
                  className={`h-1 bg-gradient-to-r ${tech.color} rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Button
              onClick={() => setShowAllTechnologies(!showAllTechnologies)}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
            >
              {showAllTechnologies ? "Read Less" : "Read More"}
              <ArrowRight className={`ml-2 w-4 h-4 transition-transform duration-300 ${showAllTechnologies ? 'rotate-180' : ''}`} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Portfolio Section */}
      <section ref={sectionRefs.portfolio} id="portfolio" className="py-2 relative">
        <div className="container mx-auto px-2 max-w-8xl">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer inline-block"
              onClick={() =>
                toast({
                  title: "Our Work",
                  description: "Showcasing transformative projects that have revolutionized businesses.",
                  duration: 3000,
                })
              }
            >
              <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 px-6 py-2 text-sm font-medium mb-6">
                <Award className="w-4 h-4 mr-2" />
                Our Work
              </Badge>
            </motion.div>
            <motion.h2
              whileHover={{ scale: 1.02 }}
              className="text-5xl md:text-6xl font-bold mb-8 cursor-pointer"
              onClick={() =>
                toast({
                  title: "Success Stories",
                  description: "Transformative projects that have revolutionized businesses across industries including technology, healthcare, e-commerce, and media production.",
                  duration: 3000,
                })
              }
            >
                              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Success Stories
                </span>
            </motion.h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Showcasing transformative projects that have revolutionized businesses across industries including technology, healthcare, e-commerce, and media production
            </p>
          </motion.div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-gray-400 text-sm flex items-center justify-center">
              <ArrowRight className="w-4 h-4 mr-2 animate-pulse" />
              Scroll to explore all success stories
              <ArrowLeft className="w-4 h-4 ml-2 animate-pulse" />
            </p>
          </motion.div>

          {/* Project Categories Overview */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  category: "Technology",
                  icon: Code,
                  count: "20+",
                  color: "from-cyan-500 to-blue-600",
                  description: "Software & Web Apps"
                },
                {
                  category: "Healthcare",
                  icon: Shield,
                  count: "15+",
                  color: "from-green-500 to-emerald-600",
                  description: "Medical Systems"
                },
                {
                  category: "E-commerce",
                  icon: ShoppingBag,
                  count: "25+",
                  color: "from-purple-500 to-pink-600",
                  description: "Online Stores"
                },
                {
                  category: "Media Production",
                  icon: Video,
                  count: "30+",
                  color: "from-orange-500 to-red-600",
                  description: "Video & Content"
                }
              ].map((cat, index) => (
                <motion.div
                  key={cat.category}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" as const }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-6 rounded-2xl bg-black/80 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                  onClick={() => toast({
                    title: cat.category,
                    description: `${cat.count} projects completed in ${cat.description}`,
                    duration: 3000,
                  })}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${cat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <cat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                    {cat.count}
                  </div>
                  <div className="text-white font-semibold mb-1">{cat.category}</div>
                  <div className="text-gray-300 text-sm">{cat.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <button
              aria-label="Previous"
              onClick={() => scrollHorizontally(portfolioScrollRef, "left")}
              className="flex items-center justify-center absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/30 bg-black/50 hover:bg-black/70 z-10"
            >
              <span className="sr-only">Previous</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-white"><path fillRule="evenodd" d="M15.78 3.72a.75.75 0 010 1.06L9.56 11l6.22 6.22a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 011.06 0z" clipRule="evenodd" /></svg>
            </button>
            <div ref={portfolioScrollRef} className="flex gap-6 overflow-x-hidden pb-4 snap-x snap-mandatory">
              {Object.entries(portfolioDetails).map(([key, project], index) => (
                <motion.div
                  key={key}
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="group relative cursor-pointer w-96 snap-start flex-shrink-0"
                  onClick={() => openModal("portfolio", project)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <Card className="relative bg-black/80 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden rounded-3xl">
                    <div className="relative overflow-hidden">
                      <div className={`w-full h-64 bg-gradient-to-br ${
                        project.category === "Healthcare Technology" ? "from-blue-500/20 to-cyan-500/20" :
                        project.category === "E-commerce Platform" ? "from-purple-500/20 to-pink-500/20" :
                        project.category === "Logistics Technology" ? "from-green-500/20 to-emerald-500/20" :
                        project.category === "Financial Technology" ? "from-yellow-500/20 to-orange-500/20" :
                        project.category === "Educational Technology" ? "from-indigo-500/20 to-purple-500/20" :
                        project.category === "Media Production" ? "from-orange-500/20 to-red-500/20" :
                        "from-cyan-500/20 to-blue-500/20"
                      } rounded-t-3xl flex items-center justify-center`}>
                        <Code className="w-16 h-16 text-white/80" />
                      </div>
                      <div className="absolute top-6 left-6">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            toast({
                              title: project.category,
                              description: "Category details would be shown in a real implementation.",
                              duration: 3000,
                            })
                          }}
                        >
                          <Badge className={`bg-gradient-to-r ${
                            project.category === "Healthcare Technology" ? "from-pink-500 to-purple-500" :
                            project.category === "E-commerce Platform" ? "from-purple-500 to-pink-500" :
                            project.category === "Logistics Technology" ? "from-orange-500 to-red-500" :
                            project.category === "Financial Technology" ? "from-yellow-500 to-orange-500" :
                            project.category === "Educational Technology" ? "from-indigo-500 to-purple-500" :
                            project.category === "Media Production" ? "from-orange-500 to-red-500" :
                            "from-cyan-500 to-purple-500"
                          } text-white border-0`}>
                            {project.category}
                          </Badge>
                        </motion.div>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ scale: 1.1 }}
                              onClick={(e) => {
                                e.stopPropagation()
                                openModal(
                                  "technology",
                                  technologyDetails[tech] || {
                                    name: tech,
                                    description: `Learn more about ${tech}`,
                                  },
                                )
                              }}
                            >
                              <Badge
                                variant="outline"
                                className="border-white/30 text-white bg-black/30 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-300 transition-colors duration-300 text-white">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {project.results.slice(0, 3).map((metric, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="text-center p-3 rounded-xl bg-white/5 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              toast({
                                title: "Result Details",
                                description: metric,
                                duration: 3000,
                              })
                            }}
                          >
                            <div className={`text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}>
                              {metric.split(" ")[0]}
                            </div>
                            <div className="text-xs text-gray-400">{metric.split(" ").slice(1).join(" ")}</div>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent group/btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            openModal("portfolio", project)
                          }}
                        >
                          View Case Study
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <button
              aria-label="Next"
              onClick={() => scrollHorizontally(portfolioScrollRef, "right")}
              className="flex items-center justify-center absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/30 bg-black/50 hover:bg-black/70 z-10"
            >
              <span className="sr-only">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-white"><path fillRule="evenodd" d="M8.22 20.28a.75.75 0 010-1.06L14.44 13 8.22 6.78a.75.75 0 111.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 01-1.06 0z" clipRule="evenodd" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section ref={sectionRefs.team} id="team" className="py-2 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

        <div className="container mx-auto px-2 relative z-10 max-w-8xl">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2
              whileHover={{ scale: 1.02 }}
              className="text-5xl md:text-6xl font-bold mb-8 cursor-pointer"
              onClick={() =>
                toast({
                  title: "Expert Team",
                  description: "Meet the visionaries and technical experts driving innovation at Star Solutions.",
                  duration: 3000,
                })
              }
            >
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Expert Team
              </span>
            </motion.h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet the visionaries and technical experts driving innovation at Star Solutions
            </p>
          </motion.div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-gray-400 text-sm flex items-center justify-center">
              <ArrowRight className="w-4 h-4 mr-2 animate-pulse" />
              Scroll to meet all team members
              <ArrowLeft className="w-4 h-4 ml-2 animate-pulse" />
            </p>
          </motion.div>

          <div className="relative">
            <button
              aria-label="Previous"
              onClick={() => scrollHorizontally(teamScrollRef, "left")}
              className="flex items-center justify-center absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/30 bg-black/50 hover:bg-black/70 z-10"
            >
              <span className="sr-only">Previous</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-white"><path fillRule="evenodd" d="M15.78 3.72a.75.75 0 010 1.06L9.56 11l6.22 6.22a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 011.06 0z" clipRule="evenodd" /></svg>
            </button>
            <div ref={teamScrollRef} className="flex gap-8 overflow-x-hidden pb-6">
            {Object.entries(teamDetails).map(([key, member], index) => (
              <motion.div
                key={key}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer flex-shrink-0 w-80"
                onClick={() => openModal("team", member)}
              >
                  <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden rounded-3xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{member.name}</h3>
                    <p className="text-cyan-400 mb-2 text-base">{member.role}</p>
                    <p className="text-gray-300 text-sm mb-4">{member.expertise}</p>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
            </div>
            <button
              aria-label="Next"
              onClick={() => scrollHorizontally(teamScrollRef, "right")}
              className="flex items-center justify-center absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/30 bg-black/50 hover:bg-black/70 z-10"
            >
              <span className="sr-only">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-white"><path fillRule="evenodd" d="M8.22 20.28a.75.75 0 010-1.06L14.44 13 8.22 6.78a.75.75 0 111.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 01-1.06 0z" clipRule="evenodd" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Insights Section */}
      <section ref={sectionRefs.insights} id="insights" className="py-2 relative">
        <div className="container mx-auto px-2 max-w-8xl">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2
              whileHover={{ scale: 1.02 }}
              className="text-5xl md:text-6xl font-bold mb-8 cursor-pointer"
 
            >
             
            </motion.h2>
           
          </motion.div>



          {/* Enhanced Testimonials Section */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <div className="text-center mb-12">
              <motion.h3
                whileHover={{ scale: 1.02 }}
                className="text-4xl md:text-5xl font-bold mb-6 cursor-pointer"
                onClick={() =>
                  toast({
                    title: "Client Success Stories",
                    description: "Real testimonials from our satisfied clients across different industries.",
                    duration: 3000,
                  })
                }
              >
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Client Success Stories
                </span>
              </motion.h3>
              <p className="text-xl text-gray-300 mb-8">Real testimonials from our satisfied clients</p>
              
              {/* Add Feedback Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold"
                  onClick={openFeedbackModal}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Share Your Feedback
                </Button>
              </motion.div>
            </div>

            <div className="relative">
              <button
                aria-label="Previous"
                onClick={() => scrollHorizontally(testimonialsScrollRef, "left")}
                className="flex items-center justify-center absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/30 bg-black/50 hover:bg-black/70 z-10"
              >
                <span className="sr-only">Previous</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-white"><path fillRule="evenodd" d="M15.78 3.72a.75.75 0 010 1.06L9.56 11l6.22 6.22a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 011.06 0z" clipRule="evenodd" /></svg>
              </button>
              <div ref={testimonialsScrollRef} className="flex gap-6 overflow-x-hidden pb-4 snap-x snap-mandatory">
              {Object.entries(testimonialDetails).map(([key, testimonial], index) => (
                <motion.div
                  key={key}
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group cursor-pointer w-96 snap-start flex-shrink-0"
                  onClick={() => openModal("testimonial", testimonial)}
                >
                  <Card className="bg-black/80 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 rounded-3xl p-8 overflow-hidden">
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + i * 0.1, type: "spring" as const }}
                        >
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        </motion.div>
                      ))}
                    </div>

                    <blockquote className="text-gray-300 mb-6 text-lg leading-relaxed italic">
                      "{testimonial.content}"
                    </blockquote>

                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mr-4">
                        <Users className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white text-base">{testimonial.name}</div>
                        <div className="text-cyan-400 text-sm">{testimonial.role}</div>
                        <div className="text-gray-400 text-sm">{testimonial.company}</div>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="mt-4 p-3 bg-white/5 rounded-lg cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        toast({
                          title: "Project Type",
                          description: testimonial.projectType,
                          duration: 3000,
                        })
                      }}
                    >
                      <div className="text-xs text-gray-400 mb-1">Project Type</div>
                      <div className="text-purple-400 font-medium text-sm">{testimonial.projectType}</div>
                    </motion.div>
                  </Card>
                </motion.div>
              ))}
              </div>
              <button
                aria-label="Next"
                onClick={() => scrollHorizontally(testimonialsScrollRef, "right")}
                className="flex items-center justify-center absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/30 bg-black/50 hover:bg-black/70 z-10"
              >
                <span className="sr-only">Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-white"><path fillRule="evenodd" d="M8.22 20.28a.75.75 0 010-1.06L14.44 13 8.22 6.78a.75.75 0 111.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 01-1.06 0z" clipRule="evenodd" /></svg>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section ref={sectionRefs.contact} id="contact" className="py-2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-pink-900/10" />

        <div className="container mx-auto px-2 relative z-10 max-w-8xl">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2
              whileHover={{ scale: 1.02 }}
              className="text-5xl md:text-6xl font-bold mb-8 cursor-pointer"
              onClick={() =>
                toast({
                  title: "Let's Build Together",
                  description: "Ready to transform your business with cutting-edge technology solutions?",
                  duration: 3000,
                })
              }
            >
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Let's Build Together
              </span>
            </motion.h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your business with cutting-edge technology solutions? Let's discuss your project and
              create something extraordinary.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold mb-8 text-white">Get in Touch</h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      title: "Email Us",
                      content: "info@starsolution.ai",
                      description: "Send us your project details",
                    },
                    {
                      icon: Phone,
                      title: "Call Us",
                      content: "+1 (555) 123-4567",
                      description: "Speak with our experts",
                    },

                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-start p-6 rounded-2xl bg-black/80 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                      onClick={() =>
                        toast({
                          title: contact.title,
                          description: contact.content,
                          duration: 3000,
                        })
                      }
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0"
                      >
                        <contact.icon className="w-6 h-6 text-cyan-400" />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{contact.title}</h4>
                        <p className="text-cyan-400 mb-1">{contact.content}</p>
                        <p className="text-gray-400 text-sm">{contact.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-4 text-white">Why Choose Star Solutions?</h4>
                <div className="space-y-3">
                  {[
                    "24/7 Technical Support",
                    "Agile Development Process",
                    "Transparent Communication",
                    "Cutting-edge Technologies",
                    "Proven Track Record",
  
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center text-gray-300 cursor-pointer"
                      onClick={() =>
                        toast({
                          title: benefit,
                          description: "Benefit details would be shown in a real implementation.",
                          duration: 3000,
                        })
                      }
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                        className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mr-3 flex-shrink-0"
                      />
                      {benefit}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
              <Card className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-8 text-white">Start Your Project</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                          placeholder=""
                        />
                        {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                          placeholder=""
                        />
                        {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                          Company Name
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                          Project Budget
                        </label>
                        <motion.select
                          whileFocus={{ scale: 1.02 }}
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                        >
                          <option value="" className="bg-slate-800">
                            Select Budget Range
                          </option>
                          <option value="5k-15k" className="bg-slate-800">
                            $5K - $15K
                          </option>
                          <option value="15k-50k" className="bg-slate-800">
                            $15K - $50K
                          </option>
                          <option value="50k-100k" className="bg-slate-800">
                            $50K - $100K
                          </option>
                          <option value="100k+" className="bg-slate-800">
                            $100K+
                          </option>
                        </motion.select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Project Details *
                      </label>
                      <motion.textarea
                        whileFocus={{ scale: 1.02 }}
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 resize-none"
                        placeholder=""
                      />
                      {formErrors.message && <p className="text-red-400 text-sm mt-1">{formErrors.message}</p>}
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-lg py-6 rounded-xl shadow-lg shadow-purple-500/25 group relative overflow-hidden"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                          />
                        ) : (
                          <Rocket className="mr-3 group-hover:rotate-12 transition-transform duration-300" />
                        )}
                        {isSubmitting ? "Sending..." : "Send Message"}
                        {!isSubmitting && (
                          <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-8 border-t border-white/10 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />

        <div className="container mx-auto px-2 relative z-10 max-w-8xl">
          <div className="grid lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 mb-6 cursor-pointer"
                onClick={() =>
                  toast({
                    title: "Star Solutions",
                    description: "Building digital empires through innovative technology solutions.",
                    duration: 3000,
                  })
                }
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center"
                >
                  <Star className="w-7 h-7 text-white" />
                </motion.div>
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Star Solutions
                </span>
              </motion.div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
                Transforming businesses through innovative software development, digital marketing, and AI solutions.
                Building the future, one project at a time.
              </p>
              <div className="flex space-x-6">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Instagram, label: "Instagram" },
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all duration-300"
                    onClick={() =>
                      toast({
                        title: `Follow us on ${social.label}`,
                        description: `${social.label} profile would open in a real implementation.`,
                        duration: 3000,
                      })
                    }
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleSection('services')}
                className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl p-4 mb-4 flex items-center justify-between text-white font-bold text-lg hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300"
              >
                <span>SERVICES</span>
                <motion.div
                  animate={{ rotate: expandedSections.services ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {expandedSections.services && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 pl-4">
                      {[
                        { name: "Software Development", action: "Custom software solutions", section: "services" },
                        { name: "Digital Marketing", action: "Growth marketing strategies", section: "services" },
                        { name: "AI & Machine Learning", action: "Intelligent automation", section: "services" },
                        { name: "Cloud Solutions", action: "Scalable cloud infrastructure", section: "services" },
                        { name: "DevOps", action: "Streamlined development processes", section: "services" },
                      ].map((service, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ x: 5, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-left cursor-pointer group"
                          onClick={() => {
                            if (service.section === "services") {
                              scrollToSection("services");
                            } else {
                              toast({
                                title: service.name,
                                description: service.action,
                                duration: 3000,
                              });
                            }
                          }}
                        >
                          <ArrowRight className="w-4 h-4 mr-3 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" />
                          <span className="group-hover:text-cyan-400 transition-colors duration-300">
                            {service.name}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleSection('company')}
                className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl p-4 mb-4 flex items-center justify-between text-white font-bold text-lg hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300"
              >
                <span>COMPANY</span>
                <motion.div
                  animate={{ rotate: expandedSections.company ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {expandedSections.company && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 pl-4">
                      {[
                        { name: "About Us", action: "Learn about our mission and values", section: "about" },
                        { name: "Our Team", action: "Meet our expert professionals", section: "team" },
                        { name: "Careers", action: "Join our growing team", section: "careers" },
                        { name: "Contact", action: "Get in touch with us", section: "contact" },
                        { name: "Blog", action: "Read our latest insights", section: "blog" }
                      ].map((item, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ x: 5, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-left cursor-pointer group"
                          onClick={() => {
                            if (item.section === "contact") {
                              scrollToSection("contact");
                            } else if (item.section === "team") {
                              scrollToSection("team");
                            } else {
                              toast({
                                title: item.name,
                                description: item.action,
                                duration: 3000,
                              });
                            }
                          }}
                        >
                          <ArrowRight className="w-4 h-4 mr-3 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" />
                          <span className="group-hover:text-cyan-400 transition-colors duration-300">
                            {item.name}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2024 Star Solutions. All rights reserved. Built with passion and cutting-edge technology.
              </p>
              <div className="flex space-x-6">
                {[
                  { name: "Privacy Policy", policy: "privacy" },
                  { name: "Terms of Service", policy: "terms" },
                  { name: "Cookie Policy", policy: "cookies" }
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm cursor-pointer group"
                    onClick={() => openPolicy(item.policy)}
                  >
                    <span className="group-hover:text-cyan-400 transition-colors duration-300">
                      {item.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Policy Modals */}
      {activePolicy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={closePolicy}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative w-full max-w-4xl bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden my-8 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">
                {activePolicy === 'privacy' && 'Privacy Policy'}
                {activePolicy === 'terms' && 'Terms of Service'}
                {activePolicy === 'cookies' && 'Cookie Policy'}
              </h2>
              <button
                onClick={closePolicy}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {activePolicy === 'privacy' && (
                <div className="space-y-4 text-gray-300">
                  <p className="text-lg font-semibold text-white mb-4">Information We Collect</p>
                  <p>
                    At Star Solutions, we collect information you provide directly to us, such as when you create an account, 
                    request our services, or contact us for support. This includes your name, email address, company information, 
                    project requirements, and any other information you choose to provide.
                  </p>
                  <p>
                    We also automatically collect certain information about your use of our website, including your IP address, 
                    browser type, operating system, access times, and the pages you have viewed directly before and after accessing our website.
                  </p>
                  
                  <p className="text-lg font-semibold text-white mb-4 mt-6">How We Use Your Information</p>
                  <p>
                    We use the information we collect to provide, maintain, and improve our services, including website development, 
                    digital marketing, content creation, and other digital solutions. We may use your information to communicate with you 
                    about our services, send you technical notices and support messages, and respond to your comments and questions.
                  </p>
                  
                  <p className="text-lg font-semibold text-white mb-4 mt-6">Information Sharing</p>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                    except as described in this policy. We may share your information with trusted third parties who assist us in 
                    operating our website, conducting our business, or servicing you, as long as those parties agree to keep this 
                    information confidential.
                  </p>
                  
                  <p className="text-lg font-semibold text-white mb-4 mt-6">Data Security</p>
                  <p>
                    We implement appropriate security measures to protect your personal information against unauthorized access, 
                    alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic 
                    storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                  
                  <p className="text-lg font-semibold text-white mb-4 mt-6">Can the Privacy Policy Change?</p>
                  <p>
                    We may occasionally make changes to this privacy policy, for example to comply with new requirements imposed by applicable laws or technical requirements. We will post the updated privacy policy on our website. We therefore encourage you to review this page every so often.
                  </p>
                  <p>
                    We may also notify you in case of material changes and, where required by applicable law, we will seek your consent to those changes.
                  </p>
                  <p>
                    If we wish to process your personal information for a new purpose not described in this privacy policy, where necessary we will inform you and where required we will seek your consent.
                  </p>
                  <p className="mt-4">
                    <strong>Want to know more? You may be interested in the following sections of our Privacy Policy:</strong>
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>What is covered by this privacy policy?</li>
                    <li>Who collects & uses your personal information?</li>
                    <li>What are your rights regarding your personal information?</li>
                  </ul>
                </div>
              )}

              {activePolicy === 'terms' && (
                <div className="space-y-4 text-gray-300">
                  <p className="text-lg font-semibold text-white mb-4">Service Description</p>
                  <p>
                    Star Solutions provides comprehensive digital services including but not limited to website development 
                    (frontend and backend), digital marketing strategies, content creation, brand development, and other 
                    technology-related services. Our services are tailored to meet the specific needs of businesses seeking 
                    to establish or enhance their digital presence.
                  </p>
                  
                  <p className="text-lg font-semibold text-white mb-4 mt-6">Service Agreement</p>
                  <p>
                    By engaging our services, you agree to provide accurate and complete information necessary for project 
                    execution. You are responsible for ensuring that all content, materials, and information provided to us 
                    do not infringe upon any third-party rights and comply with applicable laws and regulations.
                  </p>
                  
                  <p className="text-lg font-semibold text-white mb-4 mt-6">Payment Terms</p>
                  <p>
                    Payment terms will be specified in individual project agreements. Generally, we require a deposit 
                    before commencing work, with remaining payments due upon project milestones or completion. All prices 
                    are subject to change with 30 days' notice for ongoing services.
                  </p>
                  
                  <p className="text-lg font-semibold text-white mb-4 mt-6">Intellectual Property</p>
                  <p>
                    Upon full payment, you will own all rights to the custom work we create for you. We retain the right 
                    to use general knowledge, skills, and techniques developed during the course of providing services. 
                    Any pre-existing intellectual property remains with its respective owners.
                  </p>
                  
                  <p className="text-lg font-semibold text-white mb-4 mt-6">Limitation of Liability</p>
                  <p>
                    Our liability for any claims arising from our services is limited to the amount paid for the specific 
                    service in question. We are not liable for any indirect, incidental, special, or consequential damages 
                    arising from the use of our services.
                  </p>
                  
                  <p className="text-lg font-semibold text-white mb-4 mt-6">Termination</p>
                  <p>
                    Either party may terminate services with 30 days' written notice. Upon termination, you will be 
                    responsible for payment of all work completed up to the termination date. We will provide you with 
                    all work product and materials created for your project.
                  </p>
                </div>
              )}

              {activePolicy === 'cookies' && (
                <div className="space-y-4 text-gray-300">
                  <p className="text-lg font-semibold text-white mb-4">What Are Cookies</p>
                  <p>
                    Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
                    They help us provide you with a better experience by remembering your preferences and enabling certain 
                    functionality. We use both session cookies (which expire when you close your browser) and persistent 
                    cookies (which remain on your device for a set period).
                  </p>
                  
                  <p className="text-lg font-semibold text-white mb-4 mt-6">Types of Cookies We Use</p>
                  <p>
                    <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. 
                    They enable basic functions like page navigation, access to secure areas, and form submissions. 
                    The website cannot function properly without these cookies.
                  </p>
                  <p>
                    <strong>Analytics Cookies:</strong> We use these cookies to understand how visitors interact with our 
                    website by collecting and reporting information anonymously. This helps us improve our website's 
                    performance and user experience.
                  </p>
                  <p>
                    <strong>Marketing Cookies:</strong> These cookies are used to track visitors across websites to display 
                    relevant and engaging advertisements. They help us measure the effectiveness of our marketing campaigns.
                  </p>
                  
                  <p className="text-lg font-semibold text-white mb-4 mt-6">Managing Cookies</p>
                  <p>
                    You can control and manage cookies through your browser settings. Most browsers allow you to refuse 
                    cookies or delete them. However, disabling certain cookies may affect the functionality of our website 
                    and your ability to access certain features.
                  </p>
                  
                  <p className="text-lg font-semibold text-white mb-4 mt-6">Third-Party Cookies</p>
                  <p>
                    We may use third-party services that set their own cookies, such as Google Analytics, social media 
                    platforms, and advertising networks. These third parties have their own privacy policies and cookie 
                    practices, which we encourage you to review.
                  </p>
                  
                  <p className="text-lg font-semibold text-white mb-4 mt-6">Updates to This Policy</p>
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
                    operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
                    updated policy on our website.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Feedback Modal */}
      {isFeedbackModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeFeedbackModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">Share Your Feedback</h2>
              <button
                onClick={closeFeedbackModal}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="feedbackName" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      id="feedbackName"
                      value={feedbackData.name}
                      onChange={(e) => setFeedbackData({ ...feedbackData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                      placeholder="Enter your full name"
                    />
                    {feedbackErrors.name && (
                      <p className="text-red-400 text-sm mt-1">{feedbackErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="feedbackEmail" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="email"
                      id="feedbackEmail"
                      value={feedbackData.email}
                      onChange={(e) => setFeedbackData({ ...feedbackData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                      placeholder="Enter your email address"
                    />
                    {feedbackErrors.email && (
                      <p className="text-red-400 text-sm mt-1">{feedbackErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Rating *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setFeedbackData({ ...feedbackData, rating: star })}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= feedbackData.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                  {feedbackErrors.rating && (
                    <p className="text-red-400 text-sm mt-1">{feedbackErrors.rating}</p>
                  )}
                  <p className="text-gray-400 text-sm mt-2">
                    {feedbackData.rating > 0 ? `${feedbackData.rating} out of 5 stars` : "Please select a rating"}
                  </p>
                </div>

                <div>
                  <label htmlFor="feedbackText" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Feedback *
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    id="feedbackText"
                    value={feedbackData.feedback}
                    onChange={(e) => setFeedbackData({ ...feedbackData, feedback: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                    placeholder="Please share your feedback about our services..."
                  />
                  {feedbackErrors.feedback && (
                    <p className="text-red-400 text-sm mt-1">{feedbackErrors.feedback}</p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeFeedbackModal}
                    className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
