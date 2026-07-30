import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ExternalLink } from "lucide-react"

export interface TimelineItem {
  id: string
  title: string
  organization: string
  location: string
  startDate: string
  endDate: string
  description: string
  type: "education" | "experience"
  skills?: string[]
  certificateUrl?: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent" />
      
      <div className="space-y-8">
        {items.map((item) => (
          <div key={item.id} className="relative flex items-start ml-10">
            <div className="absolute -left-7 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent border-4 border-background shadow-lg" />
            
            <Card className="flex-1 hover-elevate transition-all duration-300 backdrop-blur-sm bg-card/80">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    {item.certificateUrl ? (
                      <a
                        href={item.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display text-xl font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                        data-testid={`link-cert-${item.id}`}
                      >
                        {item.title}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                    )}
                    <p className="font-body text-lg text-primary font-medium">
                      {item.organization}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground min-w-fit">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{item.startDate} - {item.endDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
                
                {item.skills && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-xs bg-primary/10 border-primary/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
