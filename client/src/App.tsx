import { useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { queryClient } from "./lib/queryClient"
import { CustomCursor } from "./components/CustomCursor"
import { Loader } from "./components/Loader"
import { Navigation } from "./components/Navigation"
import { HeroSection } from "./components/HeroSection"
import { MarqueeStrip } from "./components/MarqueeStrip"
import { AboutSection } from "./components/AboutSection"
import { ProjectsSection } from "./components/ProjectsSection"
import { BlogSection } from "./components/BlogSection"
import { ResumeSection } from "./components/ResumeSection"
import { ContactSection } from "./components/ContactSection"
import { Footer } from "./components/Footer"
import { useSmoothScroll } from "./hooks/useSmoothScroll"
import { motion, AnimatePresence } from "framer-motion"
import { GlobalBackground } from "./components/GlobalBackground"

function MainApp() {
  useSmoothScroll()

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <ProjectsSection />
        <BlogSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark app-root">
          {/* Site-wide interactive background */}
          <GlobalBackground />
          {/* Global film grain overlay */}
          <div className="grain-overlay" aria-hidden="true" />

          <CustomCursor />
          <AnimatePresence>
            {!loaded && <Loader onDone={() => setLoaded(true)} />}
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {loaded && <MainApp />}
          </motion.div>
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
