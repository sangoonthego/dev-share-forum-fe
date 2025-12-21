import { type NextRequest, NextResponse } from "next/server"

interface ExpertMatch {
  username: string
  name: string
  avatar: string
  karma: number
  matchScore: number
  reason: string
  skills: string[]
}

export async function POST(request: NextRequest) {
  try {
    const { postContent, postTags, requiredSkills } = await request.json()

    // Simulate expert matching algorithm
    const experts = await findMatchingExperts(requiredSkills || postTags)

    return NextResponse.json({
      success: true,
      experts,
      matchedAt: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to match experts" }, { status: 500 })
  }
}

async function findMatchingExperts(skills: string[]): Promise<ExpertMatch[]> {
  // Mock expert database with vector similarity
  const mockExperts: ExpertMatch[] = [
    {
      username: "alexkumar",
      name: "Alex Kumar",
      avatar: "/programmer.png",
      karma: 2543,
      matchScore: 0.94,
      reason: "Có 15 bài viết về Node.js & Backend",
      skills: ["Node.js", "Backend", "Database", "API Design"],
    },
    {
      username: "sarahchen",
      name: "Sarah Chen",
      avatar: "/developer-working.png",
      karma: 1876,
      matchScore: 0.89,
      reason: "Expert về Real-time Systems & WebSocket",
      skills: ["React", "WebSocket", "Real-time", "Full-stack"],
    },
    {
      username: "jameswilson",
      name: "James Wilson",
      avatar: "/diverse-engineers-meeting.png",
      karma: 1234,
      matchScore: 0.82,
      reason: "Chuyên về System Architecture",
      skills: ["Architecture", "System Design", "Performance"],
    },
  ]

  // Sort by match score and return top 3
  return mockExperts.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3)
}
