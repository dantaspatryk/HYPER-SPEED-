import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
export default function Profile(){
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [media, setMedia] = useState([])
  useEffect(()=>{ fetchProfile(); fetchMedia() },[id])
  async function fetchProfile(){
    const uid = id==='self' ? (await supabase.auth.getUser()).data.user?.id : id
    const { data, error } = await supabase.from('users').select('id, username, avatar_url, bio').eq('id', uid).single()
    if (error) return console.error(error)
    setProfile(data)
  }
  async function fetchMedia(){
    const uid = id==='self' ? (await supabase.auth.getUser()).data.user?.id : id
    const { data, error } = await supabase.from('posts').select('*').eq('author_id', uid).order('created_at',{ascending:false})
    if (error) return console.error(error)
    setMedia(data || [])
  }
  if (!profile) return <div>Carregando...</div>
  return (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <img src={profile.avatar_url || '/logo.png'} className='avatar' alt='' />
        <div>
          <h3>{profile.username}</h3>
          <p style={{color:'#6B7280'}}>{profile.bio}</p>
        </div>
      </div>
      <h4>Mídia</h4>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
        {media.map(m => <img key={m.id} src={m.image_url} style={{width:'100%',height:120,objectFit:'cover',borderRadius:8}} onClick={()=>window.open(m.image_url,'_blank')} />)}
      </div>
    </div>
  )
}
