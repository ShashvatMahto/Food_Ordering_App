import React from 'react'

import { auth , provider } from "../config/fireBaseAuth";
import { signInWithPopup, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addUserdata, removeUserData } from '../store/Authentication';
import { useNavigate } from 'react-router-dom';
import { toggleLogin } from '../store/ToggleSlice';
const SignIn = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state=>state.Authentication.userData)
  const handleAuth = async () => {
    let data = await signInWithPopup(auth , provider);

    const userData = {
      name: data.user.displayName,
      image : data.user.photoURL,
    }

    dispatch(addUserdata(userData))
    dispatch(toggleLogin())
    navigate('/');
  }

  const handleLogOut = async()=>{
    await signOut(auth);
    dispatch(removeUserData());
    dispatch(toggleLogin());
  }
  return (
    <>
      

      { userData ? <button className=' w-full text-xl p-4 bg-[#fc8019] text-white my-6'  onClick={handleLogOut}>LogOut</button> :<button className=' w-full text-xl p-4 bg-[#fc8019] text-white my-6' onClick={handleAuth}>LogIn</button>}
    </>
  )
}

export default SignIn