import { Box, Typography, Card, CardContent, Chip, Button, Divider } from "@mui/material";
import { GitHub, Code, Lock, AutoAwesome, Launch } from "@mui/icons-material";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: {
    name: string;
    desc: string;
    stack: string[];
    image?: string[];
    status: string;
    link?: string;
  };
  idx: number;
  stackColors: Record<string, string>;
  currentImageIndex: number;
  onImageChange: (projectName: string, index: number) => void;
}

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

export default function ProjectCard({ project, idx, stackColors, currentImageIndex, onImageChange }: ProjectCardProps) {
  const statusStyle = getStatusColor(project.status);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
    >
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
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={idx === 0}
              style={{
                objectFit: 'cover',
              }}
              quality={75}
            />
            
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
                    onClick={() => onImageChange(project.name, index)}
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
} 