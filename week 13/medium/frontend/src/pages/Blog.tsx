import { Link, useLocation, useNavigate } from "react-router-dom"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "@/config"

export default function Blog() {
  const navigator = useNavigate()
  const location = useLocation()
  const jwt = localStorage.getItem('jwt')
  const id = location.pathname.split("/")[2]
  const [blogPost, setBlogPost] = useState<any>({})
  const handleClick = async (id: string) => {
    try {
      const post = await axios.get(`${BACKEND_URL}/blog/get/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
      setBlogPost(post.data)
    } catch (error) {
      alert("An error occurred. Please try again.")
    }
  }
  useEffect(() => {
    handleClick(id)
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/blog/delete/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
      navigator('/blogs')
    } catch (error) {
      alert("An error occurred. Please try again.")
    }
  }

  const handlePublish = async (id: string) => {
    try {
      await axios.post(`${BACKEND_URL}/blog/publish/${id}`, {}, { headers: { Authorization: `Bearer ${jwt}` } })
      navigator('/blogs')
    } catch (error) {
      alert("An error occurred. Please try again.")
    }
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to="#" className="flex items-center justify-center" >
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Blog</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="/blogs" className="text-sm font-medium hover:underline underline-offset-4" >
            Blog
          </Link>
          <Link to="/" className="text-sm font-medium hover:underline underline-offset-4" >
            Home
          </Link>
          <Link to="/signin" className="text-sm font-medium hover:underline underline-offset-4" onClick={(e) => localStorage.removeItem('jwt')}>
            logout
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">{blogPost.title}</h2>
                <p className="text-gray-500 mt-2 dark:text-gray-400">
                  {blogPost.content}
                </p>
              </div>
              <div>
                {" "}
                <div className="flex justify-end gap-2">
                  <Link
                    to={`/update/${blogPost.id}`}
                    className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300" >
                    Update
                  </Link>
                  <Link
                    to="#"
                    className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-green-50 shadow transition-colors hover:bg-green-900/90 focus:outline-none focus:ring-2 focus:ring-green-950 focus:ring-offset-2 dark:bg-green-50 dark:text-green-900 dark:hover:bg-green-50/90 dark:focus:ring-green-300" onClick={(e) => { handlePublish(blogPost.id) }}>
                    Publish
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-red-400"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this blog post?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your blog post.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={(e) => { handleDelete(id) }}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <AlertDialog />
              </div>
            </div>
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