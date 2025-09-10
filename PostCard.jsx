import React from 'react'
export default function PostCard({post, onLike, onOpen}){
  return (
    <div className='card'>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <img src={post.user?.avatar_url || '/logo.png'} alt='' className='avatar' />
        <div>
          <div style={{fontWeight:700}}>{post.user?.username || 'Anon'}</div>
          <div style={{fontSize:12,color:'#6B7280'}}>{new Date(post.createdAt).toLocaleString()}</div>
        </div>
      </div>
      {post.image_url && <img src={post.image_url} className='post-image' alt='' onClick={() => onOpen(post)} />}
      <h3>{post.title}</h3>
      <p style={{color:'#374151'}}>{post.content}</p>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <button className='btn small' onClick={() => onLike(post)}>Curtir ({post.likes_count||0})</button>
      </div>
    </div>
  )
}
