// src/hooks/useAuth.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'

export function useAuth({ redirectTo } = {}) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)

      if (redirectTo && !session?.user) {
        router.push(redirectTo)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      
      if (redirectTo && !session?.user) {
        router.push(redirectTo)
      }
    })

    return () => subscription.unsubscribe()
  }, [redirectTo, router])

  return { user, loading }
}