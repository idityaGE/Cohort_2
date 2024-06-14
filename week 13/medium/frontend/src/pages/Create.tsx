import { Link, useNavigate } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "@/config"

interface BlogPost {
  title: string
  content: string
}

export default function Create() {
  const navigator = useNavigate()
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "",
    content: "",
  })
  const jwt = localStorage.getItem('jwt')

  const handleCreate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    try {
      await axios.post(`${BACKEND_URL}/blog`, blogPost, { headers: { Authorization: `Bearer ${jwt}` } })
      navigator('/blogs')
    } catch (error) {
      alert("An error occurred. Please try again.")
    }
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to="#" className="flex items-center justify-center">
          <MountainIcon className="size-6" />
          <span className="sr-only">Acme Blog</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4">
            Blog
          </Link>
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4" >
            Home
          </Link>
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4" >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Create a New Blog Post</h1>
              <p className="text-gray-500 mt-2 dark:text-gray-400">
                Fill out the form below to publish a new blog post.
              </p>
            </div>
            <form className="space-y-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter a title for your post"
                  className="mt-1"
                  onChange={(e) => setBlogPost((c) => ({ ...c, title: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  rows={10}
                  placeholder="Start writing your blog post content here..."
                  className="mt-1"
                  onChange={(e) => setBlogPost((c) => ({ ...c, content: e.target.value }))}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="ml-auto" onClick={handleCreate}>
                  Publish Post
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2024 Acme Blog. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-xs hover:underline underline-offset-4" >
            Terms of Service
          </Link>
          <Link to="#" className="text-xs hover:underline underline-offset-4" >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
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