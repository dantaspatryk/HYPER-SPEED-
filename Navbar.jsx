import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar(){
  return (
    <nav style={{position:'fixed',bottom:0,left:0,right:0,height:60,background:'#fff',borderTop:'1px solid #DBDBDB',display:'flex',alignItems:'center',justifyContent:'space-around'}}>
      <Link to='/feed'>Feed</Link>
      <Link to='/explore'>Explore</Link>
      <Link to='/me/posts/create'>Create</Link>
      <Link to='/messages'>Messages</Link>
      <Link to='/profile/self'>Profile</Link>
    </nav>
  )
}
