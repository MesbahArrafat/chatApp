import React, { useState,useEffect } from 'react';
import {BsThreeDotsVertical} from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove} from "firebase/database";
import { useSelector } from 'react-redux';

const MessageGroups = () => {
    const db = getDatabase();
    let data = useSelector((state) => state.userLoginInfo.userInfo);
    let [grouplist,setGrouplist] = useState([]);


    useEffect(()=>{
        const groupRef = ref(db, 'group');
        onValue(groupRef, (snapshot) => {
            let arr =[];
            snapshot.forEach((item)=>{
                arr.push({...item.val(), key: item.key});
            });
            setGrouplist(arr);
        });
    },[]);

  return (
    <div className="w-full bg-white shadow-lg rounded-lg py-3 px-5 mt-7
    h-[305px] overflow-scroll">
     <div className="relative">
       <h3 className="font-nunito font-bold text-xl">Group List</h3>
       <BsThreeDotsVertical className='absolute top-[6px] right-[30px] text-primary'/>
     </div>
   {  grouplist.map(item=>(
        <div className='flex gap-x-5 items-center border-b border-solid border-primary pb-3.5 mt-3.5'>
        <div>
            <img className='w-[70ox] h-[70px] rounded-full' src='images/friendrequest.png'/>
        </div>
        <div>
        <h3 className="font-nunito font-bold text-xl">{item.groupname}</h3>
        <p className="font-nunito font-bold text-[14px] text-[#4D4D4D]">Admin: {item.adminname}</p>
        <p className="font-nunito font-semibold text-[14px] text-[#4D4D4D]">{item.grouptagline}</p>
        </div>
        <div>
            <button className='font-nunito font-bold text-xl bg-primary text-white py-2.5 px-5 rounded'>Message</button>
        </div>
        </div>
       ))}
     
    </div>
  )
}

export default MessageGroups