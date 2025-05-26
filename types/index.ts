import type React from "react"
export interface NavItem {
  id: string
  label: string
  href: string
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  githubUrl?: string
  liveUrl?: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: React.ReactNode
}
