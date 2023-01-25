import  React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Friendrequest from '../../components/Friendrequest';
import Friends from '../../components/Friends';
import Grouplist from '../../components/Grouplist';
import Search from '../../components/Search';
import Sidenav from '../../components/Sidenav';
import Mygroups from '../../components/Mygroups';
import Userlist from '../../components/Userlist';
import Blockedlist from '../../components/Blockedlist';
import { getAuth,onAuthStateChanged } from "firebase/auth";
import {  useDispatch } from 'react-redux';
import { userLoginInfo } from '../../slices/userSlice';

const Home = () =>{
    let navigate = useNavigate();
    let auth = getAuth();
    const dispatch = useDispatch();
    let data = useSelector((state)=>state.userLoginInfo.userInfo);
    let [verify,setVerify] = useState(false);
    onAuthStateChanged(auth,(user)=>{
        if(user.emailVerified){
            setVerify(true);
            dispatch(userLoginInfo(user));
            localStorage.setItem("userInfo",JSON.stringify(user));
        }
    });
    console.log(data);
    useEffect(()=>{
     if(!data){
      navigate("/login");
     }
    });
    return(
       <div className='flex justify-between'>
        
        {verify
        ?
        (<>
        <div className='w-[186px] pl-2.5'>
          <Sidenav active="home"/>
        </div>
        <div className='w-[420px]'>
        <Search/>
        <Grouplist/>
        <Friendrequest/>
        </div>
        <div className='w-[420px]'>
        <Friends/>
        <Mygroups/>
        </div>
        <div className='w-[420px]'>
            <Userlist/>
            <Blockedlist/>
        </div>
        </>)
        :
        (<div className='w-full h-screen flex justify-center items-center'>
        <h1 className='font-nunito bg-primary text-4xl text-white text-bold'>Please verify your mail</h1>
        </div>)
        
        }

       </div>
    )
}

export default Home;