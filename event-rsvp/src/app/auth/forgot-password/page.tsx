import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Password Recovery</CardTitle>
            <CardDescription>Not applicable with this authentication system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This application uses a simplified authentication system with usernames only. There are no passwords, so password recovery is not needed.
              </p>
              <p className="text-sm text-muted-foreground">
                If you&apos;ve forgotten your username, please create a new account with a different username.
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/auth/login">
                  <Button className="w-full">Back to Login</Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button variant="outline" className="w-full">Create New Account</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
