"use client"

import { Box, Typography } from "@mui/material"
import { TextGradientEffect } from "../aceternity-ui/text-gradient-effect"
import { TypingEffect } from "../aceternity-ui/typing-effect"
import { motion } from "framer-motion"
import WebIcon from "@mui/icons-material/Public";
import MobileIcon from "@mui/icons-material/Smartphone";
import ChatIcon from "@mui/icons-material/Chat";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ColourfulText } from "../aceternity-ui/colourful-text";
import { CodeIcon } from "lucide-react"

const backgroundCode = `// developer.profile.js
/**
 * Developer Portfolio Configuration
 * This file contains all the configuration for the developer portfolio
 * Created: 2024-06-09
 * Author: Developer
 */

// Main profile configuration
const profile = {
  name: "Developer",
  role: "Full Stack Developer",
  location: "Ho Chi Minh City, Vietnam",
  birthday: "1995-01-01",
  website: "https://developer-portfolio.com",
  skills: [
    { name: "React", level: "Advanced", years: 4 },
    { name: "TypeScript", level: "Advanced", years: 3 },
    { name: "Next.js", level: "Advanced", years: 2 },
    { name: "Node.js", level: "Intermediate", years: 3 },
    { name: "MongoDB", level: "Intermediate", years: 2 },
    { name: "Material UI", level: "Advanced", years: 3 },
    { name: "TailwindCSS", level: "Advanced", years: 2 },
    { name: "GraphQL", level: "Intermediate", years: 1 },
  ],
  experience: [
    {
      company: "Tech Solutions Inc.",
      role: "Senior Frontend Developer",
      period: "2021 - Present",
      description: "Leading development of enterprise SaaS applications"
    },
    {
      company: "Digital Innovations Co.",
      role: "Frontend Developer",
      period: "2019 - 2021",
      description: "Developed responsive web applications using React"
    },
    {
      company: "Creative Studios",
      role: "Junior Developer",
      period: "2018 - 2019",
      description: "Built UI components and implemented design systems"
    }
  ],
  education: {
    degree: "Bachelor of Computer Science",
    university: "Technology University",
    year: 2018
  },
  languages: [
    { name: "Vietnamese", level: "Native" },
    { name: "English", level: "Fluent" },
  ],
  interests: ["UI/UX Design", "Web Performance", "Animation", "Mobile Development"],
  social: {
    github: "github.com/developer",
    linkedin: "linkedin.com/in/developer",
    twitter: "twitter.com/developer",
    email: "contact@developer-portfolio.com"
  }
};

/**
 * Get filtered skills by level
 * @param {string} level - Skill level to filter by
 * @returns {Array} - Filtered skills array
 */
function getSkillsByLevel(level) {
  return profile.skills.filter(skill => skill.level === level)
    .map(skill => ({
      ...skill,
      yearsText: skill.years > 1 ? \`\${skill.years} years\` : \`\${skill.years} year\`
    }));
}

/**
 * Calculate experience in years
 * @returns {number} - Total years of experience
 */
function calculateTotalExperience() {
  const startDate = new Date(profile.experience[profile.experience.length - 1].period.split(' - ')[0]);
  const currentDate = new Date();
  
  const yearsOfExperience = currentDate.getFullYear() - startDate.getFullYear();
  
  // Adjust for months
  if (currentDate.getMonth() < startDate.getMonth() || 
      (currentDate.getMonth() === startDate.getMonth() && 
       currentDate.getDate() < startDate.getDate())) {
    return yearsOfExperience - 1;
  }
  
  return yearsOfExperience;
}

/**
 * Project class to manage portfolio projects
 */
class Project {
  constructor(name, description, technologies, imageUrl, githubUrl, liveUrl) {
    this.name = name;
    this.description = description;
    this.technologies = technologies;
    this.imageUrl = imageUrl;
    this.githubUrl = githubUrl;
    this.liveUrl = liveUrl;
    this.createdAt = '2024-06-09';
  }
  
  getTechnologiesHTML() {
    return this.technologies.map(tech => 
      \`<span class="tech-badge">\${tech}</span>\`
    ).join('');
  }
  
  getProjectCard() {
    return \`
      <div class="project-card">
        <img src="\${this.imageUrl}" alt="\${this.name}" />
        <h3>\${this.name}</h3>
        <p>\${this.description}</p>
        <div class="tech-stack">
          \${this.getTechnologiesHTML()}
        </div>
        <div class="project-links">
          <a href="\${this.githubUrl}" target="_blank">GitHub</a>
          <a href="\${this.liveUrl}" target="_blank">Live Demo</a>
        </div>
      </div>
    \`;
  }
}

// Portfolio projects
const projects = [
  new Project(
    "E-commerce Platform",
    "A full-featured e-commerce platform with payment integration",
    ["React", "Node.js", "MongoDB", "Stripe API"],
    "/images/ecommerce.jpg",
    "https://github.com/developer/ecommerce",
    "https://ecommerce-demo.com"
  ),
  new Project(
    "Task Management App",
    "A drag-and-drop task management application with real-time updates",
    ["React", "Firebase", "TailwindCSS", "React DnD"],
    "/images/taskmanager.jpg",
    "https://github.com/developer/taskmanager",
    "https://task-manager-demo.com"
  ),
  new Project(
    "Portfolio Website",
    "A developer portfolio website with dynamic content loading",
    ["Next.js", "TypeScript", "Framer Motion", "TailwindCSS"],
    "/images/portfolio.jpg",
    "https://github.com/developer/portfolio",
    "https://developer-portfolio.com"
  )
];

/**
 * Theme configuration for the portfolio
 */
const themes = {
  light: {
    primary: "#3B82F6",
    secondary: "#10B981",
    background: "#FFFFFF",
    text: "#1F2937",
    accent: "#F59E0B"
  },
  dark: {
    primary: "#60A5FA",
    secondary: "#34D399",
    background: "#111827",
    text: "#F9FAFB",
    accent: "#F59E0B"
  }
};

/**
 * Animation configurations
 */
const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  staggered: {
    container: {
      initial: {},
      animate: { transition: { staggerChildren: 0.1 } }
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 }
    }
  }
};

/**
 * Initialize portfolio and load content
 * @param {string} theme - Theme to initialize with
 * @returns {Object} - Portfolio configuration
 */
function initPortfolio(theme = "dark") {
  console.log("Portfolio initialized with theme:", theme);
  
  // Set default theme
  document.documentElement.classList.toggle("dark", theme === "dark");
  
  // Calculate values
  const experience = calculateTotalExperience();
  const advancedSkills = getSkillsByLevel("Advanced");
  
  // Register event listeners
  window.addEventListener("scroll", handleScroll);
  document.querySelector(".theme-toggle")?.addEventListener("click", toggleTheme);
  
  // Initialize animations
  initializeAnimations();
  
  return {
    theme,
    experience,
    advancedSkills,
    profile,
    projects,
    animations
  };
}

// UI event handlers
function handleScroll() {
  const scrollPosition = window.scrollY;
  const navbarElement = document.querySelector("nav");
  
  if (scrollPosition > 100) {
    navbarElement?.classList.add("scrolled");
  } else {
    navbarElement?.classList.remove("scrolled");
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  console.log("Theme switched to:", isDark ? "dark" : "light");
}

function initializeAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll(".animate-on-scroll").forEach(element => {
    observer.observe(element);
  });
}

// Start the portfolio
const portfolio = initPortfolio("dark");
console.log(\`Portfolio loaded for \${portfolio.profile.name}!\`);`

