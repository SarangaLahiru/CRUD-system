import React, { useRef, useState } from 'react'
import FadeIn from 'react-fade-in';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { Navigate, useNavigate } from 'react-router-dom';

export default function AddUsers() {

  const nameRef=useRef();
  const emailRef=useRef()
  const passwordRef=useRef()
  const passwordConfirmationRef=useRef();

  const {setUser,setToken}=useStateContext()
  const [errors,setErrors] = useState(null);
  const navigate=useNavigate();
  const {notification,setNotification} = useStateContext();



  const onSubmit=(ev)=>{


    ev.preventDefault();

    const payload ={
      name:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value,
      password_confirmation:passwordConfirmationRef.current.value,
    }
    console.log(payload)


    axiosClient.post('/users', payload)
    .then(({ data }) => {

      console.log("asdafs")

      setNotification("successfully Add new user!");

      navigate('/');

      console.log(data.user)
    })
    .catch(err => {

     // debugger;
      const response = err.response;
      console.log("gfdfgd");
      if (response && response.status === 422) {
        console.log("vytcc");
        setErrors(response.data.errors);
      }
    });



    console.log(payload)

  }
  return (
    <div>
       <FadeIn>
        <form action="" onSubmit={onSubmit} className='form-group w-2/6 m-auto '>

       <FadeIn>
       {errors &&
            <div className='alert alert-danger m-4'>
              {Object.keys(errors).map(key => (
                <p>{errors[key][0]}</p>
              ))}
            </div>
          }
       </FadeIn>

        <FadeIn>

        <input ref={nameRef} type="text" placeholder='name' className='form-control m-4 '/>
          <input ref={emailRef} type="email" placeholder='email' className='form-control m-4' />
          <input ref={passwordRef} type="password" placeholder='password'className='form-control m-4' />
          <input ref={passwordConfirmationRef} type="password" placeholder='confir-password' className='form-control m-4' />
          <button type='submit' className='btn btn-primary m-4'>Add</button>

        </FadeIn>


        </form>
        </FadeIn>

    </div>
  )
}
