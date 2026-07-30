import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  publishedDate: string
  readTime: number
  featured?: boolean
}

interface BlogCardProps {
  post: BlogPost
  onClick: () => void
}

export function BlogCard({ post, onClick }: BlogCardProps) {
  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/30 hover-elevate"
      onClick={onClick}
      data-testid={`card-blog-${post.id}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="font-display text-xl group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </CardTitle>
          {post.featured && (
            <Badge className="bg-gradient-to-r from-primary to-accent flex-shrink-0">
              Featured
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs bg-primary/5 border-primary/20"
            >
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline" className="text-xs bg-muted/20">
              +{post.tags.length - 3} more
            </Badge>
          )}
        </div>

        {/* Read More Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center hover-elevate active-elevate-2 group/btn"
          data-testid={`button-read-more-${post.id}`}
        >
          Read Article
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  )
}