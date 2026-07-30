import { Footer } from '../Footer'
import { ThemeProvider } from '../ThemeProvider'

export default function FooterExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Footer Example</h1>
          <p className="text-muted-foreground">This shows the footer component with social links and navigation.</p>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}