import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Sparkles, Users, Shield, TrendingUp, Archive } from "lucide-react"
import { ExpertMatchingBanner } from "@/components/expert-matching-banner"
import { ModerationAlert } from "@/components/moderation-alert"
import { CommunityHealthMonitor } from "@/components/community-health-monitor"
import { DailyCuratorBanner } from "@/components/daily-curator-banner"
import { LegacyContentBanner } from "@/components/legacy-content-banner"

export default function AIDemoPage() {
  return (
    <AppLayout>
      <div className="min-h-screen">
        <div className="container mx-auto max-w-6xl py-6 space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <h1 className="font-mono text-4xl font-bold">Agentic AI System</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trải nghiệm hệ thống AI Agent tự động hóa và hỗ trợ cộng đồng DevShare
            </p>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3 w-3" />
                Powered by AI
              </Badge>
              <Badge variant="outline">Beta</Badge>
            </div>
          </div>

          {/* AI Features Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature 1: Chatbot Widget */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">AI Chatbot Widget</CardTitle>
                    <CardDescription>Hỗ trợ 24/7 với floating assistant</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Chatbot thông minh giúp tóm tắt bài viết, tìm chuyên gia, kiểm tra code và gợi ý SEO. Responsive hoàn
                  toàn với mobile drawer và desktop popover.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Mobile-first
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Quick Actions
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Context-aware
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Xem widget ở góc dưới bên phải màn hình</p>
              </CardContent>
            </Card>

            {/* Feature 2: Expert Matching */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Expert Matching Agent</CardTitle>
                    <CardDescription>Kết nối tự động với chuyên gia</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  AI phân tích kỹ năng cần thiết từ bài viết và tự động tìm top 3 experts có Karma cao nhất. Gửi
                  notification cá nhân hóa để mời họ tham gia.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Vector Search
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Karma-based
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Auto-notify
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Feature 3: Smart Editor */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Smart Editor Assistant</CardTitle>
                    <CardDescription>Cải thiện nội dung tự động</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Phân tích sau 2 giây ngừng gõ: Code audit, SEO optimization, auto-tagging, và gợi ý bài viết liên quan
                  để chèn link.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Code Review
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    SEO Tips
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Auto-linking
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Feature 4: Auto Moderator */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Auto Moderator</CardTitle>
                    <CardDescription>Bảo vệ cộng đồng 24/7</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Quét nội dung trước khi publish, phát hiện spam, mã độc và theo dõi sentiment trong comments. Tự động
                  can thiệp khi tranh cãi nóng lên.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Spam Detection
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Sentiment Analysis
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Real-time
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Feature 5: Daily Curator */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">AI Curator & Newsletter</CardTitle>
                    <CardDescription>Tổng hợp nội dung hàng ngày</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Cron job chạy hàng ngày để tổng hợp 10 bài viết hot nhất thành Daily DevShare Newsletter. Tự động phân
                  tích và tạo summary.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Auto-curate
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Daily Summary
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Scheduled
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Feature 6: Content Updater */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Archive className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Self-Evolving RAG Agent</CardTitle>
                    <CardDescription>Cập nhật nội dung cũ tự động</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Kiểm tra bài viết cũ hơn 2 năm, so sánh với kiến thức mới qua Web Search. Tự động đánh dấu "Legacy" và
                  thêm banner cảnh báo nếu lỗi thời.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Web Search
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Auto-update
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Knowledge Graph
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Demo Section */}
          <div className="space-y-4">
            <h2 className="font-mono text-2xl font-bold">Live Demos</h2>

            <DailyCuratorBanner />

            <ExpertMatchingBanner
              postId="demo-1"
              postTitle="Building Real-Time Chat with Next.js"
              requiredSkills={["Next.js", "WebSocket", "Real-time", "Node.js"]}
            />

            <ModerationAlert
              type="warning"
              title="Nội dung cần xem xét"
              message="AI đã phát hiện một số vấn đề trong bài viết của bạn. Vui lòng kiểm tra và chỉnh sửa trước khi publish."
              issues={[
                { line: 42, issue: "Phát hiện từ ngữ có thể gây tranh cãi" },
                { line: 78, issue: "Link không an toàn (http://)" },
              ]}
            />

            <CommunityHealthMonitor threadId="demo-thread" commentCount={25} />

            <LegacyContentBanner
              publishedDate="Jan 15, 2022"
              outdatedInfo="React 19 đã release với nhiều tính năng mới. Server Components giờ đã stable. Xem bài viết cập nhật về React 19 features."
            />
          </div>

          {/* Architecture Overview */}
          <Card>
            <CardHeader>
              <CardTitle>System Architecture</CardTitle>
              <CardDescription>Cách các AI Agents hoạt động và tương tác</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Frontend Layer</h4>
                    <ul className="text-muted-foreground space-y-1 text-xs">
                      <li>• React Components</li>
                      <li>• Real-time UI updates</li>
                      <li>• WebSocket connections</li>
                      <li>• Optimistic updates</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Agent Orchestration</h4>
                    <ul className="text-muted-foreground space-y-1 text-xs">
                      <li>• LangGraph workflows</li>
                      <li>• Multi-agent coordination</li>
                      <li>• Task scheduling (Cron)</li>
                      <li>• Event-driven triggers</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Data Layer</h4>
                    <ul className="text-muted-foreground space-y-1 text-xs">
                      <li>• Vector embeddings</li>
                      <li>• Semantic search</li>
                      <li>• Graph relationships</li>
                      <li>• Cache optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
