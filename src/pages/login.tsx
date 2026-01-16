import amazon from '../assets/amazon.png'
import '../App.css'
import { Navigate, useNavigate } from 'react-router-dom'

function Login(){
    const navigate = useNavigate();
    return(
    <div>
     <div onClick={() => navigate('/')} className='flex flex-col hover:cursor-pointer'>
      <div>SihyeonZon</div>
      <div style={{backgroundImage: `url(${amazon})`, backgroundPosition: 'center',
    backgroundSize: '90px 70px',backgroundRepeat: 'no-repeat',  width: 90, height:70}}></div>
     </div>
     <div className='border border-gray-300'>
     <div className=''>Sign in or create account</div>
     <div>Enter your ID</div>
     <input placeholder='ID' className='rounded p-1 border border-black'></input>
     <input placeholder='Password' className='rounded p-1 border border-black'></input>
     <div className='bg-yellow-300 hover:cursor-pointer hover:bg-yellow-400 max-w-13'>Sign In</div>
     <div>You don't have account yet?</div>
     <div onClick={() => navigate('/register')}
     className='text-blue-700 hover:cursor-pointer hover:text-blue-900 hover:underline'>Create New Account</div>
     </div>
    </div>
    )
}

export default Login