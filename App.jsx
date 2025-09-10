import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import { supabase } from './services/supabaseClient'

export default function App(){
  const navigate = useNavigate()
  async function handleLogout(){
    await supabase.auth.signOut()
    navigate('/login')
  }
  return (
    <div className='app'>
      <header>
        <div className='brand'><Link to='/feed'>HYPER SPEED</Link></div>
        <div style={{marginLeft:'auto'}}>
          <button onClick={handleLogout} className='btn small'>Logout</button>
        </div>
      </header>
      <main><Outlet /></main>
      <Navbar />
    </div>
  )
}
