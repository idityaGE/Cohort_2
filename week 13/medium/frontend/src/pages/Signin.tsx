import { Link, useNavigate } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SigninSchema } from "@idityage/medium-types"
import axios from "axios"
import { BACKEND_URL } from "@/config"

export default function Component() {
  const navigate = useNavigate()

  const [signinInput, setSigninInput] = useState<SigninSchema>({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${BACKEND_URL}/user/signin`, signinInput)
      const jwt = response.data.token
      localStorage.setItem("jwt", jwt)
      navigate("/blogs")
    } catch (error) {
      alert("An error occurred. Please try again.")
    }
  }
  return (
    <div className="w-full gap-10 lg:grid lg:min-h-[600px] lg:grid-cols-2 lg:gap-0 xl:min-h-[800px]">
      <div className="flex items-center justify-center p-6 xl:p-10">
        <div className="mx-auto w-[350px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign in</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required onChange={(e) => {
                setSigninInput((c) => ({ ...c, email: e.target.value }))
              }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required onChange={(e) => {
                setSigninInput((c) => ({ ...c, password: e.target.value }))
              }} />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Sign in
            </Button>
          </div>
        </div>
      </div>
      <div className="items-center justify-center p-6 lg:flex lg:bg-gray-100 lg:p-10 dark:lg:bg-gray-800">
        <div className="mx-auto grid max-w-[350px] gap-3 lg:max-w-[500px]">
          <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
            &ldquo;Blogging is a powerful way to share your thoughts, connect with others, and grow your online
            presence.&rdquo;
          </blockquote>
          <div>
            <div className="font-semibold">Jane Doe</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Founder, Acme Blog</div>
          </div>
        </div>
      </div>
    </div>
  )
}