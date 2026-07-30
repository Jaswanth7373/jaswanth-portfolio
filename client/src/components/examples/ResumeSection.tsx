import { ResumeSection } from '../ResumeSection'
import { ThemeProvider } from '../ThemeProvider'

export default function ResumeSectionExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <ResumeSection />
      </div>
    </ThemeProvider>
  )
}