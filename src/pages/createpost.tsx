import { useState } from "react"
import React from "react"
import { useNavigate } from 'react-router-dom'
import amazon from '../assets/amazon.png'

function Createpost (){
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if(image)
        formData.append('image', image);

        try{
         const res = await fetch(`${API_BASE_URL}/api/createpost`,{
            method: "POST",
            body: formData,
            credentials: 'include'
         })
         const data = await res.json();
         alert(data.message)
        } catch(err){
         console.error(err)
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
    <input value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 border border-solid border-gray-400 rounded" placeholder="Title"></input>
    <textarea value={content} onChange={(e) => setContent(e.target.value)} className="p-2 border border-solid border-gray-400 rounded" placeholder="Content"></textarea>
    <input type="file" accept="image/*" onChange={(e) => {if(e.target.files){setImage(e.target.files[0])}}}></input>
    <button className="">Submit</button>
    </form>
    </div>
    )
}

export default Createpost