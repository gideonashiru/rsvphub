'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function LogoutButton() {
  const router = useRouter()

  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorMsg = `Logout failed: ${response.statusText || 'Unknown error'}`;
        throw new Error(errorMsg);
      }

      toast.success('Logged out successfully');
      router.push('/auth/login');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error(message);
    }
  }

  return <Button className="cursor-pointer" onClick={logout}>Logout</Button>
}
