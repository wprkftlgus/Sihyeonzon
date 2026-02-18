import { useEffect, useRef, useState } from 'react';
import '../App.css'
import searchimg from '../assets/cart.png'
import cartimg from '../assets/search.png'
import { useNavigate } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
import amazon from '../assets/amazon.png'
import uk from '../assets/uk.png'
import coffe from '../assets/coffe.svg'
import Loading from '../pages/loading'
import CheckoutPage from './CheckoutPage';
import bin from '../assets/bin.png'
import check from '../assets/check.png'

// interface Post {
//   id: number;
//   category: string;
//   title: string;
//   price: string;
//   content: string;
//   image_url: string;
// }
interface Cart {
  post_id: number;
  image_url: string;
  title: string;
  price: string;
  quantity: number;
}

function Cart() {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [hidden, setHidden] =useState(false); 
  const timeoutRef = useRef<number | null>(null);
  const [search, setSearch] = useState<string>('');
  const [cart, setCart] = useState< Cart[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [alarm, setAlarm] = useState(false);

  // const { id } = useParams<{ id: string }>();
  // const [posts, setPosts] = useState<Post[] | null>([]);

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

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(false);
      const res = await fetch (`${API_BASE_URL}/api/getcart`,{
        credentials: 'include'
      });
      const data = await res.json();
      setCart(data);
      setLoading(true);
    }
    fetchCart();
  },[])
  
  useEffect(() => {
  fetch(`${API_BASE_URL}/api/create-payment-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: 1000 }),
    credentials: 'include'
  })
    .then(res => res.json())
    .then(data => setClientSecret(data.clientSecret));
}, []);

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
  }

  const handleClickSearch = (value: string) => {
      navigate(`/searchresult/${value}`)
  }
  
  const handleDecreaseItem = async (post_id: number) => {
    if(updatingId !== null) return ;

    try {
      const res = await fetch(`${API_BASE_URL}/api/decreaseitem`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({post_id}),
        credentials: 'include'
      })
      if(res.ok){
        setUpdatingId(post_id);
      }
      setCart(prev => prev.map(item => item.post_id === post_id ? {...item, quantity: item.quantity - 1} : item))
    } catch(err){
      console.log(err);
    } finally{
      setUpdatingId(null);
    }
  }

  const handleAddItem = async (post_id: number) => {
    if(updatingId !== null) return ;
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/additem`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({post_id}),
        credentials: 'include'
      })
      if(res.ok){
        setUpdatingId(post_id);
      }
      setCart(prev => prev.map(item => item.post_id === post_id ? {...item, quantity: item.quantity + 1} : item))
    } catch(err){
      console.log(err);
    } finally{
      setUpdatingId(null);
    }
  }

  const handleDeleteItem = async (post_id: number) => {
    try{
       await fetch(`${API_BASE_URL}/api/removeitem`,{
        method: 'DELETE',
        headers : { "Content-Type" : "application/json"},
        body: JSON.stringify({ post_id }),
        credentials: 'include'
      })
      
      setCart(prev => prev.filter(item => item.post_id !== post_id));
      setAlarm(true);
      setTimeout(() => {
        setAlarm(false);
      }, 3000);
    } catch(err){
      console.log(err);
    } 
  }

  const subtotal = cart.reduce((acc, item) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity);
    return acc + price * quantity;
  },0)
 
  if(loading == false){
    return(
      <div><Loading /></div>
    )
  }

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
        
        { alarm && (
      <div className='animate-fadeIn shadow-2xl w-[400px] right-[1%] top-[750px] bg-white fixed text-2xl z-20 p-8 rounded-xl'>
      <div className='flex items-center gap-5'>
      <div className='w-50 h-50' style={{backgroundImage: `url(${check})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: 50, height: 50, backgroundSize: 'cover'}}></div>  
      <div className='text-green-500 font-bold text-2xl max-w-[250px]'>Item removed from cart successfully.</div>
      </div>
      </div>
        )}

        {!user ? 
        <div className='p-1 flex flex-col cursor-pointer border border-[#131921] hover:border-white'
        onClick={() => navigate('/login')}>
        <div>Hello, sign in</div>
        <div>Account & Lists</div>
        </div>
         : 
         <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='border border-[#131921] hover:border-white cursor-pointer'>
         <div>Welcome back!</div>
         <div className='text-center items-center text-xl'>{user.username}</div>
         </div>
         }
        <div className='flex items-center cursor-pointer border border-[#131921] hover:border-white'>
        <div className='invert' style={{backgroundImage: `url(${cartimg})`, backgroundPosition: 'center',
    backgroundSize: '50px 50px', backgroundRepeat: 'no-repeat',  width: 50, height:50}}></div>
        <div className='p-1 mt-4'>Cart</div>
        
        </div>
      </div>
      
      <div className='bg-[#192d41] text-white flex gap-4 font-bold pl-8'>
      <div onClick={() => {handleClickSearch('Electronics');}} className='border border-[#192d41] hover:border-white cursor-pointer p-2'>Electronincs</div>
      <div onClick={() => {handleClickSearch('Clothing');}} className='border border-[#192d41] hover:border-white cursor-pointer p-2'>Clothings</div>
      <div onClick={() => {handleClickSearch('Food');}} className='border border-[#192d41] hover:border-white cursor-pointer p-2'>Foods</div>
      </div>
     {cart.length > 0 ?
     <div className='bg-gray-200 flex'>
     <div className='pt-3 pl-20 pb-32 max-w-[1400px]'>
      <div className='bg-white'>
      <div className='pt-5 ml-5 mr-5 border-b border-gray-300'>
      <div className='text-3xl mb-5 font-bold'>Shopping Cart</div>
      <div className='text-right'>Price</div>
      </div>
      {cart.map((item) => (
        <div key={item.post_id} className=' justify-between flex p-5 ml-5 border-b border-gray-300 '>
        <div className='flex'>
        <div className='relative w-52'>
        <img onClick={() => navigate(`/postdetail/${item.post_id}`)} className='inset-0 cursor-pointer' style={{backgroundSize: '200 200', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',width: 200, height: 200}} src={item.image_url}></img>
        </div>
        <div className='w-[1000px]'>
        <div onClick={() => navigate(`/postdetail/${item.post_id}`)} className='cursor-pointer font-bold'>{item.title}</div>
        <div className='text-green-700'>In Stock</div>
        <div className='flex text-gray-600 gap-1'>
        <div className='font-bold'>FREE Shipping</div>
        <div>to United of Kingdom</div>
        </div>
        <div className='flex gap-3 items-center'>
        <div className='font-bold flex gap-3 items-center p-1 border-2 border-yellow-400 rounded-xl'>
        {item.quantity == 1 ? <div onClick={() => handleDeleteItem(item.post_id)} className='cursor-pointer' style={{backgroundImage: `url(${bin})`, backgroundPosition: 'center',
    backgroundSize: '15px 15px',backgroundRepeat: 'no-repeat',  width: 15, height: 15}}></div> : <button onClick={() => handleDecreaseItem(item.post_id)} disabled={updatingId !== null } className='cursor-pointer text-xl'>-</button>}
        <div>{item.quantity}</div>
        <button onClick={() => handleAddItem(item.post_id)} disabled={updatingId !== null } className='cursor-pointer text-xl'>+</button>
        </div>
        <div>|</div>
        <div onClick={() => handleDeleteItem(item.post_id)} className='text-blue-600 cursor-pointer'>Delete</div>
        </div>
        </div>
        </div>
        <div className='font-bold text-xl'>£{item.price}</div>
        </div>
      ))}
     <div className='justify-end flex gap-2 text-xl items-center mr-4 pb-10'>
     <div className='flex items-center'> 
     <div className='p-2'>Subtotal</div>
     <div className=''>({cart.length} items):</div>
     </div>
     <div className='font-bold'>£{subtotal}</div>
     </div>
     </div>
     <div className='bg-white p-7 mt-5'></div>
     <div className='mt-5 text-sm'>The price and availability of items at Sihyeonzon.online are subject to change. The Cart is a temporary place to store a list of your items and reflects each item's most recent price. Shopping CartLearn more
Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.</div>
     </div>
     <div className='bg-white max-h-[230px] mt-3 ml-5 p-5'>
      <div className='flex items-center'>
      <div className='bg-green-700 w-[220px] h-4 rounded-2xl'></div>
      <div className='text-sm font-bold ml-2'>£{subtotal}</div>
      </div>
      <div className='mb-4'>
      <div className='text-green-800 text-sm font-bold'>Your order qualifies for FREE Shipping.</div>
      <div className='cursor-pointer hover:underline text-blue-800 text-sm'>Shop more eligible items</div>
      </div>
      <div className='text-xl flex items-center mb-2'> 
      <div className='p-2'>Subtotal</div>
      <div className=''>({cart.length} items):</div>
      <div className='ml-2 font-bold'>£{subtotal}</div>
      </div>
      {!showCheckout && (
        <div onClick={() => setShowCheckout(true)} className="bg-yellow-300 rounded-2xl text-center w-[250px] p-2 cursor-pointer hover:bg-yellow-400">
          Proceed to checkout
        </div>
      )} {showCheckout && clientSecret && <CheckoutPage clientSecret={clientSecret} />}
     </div> 
     </div> 
     : <div className='pt-5 bg-gray-200 w-full h-[800px]'>
         <div className='flex ml-10 mr-10 bg-white items-center'>
          <div className='relative bottom-1 ml-5' style={{backgroundImage: `url(${coffe})`, backgroundPosition: 'center',
        backgroundSize: '400px 400px',backgroundRepeat: 'no-repeat',  width: 400, height: 300}}></div>
          <div className='ml-5'>
          <div className='text-2xl font-bold'>Your Sihyeonzon Cart is empty</div>
          <div onClick={() => navigate('/searchresult/s')} className='text-blue-700 cursor-pointer hover:underline inline-block'>Shop today's deals</div>
          </div>
          </div>
          <div className='bg-white ml-10 mr-10 mt-5 h-[60px]'></div>
          <div className='text-sm ml-10 mr-10 mt-3'>The price and availability of items at Sihyeonzon.online are subject to change. The Cart is a temporary place to store a list of your items and reflects each item's most recent price.
          <div className='text-blue-700 cursor-pointer inline-block hover:underline ml-1'>Learn more</div> 
          <div>Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.</div></div>
        </div>}
      

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