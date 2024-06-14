import { Link } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SignupSchema } from "@idityage/medium-types"

export default function Signup() {
  const [signupInput, setSignupInput] = useState<SignupSchema>({
    email: "",
    password: "",
    name: "",
  })

  return (
    <div className="w-full gap-10 lg:grid lg:min-h-[600px] lg:grid-cols-2 lg:gap-0 xl:min-h-[800px]">
      <div className="flex items-center justify-center p-6 xl:p-10">
        <div className="mx-auto w-[350px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/signin" className="underline" >
                Sign in
              </Link>
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="adii" required onChange={(e) => {
                setSignupInput((c) => ({ ...c, name: e.target.value }))
              }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required onChange={(e) => {
                setSignupInput((c) => ({ ...c, email: e.target.value }))
              }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="password" required onChange={(e) => {
                setSignupInput((c) => ({ ...c, password: e.target.value }))
                
              }} />
            </div>
            <Button type="submit" className="w-full" >
              Sign up
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