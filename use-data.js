'use client'
import { useState, useEffect, useCallback } from 'react'

// Hook to manage customers data via Supabase
export function useCustomers(supabase, profile) {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const { data } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })
    setCustomers(data || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { load() }, [load])

  const createCustomer = async (cust) => {
    const { data, error } = await supabase
      .from('customers')
      .insert({ ...cust, assigned_rep_id: profile?.id })
      .select()
      .single()
    if (data) setCustomers(prev => [data, ...prev])
    return { data, error }
  }

  const updateCustomer = async (id, updates) => {
    const { error } = await supabase
      .from('customers')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (!error) setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
    return { error }
  }

  return { customers, loading, createCustomer, updateCustomer, reload: load }
}

// Hook to manage projects for a customer
export function useProjects(supabase, customerId) {
  const [projects, setProjects] = useState([])

  const load = useCallback(async () => {
    if (!customerId) { setProjects([]); return }
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false })
    setProjects(data || [])
  }, [supabase, customerId])

  useEffect(() => { load() }, [load])

  const createProject = async (proj) => {
    const { data, error } = await supabase
      .from('projects')
      .insert({ ...proj, customer_id: customerId })
      .select()
      .single()
    if (data) setProjects(prev => [data, ...prev])
    return { data, error }
  }

  const updateProject = async (id, updates) => {
    const { error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (!error) setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
    return { error }
  }

  return { projects, createProject, updateProject, reload: load }
}

// Hook to manage builds for a project
export function useBuilds(supabase, projectId) {
  const [builds, setBuilds] = useState([])

  const load = useCallback(async () => {
    if (!projectId) { setBuilds([]); return }
    const { data } = await supabase
      .from('builds')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })
    setBuilds(data || [])
  }, [supabase, projectId])

  useEffect(() => { load() }, [load])

  const createBuild = async (build) => {
    const { data, error } = await supabase
      .from('builds')
      .insert({ ...build, project_id: projectId })
      .select()
      .single()
    if (data) setBuilds(prev => [data, ...prev])
    return { data, error }
  }

  const updateBuild = async (id, updates) => {
    const { error } = await supabase
      .from('builds')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (!error) setBuilds(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b))
    return { error }
  }

  const deleteBuild = async (id) => {
    const { error } = await supabase
      .from('builds')
      .delete()
      .eq('id', id)
    if (!error) setBuilds(prev => prev.filter(b => b.id !== id))
    return { error }
  }

  return { builds, createBuild, updateBuild, deleteBuild, reload: load }
}
