'use client'
// RemodelProApp - Production version
// This component wraps the existing RemodelPro app logic with Supabase data layer
// For the initial deployment, we use a hybrid approach:
// - Auth via Supabase (login/session)
// - Data stored in Supabase tables
// - Same UI as the prototype

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useCustomers, useProjects, useBuilds } from '@/lib/use-data'

export default function RemodelProApp({ user, profile, supabase, onSignOut }) {
  // This will be the full app component
  // For now, render a placeholder that confirms auth works
  
  const { customers, loading, createCustomer } = useCustomers(supabase, profile)

  if (loading) return <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'#6b7186'}}>Loading your data...</div>

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',background:'#0B0D10',color:'#e8eaf0',fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{padding:16,borderBottom:'1px solid #1d2130',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontFamily:"'Instrument Serif',serif",fontSize:20}}>Remodel<span style={{color:'#3b6df0'}}>Pro</span></div>
          <div style={{fontSize:10,color:'#6b7186'}}>Logged in as {profile?.full_name || user.email} ({profile?.role || 'rep'})</div>
        </div>
        <button onClick={onSignOut} style={{padding:'6px 12px',borderRadius:8,border:'1px solid #1d2130',background:'transparent',color:'#6b7186',fontSize:11,cursor:'pointer',fontFamily:'inherit'}}>
          Sign Out
        </button>
      </div>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16}}>
        <div style={{fontSize:24,fontWeight:700}}>Welcome, {profile?.full_name || 'Rep'}</div>
        <div style={{fontSize:13,color:'#6b7186'}}>{customers.length} customer{customers.length!==1?'s':''} assigned to you</div>
        <div style={{fontSize:11,color:'#454b5e',maxWidth:400,textAlign:'center',lineHeight:1.6}}>
          Your RemodelPro system is connected to Supabase and ready for deployment.
          The full app UI will be integrated in the next step.
        </div>
      </div>
    </div>
  )
}
