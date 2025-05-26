"use client"

import { useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material"
import { motion, Variants } from "framer-motion"
import MenuIcon from "@mui/icons-material/Menu"
import { NAV_ITEMS } from "@/lib/constants"
import { CardHoverEffect } from "../aceternity-ui/card-hover-effect"

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [activeNavId, setActiveNavId] = useState("hello")
  const [clickedNavId, setClickedNavId] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id))
      const scrollY = window.scrollY + 80 // offset header height
      let current = "hello"
      for (const section of sections) {
        if (section && section.offsetTop <= scrollY) {
          current = section.id
        }
      }
      setActiveNavId(current)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    setClickedNavId(id)
    
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: "smooth" })
      
      setTimeout(() => {
        setClickedNavId(null)
        setActiveNavId(id)
      }, 800)
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
      component={motion.div}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Toolbar disableGutters sx={{ px: 0 }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button
            sx={{
              px: 3,
              py: 2,
              borderRight: 1,
              borderColor: "divider",
              borderRadius: 0,
              color: "text.primary",
              textTransform: "none",
              fontFamily: "var(--font-jetbrains-mono)",
            }}
          >
            minh_tri
          </Button>
        </motion.div>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: "auto", mr: 2 }}
              component={motion.button}
              whileTap={{ scale: 0.9 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                "& .MuiDrawer-paper": {
                  width: 240,
                  bgcolor: "background.paper",
                  color: "text.primary",
                },
              }}
            >
              <List component={motion.ul} variants={container} initial="hidden" animate="show">
                {NAV_ITEMS.map((item) => (
                  <motion.li key={item.id} variants={item as unknown as Variants}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          handleNavClick(item.id);
                          setMobileOpen(false);
                        }}
                        sx={{
                          fontFamily: "var(--font-jetbrains-mono)",
                          py: 1.5,
                          borderLeft: item.id === activeNavId ? 4 : 0,
                          borderLeftColor: item.id === activeNavId ? "primary.main" : "transparent",
                          pl: item.id === activeNavId ? 2 : 3,
                          bgcolor: item.id === activeNavId ? "rgba(99, 102, 241, 0.1)" : "transparent",
                        }}
                      >
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  </motion.li>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <CardHoverEffect containerClassName="ml-auto flex items-center">
            <motion.div
              className="flex"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {NAV_ITEMS.map((navItem, index) => (
                <motion.div key={navItem.id} variants={item}>
                  <Button
                    onClick={() => handleNavClick(navItem.id)}
                    sx={{
                      px: 3,
                      py: 2,
                      borderRight: 1,
                      borderColor: "divider",
                      borderBottom: navItem.id === activeNavId ? 2 : 0,
                      borderBottomColor: navItem.id === activeNavId ? "primary.main" : "transparent",
                      borderRadius: 0,
                      color: clickedNavId === navItem.id 
                        ? "primary.main" 
                        : navItem.id === activeNavId 
                          ? "primary.main" 
                          : "text.primary",
                      bgcolor: clickedNavId === navItem.id ? "rgba(99, 102, 241, 0.1)" : "transparent",
                      textTransform: "none",
                      fontFamily: "var(--font-jetbrains-mono)",
                      transition: "all 0.3s ease",
                      fontWeight: navItem.id === activeNavId ? 600 : 400,
                      "&:hover": {
                        bgcolor: "rgba(99, 102, 241, 0.05)",
                      },
                    }}
                  >
                    {navItem.label}
                  </Button>
                </motion.div>
              ))}

            </motion.div>
          </CardHoverEffect>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
