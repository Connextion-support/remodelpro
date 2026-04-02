'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'
import RemodelProApp from '@/components/RemodelProApp'

export default function Home() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        setProfile(profile)
      }
      setLoading(false)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
      } else {
        window.location.href = '/login'
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (loading) return (
    <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'#6b7186'}}>
      Loading...
    </div>
  )

  if (!user) {
    window.location.href = '/login'
    return null
  }

  return <RemodelProApp user={user} profile={profile} supabase={supabase} onSignOut={handleSignOut} />
}
