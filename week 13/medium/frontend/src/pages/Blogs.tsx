import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { useNavigate } from "react-router-dom"

interface BlogPost {
  id: number
  title: string
  content: string
  published: boolean
  author: {
    name: string
  }
}


export default function Blogs() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("user")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const jwt = localStorage.getItem("jwt")
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/blog/all`, { headers: { Authorization: `Bearer ${jwt}` } })
        setBlogPosts(response.data)
      } catch (error) {
        alert("An error occurred. Please try again.")
      }
    }
    fetchPosts()
  }, [])

  const [userPosts, setUserPosts] = useState<BlogPost[]>([])
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/blog/bulk`, { headers: { Authorization: `Bearer ${jwt}` } })
        setUserPosts(response.data)
      } catch (error) {
        alert("An error occurred. Please try again.")
      }
    }
    fetchPosts()
  }, [])

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
            {blogPosts.map((item) => (
              <Card key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardHeader className="px-6 py-4">
                  <CardTitle className="text-2xl font-bold" >
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.author.name}</CardDescription>
                </CardHeader>
                <CardContent className="px-6 py-4 text-gray-600">
                  <p>{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {activeTab === "user" && (
          <div className="grid gap-6">
            {userPosts.map((item) => (
              <Card key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardHeader className="px-6 py-4">
                  <CardTitle className="text-2xl font-bold cursor-pointer" onClick={(e) => navigate(`/blog/${item.id}`)}>
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.author.name}</CardDescription>
                </CardHeader>
                <CardContent className="px-6 py-4 text-gray-600">
                  <p>{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}