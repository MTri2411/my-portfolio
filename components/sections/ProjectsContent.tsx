import { Box, Typography, Card, CardContent, Link, Stack, Chip, Button, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { GitHub, Launch, Code, Lock, AutoAwesome } from "@mui/icons-material";
import { useState } from "react";
import Image from "next/image";

const projects = [
  {
    name: "Book Store",
    desc: "Book Store e-commerce website using React, NextJS, TailwindCSS.",
    stack: ["NodeJS", "Express", "MySQL", "React", "NextJS", "TailwindCSS"],
    image: ["/bookstore_0.png", "/bookstore_1.png", "/bookstore_2.png"],
    status: "In Progress"
  },
  {
    name: "Restaurant API",
    desc: "API management restaurant, table booking, menu, customer. Using NodeJS, Express, MongoDB.",
    stack: ["NodeJS", "Express", "MongoDB"],
    link: "https://github.com/MTri2411/restaurant-api",
    status: "Private"
  },
  {
    name: "Vendure Ecommerce",
    desc: "Ecommerce website using Vendure, React, NextJS, TailwindCSS.",
    stack: ["React", "NextJS", "TailwindCSS", "Vendure"],
    status: "Private"
  },
];

// Xác định màu dựa trên tech stack
const stackColors: Record<string, string> = {
  React: "#61DAFB",
  NextJS: "#000000",
  TailwindCSS: "#38B2AC",
  NodeJS: "#339933",
  Express: "#000000",
  MongoDB: "#47A248",
  MySQL: "#4479A1",
  Vendure: "#13B5EA",
};

export default function ProjectsContent() {
  const [activeImageIndex, setActiveImageIndex] = useState<Record<string, number>>({});

  // Xử lý chuyển đổi hình ảnh
  const handleImageChange = (projectName: string, index: number) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [projectName]: index
    }));
  };
  
  // Helper function để lấy màu status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return { bg: "#FFEED6", text: "#F59E0B", icon: <AutoAwesome fontSize="small" /> };
      case "Private":
        return { bg: "#F3F4F6", text: "#6B7280", icon: <Lock fontSize="small" /> };
      default:
        return { bg: "#D1FAE5", text: "#10B981", icon: <Launch fontSize="small" /> };
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  return (
    <Box sx={{
      p: 3,
      width: "100%",
      height: "100%",
      overflow: "auto",
      display: "flex",
      flexDirection: "column"
    }}>
      <Typography variant="h4" fontWeight={700} mb={3} color="primary.main">
        🚀 Projects
      </Typography>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Stack spacing={3}>
          {projects.map((project, idx) => {
            const statusStyle = getStatusColor(project.status);
            const currentImageIndex = activeImageIndex[project.name] || 0;
            
            return (
              <motion.div key={project.name} variants={item}>
                <Card 
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    bgcolor: "rgba(15, 23, 42, 0.03)",
                    border: '1px solid rgba(99, 102, 241, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                      transform: 'translateY(-5px)',
                      borderColor: 'rgba(99, 102, 241, 0.3)',
                    }
                  }}
                >
                  {project.image && project.image.length > 0 && (
                    <Box sx={{ position: 'relative', width: '100%', height: 200, bgcolor: '#000' }}>
                      <Image 
                        src={project.image[currentImageIndex]} 
                        alt={project.name}
                        layout="fill"
                        objectFit="cover"
                      />
                      
                      {/* Điều khiển hình ảnh nếu có nhiều hơn 1 */}
                      {project.image.length > 1 && (
                        <Box sx={{ 
                          position: 'absolute', 
                          bottom: 10, 
                          left: '50%', 
                          transform: 'translateX(-50%)',
                          display: 'flex',
                          gap: 1
                        }}>
                          {project.image.map((_, index) => (
                            <Box 
                              key={index}
                              onClick={() => handleImageChange(project.name, index)}
                              sx={{ 
                                width: 8, 
                                height: 8, 
                                borderRadius: '50%',
                                bgcolor: index === currentImageIndex ? 'white' : 'rgba(255,255,255,0.5)',
                                cursor: 'pointer'
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  )}
                  
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h5" fontWeight={700} color="primary.main">
                        {project.name}
                      </Typography>
                      
                      <Chip 
                        icon={statusStyle.icon}
                        label={project.status} 
                        size="small"
                        sx={{ 
                          bgcolor: statusStyle.bg, 
                          color: statusStyle.text,
                          fontWeight: 600,
                          borderRadius: '4px'
                        }} 
                      />
                    </Box>
                    
                    <Typography variant="body1" color="text.secondary" mb={2} sx={{ lineHeight: 1.7 }}>
                      {project.desc}
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {project.stack.map((tech) => (
                        <Chip 
                          key={tech} 
                          label={tech}
                          size="small"
                          sx={{
                            bgcolor: `${stackColors[tech]}10` || 'rgba(99, 102, 241, 0.1)',
                            color: stackColors[tech] || 'primary.main',
                            border: `1px solid ${stackColors[tech]}30` || 'rgba(99, 102, 241, 0.2)',
                            fontWeight: 500,
                            '&:hover': {
                              bgcolor: `${stackColors[tech]}20` || 'rgba(99, 102, 241, 0.2)',
                            }
                          }}
                        />
                      ))}
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {project.link && (
                        <Button 
                          variant="contained" 
                          startIcon={<GitHub />}
                          href={project.link}
                          target="_blank"
                          size="small"
                          sx={{
                            bgcolor: '#24292e',
                            '&:hover': {
                              bgcolor: '#1a1e23',
                            }
                          }}
                        >
                          Source Code
                        </Button>
                      )}
                      
                      {/* Nút demo có thể thêm nếu có link */}
                      {project.status !== "Private" && !project.link && (
                        <Button 
                          variant="outlined"
                          startIcon={<Code />}
                          size="small"
                          sx={{ borderColor: 'primary.main', color: 'primary.main' }}
                        >
                          In Development
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </Stack>
      </motion.div>
    </Box>
  );
} 