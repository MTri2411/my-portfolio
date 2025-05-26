import { Box, Typography, Chip, Stack, Grid } from "@mui/material";
import { FaReact, FaNodeJs, FaDatabase, FaCloud, FaTools } from "react-icons/fa";
import { SiTypescript, SiNestjs, SiTypeorm, SiGraphql, SiExpress, SiMongodb, SiSupabase, SiFirebase, SiCloudinary, SiShadcnui } from "react-icons/si";
import { motion } from "framer-motion";

const techStack = [
  {
    label: "Front-end",
    icon: <FaReact color="#38bdf8" size={22} style={{ marginRight: 8 }} />,
    items: [
      { name: "React", icon: <FaReact color="#38bdf8" /> },
      { name: "React Native", icon: <FaReact color="#38bdf8" /> },
      { name: "ShadCN", icon: <SiShadcnui color="#6366f1" /> },
    ],
  },
  {
    label: "Back-end",
    icon: <FaNodeJs color="#22c55e" size={22} style={{ marginRight: 8 }} />,
    items: [
      { name: "TypeScript", icon: <SiTypescript color="#2563eb" /> },
      { name: "NestJS", icon: <SiNestjs color="#ea2845" /> },
      { name: "TypeORM", icon: <SiTypeorm color="#fbbf24" /> },
      { name: "GraphQL", icon: <SiGraphql color="#e535ab" /> },
      { name: "Node.js", icon: <FaNodeJs color="#22c55e" /> },
      { name: "Express.js", icon: <SiExpress color="#64748b" /> },
    ],
  },
  {
    label: "Database & Storage",
    icon: <FaDatabase color="#f59e42" size={22} style={{ marginRight: 8 }} />,
    items: [
      { name: "Supabase (S3 Storage)", icon: <SiSupabase color="#10b981" /> },
      { name: "MongoDB", icon: <SiMongodb color="#10b981" /> },
    ],
  },
  {
    label: "Cloud Services",
    icon: <FaCloud color="#60a5fa" size={22} style={{ marginRight: 8 }} />,
    items: [
      { name: "Firebase", icon: <SiFirebase color="#fbbf24" /> },
      { name: "Cloudinary", icon: <SiCloudinary color="#38bdf8" /> },
    ],
  },
  {
    label: "Tool",
    icon: <FaTools color="#64748b" size={22} style={{ marginRight: 8 }} />,
    items: [
      { name: "VSCode" },
      { name: "Figma" },
      { name: "Git/GitHub" },
      { name: "Postman" },
    ],
  },
];

