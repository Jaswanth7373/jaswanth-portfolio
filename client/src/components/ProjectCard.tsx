import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye } from "lucide-react"
import { useTilt } from "@/hooks/useTilt"

interface ProjectCardProps {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  onClick: () => void
}

export function ProjectCard({
  id,
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
  featured = false,
  onClick
}: ProjectCardProps) {
  const { ref, onMove, onLeave } = useTilt(9)

  return (
    <div className="card-3d-perspective">
      <Card
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`group cursor-pointer backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/30 hover-elevate card-3d-tilt relative ${
          featured ? "ring-1 ring-primary/20" : ""
        }`}
        onClick={onClick}
        data-testid={`card-project-${id}`}
      >
      {/* Project Image */}
      <div className="relative overflow-hidden rounded-t-lg card-3d-layer">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          {githubUrl && (
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 backdrop-blur-sm bg-background/80"
              onClick={(e) => {
                e.stopPropagation()
                window.open(githubUrl, "_blank")
              }}
              data-testid={`button-github-${id}`}
            >
              <Github className="h-4 w-4" />
            </Button>
          )}
          {liveUrl && (
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 backdrop-blur-sm bg-background/80"
              onClick={(e) => {
                e.stopPropagation()
                window.open(liveUrl, "_blank")
              }}
              data-testid={`button-live-${id}`}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>

        {featured && (
          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-primary to-accent">
            Featured
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="font-display text-xl group-hover:text-primary transition-colors duration-300">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs bg-primary/5 border-primary/20"
            >
              {tech}
            </Badge>
          ))}
          {technologies.length > 3 && (
            <Badge variant="outline" className="text-xs bg-muted/20">
              +{technologies.length - 3} more
            </Badge>
          )}
        </div>

        {/* View Details Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center hover-elevate active-elevate-2"
          data-testid={`button-view-details-${id}`}
        >
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </CardContent>
      </Card>
    </div>
  )
}