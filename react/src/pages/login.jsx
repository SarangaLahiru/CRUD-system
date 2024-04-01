import React, { useRef, useState } from 'react'
import {createRef} from "react";
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import FadeIn from 'react-fade-in';

export default function Login() {

  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload)
       
      .then(({data}) => {
        
        setUser(data.user)
        setToken(data.token);
      })
      .catch((err) => {
       
//debugger;
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })
  }
  return (
    <div>

       

        <FadeIn>
        <form action="" onSubmit={onSubmit} className='form-group w-2/6 m-auto'>
        <h2 className='m-4 text-5xl'>login</h2>

         

        
        <FadeIn>
        {message &&
            <div className="alert alert-danger m-4">
              <p>{message}</p>
            </div>
          }
        </FadeIn>

         <FadeIn>
         <input ref={emailRef} type="email" placeholder='email' className='form-control m-4 ' />
          <input ref={passwordRef} type="password" placeholder='password' className='form-control m-4 ' />
          <button type='submit' className='btn btn-primary m-4'>login</button>
         </FadeIn>
        </form>
        </FadeIn>

       
      
    </div>
  )
}
