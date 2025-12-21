"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    username: string
  }
  content: string
  likes: number
  timeAgo: string
  replies?: Comment[]
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: "1",
    author: {
      name: "Alex Kumar",
      avatar: "/programmer.png",
      username: "@alexkumar",
    },
    content: "Great tutorial! I've been looking for something like this. The WebSocket implementation is very clear.",
    likes: 12,
    timeAgo: "2h ago",
    replies: [
      {
        id: "1-1",
        author: {
          name: "Sarah Chen",
          avatar: "/developer-working.png",
          username: "@sarahchen",
        },
        content: "Thank you! Glad it was helpful.",
        likes: 5,
        timeAgo: "1h ago",
      },
    ],
  },
  {
    id: "2",
    author: {
      name: "Maria Garcia",
      avatar: "/coder.png",
      username: "@mariagarcia",
    },
    content: "Would this work with Socket.io as well? Or is it specific to native WebSockets?",
    likes: 8,
    timeAgo: "4h ago",
    replies: [
      {
        id: "2-1",
        author: {
          name: "Sarah Chen",
          avatar: "/developer-working.png",
          username: "@sarahchen",
        },
        content:
          "Yes! Socket.io would work too. The concepts are similar, though Socket.io has some extra features like automatic reconnection.",
        likes: 3,
        timeAgo: "3h ago",
      },
    ],
  },
]

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(comment.likes)
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState("")

  // Limit indentation depth on mobile
  const maxDepth = 3
  const effectiveDepth = Math.min(depth, maxDepth)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <div className={cn("space-y-3", effectiveDepth > 0 && "ml-4 md:ml-8 pl-4 border-l-2")}>
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium text-sm">{comment.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {comment.author.username} · {comment.timeAgo}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm leading-relaxed">{comment.content}</p>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn("h-7 gap-1.5", liked && "text-red-500 hover:text-red-600")}
              onClick={handleLike}
            >
              <Heart className={cn("h-3.5 w-3.5", liked && "fill-current")} />
              <span className="text-xs">{likeCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-7 gap-1.5" onClick={() => setShowReply(!showReply)}>
              <MessageCircle className="h-3.5 w-3.5" />
              <span className="text-xs">Reply</span>
            </Button>
          </div>

          {showReply && (
            <div className="space-y-2 pt-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-[80px] text-sm"
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => setShowReply(false)}>
                  Cancel
                </Button>
                <Button size="sm" className="active:scale-95 transition-transform">
                  Reply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function CommentSection({ postId }: { postId: string }) {
  const [newComment, setNewComment] = useState("")

  return (
    <Card className="p-6 space-y-6">
      <h2 className="font-mono text-2xl font-bold">
        Discussion <span className="text-muted-foreground">({MOCK_COMMENTS.length})</span>
      </h2>

      {/* Add Comment */}
      <div className="space-y-3">
        <Textarea
          placeholder="Share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button className="active:scale-95 transition-transform">Post Comment</Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6 divide-y">
        {MOCK_COMMENTS.map((comment) => (
          <div key={comment.id} className="pt-6 first:pt-0">
            <CommentItem comment={comment} />
          </div>
        ))}
      </div>
    </Card>
  )
}
