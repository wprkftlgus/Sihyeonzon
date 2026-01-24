import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import '../App.css'
import searchimg from '../assets/cart.png'
import cart from '../assets/search.png'
import amazon from '../assets/amazon.png'
import uk from '../assets/uk.png'
import loadingGif from '../assets/loading.gif'
import Loading from './loading.tsx';

interface Post {
  id: number;
  user_id: number;
  title: string;
  content: string;
  price: string;
  category: string;
  image_url: string;
}

function Postdetail(){
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [post, setPost] = useState<Post[]>([]);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [hidden, setHidden] =useState(false); 
  const [hiddenDetail1, setHiddenDetail1] =useState(false); 
  const [hiddenDetail2, setHiddenDetail2] =useState(false); 
  const timeoutRef = useRef<number | null>(null);
  const [search, setSearch] = useState<string>('');
  const [clickSearch, setClickSearch] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      try{
      const res = await fetch(`${API_BASE_URL}/api/me`, {
      credentials: 'include'
    })
      const data = await res.json();
      if(res.ok){
        setUser(data);
      }
      console.log(user);
    } catch(err){
      console.error(err);
    }}
    fetchUser();
  },[])
  
  useEffect(() => {
    const fetchpost = async () => {
        try{
        const res = await fetch(`${API_BASE_URL}/api/postdetail/${id}`);
        const data = await res.json();
        if(res.ok){
            setPost(data);
            console.log(data);
        }
        } catch(err){
        console.log(err);
        }
    }
    fetchpost();
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
    timeoutRef.current = window.setTimeout(() => {
      setHidden(false);
      
    }, 800);
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHidden(true);
    
  }

  const handleMouseLeaveDetail1 = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setHiddenDetail1(false);
    }, 800);
  }

  const handleMouseEnterDetail1 = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHiddenDetail1(true);
  }

  const handleMouseLeaveDetail2 = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setHiddenDetail2(false);
    }, 800);
  }

  const handleMouseEnterDetail2 = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHiddenDetail2(true);
  }

  const handleSearch = () => {
      setSearch(search);
      if(search === '') return window.location.reload();
      navigate(`/searchresult/${search}`)
      if(clickSearch == 'Electronics') navigate(`/searchresult/Electronics`);
  }
  if(!post[0]) return(
    <Loading />
  )
  return (
    <div className="min-w-[1900px]">
      <div className='pt-2 pl-10 pr-10 bg-[#131921] text-white flex gap-5'>
        <div onClick={() => navigate('/')} className='p-1 flex flex-col hover:cursor-pointer border border-[#131921] hover:border-white'>
        <div className='font-bold text-2xl'>SihyeonZon</div>
        <div className='relative bottom-1' style={{backgroundImage: `url(${amazon})`, backgroundPosition: 'center',
        backgroundSize: '120px 70px',backgroundRepeat: 'no-repeat',  width: 120, height:20}}></div>
        </div>
        <div className='flex flex-col hover:cursor-pointer border border-[#131921] hover:border-white'>
        <div className='text-sm'>Deliever to</div>
        <div className='w-[150px]'>United of Kingdom</div>
        </div>
        <div className='relative flex items-center'>
        <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter'){handleSearch();}}} className='min-w-[1000px] focus:ring-4 focus:ring-orange-400 focus:outline-none rounded-md h-10 p-2 text-black' placeholder='Search Sihyeonzon'></input>
        <div onClick={handleSearch} className='absolute right-0 rounded-r-md bg-yellow-500 cursor-pointer p-1  ' style={{backgroundImage: `url(${searchimg})`, backgroundPosition: 'center',
    backgroundSize: '40px 40px',backgroundRepeat: 'no-repeat',  width: 40, height:40}}></div>
        </div>
        <div className='relative'>
          {hidden && 
        <div className='top-16 left-0 min-w-[400px] rounded-lg absolute  z-10 p-5 bg-white' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
         <div onClick={() => {handleLogout(); setUser(null); setHidden(false);}} className='text-center text-black cursor-pointer mb-4 rounded-2xl pt-2 pb-2 w-full bg-yellow-300 hover:underline'>Log out</div>
  
         <div className='flex gap-5 border-t border-gray-300 pt-4'>
         <div className='flex flex-col text-gray-700 pr-3'>
         <div className='text-gray-600 font-bold'>Your Lists</div>
         <div onClick={() => {
        if(!user){
          alert("You need to login!");
          navigate('/login');
          return ;
        } 
        navigate('/createpost')}}  className='text-black font-bold cursor-pointer hover:underline w-[120px]'>Create a Post</div>
         <div>Find a List or Registry</div>
         </div>

         <div className='flex flex-col text-gray-700 border-l border-gray-300 pl-3'>
         <div className='text-gray-600 font-bold'>Your Account</div>
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
         </div>
        <div className='flex items-center cursor-pointer border border-[#131921] hover:border-white'>
          <div className='pr-8' style={{backgroundImage: `url(${uk})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '20px 20px',width:20, height:20}}></div>
          UK
        </div>
        {!user ? 
        <div className='p-1 flex flex-col cursor-pointer border border-[#131921] hover:border-white'
        onClick={() => navigate('/login')}>
        <div>Hello, sign in</div>
        <div>Account & Lists</div>
        </div>
         : 
         <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='items-center text-xl border border-[#131921] hover:border-white cursor-pointer'>{user.username}</div>}
        <div className='flex items-center cursor-pointer border border-[#131921] hover:border-white'>
        <div className='invert' style={{backgroundImage: `url(${cart})`, backgroundPosition: 'center',
    backgroundSize: '50px 50px', backgroundRepeat: 'no-repeat',  width: 50, height:50}}></div>
        <div className='p-1 mt-4'>Cart</div>
        
        </div>
      </div>
      
      <div className='bg-[#192d41] text-white flex gap-4 font-bold pl-8'>
      <div onClick={() => {setClickSearch('Electronincs'); handleSearch();}} className='border border-[#192d41] hover:border-white cursor-pointer p-2'>Electronincs</div>
      <div onClick={() => {setClickSearch('Clothing'); handleSearch;}} className='border border-[#192d41] hover:border-white cursor-pointer p-2'>Clothings</div>
      <div onClick={() => {setClickSearch('Foods'); handleSearch;}} className='border border-[#192d41] hover:border-white cursor-pointer p-2'>Foods</div>
      </div>

    <div className='bg-white mt-10 mb-80 ml-5 mr-5'>
     <div className="text-gray-600 mb-10 ml-28">{'>'} <div className="inline-block cursor-pointer hover:underline">{post && <div>{post[0].category}</div>}</div></div>
     <div className="flex">
     <div>
     <img className='max-w-[450px] p-2' src={`${post[0].image_url}`} />
     </div>
     <div className="flex flex-col pr-5 pl-5">
     <div className="border-b border-gray-400">
     <div className="font-bold text-2xl">{post[0].title}</div>
     <div className="font-bold">5.0 ⭐⭐⭐⭐⭐</div>
     <div className="text-white bg-black max-w-40 text-center rounded-md mt-2 mb-3">Sihyeonzon's Choice</div>
     <div><div className="font-bold inline-block pb-1">300+ bought</div> in past month</div>
     </div>
     <div className="border-b border-gray-400">
     <div className="mt-4 bg-red-600 text-white max-w-36 text-center p-1 rounded-md">Limited time deal</div>
     <div className="font-bold mb-3"><div className="font-normal inline-block">GBP</div> <div className="text-3xl inline-block">{post && <div>{post[0].price}</div>}</div></div>
     <div className="mb-2">
        <div className='flex gap-2'>
        <div>No Import Charges &</div> 
        <div className="font-bold inline-block ml-2 mr-2">FREE Shipping</div>
        <div>to United Kingdom</div> 
        <div onMouseEnter={handleMouseEnterDetail1} onMouseLeave={handleMouseLeaveDetail1} className="ml-2 inline-block text-blue-700 cursor-pointer hover:underline hover:text-blue-900">Details</div>
        </div>
        {hiddenDetail1 && 
        <div onMouseEnter={handleMouseEnterDetail1} onMouseLeave={handleMouseLeaveDetail1} className="rounded-xl max-w-[400px] p-5 border border-gray-400">
        <div className="font-bold border-b border-gray-400 pb-3">Shipping & Fee Details</div>
        <div className="flex flex-col pt-5 pb-3 border-b border-gray-400">
        <div className="flex justify-between">
        <div>Price</div>
        <div className="font-bold">GBP {post && <div>{post[0].price}</div>}</div>    
        </div>
        <div className="flex justify-between">
        <div>SihyeonzonGlobal Shipping</div>
        <div className="font-bold">GBP 0</div>
        </div>
        <div className="flex justify-between">
        <div className="text-blue-700 cursor-pointer hover:underline hover:text-blue-900">Estimated Import Charges</div>
        <div className="font-bold">GBP 0</div>
        </div>
        </div>
        <div className="flex justify-between pt-3">
        <div>Total</div>
        <div className="font-bold">GBP {post && <div>{post[0].price}</div>}</div>    
        </div>
        </div>}
     </div>
     </div>
     <div>
     <div className="mt-3 font-bold text-2xl">About this item</div>
     <div className="pt-1 whitespace-pre-line">{post && <div>{post[0].content}</div>}</div>
     </div>
     </div>
     <div className="border border-gray-300 rounded-md p-5">
      <div className="font-bold mb-3"><div className="font-normal inline-block">GBP</div> <div className="text-3xl inline-block">{post[0].price}</div></div>  
      <div className="mb-2">No Import Charges & 
        <div className="font-bold inline-block">FREE Shipping</div>to United Kingdom 
        <div onMouseEnter={handleMouseEnterDetail2} onMouseLeave={handleMouseLeaveDetail2} className="inline-block text-blue-700 cursor-pointer hover:underline hover:text-blue-900">Details</div>
        {hiddenDetail2 && 
        <div onMouseEnter={handleMouseEnterDetail2} onMouseLeave={handleMouseLeaveDetail2} className="rounded-xl max-w-[400px] p-5 border border-gray-400">
        <div className="font-bold border-b border-gray-400 pb-3">Shipping & Fee Details</div>
        <div className="flex flex-col pt-5 pb-3 border-b border-gray-400">
        <div className="flex justify-between">
        <div>Price</div>
        <div className="font-bold">GBP {post && <div>{post[0].price}</div>}</div>    
        </div>
        <div className="flex justify-between">
        <div>SihyeonzonGlobal Shipping</div>
        <div className="font-bold">GBP 0</div>
        </div>
        <div className="flex justify-between">
        <div className="text-blue-700 cursor-pointer hover:underline hover:text-blue-900">Estimated Import Charges</div>
        <div className="font-bold">GBP 0</div>
        </div>
        </div>
        <div className="flex justify-between pt-3">
        <div>Total</div>
        <div className="font-bold">GBP {post && <div>{post[0].price}</div>}</div>    
        </div>
        </div>}
     </div>
      <div className="text-green-600 text-2xl">In Stock</div>
      <div className="w-full p-2 mt-2 mb-2 text-center bg-yellow-300 rounded-2xl cursor-pointer hover:bg-yellow-400">Add to cart</div>
      <div className="w-full p-2 mt-2 mb-2 text-center bg-orange-400 rounded-2xl cursor-pointer hover:bg-orange-500">Buy Now</div>
      <div className="flex flex-col">
      <div className="text-xs">
      <div className="flex justify-between">
      <div>Returns</div>
      <div className="text-blue-700 cursor-pointer hover:underline hover:text-blue-900">30-days refund / replacement</div>
      </div>
      <div className="flex justify-between">
      <div>Payment</div>
      <div className="text-blue-700 cursor-pointer hover:underline hover:text-blue-900">Secure transaction</div>
      </div>
      </div>
      </div>
     </div>
     </div>
    </div>


    <div className='bg-[#142535]'>
    <div className='flex gap-10 max-w-[1000px] pt-10 pb-14 mx-auto bg-[#142535] text-[#DDD]'>
     <div>
     <div className='text-white'>Get to Know Us</div>
     <div>Careers</div>
     <div>Blog</div>
     <div>About Sihyeonzon</div>
     <div>Investor Relations</div>
     <div>Sihyeonzon Devices</div>
     <div>Sihyeonzon Science</div>
     </div>
     <div>
     <div className='text-white'>Make Money with Us</div>
     <div>Sell products on Sihyeonzon</div>
     <div>Sell on Sihyeonzon Business</div>
     <div>Sell apps on Sihyeonzon</div>
     <div>Become an Affiliate</div>
     <div>Advertise Your Products</div>
     <div>Self-Publish with Us</div>
     <div>Host an Sihyeonzon Hub</div>
     <div>›See More Make Money with Us</div>
     </div>
     <div>
     <div className='text-white'>Sihyeonzon Payment Products</div>
     <div>Sihyeonzon Business Card</div>
     <div>Shop with Points</div>
     <div>Reload Your Balance</div>
     <div>Sihyeonzon Currency Converter</div>
     </div>
     <div>
     <div className='text-white'>Let Us Help You</div>
     <div>Sihyeonzon and COVID-19</div>
     <div>Your Account</div>
     <div>Your Orders</div>
     <div>Shipping Rates & Policies</div>
     <div>Returns & Replacements</div>
     <div>Manage Your Content and Devices</div>
     <div>Help</div>
     </div>
    </div>
    
    <div className='border-t border-gray-500  text-[#DDD]'>
    <div className='max-w-[800px] mx-auto flex pt-5 pb-10'>
    <div onClick={() => navigate('/')} className='p-1 flex flex-col hover:cursor-pointer'>
        <div className='text-white font-bold text-2xl'>SihyeonZon</div>
        <div className='relative bottom-1' style={{backgroundImage: `url(${amazon})`, backgroundPosition: 'center',
        backgroundSize: '120px 70px',backgroundRepeat: 'no-repeat',  width: 120, height:20}}></div>
    </div>
    <div>s</div>
    </div>
    </div>
    <div className='bg-[#131921]'>
    <div className="max-w-[1050px] mx-auto bg-[#131921] pt-10 pb-10 text-gray-400 text-sm flex flex-wrap justify-between">
    <div className="flex flex-col gap-6 max-w-32">
    <div>
    <div className='text-white'>Sihyeonzon Music</div>
    <div>Stream millions of songs</div>
    </div>
    <div>
    <div className='text-white'>Sihyeonzon Business</div>
    <div>Everything For Your Business</div>
    </div>
    <div>    
    <div className='text-white'>IMDbPro</div>
    <div>Get Info Entertainment Professionals Need</div>
    </div>
    </div>    
    
    <div className="flex flex-col gap-6 max-w-32">
    <div>  
    <div className='text-white'>Sihyeonzon Ads</div>
    <div>Reach customers wherever they spend their time</div>
    </div>
    <div>
    <div className='text-white'>Sihyeonzon Global</div>
    <div>Ship Orders Internationally</div>
    </div>
    <div>
    <div className='text-white'>Kindle Direct Publishing</div>
    <div>Indie Digital & Print Publishing Made Easy</div>
    </div>
    <div>
    <div className='text-white'>eero WiFi</div>
    <div>Stream 4K Video in Every Room</div>
    </div>
    </div>
 
    <div className="flex flex-col gap-6 max-w-32">
    <div>
    <div className='text-white'>6pm</div>
    <div>Score deals on fashion brands</div>
    </div>
    <div>
    <div className='text-white'>Sihyeonzon Web Services</div>
    <div>Scalable Cloud Computing Services</div>
    </div>
    <div>
    <div className='text-white'>Prime Video Direct</div>
    <div>Video Distribution Made Easy</div>
    </div>
    <div>
    <div className='text-white'>Blink</div>
    <div>Smart Security for Every Home</div>
    </div>
    </div>

    <div className="flex flex-col gap-6 max-w-32">
    <div>
    <div className='text-white'>ABeBooks</div>
    <div>Books, Gifts & collectibles</div>
    </div>
    <div>
    <div className='text-white'>Audible</div>
    <div>Listen to Books & Original Audio Performances</div>
    </div>
    <div>
    <div className='text-white'>Shopbop</div>
    <div>Designer Fashion Brands</div>
    </div>
    <div>
    <div className='text-white'>Neighbors App</div>
    <div>Real-Time Crime & Safety Alerts</div>
    </div>
    </div>

 
    <div className="flex flex-col gap-6 max-w-32">
    <div>
    <div className='text-white'>ACX</div>
    <div>Audiobook Publishing Made Easy</div>
    </div>
    <div>
    <div className='text-white'>Box Office Mojo</div>
    <div>Find Movie Box Office Data</div>
    </div>
    <div>
    <div className='text-white'>Woot!</div>
    <div>Deals and Shenanigans</div>
    </div>
    <div>
    <div className='text-white'>Sihyeonzon Subscription Boxes</div>
    <div>Top subscription boxes – right to your door</div>
    </div>
    </div>
    <div className="flex flex-col gap-6 max-w-32">
    <div>
    <div className='text-white'>Sell on Sihyeonzon</div>
    <div>Start a Selling Account</div>
    </div>
    <div>
    <div className='text-white'>Goodreads</div>
    <div>Book reviews & recommendations</div>
    </div>
    <div>
    <div className='text-white'>Zappos</div>
    <div>Shoes & Clothing</div>
    </div>
    <div>
    <div className='text-white'>PillPack</div>
    <div>Pharmacy Simplified</div>
    </div>
    </div>


    <div className="flex flex-col gap-6 max-w-32">
    <div>
    <div className='text-white'>Veeqo</div>
    <div>Shipping Software Inventory Management</div>
    </div>
    <div>
    <div className='text-white'>IMDb</div>
    <div>Movies, TV & Celebrities</div>
    </div>
    <div>
    <div className='text-white'>Ring</div>
    <div>Smart Home Security Systems</div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>

)}

export default Postdetail




