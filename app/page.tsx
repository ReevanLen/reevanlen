'use client'

import Image from 'next/image';
import Link from 'next/link'
import { ChevronRight, ExternalLink, Github, Linkedin, Mail, Phone, Award, Briefcase, Code, User, Send, Moon, Sun, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AnimatedSection } from '@/components/AnimatedSection'
import { ProfessionalBackground } from '@/components/ProfessionalBackground'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [theme, setTheme] = useState('dark')
  const [mounted, setMounted] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorFollower, setCursorFollower] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
      
      // Smooth follower with delay
      setTimeout(() => {
        setCursorFollower({ x: e.clientX, y: e.clientY })
      }, 100)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target
      if (target instanceof HTMLElement) {
        const isInteractive = target.closest('a, button, .interactive')
        if (isInteractive) {
          setIsHovering(true)
        }
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target
      if (target instanceof HTMLElement) {
        const isInteractive = target.closest('a, button, .interactive')
        if (isInteractive) {
          setIsHovering(false)
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseEnter, true)
    document.addEventListener('mouseout', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseEnter, true)
      document.removeEventListener('mouseout', handleMouseLeave, true)
    }
  }, [])

  const applyTheme = (newTheme: string) => {
    const html = document.documentElement
    if (newTheme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Custom Cursor */}
      <div 
        className="fixed pointer-events-none z-[9999] mix-blend-difference transition-all duration-150"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div 
          className={`w-3 h-3 bg-white rounded-full transition-all duration-200 ${
            isHovering ? 'scale-[3] opacity-50' : 'scale-100'
          }`}
        />
      </div>
      
      {/* Cursor Follower */}
      <div 
        className="fixed pointer-events-none z-[9998] mix-blend-difference transition-all duration-700 ease-out"
        style={{
          left: `${cursorFollower.x}px`,
          top: `${cursorFollower.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div 
          className={`border-2 border-white rounded-full transition-all duration-300 ${
            isHovering ? 'w-16 h-16 opacity-30' : 'w-10 h-10 opacity-50'
          }`}
        />
      </div>

      <ProfessionalBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-5">
            <h1 className="text-2xl font-bold glow-text tracking-tight">
              Reevan Len Pereira
            </h1>
            <div className="hidden items-center gap-12 md:flex">
              <a href="#about" className="text-sm font-medium hover:text-primary transition-all duration-500 interactive relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#experience" className="text-sm font-medium hover:text-primary transition-all duration-500 interactive relative group">
                Experience
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#projects" className="text-sm font-medium hover:text-primary transition-all duration-500 interactive relative group">
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#skills" className="text-sm font-medium hover:text-primary transition-all duration-500 interactive relative group">
                Skills
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-sm font-medium hover:text-primary transition-all duration-500 interactive relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-500 interactive hover:scale-110"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-border/50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '0s', animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-accent/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s', animationDuration: '10s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-float" style={{ animationDelay: '4s', animationDuration: '12s' }} />
          <div className="absolute inset-0 background-grid opacity-20" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 relative z-10 mt-20">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            {/* Left Content */}
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-primary uppercase tracking-[0.3em] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    LEARN. BUILD. GET PLACED.
                  </p>
                </div>
                
                <div className="overflow-hidden">
                  <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <span className="block mb-2">Reevan Len</span>
                    <span className="glow-text">Pereira</span>
                  </h1>
                </div>
                
                <div className="overflow-hidden">
                  <p className="text-2xl text-primary font-semibold animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    Full Stack Developer
                  </p>
                </div>
              </div>
              
              <div className="overflow-hidden">
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  Passionate about building elegant, scalable web applications. I transform complex problems into beautiful, user-centric solutions that deliver real impact.
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-5 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <Button size="lg" className="interactive gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base font-semibold rounded-xl shadow-2xl shadow-primary/40 transition-all duration-500 hover:scale-105 hover:shadow-primary/60">
                  <a href="#projects">View My Work</a>
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="interactive px-8 py-6 text-base font-semibold rounded-xl border-2 border-primary/30 hover:border-primary transition-all duration-500 hover:scale-105 bg-transparent">
                  <a href="#contact">Contact Me</a>
                </Button>
              </div>
              
              <div className="flex items-center gap-8 pt-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Link href="https://github.com/reevanlen" target="_blank" className="interactive text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-125 transform">
                  <Github className="w-7 h-7" />
                </Link>
                <Link href="https://linkedin.com/in/reevan-len" target="_blank" className="interactive text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-125 transform">
                  <Linkedin className="w-7 h-7" />
                </Link>
                <Link href="mailto:reevanlen@gmail.com" className="interactive text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-125 transform">
                  <Mail className="w-7 h-7" />
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:flex items-center justify-center relative animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
              <div className="relative w-[450px] h-[450px]">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-3xl animate-glow-pulse" />
                
                {/* Main container */}
                <div className="relative w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-full border-[6px] border-primary flex items-center justify-center shadow-2xl shadow-primary/30 overflow-hidden group transition-all duration-700 hover:scale-105 hover:border-[8px] interactive">
                  {/* Rotating gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 group-hover:rotate-180 transition-transform duration-[3000ms]" />
                  
                  {/* Image */}
                  <Image 
                    src="/reevan.png" 
                    width={420} 
                    height={420} 
                    alt="Reevan Len Pereira" 
                    className="relative z-10 rounded-full transition-all duration-700 group-hover:scale-110" 
                  />
                </div>

                {/* Floating particles */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '0s', animationDuration: '6s' }} />
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s', animationDuration: '7s' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection animation="fade-in-up">
            <div className="space-y-16">
              <div className="space-y-6 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">My Intro</span>
                </div>
                
                <h2 className="text-5xl sm:text-6xl font-bold leading-tight">
                  About <span className="glow-text">Me</span>
                </h2>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Passionate and detail-oriented Computer Science student with a strong foundation in Python and Full Stack Web Development. A quick learner specializing in Data Science, focused on creating clean, efficient, and user-friendly solutions. Eager to contribute to innovative projects, collaborate with dynamic teams, and grow professionally.
                </p>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto">
                <AnimatedSection animation="slide-in-left" delay={0.2}>
                  <Card className="interactive glow-border bg-card/30 backdrop-blur-sm p-6 sm:p-8 h-full hover:bg-card/50 transition-all duration-700 cursor-pointer group hover:-translate-y-2">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/20 rounded-xl group-hover:scale-110 transition-transform duration-500">
                          <Award className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold">Education</h3>
                      </div>
                      
                      <div className="space-y-5">
                        <div className="border-l-4 border-primary pl-4 sm:pl-6 hover:pl-6 sm:hover:pl-8 transition-all duration-300">
                          <p className="font-bold text-lg sm:text-xl mb-2">Bachelor of Computer Applications</p>
                          <p className="text-sm sm:text-base text-muted-foreground">St. Aloysius College (Autonomous) • 2026</p>
                        </div>
                        <div className="border-l-4 border-accent pl-4 sm:pl-6 hover:pl-6 sm:hover:pl-8 transition-all duration-300">
                          <p className="font-bold text-lg sm:text-xl mb-2">12th Grade</p>
                          <p className="text-sm sm:text-base text-muted-foreground">St. Aloysius PU College • 2023</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </AnimatedSection>
                
                <AnimatedSection animation="slide-in-right" delay={0.3}>
                  <Card className="interactive glow-border bg-card/30 backdrop-blur-sm p-6 sm:p-8 h-full hover:bg-card/50 transition-all duration-700 cursor-pointer group hover:-translate-y-2">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/20 rounded-xl group-hover:scale-110 transition-transform duration-500">
                          <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold">Certifications</h3>
                      </div>
                      
                      <div className="space-y-5">
                        <div className="border-l-4 border-primary pl-4 sm:pl-6 hover:pl-6 sm:hover:pl-8 transition-all duration-300">
                          <p className="font-bold text-lg sm:text-xl mb-2">Data Science</p>
                          <p className="text-sm sm:text-base text-muted-foreground">Code With Harry • 2026</p>
                        </div>
                        <div className="border-l-4 border-accent pl-4 sm:pl-6 hover:pl-6 sm:hover:pl-8 transition-all duration-300">
                          <p className="font-bold text-lg sm:text-xl mb-2">Advance Python</p>
                          <p className="text-sm sm:text-base text-muted-foreground">Scaler • 2025</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection animation="fade-in-up">
            <div className="space-y-16">
              <div className="space-y-6 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">Featured Work</span>
                </div>
                
                <h2 className="text-5xl sm:text-6xl font-bold leading-tight">
                  Recent <span className="glow-text">Projects</span>
                </h2>
              </div>
              
              <div className="grid gap-8 lg:grid-cols-2">
                {[
                  {
                    name: 'SkillProof',
                    description: 'Skillproof verifies uploaded or earned certificates through AI-generated tests.. Built with Next.js, TailwindCSS and MongoDb.',
                    tags: ['Next.js', 'React', 'TypeScript', 'MongoDb', 'TailwindCSS'],
                  },
                  {
                    name: 'ResQNet',
                    description: 'ResQNet enables patient, hospitals and authorities to coordinate with each other and ensures faster response for the road accident victims.',
                    tags: ['React', 'Next.js', 'PostgreSQL', 'Supabase', 'Real-time'],
                  },
                  {
                    name: 'Aloymni',
                    description: 'Aloymni is a platform for alumni to connect with each other and share their knowledge and experiences.',
                    tags: ['Next.js', 'React', 'TypeScript', 'MongoDb', 'TailwindCSS'],
                  },
                  {
                    name: 'Mobile App Backend',
                    description: 'Scalable backend API for a fitness tracking mobile app with real-time notifications and data synchronization.',
                    tags: ['Express.js', 'WebSocket', 'Redis', 'Firebase', 'GraphQL'],
                  },
                ].map((project, i) => (
                  <AnimatedSection key={i} animation="scale-in" delay={i * 0.15}>
                    <Card className={`interactive glow-border bg-card/30 backdrop-blur-sm p-6 sm:p-8 group hover:bg-card/50 transition-all duration-700 h-full cursor-pointer hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/20`}>
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-500">{project.name}</h3>
                          </div>
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                            <ExternalLink className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground text-base leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.tags.map((tag, idx) => (
                            <span 
                              key={tag} 
                              className="interactive text-xs px-3 py-2 rounded-lg bg-secondary/50 text-muted-foreground hover:bg-primary/20 hover:text-primary hover:scale-110 transition-all duration-500 font-medium"
                              style={{ transitionDelay: `${idx * 50}ms` }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-32 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection animation="fade-in-up">
            <div className="space-y-16">
              <div className="space-y-6 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">Expertise</span>
                </div>
                
                <h2 className="text-5xl sm:text-6xl font-bold leading-tight">
                  Skills & <span className="glow-text">Technologies</span>
                </h2>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
                {[
                  {
                    category: 'Frontend',
                    icon: Code,
                    skills: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Vue.js', 'Svelte'],
                  },
                  {
                    category: 'Backend',
                    icon: Briefcase,
                    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs'],
                  },
                  {
                    category: 'DevOps & Cloud',
                    icon: Award,
                    skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
                  },
                  {
                    category: 'Tools & Others',
                    icon: Code,
                    skills: ['Git', 'WebSocket', 'Redis', 'Elasticsearch', 'Agile', 'Leadership'],
                  },
                ].map((skillGroup, i) => {
                  const Icon = skillGroup.icon
                  return (
                    <AnimatedSection key={i} animation={i % 2 === 0 ? 'slide-in-left' : 'slide-in-right'} delay={i * 0.15}>
                      <Card className="interactive glow-border bg-card/30 backdrop-blur-sm p-6 sm:p-8 hover:bg-card/50 transition-all duration-700 h-full cursor-pointer group hover:-translate-y-2">
                        <div className="space-y-5">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/20 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                              <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold">{skillGroup.category}</h3>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {skillGroup.skills.map((skill, idx) => (
                              <span 
                                key={skill} 
                                className="interactive px-3 sm:px-4 py-2 rounded-lg bg-secondary/50 text-sm font-medium hover:bg-primary/30 hover:text-primary hover:scale-110 transition-all duration-500"
                                style={{ transitionDelay: `${idx * 50}ms` }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </AnimatedSection>
                  )
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-32 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection animation="fade-in-up">
            <div className="space-y-16">
              <div className="space-y-6 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">Career Path</span>
                </div>
                
                <h2 className="text-5xl sm:text-6xl font-bold leading-tight">
                  Achievements <span className="glow-text">and Experience</span>
                </h2>
              </div>
              
              <div className="space-y-8 max-w-4xl mx-auto">
                {[
                  {
                    title: 'Hackathon Runner-up',
                    company: 'CodeSprint - A National Level Hackathon',
                    period: '2026',
                    description: 'Secured 2nd place in a national-level hackathon with 50+ teams. Developed a web application that solves the problem which helps patients get better medical facilities on time.',
                  },
                  {
                    title: 'Aloymni',
                    company: 'St Aloysius Deemed to be University',
                    period: '2020 - 2022',
                    description: 'Been a part of college project group where we developed a web application which provides a platform for the alumni of the college to connect with each other and share their knowledge and experiences.  ',
                  },
                  
                ].map((job, i) => (
                  <AnimatedSection key={i} animation="slide-in-left" delay={i * 0.15}>
                    <Card className="interactive glow-border bg-card/30 backdrop-blur-sm p-10 hover:bg-card/50 transition-all duration-700 group cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                        <div className="flex-1">
                          <h3 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors duration-500">{job.title}</h3>
                          <p className="text-primary font-bold text-xl">{job.company}</p>
                        </div>
                        <span className="text-base text-muted-foreground font-medium whitespace-nowrap bg-secondary/50 px-5 py-2 rounded-xl">{job.period}</span>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed">{job.description}</p>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection animation="fade-in-up">
            <div className="space-y-16">
              <div className="space-y-6 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">Let's Connect</span>
                </div>
                
                <h2 className="text-5xl sm:text-6xl font-bold leading-tight">
                  Get In <span className="glow-text">Touch</span>
                </h2>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  I'm always interested in hearing about new projects and opportunities. Feel free to reach out via email or connect on social media.
                </p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                {[
                  { icon: Mail, label: 'Email', value: 'reevanlen@gmail.com', href: 'mailto:reevanlen@gmail.com' },
                  { icon: Phone, label: 'Phone', value: '+91 7899475031', href: 'tel:+917899475031' },
                  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/reevan-len', href: 'https://linkedin.com/in/reevan-len' },
                ].map((contact, i) => {
                  const Icon = contact.icon
                  return (
                    <AnimatedSection key={i} animation="scale-in" delay={i * 0.15}>
                      <Link href={contact.href}>
                        <Card className="interactive glow-border bg-card/30 backdrop-blur-sm p-10 hover:bg-card/50 transition-all duration-700 cursor-pointer h-full group hover:-translate-y-3 hover:shadow-xl hover:shadow-primary/20">
                          <div className="space-y-6 text-center">
                            <div className="p-5 bg-primary/20 rounded-2xl w-fit mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                              <Icon className="w-8 h-8 text-primary" />
                            </div>
                            <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">{contact.label}</p>
                            <p className="font-bold text-lg group-hover:text-primary transition-colors duration-500">{contact.value}</p>
                          </div>
                        </Card>
                      </Link>
                    </AnimatedSection>
                  )
                })}
              </div>
              
              <AnimatedSection animation="fade-in-up" delay={0.4}>
                <div className="mx-auto max-w-2xl">
                  <Card className="glow-border bg-card/30 backdrop-blur-sm p-10">
                    <form className="space-y-6">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-6 py-5 rounded-2xl bg-secondary/30 border-2 border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-500 text-base"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-6 py-5 rounded-2xl bg-secondary/30 border-2 border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-500 text-base"
                      />
                      <textarea
                        placeholder="Your Message"
                        rows={6}
                        className="w-full px-6 py-5 rounded-2xl bg-secondary/30 border-2 border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-500 resize-none text-base"
                      />
                      <Button size="lg" className="interactive w-full gap-3 bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/40 transition-all duration-500 hover:scale-105 text-lg py-7 rounded-2xl font-semibold">
                        Send Message
                        <Send className="w-6 h-6" />
                      </Button>
                    </form>
                  </Card>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-secondary/20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-sm text-muted-foreground">
              © 2026 Reevan Len Pereira. All rights reserved. Built with Next.js, React, and TailwindCSS.
            </p>
            <div className="flex items-center gap-8">
              <Link href="https://github.com/reevanlen" className="interactive text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-125 transform">
                <Github className="w-6 h-6" />
              </Link>
              <Link href="https://linkedin.com/in/reevan-len" className="interactive text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-125 transform">
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href="mailto:reevanlen@gmail.com" className="interactive text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-125 transform">
                <Mail className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}