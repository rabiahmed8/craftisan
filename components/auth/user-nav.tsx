'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import type { User } from '@supabase/supabase-js'

export function UserNav() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return <div className="h-9 w-32 bg-muted animate-pulse rounded-md"></div>
  }

  if (!user) {
    return (
      <nav className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push('/login')}>
          Login
        </Button>
        <Button size="sm" onClick={() => router.push('/signup')}>
          Start Selling
        </Button>
      </nav>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium">
        {user.user_metadata?.name || user.email}
      </span>
      <Button variant="outline" size="sm" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}
