import { useEffect, useState } from 'react';
import '../App.css'
import search from '../assets/cart.png'
import cart from '../assets/search.png'
import { useNavigate } from 'react-router-dom'

interface Post {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image_url: string;
}

function Main() {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [posts, setPosts] = useState<Post[]>([]);

  const [user, setUser] = useState<{ username: string } | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try{
      const res = await fetch(`${API_BASE_URL}/api/me`, {
      credentials: 'include'
    })
      const data = await res.json();
      if(res.ok){
        setUser(data);
        console.log(data);
      }
    } catch(err){
      console.error(err);
    }}

    fetchUser();
  },[])

  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const res = await fetch(`${API_BASE_URL}/api/getposts`)
        const data = await res.json();
        setPosts(data);

      } catch(err){
        console.log(err);
      }
    } 
    fetchPosts();
  },[])

  return (
    <div className="">
      <div className='bg-[#131921] text-white flex gap-5 p-1'>
        <div className='flex items-center'>
        <input className='h-10 p-2' placeholder='Search Sihyeonzon'></input>
        <div className='bg-yellow-500 cursor-pointer p-1  ' style={{backgroundImage: `url(${search})`, backgroundPosition: 'center',
    backgroundSize: '40px 40px',backgroundRepeat: 'no-repeat',  width: 40, height:40}}></div>
        </div>
        {!user ? 
        <div className='flex flex-col cursor-pointer border border-[#131921] hover:border-white'
        onClick={() => navigate('/login')}>
        <div>Hello, sign in</div>
        <div>Account & Lists</div>
        </div>
         : 
         <div>{user.username}</div>}
        <div className='flex items-center cursor-pointer border border-[#131921] hover:border-white'>
        <div className='invert' style={{backgroundImage: `url(${cart})`, backgroundPosition: 'center',
    backgroundSize: '50px 50px', backgroundRepeat: 'no-repeat',  width: 50, height:50}}></div>
        <div className='mt-4'>Cart</div>
        </div>
      </div>
      <div>
        {posts.map((post: any) => (
          <div key={post.id}>
            <div>{post.title}</div>
            <div>{post.content}</div>
            <img src={``} />
          </div>
        ))}
      </div>
      <div onClick={() => navigate('/createpost')} className='cursor-pointer bg-yellow-300 p-2 max-w-20'>create post</div>
    </div>
  )
}

export default Main
