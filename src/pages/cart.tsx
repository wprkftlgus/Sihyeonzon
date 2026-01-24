import { useEffect, useRef, useState } from 'react';
import '../App.css'
import searchimg from '../assets/cart.png'
import cart from '../assets/search.png'
import { useNavigate } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
import amazon from '../assets/amazon.png'
import uk from '../assets/uk.png'
import coffe from '../assets/coffe.svg'


// interface Post {
//   id: number;
//   category: string;
//   title: string;
//   price: string;
//   content: string;
//   image_url: string;
// }

function Cart() {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [hidden, setHidden] =useState(false); 
  const timeoutRef = useRef<number | null>(null);
  const [search, setSearch] = useState<string>('');
  // const { id } = useParams<{ id: string }>();
  // const [posts, setPosts] = useState<Post[] | null>([]);
  const [clickSearch, setClickSearch] = useState<string>('');

    // useEffect(() => {
    // const fetchPost = async() => {
    //     try{
    //         const res = await fetch(`${API_BASE_URL}/api/getsearchedpost/${id}`);
    //         const data = await res.json();
    //         setPosts(data);
    //         console.log(data);
    //     } catch(err){
    //         console.log(err);
    //     } 
    // } 
    // if(id) fetchPost();
    // },[id]) 

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

  const handleSearch = () => {
      setSearch(search);
      if(search === '') return window.location.reload();
      navigate(`/searchresult/${search}`)
      if(clickSearch == 'Electronics') navigate(`/searchresult/Electronics`);
  }

  return (
    <div className="w-screen overflow-x-hidden">
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
    
        <div className='pt-5 bg-gray-200 w-full h-[800px]'>
         <div className='flex ml-10 mr-10 bg-white p-10'>
          <div className='relative bottom-1' style={{backgroundImage: `url(${coffe})`, backgroundPosition: 'center',
        backgroundSize: '300px 300px',backgroundRepeat: 'no-repeat',  width: 300, height: 300}}></div>
          <div>
          <div className='text-2xl font-bold'>Your Sihyeonzon Cart is empty</div>
          <div className='text-blue-700 cursor-pointer hover:underline'>Shop today's deals</div>
          </div>
          </div>
          <div className='text-sm'>The price and availability of items at Sihyeonzon.online are subject to change. The Cart is a temporary place to store a list of your items and reflects each item's most recent price. Shopping CartLearn more
Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.</div>
        </div>

    <div className='bg-[#142535]'>
    <div className='flex gap-10 max-w-[1000px] pt-10 pb-14 mx-auto bg-[#142535] text-[#DDD]'>
     <div>
     <div className='text-white'>Get to Know Us</div>
     <div>Careers</div>
     <div>Blog</div>
     <div>About Amazon</div>
     <div>Investor Relations</div>
     <div>Sihyeonzon Devices</div>
     <div>Sihyeonzon Science</div>
     </div>
     <div>
     <div className='text-white'>Make Money with Us</div>
     <div>Sell products on Sihyeonzon</div>
     <div>Sell on Amazon Business</div>
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
   )
}

export default Cart