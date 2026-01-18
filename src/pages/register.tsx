import amazon from '../assets/amazon.png'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react' 

interface FormErrors {
    username?: string,
    password?: string
}

function Register(){
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let newErrors: FormErrors = {};

        if (!username) newErrors.username = "Username Required!"
        if (!password) newErrors.password = "Password Required!"

        setErrors(newErrors);

        if(Object.keys(newErrors).length > 0) return ;

        const res = await fetch(`${API_BASE_URL}/api/register`,{
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({username, password}),
            credentials: "include"
        });
        const data = await res.json();
        alert(data.message);
    }

    return(
    <div>
     <div onClick={() => navigate('/')} className='flex flex-col hover:cursor-pointer'>
      <div>SihyeonZon</div>
      <div style={{backgroundImage: `url(${amazon})`, backgroundPosition: 'center',
    backgroundSize: '90px 70px',backgroundRepeat: 'no-repeat',  width: 90, height:70}}></div>
     </div>
     <div className='border border-gray-300'>
     <div className=''>Create new account</div>
     <div>Enter your ID</div>
     <form onSubmit={handleSubmit}>
     <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='ID' className='rounded p-1 border border-black'></input>
     {errors.username && <div className=' text-red-500'>{errors.username}</div>}
     <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='rounded p-1 border border-black'></input>
     {errors.password && <div className=' text-red-500'>{errors.password}</div>}
     <button type="submit" className='bg-yellow-300 hover:cursor-pointer hover:bg-yellow-400 max-w-13'>
     Make New Account
     </button>
     </form>
     <div>Do you already have account?</div>
     <div onClick={() => navigate('/login')} 
     className=' text-blue-700 hover:cursor-pointer hover:text-blue-900 hover:underline'>Go back to login</div>
     </div>
    </div>
    )
}

export default Register