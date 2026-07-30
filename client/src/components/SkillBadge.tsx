import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface SkillBadgeProps {
  name: string
  level: number // 1-100
  color?: string
  delay?: number
}

export function SkillBadge({ name, level, color = "default", delay = 0 }: SkillBadgeProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Animate in with delay
  setTimeout(() => setIsVisible(true), delay * 100)

  return (
    <div 
      className={`relative group transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <Badge
        variant="secondary"
        className="px-4 py-2 text-sm font-medium hover-elevate active-elevate-2 cursor-pointer"
        data-testid={`badge-skill-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
      >
        {name}
      </Badge>
      
      {/* Skill Level Tooltip */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover border border-popover-border rounded-md px-2 py-1 text-xs whitespace-nowrap z-10">
        {level}% proficiency
      </div>
      
      {/* Progress bar on hover */}
      <div className="absolute inset-x-0 -bottom-1 h-1 bg-muted rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  )
}