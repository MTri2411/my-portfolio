"use client"

import { Box, Container, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material"
import { motion } from "framer-motion"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookIcon from "@mui/icons-material/Facebook"
import LanguageIcon from "@mui/icons-material/Language"
import GitHubIcon from "@mui/icons-material/GitHub"

const FooterIcon = ({ children, href = "#" }: { children: React.ReactNode, href?: string }) => (
  <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>
    <IconButton
      size="small"
      color="inherit"
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </IconButton>
  </motion.div>
);

const Footer = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box
      component={motion.footer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      sx={{
        borderTop: 1,
        borderColor: "divider",
        py: 1,
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            px: 2,
            gap: isMobile ? 1 : 0,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Typography
              variant="body2"
              sx={{
                mr: 2,
                fontFamily: "var(--font-jetbrains-mono)",
              }}
            >
              find me in:
            </Typography>
          </motion.div>

          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            sx={{
              display: "flex",
              borderLeft: isMobile ? 0 : 1,
              borderColor: "divider",
              pl: isMobile ? 0 : 2,
            }}
          >
            <FooterIcon href="https://linkedin.com">
              <LinkedInIcon fontSize="small" />
            </FooterIcon>
            <FooterIcon href="https://twitter.com">
              <TwitterIcon fontSize="small" />
            </FooterIcon>
            <FooterIcon href="https://www.facebook.com/luongminhtri2411">
              <FacebookIcon fontSize="small" />
            </FooterIcon>
            <FooterIcon>
              <LanguageIcon fontSize="small" />
            </FooterIcon>
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            sx={{
              display: "flex",
              alignItems: "center",
              ml: "auto",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                mr: 1,
                fontFamily: "var(--font-jetbrains-mono)",
              }}
            >
              @MTri2411
            </Typography>
            <FooterIcon href="https://github.com/MTri2411">
              <GitHubIcon fontSize="small" />
            </FooterIcon>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
