import React from 'react';
import {AiOutlineHome} from "react-icons/ai";
import {AiOutlineMessage} from "react-icons/ai";
import {IoIosNotificationsOutline} from "react-icons/io";
import {FiSettings} from "react-icons/fi";
import {AiOutlineLogout} from "react-icons/ai";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../slices/userSlice';

const Sidenav = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    let dispatch = useDispatch();
let handleLogOut = ()=>{
    signOut(auth).then(() => {
      dispatch(userLoginInfo(null));
      localStorage.removeItem("userInfo");
      navigate("/login");
      }).catch((error) => {
        // An error happened.
      });
};
  return (
    <div className='w-full bg-primary h-screen rounded-3xl p-9'>
     <img className='mx-auto' src='images/profile.png' />
     <div className="mt-16 relative z-[1] after:z-[-1] after:bg-white after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:w-[135%] after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-primary before:absolute before:top-[-16px] before:right-[-36px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg">
     <AiOutlineHome className='text-5xl text-primary mx-auto'/>
     </div>

     <div className="mt-10 relative z-[1] after:z-[-1] after:bg-none after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:w-[135%] after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-none before:absolute before:top-[-16px] before:right-[-36px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg">
     <AiOutlineMessage className='text-5xl text-white mx-auto'/>
     </div>

     <div className="mt-10 relative z-[1] after:z-[-1] after:bg-none after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:w-[135%] after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-none before:absolute before:top-[-16px] before:right-[-36px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg">
     <IoIosNotificationsOutline className='text-5xl text-white mx-auto'/>
     </div>

     <div className="mt-10 relative z-[1] after:z-[-1] after:bg-none after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:w-[135%] after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-none before:absolute before:top-[-16px] before:right-[-36px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg">
     <FiSettings className='text-5xl text-white mx-auto'/>
     </div>

     <div onClick={handleLogOut} className="mt-28 relative z-[1] after:z-[-1] after:bg-none after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:w-[135%] after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-none before:absolute before:top-[-16px] before:right-[-36px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg">
     <AiOutlineLogout className='text-5xl text-white mx-auto'/>
     </div>
    
    </div>
  )
}

export default Sidenav