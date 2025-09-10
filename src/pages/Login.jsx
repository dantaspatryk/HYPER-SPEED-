import React, { useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  async function submit(e){
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return alert(error.message)
    navigate('/feed')
  }
  return (
    <div style={{maxWidth:420,margin:'40px auto'}}>
      <h2>Entrar</h2>
      <form onSubmit={submit}>
        <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:8,marginBottom:8}} />
        <input placeholder='Senha' type='password' value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:8,marginBottom:8}} />
        <button className='btn' type='submit'>Entrar</button>
      </form>
      <p>Não tem conta? <Link to='/register'>Registre-se</Link></p>
    </div>
  )
}
