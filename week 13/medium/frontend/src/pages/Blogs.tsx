import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

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
      <header className="px-4 lg:px-6 h-14 flex items-center border-b mb-6">
        <Link to="#" className="flex items-center justify-center">
          <MountainIcon className="size-6" />
          <span className="sr-only">Acme Blog</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="/blogs" className="text-sm font-medium hover:underline underline-offset-4" >
            Blog
          </Link>
          <Link to="/" className="text-sm font-medium hover:underline underline-offset-4" >
            Home
          </Link>
          <Link to="/signin" className="text-sm font-medium hover:underline underline-offset-4" onClick={() => localStorage.removeItem('jwt')}>
            logout
          </Link>
        </nav>
      </header>
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
        <Button className="flex w-96 items-center justify-center gap-2 rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300" onClick={()=> navigate('/create')}>
          <PlusIcon className="h-5 w-5" />
          Create Post
        </Button>
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
                  <CardTitle className="text-2xl font-bold cursor-pointer" onClick={() => navigate(`/blog/${item.id}`)}>
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

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}