import { BlogSection } from '../BlogSection'
import { ThemeProvider } from '../ThemeProvider'

export default function BlogSectionExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <BlogSection />
      </div>
    </ThemeProvider>
  )
}