import React, { useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { useNavigate, Link } from 'react-router-dom'
export default function Register(){
  const [email,setEmail] = useState(''); const [password,setPassword]=useState(''); const [username,setUsername]=useState('')
  const nav = useNavigate()
  async function submit(e){
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { username } } })
    if (error) return alert(error.message)
    nav('/login')
  }
  return (
    <div style={{maxWidth:420,margin:'40px auto'}}>
      <h2>Registrar</h2>
      <form onSubmit={submit}>
        <input placeholder='Usuário' value={username} onChange={e=>setUsername(e.target.value)} style={{width:'100%',padding:8,marginBottom:8}} />
        <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:8,marginBottom:8}} />
        <input placeholder='Senha' type='password' value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:8,marginBottom:8}} />
        <button className='btn' type='submit'>Criar conta</button>
      </form>
      <p>Já tem conta? <Link to='/login'>Entrar</Link></p>
    </div>
  )
}
