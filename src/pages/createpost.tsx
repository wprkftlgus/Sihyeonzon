import { useState } from "react"
import React from "react"
import { useNavigate } from 'react-router-dom'
import amazon from '../assets/amazon.png'

function Createpost (){
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const API_BASE_URL = import.meta.env.Vite_API_BASE_URL;

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
         const res = await fetch(`${API_BASE_URL}/api/createpost`,{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({title, content})
         })
         const data = await res.json();

        } catch(err){

        }
    }
    return(
    <div>
    <div onClick={() => navigate('/')} className='mx-auto max-w-32 flex flex-col hover:cursor-pointer'>
      <div className='font-bold text-2xl'>SihyeonZon</div>
      <div className='relative bottom-1' style={{backgroundImage: `url(${amazon})`, backgroundPosition: 'center',
    backgroundSize: '120px 70px',backgroundRepeat: 'no-repeat',  width: 120, height:20}}></div>
    </div>
    <div className="text-2xl">Create Post</div>
    <form onSubmit={handleSubmit}>
    <input value={title} className="p-2 border border-solid border-gray-400 rounded" placeholder="Title"></input>
    <textarea value={content} className="p-2 border border-solid border-gray-400 rounded" placeholder="Content"></textarea>
    
    <button className="">Submit</button>
    </form>
    </div>
    )
}

export default Createpost