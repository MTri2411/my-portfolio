"use client"

import { Box } from "@mui/material"
import { motion } from "framer-motion"
import { ReactNode } from "react"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import { Boxes } from "@/components/aceternity-ui/background-boxes"

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
          color: "text.primary",
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
        }}
      >
        {/* Background Boxes */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Boxes />
        </div>
        
        <Header />
        <Box component="main" sx={{ width: '100%', maxWidth: '100vw', mx: 'auto', position: 'relative', zIndex: 2 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </motion.div>
  )
}

export default MainLayout
