import { Navigation } from '../Navigation'
import { ThemeProvider } from '../ThemeProvider'

export default function NavigationExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 p-8">
          <h1 className="text-2xl font-bold">Navigation Example</h1>
          <p className="text-muted-foreground">This shows the navigation component with theme toggle and smooth scrolling.</p>
        </div>
      </div>
    </ThemeProvider>
  )
}