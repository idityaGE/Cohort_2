import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Blogs() {
  const [activeTab, setActiveTab] = useState("blog")
  const blogPosts = [
    {
      title: "The Future of Web Development",
      content: "Explore the latest trends and technologies shaping the web of tomorrow.",
    },
    {
      title: "Mastering React Hooks",
      content: "Dive deep into the power of React Hooks and learn how to build more efficient components.",
    },
    {
      title: "Sustainable Design Practices",
      content: "Discover eco-friendly design principles that can help reduce your carbon footprint.",
    },
  ]
  const userPosts = [
    {
      title: "My Favorite Vacation Spots",
      content: "From tropical beaches to snowy mountains, these are the places I love to visit.",
    },
    {
      title: "Tips for Staying Productive",
      content: "Boost your productivity with these simple yet effective strategies.",
    },
    {
      title: "Book Review: The Alchemist",
      content: "Dive into the captivating story of a young shepherd's journey of self-discovery.",
    },
  ]
  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="flex justify-center mb-8">
        <Tabs
          defaultValue="blog"
          value={activeTab}
          onValueChange={setActiveTab}
          className="rounded-lg bg-gray-100 dark:bg-gray-800 p-1"
        >
          <TabsList>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="user">User Posts</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid gap-8">
        {activeTab === "blog" && (
          <div className="grid gap-6">
            {blogPosts.map((post, index) => (
              <Card key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardHeader className="px-6 py-4">
                  <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4 text-gray-600">
                  <p>{post.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {activeTab === "user" && (
          <div className="grid gap-6">
            {userPosts.map((post, index) => (
              <Card key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardHeader className="px-6 py-4">
                  <CardTitle className="text-lg font-medium">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4 text-gray-600">
                  <p>{post.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}