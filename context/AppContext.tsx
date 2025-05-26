"use client"
import { createContext, useContext, type ReactNode } from "react"

type AppContextType = {}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  // Add your global state here
  // For example:
  // const [currentPage, setCurrentPage] = useState<string>("hello");

  const value = {
    // currentPage,
    // setCurrentPage,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
