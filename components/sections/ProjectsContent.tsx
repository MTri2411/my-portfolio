import { Box, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { AutoAwesome, Launch, Lock } from "@mui/icons-material";

const ProjectCard = dynamic(() => import("./ProjectCard"), {
  loading: () => (
    <Box sx={{ 
      width: "100%", 
      height: 400, 
      bgcolor: "rgba(15, 23, 42, 0.03)",
      borderRadius: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Typography>Loading...</Typography>
    </Box>
  ),
  ssr: false
});

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
          <Suspense fallback={<Typography>Loading projects...</Typography>}>
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.name}
                project={project}
                idx={idx}
                stackColors={stackColors}
                currentImageIndex={activeImageIndex[project.name] || 0}
                onImageChange={handleImageChange}
              />
            ))}
          </Suspense>
        </Stack>
      </motion.div>
    </Box>
  );
} 