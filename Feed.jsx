import React, { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'
import PostCard from '../components/PostCard'

export default function Feed(){
  const [posts,setPosts] = useState([])
  useEffect(() => {
    fetchPosts()
    const subscription = supabase.channel('public:posts').on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, payload => {
      fetchPosts()
    }).subscribe()
    return () => { supabase.removeChannel(subscription) }
  },[])
  async function fetchPosts(){
    const { data, error } = await supabase.from('posts').select('*, users:author_id (id, username, avatar_url)').order('created_at',{ ascending:false }).limit(50)
    if (error) return console.error(error)
    // normalize to match component props
    const normalized = data.map(d => ({
      id: d.id,
      title: d.title,
      content: d.content,
      image_url: d.image_url,
      likes_count: d.likes_count,
      createdAt: d.created_at,
      user: d.users && { id: d.users.id, username: d.users.username, avatar_url: d.users.avatar_url }
    }))
    setPosts(normalized)
  }
  async function handleLike(post){
    // naive increment - recommend RLS and server function in prod
    const { error } = await supabase.from('posts').update({ likes_count: (post.likes_count||0) + 1 }).eq('id', post.id)
    if (error) return alert(error.message)
    fetchPosts()
  }
  function openImage(post){
    // open full screen - for now just open image in new tab
    if (post.image_url) window.open(post.image_url, '_blank')
  }
  return (
    <div>
      <h2>Feed</h2>
      <div className='grid'>
        {posts.map(p => <PostCard key={p.id} post={p} onLike={handleLike} onOpen={openImage} />)}
      </div>
    </div>
  )
}
