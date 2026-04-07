"use client";

import { cn } from "@/lib/utils/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      let data;
      const responseText = await response.text();
      console.log('Login response status:', response.status);
      console.log('Raw response:', responseText);
      
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (jsonError) {
        console.error('Failed to parse JSON response:', jsonError);
        console.error('Response was:', responseText);
        const errorMsg = `Invalid server response (status ${response.status}): ${responseText.substring(0, 100)}`;
        setError(errorMsg);
        toast.error(errorMsg);
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      toast.success("Login successful!");
      router.push("/");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An error occurred";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccess = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const demoUsername = process.env.NEXT_PUBLIC_DEMO_USERNAME || "demo";
      
      // 1. Ensure demo user exists
      const setupResponse = await fetch("/api/auth/setup-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!setupResponse.ok) {
        // If setup fails, we cannot guarantee the user exists, so we stop here.
        const setupData = await setupResponse.json();
        throw new Error(setupData.error || "Failed to set up demo user. Please contact support.");
      }

      // 2. Now login with demo credentials
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: demoUsername }),
      });

      let data;
      const responseText = await response.text();
      console.log('Demo login response status:', response.status);
      console.log('Raw response:', responseText);
      
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (jsonError) {
        console.error('Failed to parse JSON response:', jsonError);
        console.error('Response was:', responseText);
        const errorMsg = `Invalid server response (status ${response.status}): ${responseText.substring(0, 100)}`;
        setError(errorMsg);
        toast.error(errorMsg);
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Demo login failed");
      }

      toast.success("Demo login successful!");
      router.push("/");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An error occurred";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:gap-6 mt-50 sm:mt-8 px-4 sm:px-0",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 px-4 sm:px-6 pt-4 sm:pt-6">
          <CardTitle className="text-xl sm:text-2xl">Login</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Enter your username to access RSVP Hub
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="bg-muted border border-border rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <span className="text-lg sm:text-xl">👨‍💼</span>
              <h3 className="text-sm sm:text-base font-semibold text-foreground">
                For Recruiters & Employers
              </h3>
            </div >

            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
              Try the demo account instantly with no signup required!
            </p>

            <Button
              onClick={demoAccess}
              className="w-full text-xs sm:text-sm py-2 sm:py-2.5 cursor-pointer"
            >
              Try Demo Account
            </Button>
          </div >

          {/* Divider */}
          <div className="relative my-4 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div >
            <div className="relative flex justify-center text-xs sm:text-sm uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or login with username
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-sm sm:text-base">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-9 sm:h-10 text-sm sm:text-base"
                  disabled={isLoading}
                  autoFocus
                />
              </div >

              {error && (
                <p className="text-xs sm:text-sm text-destructive break-words">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full h-9 sm:h-10 text-sm sm:text-base cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div >

            <div className="mt-4 sm:mt-6 text-center">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div >
  );
}