export default function AboutMeContent() {
  return (
    <Box sx={{
      p: 3,
      width: "100%",
      height: "100%",
      overflow: "auto",
      display: "flex",
      flexDirection: "column"
    }}>
      <Typography variant="h4" fontWeight={700} mb={2} color="primary.main">
        👋 About Me
      </Typography>
      <Typography variant="body1" mb={2}>
        Something about me may be useful for you !!!
      </Typography>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Box 
          sx={{
            mb: 4,
            p: 3,
            borderRadius: 3,
            backgroundColor: 'rgba(15, 23, 42, 0.04)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s',
            '&:hover': {
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
              borderColor: 'rgba(99, 102, 241, 0.4)',
              backgroundColor: 'rgba(15, 23, 42, 0.06)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '4px',
              background: 'linear-gradient(90deg, #3B82F6, #10B981, #F59E0B)',
            }
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={2} color="primary.main">
            Web & Mobile developer specializing in custom software for small and medium businesses.
          </Typography>
          
          <Typography variant="body1" mb={3} sx={{ color: 'text.primary', lineHeight: 1.7 }}>
            I help you build modern, effective, and scalable apps – tailored to your business needs.
          </Typography>
          
          <Typography variant="h6" mb={2} sx={{ color: '#F59E0B', fontWeight: 600 }}>
            🛠️ What I can build for you:
          </Typography>
          
          <Box sx={{ pl: 4, mb: 3 }}>
            {[
              '🌍 Travel tour booking website with online payment, schedule, and customer management',
              '🏬 E-commerce store for electronics, including cart, discounts, and admin dashboard',
              '👨‍💼 HR management system for tracking attendance, KPI, shifts, and reports',
              '📱 Cross-platform mobile apps (iOS & Android) for your products or services',
              '📦 Inventory management software for small business logistics',
              '🎯 SEO-optimized landing pages for marketing campaigns or service promotions',
              '📊 Business dashboards and reporting tools for store owners and managers'
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}
              >
                <Box sx={{ 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%', 
                  bgcolor: '#F59E0B', 
                  display: 'inline-block', 
                  mr: 2
                }} />
                <Typography variant="body1">{item}</Typography>
              </motion.div>
            ))}
          </Box>
          
          <Typography variant="h6" mb={2} sx={{ color: '#10B981', fontWeight: 600 }}>
            💪 My key strengths:
          </Typography>
          
          <Box sx={{ pl: 4, mb: 2 }}>
            {[
              'Fast at understanding real-world needs – I provide tech that works, not overkill',
              'Full-cycle dev: UI/UX, frontend, backend, mobile, deployment',
              'Use modern stacks like ReactJS, React Native, Node.js, NestJS, GraphQL…',
              'Focus on performance, clean UI, maintainability, and scalability',
              'Clear, efficient communication – long-term dev support available'
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}
              >
                <Box sx={{ 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%', 
                  bgcolor: '#10B981', 
                  display: 'inline-block', 
                  mr: 2
                }} />
                <Typography variant="body1">{item}</Typography>
              </motion.div>
            ))}
          </Box>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            <Typography 
              variant="h6" 
              align="center" 
              mt={3}
              sx={{ 
                fontWeight: 600, 
                fontStyle: 'italic', 
                color: 'primary.main',
                padding: 2,
                borderRadius: 2,
                background: 'rgba(59, 130, 246, 0.05)'
              }}
            >
              Let's build something great together – reach out and tell me your idea!
            </Typography>
          </motion.div>
        </Box>
      </motion.div>

      <Grid
        container
        spacing={2}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Cột 1: Front-end & Back-end */}
        <Grid
          sx={{
            p: 2,
            backgroundColor: 'rgba(15, 23, 42, 0.02)',
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: 'rgba(15, 23, 42, 0.05)',
            }
          }}
        >
          {[techStack[0], techStack[1]].map((group) => (
            <Box key={group.label} mb={2}>
              <Typography variant="subtitle1" fontWeight={600} mb={1} display="flex" alignItems="center">
                {group.icon} {group.label}
              </Typography>
              <Stack direction="row" flexWrap="wrap">
                {group.items.map((item) => {
                  const typedItem = item as { name: string; icon?: React.ReactNode };
                  const iconProp = (typedItem.icon && typeof typedItem.icon === 'object' && 'type' in typedItem.icon)
                    ? { icon: typedItem.icon }
                    : {};
                  return (
                    <Chip
                      key={typedItem.name}
                      {...iconProp}
                      label={typedItem.name}
                      color="info"
                      variant="outlined"
                      sx={{
                        p: 1,
                        mb: 1,
                        mr: 1,
                        transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
                        '&:hover': {
                          boxShadow: '0 0 8px 2px #fbbf24, 0 0 16px 4px #f59e0b',
                          borderColor: '#f59e0b',
                          transform: 'translateY(-3px)'
                        },
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>
          ))}
        </Grid>
        {/* Cột 2: Database & Storage, Cloud Services, Tool */}
        <Grid
          sx={{
            p: 2,
            backgroundColor: 'rgba(15, 23, 42, 0.02)',
            borderLeft: { xs: 'none', md: '1px solid rgba(99, 102, 241, 0.2)' },
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: 'rgba(15, 23, 42, 0.05)',
            }
          }}
        >
          {[techStack[2], techStack[3], techStack[4]].map((group) => (
            <Box key={group.label} mb={2}>
              <Typography variant="subtitle1" fontWeight={600} mb={1} display="flex" alignItems="center">
                {group.icon} {group.label}
              </Typography>
              <Stack direction="row" flexWrap="wrap">
                {group.items.map((item) => {
                  const typedItem = item as { name: string; icon?: React.ReactNode };
                  const iconProp = (typedItem.icon && typeof typedItem.icon === 'object' && 'type' in typedItem.icon)
                    ? { icon: typedItem.icon }
                    : {};
                  return (
                    <Chip
                      key={typedItem.name}
                      {...iconProp}
                      label={typedItem.name}
                      color="info"
                      variant="outlined"
                      sx={{
                        p: 1,
                        mb: 1,
                        mr: 1,
                        transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
                        '&:hover': {
                          boxShadow: '0 0 8px 2px #fbbf24, 0 0 16px 4px #f59e0b',
                          borderColor: '#f59e0b',
                          transform: 'translateY(-3px)'
                        },
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>
          ))}
        </Grid>
      </Grid>

    </Box>
  );
} 