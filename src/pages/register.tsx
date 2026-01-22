import amazon from '../assets/amazon.png'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react' 

interface FormErrors {
    username?: string,
    password?: string,
    data?: string
}

function Register(){
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let newErrors: FormErrors = {};

        if (!username) newErrors.username = "Username Required!"
        if (!password) newErrors.password = "Password Required!"

        setErrors(newErrors);

        if(Object.keys(newErrors).length > 0) return ;
        try{
            const res = await fetch(`${API_BASE_URL}/api/register`,{
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({username, password}),
            credentials: "include"
        });
        const data = await res.json();
        setData(data.message);
        if(data.message === 'User registered successfully'){
            navigate('/');
        }
        } catch(err){
            console.error(err);
        }}

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        if(data === 'Username already exists'){
            setData('');
        }
    }
    return(
    <div>
     <div onClick={() => navigate('/')} className='mx-auto max-w-32 flex flex-col hover:cursor-pointer'>
      <div className='font-bold text-2xl'>SihyeonZon</div>
      <div className='relative bottom-1' style={{backgroundImage: `url(${amazon})`, backgroundPosition: 'center',
    backgroundSize: '120px 70px',backgroundRepeat: 'no-repeat',  width: 120, height:20}}></div>
     </div>
     <div className='mx-auto rounded-xl max-w-96 border border-gray-300 p-5'>
     <div className='pb-2'>Create new account</div>
     <div>Enter your ID</div>
     {data && <div className=' text-red-500'>{data}</div>}
     <form onSubmit={handleSubmit}>
     <div className='flex flex-col'>
     <input value={username}  onChange={handleUsernameChange} placeholder='ID' className='mb-2 rounded p-1 border border-black'></input>
     {errors.username && <div className=' text-red-500'>{errors.username}</div>}
     <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='mb-2 rounded p-1 border border-black'></input>
     {errors.password && <div className=' text-red-500'>{errors.password}</div>}
     </div>
     <button type="submit" className='mb-4 rounded-2xl pt-2 pb-2 w-full bg-yellow-300 hover:cursor-pointer hover:bg-yellow-400 max-w-30'>
     Make New Account
     </button>
     </form>
     <div className='pb-5 border-b border-gray-400'>By continuing, you agree to Sihyeonzon's Conditions of Use and Privacy Notice.</div>
     <div className='pt-2'>Do you already have account?</div>
     <div onClick={() => navigate('/login')} 
     className=' text-blue-700 hover:cursor-pointer hover:text-blue-900 hover:underline'>Go back to login</div>
     </div>
     <div className=' w-full text-center mt-14 border-t-2  border-gray-300'>
     <div className='justify-center flex gap-4 text-blue-700 pt-5 pb-2'>
      <div className=' cursor-pointer hover:underline'>Condition of Use</div>
      <div className=' cursor-pointer hover:underline'>Privacy Notice</div>
      <div className=' cursor-pointer hover:underline'>Help</div>
     </div>
     <div className=' text-gray-600'>© 1996-2026, Sihyeonzon.com, Inc. or its affiliates</div>
     </div>
    </div>
    )
}

export default Register