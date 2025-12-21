import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    // Simulate AI processing with intelligent responses
    const response = await generateAIResponse(message, context)

    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to process AI request" }, { status: 500 })
  }
}

async function generateAIResponse(message: string, context?: any): Promise<string> {
  const lowerMessage = message.toLowerCase()

  // Intent detection
  if (lowerMessage.includes("tóm tắt") || lowerMessage.includes("summarize")) {
    return `Tôi đã phân tích bài viết. Đây là bản tóm tắt:\n\nBài viết tập trung vào việc xây dựng ứng dụng ${context?.topic || "web"} với các công nghệ hiện đại. Nội dung bao gồm setup, implementation chi tiết và best practices. Độ dài: ${context?.wordCount || "500"} từ, thời gian đọc ước tính ${context?.readTime || "5 phút"}.`
  }

  if (lowerMessage.includes("chuyên gia") || lowerMessage.includes("expert")) {
    return `Dựa trên kỹ năng cần thiết, tôi đã tìm thấy 3 chuyên gia phù hợp:\n\n1. **@alexkumar** - 2.5k Karma, chuyên Backend & Node.js\n2. **@sarahchen** - 1.8k Karma, chuyên Full-stack Development\n3. **@jameswilson** - 1.2k Karma, chuyên API Design\n\nTôi có thể gửi notification mời họ tham gia thảo luận không?`
  }

  if (lowerMessage.includes("code") || lowerMessage.includes("kiểm tra") || lowerMessage.includes("lỗi")) {
    return `Kết quả kiểm tra code:\n\n✅ **Syntax**: Không phát hiện lỗi cú pháp\n⚠️ **Best Practices**: Nên thêm error handling cho async operations\n⚠️ **Performance**: Consider using useMemo cho heavy computations\n✅ **Security**: Không phát hiện lỗ hổng bảo mật\n\nBạn muốn tôi đề xuất code improvements cụ thể không?`
  }

  if (lowerMessage.includes("tag") || lowerMessage.includes("đề xuất")) {
    return `Dựa trên phân tích nội dung, đây là tags phù hợp:\n\n**Recommended**: #TypeScript #React #Next.js #Tutorial\n**Optional**: #WebDev #Frontend #JavaScript\n\nCác tags này sẽ tăng khả năng được tìm thấy lên 45% trong community.`
  }

  if (lowerMessage.includes("seo") || lowerMessage.includes("tiêu đề")) {
    return `Gợi ý cải thiện SEO:\n\n**Current**: "${context?.title || "Your title"}"\n\n**Suggestions**:\n1. "${context?.title || "Title"} - Complete Guide 2024"\n2. "How to ${context?.title || "Build Something"}: Step-by-Step Tutorial"\n3. "${context?.title || "Title"} for Beginners (with Examples)"\n\nMẹo: Thêm số hoặc năm vào tiêu đề sẽ tăng CTR lên 36%.`
  }

  // Default helpful response
  return `Tôi sẵn sàng hỗ trợ bạn với:\n\n🤖 **Tóm tắt nội dung** - Tạo summary ngắn gọn\n👥 **Tìm chuyên gia** - Match với expert phù hợp\n🔍 **Kiểm tra code** - Code review & best practices\n🏷️ **Gợi ý tags** - Auto-tagging thông minh\n📈 **Tối ưu SEO** - Cải thiện tiêu đề & visibility\n\nHãy cho tôi biết bạn cần gì!`
}
