import { useEffect, useRef, useState } from 'react';
import '../App.css'
import search from '../assets/cart.png'
import cart from '../assets/search.png'
import { useNavigate } from 'react-router-dom'
import amazon from '../assets/amazon.png'
import greenbackground from '../assets/greenbackground.jpg'

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
  const [hidden, setHidden] =useState(false); 
  const timeoutRef = useRef<number | null>(null);

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
    console.log(user);
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

  const handleLogout = async () => {
    try{
      const res = await fetch(`${API_BASE_URL}/api/logout`,{
        method: 'POST',
        credentials: 'include'
      })
      const data = await res.json();
      alert(data.message);
    } catch(err){
      console.log(err);
    }
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHidden(false);
    }, 800);
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHidden(true);
  }

  return (
    <div className="">
      <div className='pl-5 pr-5 bg-[#131921] text-white flex gap-5'>
        <div onClick={() => navigate('/')} className='p-1 flex flex-col hover:cursor-pointer border border-[#131921] hover:border-white'>
        <div className='font-bold text-2xl'>SihyeonZon</div>
        <div className='relative bottom-1' style={{backgroundImage: `url(${amazon})`, backgroundPosition: 'center',
        backgroundSize: '120px 70px',backgroundRepeat: 'no-repeat',  width: 120, height:20}}></div>
        </div>
        <div className='flex items-center'>
        <input className='h-10 p-2' placeholder='Search Sihyeonzon'></input>
        <div className='bg-yellow-500 cursor-pointer p-1  ' style={{backgroundImage: `url(${search})`, backgroundPosition: 'center',
    backgroundSize: '40px 40px',backgroundRepeat: 'no-repeat',  width: 40, height:40}}></div>
        </div>
        {!user ? 
        <div className='p-1 flex flex-col cursor-pointer border border-[#131921] hover:border-white'
        onClick={() => navigate('/login')}>
        <div>Hello, sign in</div>
        <div>Account & Lists</div>
        </div>
         : 
         <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className=' cursor-pointer'>{user.username}</div>}
        <div className='flex items-center cursor-pointer border border-[#131921] hover:border-white'>
        <div className='invert' style={{backgroundImage: `url(${cart})`, backgroundPosition: 'center',
    backgroundSize: '50px 50px', backgroundRepeat: 'no-repeat',  width: 50, height:50}}></div>
        <div className='p-1 mt-4'>Cart</div>
        </div>
      </div>
      {hidden && 
        <div className='relative bg-white' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
         <div onClick={() => {handleLogout(); setUser(null); setHidden(false);}} className='text-center text-black cursor-pointer mb-4 rounded-2xl pt-2 pb-2 w-full bg-yellow-300'>Log out</div>
         
         <div className='flex'>
         <div className='flex flex-col text-gray-700'>
         <div className='text-black font-bold'>Your Lists</div>
         <div>Create a List</div>
         <div>Find a List or Registry</div>
         </div>

         <div className='flex flex-col text-gray-700'>
         <div className='text-black font-bold'>Your Account</div>
         <div>Account</div>
         <div>Orders</div>
         <div>Recommendations</div>
         <div>Browsing History</div>
         <div>Your Shopping preferences</div>
         <div>Watchlist</div>
         <div>Video Purchases & Rentals</div>
         </div> 
         </div>
        </div>}
      <div className='bg-[#192d41]'>s</div>
      <div className='-z-1 relative w-full h-[600px]'>
      <div className='absolute inset-0' style={{backgroundImage: `url(${greenbackground})`, backgroundSize: 'cover',backgroundRepeat: 'no-repeat' ,backgroundPosition: 'center'}}></div>
      <div className='relative p-2 bg-white'>Additional customs documents are required for your destination.<div className='pl-2 inline-block text-blue-700 cursor-pointer hover:underline hover:text-blue-900'>Please click here to learn more.</div></div>
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
      <div onClick={() => {
        if(!user){
          alert("You need to login!");
          navigate('/login');
          return ;
        } 
        navigate('/createpost')}} 
        className='cursor-pointer bg-yellow-300 p-2 max-w-20'>create post</div>
    <div className='bg-[#142535]'>
    <div className='flex gap-10 max-w-[1000px] pt-10 pb-14 mx-auto bg-[#142535] text-[#DDD]'>
     <div>
     <div className='text-white'>Get to Know Us</div>
     <div>Careers</div>
     <div>Blog</div>
     <div>About Amazon</div>
     <div>Investor Relations</div>
     <div>Amazon Devices</div>
     <div>Amazon Science</div>
     </div>
     <div>
     <div className='text-white'>Make Money with Us</div>
     <div>Sell products on Amazon</div>
     <div>Sell on Amazon Business</div>
     <div>Sell apps on Amazon</div>
     <div>Become an Affiliate</div>
     <div>Advertise Your Products</div>
     <div>Self-Publish with Us</div>
     <div>Host an Amazon Hub</div>
     <div>›See More Make Money with Us</div>
     </div>
     <div>
     <div className='text-white'>Amazon Payment Products</div>
     <div>Amazon Business Card</div>
     <div>Shop with Points</div>
     <div>Reload Your Balance</div>
     <div>Amazon Currency Converter</div>
     </div>
     <div>
     <div className='text-white'>Let Us Help You</div>
     <div>Amazon and COVID-19</div>
     <div>Your Account</div>
     <div>Your Orders</div>
     <div>Shipping Rates & Policies</div>
     <div>Returns & Replacements</div>
     <div>Manage Your Content and Devices</div>
     <div>Help</div>
     </div>
    </div>

    <div className='flex border-t border-gray-500  text-[#DDD]'>
    <div onClick={() => navigate('/')} className='p-1 flex flex-col hover:cursor-pointer'>
        <div className='text-white font-bold text-2xl'>SihyeonZon</div>
        <div className='relative bottom-1' style={{backgroundImage: `url(${amazon})`, backgroundPosition: 'center',
        backgroundSize: '120px 70px',backgroundRepeat: 'no-repeat',  width: 120, height:20}}></div>
    </div>
    <div>s</div>
    </div>
    </div>
    </div>
  )
}

export default Main
