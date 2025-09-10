import React, { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'

export default function Messages(){
  const [user, setUser] = useState(null)
  const [text, setText] = useState('')
  const [chats, setChats] = useState([])

  useEffect(()=>{ (async ()=>{ const u = (await supabase.auth.getUser()).data.user; setUser(u); fetchChats(u) })() },[])
  async function fetchChats(u){
    // naive: fetch last messages where user is sender or receiver
    const { data } = await supabase.from('messages').select('*').or(`sender_id.eq.${u.id},receiver_id.eq.${u.id}`).order('created_at',{ascending:false}).limit(50)
    setChats(data || [])
    // subscribe realtime
    const sub = supabase.channel('public:messages').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
      fetchChats(u)
    }).subscribe()
    return () => supabase.removeChannel(sub)
  }
  async function send(){
    if (!text) return
    const otherId = chats.length ? (chats[0].sender_id === user.id ? chats[0].receiver_id : chats[0].sender_id) : null
    const { error } = await supabase.from('messages').insert([{ sender_id: user.id, receiver_id: otherId, text }])
    if (error) return alert(error.message)
    setText('')
    fetchChats(user)
  }
  return (
    <div>
      <h2>Mensagens</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:12}}>
        <div className='card'>
          <h4>Contatos (placeholder)</h4>
          {chats.slice(0,10).map(c=>(
            <div key={c.id} style={{padding:8,borderBottom:'1px solid #eee'}}>{c.sender_id === user?.id ? 'Você' : c.sender_id}</div>
          ))}
        </div>
        <div className='card'>
          <div style={{height:400,overflowY:'auto'}}>
            {chats.map(c=><div key={c.id} style={{padding:8,marginBottom:8,background:c.sender_id===user?.id?'#DCFCE7':'#FFF',borderRadius:8}}>{c.text}</div>)}
          </div>
          <div style={{display:'flex',gap:8,marginTop:8}}>
            <input value={text} onChange={e=>setText(e.target.value)} style={{flex:1,padding:8}} placeholder='Digite uma mensagem' />
            <button className='btn' onClick={send}>Enviar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
