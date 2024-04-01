import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import FadeIn from 'react-fade-in';

export default function Update() {


  const navigate=useNavigate();


  const [user,setUser]=useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  let {id}=useParams();

  if(id){
  useEffect(()=>{

      axiosClient.get(`/users/${id}`)
      .then((data)=>{
        setUser(data.data.data)
        console.log(data.data.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    },[])
  }
  const onUpdate=(ev)=>{
    ev.preventDefault();
    axiosClient.put(`/users/${user.id}`,user)
    .then(()=>{

      console.log("hjvgjhg")
      navigate('/');
    })
    .catch((err)=>{
      console.log("hghgfghf")
      console.log(err)

    })


  }
  return (
    <div>

<FadeIn>
        <form action="" onSubmit={onUpdate} className='form-group w-2/6 m-auto '>
        <h2 className='m-4 text-5xl'>Update</h2>


        <FadeIn>

        <input value={user.name} onChange={ev=>setUser({...user,name:ev.target.value})} type="text" placeholder='name' className='form-control m-4 '/>
          <input value={user.email} onChange={ev=>setUser({...user,email:ev.target.value})} type="email" placeholder='email' className='form-control m-4' />
          <input  type="password" onChange={ev=>setUser({...user,password:ev.target.value})} placeholder='password'className='form-control m-4' />
          <input  type="password" onChange={ev=>setUser({...user,password_confirmation:ev.target.value})} placeholder='confir-password' className='form-control m-4' />
          <button type='submit' className='btn btn-primary m-4'>Save</button>
        </FadeIn>


        </form>
        </FadeIn>







    </div>
  )
}
