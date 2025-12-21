"use client"

import { motion } from "framer-motion"
import { MapPin, Link as LinkIcon, Calendar, Github, Twitter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("posts");

  // Activity Heatmap Data (GitHub-style)
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);~
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 10),
      });
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  const getColorIntensity = (count: number) => {
    if (count === 0) return "bg-slate-100 dark:bg-zinc-800";
    if (count <= 2) return "bg-green-200 dark:bg-green-900";
    if (count <= 5) return "bg-green-400 dark:bg-green-700";
    if (count <= 8) return "bg-green-600 dark:bg-green-500";
    return "bg-green-800 dark:bg-green-400";
  };

  const userPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications",
      excerpt:
        "Learn the best practices for building large-scale React apps...",
      likes: 456,
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Advanced TypeScript Patterns",
      excerpt: "Discover advanced TypeScript patterns that will level up...",
      likes: 789,
      date: "1 week ago",
    },
  ];

  return (
    <AppLayout>
      <div className="min-h-screen pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Profile Header */}
          <Card className="p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar - Center on mobile, left on desktop */}
              <motion.div
                className="flex justify-center md:justify-start"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <Avatar className="w-24 h-24 md:w-32 md:h-32">
                  <AvatarImage src="https://i.pravatar.cc/200?img=7" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </motion.div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h1 className="text-2xl md:text-3xl mb-2">Jane Developer</h1>
                  <p className="text-slate-600 dark:text-zinc-400 mb-4">
                    @janedev
                  </p>

                  {/* Stats - Horizontal on mobile */}
                  <div className="flex justify-center md:justify-start gap-6 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">42</div>
                      <div className="text-sm text-slate-600 dark:text-zinc-400">
                        Posts
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">1.2k</div>
                      <div className="text-sm text-slate-600 dark:text-zinc-400">
                        Followers
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">8.5k</div>
                      <div className="text-sm text-slate-600 dark:text-zinc-400">
                        Karma
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-700 dark:text-zinc-300 mb-4">
                    Full-stack developer passionate about React, TypeScript, and
                    building amazing user experiences. 🚀
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2 text-sm text-slate-600 dark:text-zinc-400 mb-4">
                    <div className="flex items-center gap-1 justify-center md:justify-start">
                      <MapPin className="w-4 h-4" />
                      <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-1 justify-center md:justify-start">
                      <LinkIcon className="w-4 h-4" />
                      <a
                        href="#"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        janedev.com
                      </a>
                    </div>
                    <div className="flex items-center gap-1 justify-center md:justify-start">
                      <Calendar className="w-4 h-4" />
                      <span>Joined January 2023</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
                    <Button>
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button variant="outline">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </Card>

          {/* Activity Heatmap */}
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Activity</h2>

            {/* Heatmap */}
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-53 gap-1">
                  {heatmapData.map((day, idx) => (
                    <motion.div
                      key={idx}
                      className={`w-3 h-3 rounded-sm ${getColorIntensity(
                        day.count
                      )}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.001 }}
                      whileHover={{ scale: 1.5 }}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3 text-sm text-slate-600 dark:text-zinc-400">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-zinc-800" />
                    <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900" />
                    <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700" />
                    <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-500" />
                    <div className="w-3 h-3 rounded-sm bg-green-800 dark:bg-green-400" />
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Tabs with Motion */}
          <Card className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </TabsList>

              <TabsContent value="posts">
                <motion.div
                  key="posts"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {userPosts.map((post, idx) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 border border-slate-200 dark:border-zinc-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-colors cursor-pointer"
                    >
                      <h3 className="text-lg font-semibold mb-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 dark:text-zinc-400 mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-zinc-400">
                        <span>{post.likes} likes</span>
                        <span>·</span>
                        <span>{post.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="drafts">
                <motion.div
                  key="drafts"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-12"
                >
                  <p className="text-slate-600 dark:text-zinc-400">
                    No drafts yet
                  </p>
                </motion.div>
              </TabsContent>

              <TabsContent value="saved">
                <motion.div
                  key="saved"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-12"
                >
                  <p className="text-slate-600 dark:text-zinc-400">
                    No saved posts
                  </p>
                </motion.div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
