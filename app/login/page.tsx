"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Label } from "@radix-ui/react-label"
import axios from "axios"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const Login = () => {
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    mobile: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const loginHandler = async () => {
    try {
      const { data } = await axios.post(
        "https://dev-api.paybolt.in/api/v1/auth/login",
        // "http://localhost:4000/api/v1/auth/login",
        {
          mobile: formData.mobile,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      )

      router.push("/")

      console.log(data, "data")
    } catch (e) {
      console.log(e, "error")
    }
  }
  return (
    <section className="flex justify-center items-center py-10 min-h-[60vh]">
      <Card className="w-[350px] p-5">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  onChange={handleChange}
                  value={formData.mobile}
                  placeholder="Mobile of your account"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="Password of your account"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" onClick={loginHandler}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}

export default Login
