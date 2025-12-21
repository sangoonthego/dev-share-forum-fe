import { type NextRequest, NextResponse } from "next/server"

interface ModerationResult {
  safe: boolean
  severity: "safe" | "warning" | "error"
  issues: Array<{
    type: string
    message: string
    line?: number
    suggestion?: string
  }>
  sentiment?: number
}

export async function POST(request: NextRequest) {
  try {
    const { content, contentType } = await request.json()

    const result = await moderateContent(content, contentType)

    return NextResponse.json({
      success: true,
      moderation: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Moderation failed" }, { status: 500 })
  }
}

async function moderateContent(content: string, type: "post" | "comment"): Promise<ModerationResult> {
  const issues: ModerationResult["issues"] = []
  let safe = true
  let severity: ModerationResult["severity"] = "safe"

  // Check for spam patterns
  if (content.includes("click here") || content.includes("buy now")) {
    issues.push({
      type: "spam",
      message: "Phát hiện ngôn từ spam marketing",
      suggestion: "Hãy tập trung vào chia sẻ kiến thức kỹ thuật",
    })
    severity = "warning"
    safe = false
  }

  // Check for malicious code
  if (content.includes("<script>") || content.includes("eval(")) {
    issues.push({
      type: "malware",
      message: "Phát hiện mã độc tiềm ẩn",
      suggestion: "Code này vi phạm chính sách bảo mật",
    })
    severity = "error"
    safe = false
  }

  // Sentiment analysis (mock)
  const sentiment = analyzeSentiment(content)

  if (sentiment < 0.3 && type === "comment") {
    issues.push({
      type: "negative_sentiment",
      message: "Nội dung có thể gây tranh cãi",
      suggestion: "Hãy giữ thái độ chuyên nghiệp và tôn trọng",
    })
    severity = severity === "safe" ? "warning" : severity
  }

  return {
    safe,
    severity,
    issues,
    sentiment,
  }
}

function analyzeSentiment(text: string): number {
  // Simple sentiment analysis
  const negativeWords = ["stupid", "idiot", "hate", "terrible", "awful", "sucks"]
  const positiveWords = ["great", "awesome", "excellent", "helpful", "thanks", "good"]

  let score = 0.5 // neutral

  negativeWords.forEach((word) => {
    if (text.toLowerCase().includes(word)) score -= 0.15
  })

  positiveWords.forEach((word) => {
    if (text.toLowerCase().includes(word)) score += 0.1
  })

  return Math.max(0, Math.min(1, score))
}
