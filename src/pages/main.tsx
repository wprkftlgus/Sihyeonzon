import '../App.css'
import search from '../assets/cart.png'
import cart from '../assets/search.png'
import { useNavigate } from 'react-router-dom'

function Main() {
  const navigate = useNavigate();
  
  return (
    <div className="">
      <div className='bg-[#131921] text-white flex gap-5 p-1'>
        <div className='flex items-center'>
        <input className='h-10 p-2' placeholder='Search Sihyeonzon'></input>
        <div className='bg-yellow-500 cursor-pointer p-1  ' style={{backgroundImage: `url(${search})`, backgroundPosition: 'center',
    backgroundSize: '40px 40px',backgroundRepeat: 'no-repeat',  width: 40, height:40}}></div>
        </div>
        <div className='flex flex-col cursor-pointer border border-[#131921] hover:border-white'
        onClick={() => navigate('/login')}>
        <div>Hello, sign in</div>
        <div>Account & Lists</div>
        </div>
        <div className='flex items-center cursor-pointer border border-[#131921] hover:border-white'>
        <div className='invert' style={{backgroundImage: `url(${cart})`, backgroundPosition: 'center',
    backgroundSize: '50px 50px', backgroundRepeat: 'no-repeat',  width: 50, height:50}}></div>
        <div className='mt-4'>Cart</div>
        </div>
      </div>
      <div className='bg-gray-100'>ads</div>
    </div>
  )
}

export default Main