const LINES_PER_SLIDE = 16;
function splitCodeToSlides(code: string, linesPerSlide: number) {
  const lines = code.split("\n");
  const slides = [];
  for (let i = 0; i < lines.length; i += linesPerSlide) {
    slides.push(lines.slice(i, i + linesPerSlide).join("\n"));
  }
  return slides;
}

const IntroSection = () => {
  const [showZaloQR, setShowZaloQR] = useState(false);
  // --- BACKGROUND CODE SLIDER ---
  const codeSlides = splitCodeToSlides(backgroundCode, LINES_PER_SLIDE);
  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((idx) => (idx + 1) % codeSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [codeSlides.length]);
  // --- END BACKGROUND CODE SLIDER ---
  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      {/* BACKGROUND CODE SLIDE */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.22,
          filter: "blur(3px)",
          transition: "opacity 0.5s",
        }}
      >
        <motion.div
          key={slideIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: "90%", maxWidth: 900 }}
        >
          <ColourfulText
            text={codeSlides[slideIdx]}
            className="font-mono text-[0.95rem]"
            highlightClass={{}}
          />
        </motion.div>
      </Box>
      {/* NỘI DUNG CHÍNH */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: '100%',
          p: { xs: 1, sm: 3, md: 5 },
          borderRadius: 5,
          width: "70%",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          overflowX: "hidden",
          overflowWrap: "break-word",
          wordWrap: "break-word",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          overflowY: "auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ColourfulText text="Hello World. I&apos;m" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
              fontWeight: "bold",
              mb: 1,
              fontFamily: "var(--font-jetbrains-mono)",
            }}
          >
            Minh Tri
          </Typography>

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              mb: 1,
              fontFamily: "var(--font-jetbrains-mono)",
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
            }}
          >
            <WebIcon fontSize="small" />
            <MobileIcon fontSize="small" />
            <TypingEffect words={["Web/Mobile Developer"]} />
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              mb: 4,
              fontFamily: "var(--font-jetbrains-mono)",
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
            }}
          >
            <CodeIcon fontSize="small" />
            <TypingEffect words={["Backend Developer"]} />
          </Typography>

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Box sx={{ color: "text.secondary", mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              // transform your problems into technological solutions
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              // contact me for consultation and support
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              overflowWrap: "break-word",
              wordBreak: "break-all"
            }}
          >
            <Box component="span" sx={{ color: "primary.main" }}>
              const
            </Box>{" "}
            <Box component="span" sx={{ color: "success.main" }}>
              Facebook
            </Box>{" "}
            ={" "}
            <Box component="span" sx={{ color: "warning.main" }}>
              &quot;https://www.facebook.com/luongminhtri2411&quot;
            </Box>
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: "var(--font-jetbrains-mono)",
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            <Box component="span" sx={{ color: "primary.main" }}>
              const
            </Box>{" "}
            <Box component="span" sx={{ color: "success.main", display: "flex", alignItems: "center", gap: 0.5 }}>
              <ChatIcon fontSize="small" />Zalo
            </Box>{" "}
            ={" "}
            <Box
              component="span"
              sx={{ color: "warning.main", cursor: "pointer", textDecoration: "underline" }}
              onClick={() => setShowZaloQR((v) => !v)}
            >
              &quot;0926 442 554&quot;
            </Box>
          </Typography>
          {showZaloQR && (
            <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-start" }}>
              <Image src="/zaloQR.jpg" alt="Zalo QR" width={120} height={120} style={{ borderRadius: 8, border: '1px solid #eee' }} />
            </Box>
          )}
        </motion.div>

      </Box>
    </Box>
  )
}

export default IntroSection
