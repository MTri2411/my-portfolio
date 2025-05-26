"use client"

import { Container, useTheme, useMediaQuery, Box, Grid } from "@mui/material"
import CodeSnippet from "@/components/sections/CodeSnippet"
import IntroSection from "@/components/sections/IntroSection"
import AboutMeContent from "@/components/sections/AboutMeContent"
import ProjectsContent from "@/components/sections/ProjectsContent"
import ContactContent from "@/components/sections/ContactContent"

import { useState, useEffect, useRef } from "react"
import { ColourfulText } from "@/components/aceternity-ui/colourful-text"
import MainLayout from "../layouts/MainLayout"

const HomePage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [activeNavId, setActiveNavId] = useState("hello")
  const codeContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll effect
  useEffect(() => {
    const container = codeContainerRef.current
    if (!container) return

    let animationFrameId: number
    let scrollPos = 0
    const scrollHeight = container.scrollHeight
    const scrollSpeed = 0.5 // Pixels per frame

    const scrollAnimation = () => {
      if (!container) return

      scrollPos = (scrollPos + scrollSpeed) % (scrollHeight - container.clientHeight)
      container.scrollTop = scrollPos
      animationFrameId = requestAnimationFrame(scrollAnimation)
    }

    // Start animation
    animationFrameId = requestAnimationFrame(scrollAnimation)

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Code snippet để hiển thị ở nền


  // Các style chung được tái sử dụng
  const sharedStyles = {
    contentBox: {
      p: { xs: 2, md: 3 },
      borderRadius: 2,
      height: "100%",
      width: "100%",
      overflow: "hidden",
      maxWidth: "100vw",
    }
  }

  return (
    <Box component="main" sx={{ width: '100%', maxWidth: '100vw', mx: 'auto' }}>
      <section id="hello">
        <IntroSection />
      </section>
      <section id="about-me">
        <AboutMeContent />
      </section>
      <section id="projects-contact">
  <Grid
    spacing={2}
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
      gap: 2,
      mt: 2,
      mb: 2,
      alignItems: 'stretch',
    }}
  >
    {/* Cột trái: Projects */}
    <Grid
      sx={{
        p: 2,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(15, 23, 42, 0.02)',
        transition: 'all 0.3s',
        '&:hover': {
          backgroundColor: 'rgba(15, 23, 42, 0.05)',
        },
      }}
    >
      <ProjectsContent />
    </Grid>

    {/* Cột phải: Contact */}
    <Grid
      sx={{
        p: 2,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(15, 23, 42, 0.02)',
        borderLeft: { xs: 'none', md: '1px solid rgba(99, 102, 241, 0.2)' },
        transition: 'all 0.3s',
        '&:hover': {
          backgroundColor: 'rgba(15, 23, 42, 0.05)',
        },
      }}
    >
      <ContactContent />
    </Grid>
  </Grid>
</section>

    </Box>
  )
}

export default HomePage
