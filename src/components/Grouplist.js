import React, { useState,useEffect } from 'react';
import {BsThreeDotsVertical} from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove} from "firebase/database";
import { useSelector } from 'react-redux';

const Grouplist = () => {
    const db = getDatabase();
    let data = useSelector((state) => state.userLoginInfo.userInfo);
    let [show,setShow] = useState(false);
    let [gname,setGname] = useState("");
    let [gtag,setGtag] = useState("");
    let [grouplist,setGrouplist] = useState([]);


    let handleGroupButton = ()=>{
      setShow(!show);
    };
    
    let handleGroupCreate = ()=>{
        set(push(ref(db, 'group')), {
            groupname: gname,
            grouptagline: gtag,
            adminid: data.uid,
            adminname: data.displayName,
           }).then(()=>{
            setShow(false);
           });
    };

    useEffect(()=>{
        const groupRef = ref(db, 'group');
        onValue(groupRef, (snapshot) => {
            let arr =[];
            snapshot.forEach((item)=>{
             if(data.uid != item.val().adminid){
                arr.push({...item.val(), key: item.key});
             }
            
            });
            setGrouplist(arr);
        });
    },[]);

    let handleGroupJoin = (item)=>{
        set(push(ref(db, 'groupJoinRequest')), {
            groupid:item.key,
            groupname: item.groupname,
            grouptagline: item.grouptagline,
            adminid: item.adminid,
            adminname: item.adminname,
            userid:data.uid,
            username:data.displayName,
           })
    };
  return (
    <div className="w-full bg-white shadow-lg rounded-lg py-3 px-5 mt-7
    h-[305px] overflow-scroll">
     <div className="relative">
       <h3 className="font-nunito font-bold text-xl">Group List</h3>

       <button onClick={handleGroupButton}className="font-nunito font-bold text-xl bg-primary  py-1 px-2 rounded absolute top-[0px] right-[30px] text-white">
        {show ? "Go Back" : "Create  Group"}</button>
     </div>
     {show 
     ?(
        <div className='mt-8'>
          <input type='text' className='border border-solid border-x-secondary w-full py-3 px-3 mb-3 outline-0 rounded'
          placeholder='Group Name'
          onChange={(e)=>setGname(e.target.value)}/>

          <input type='text' className='border border-solid border-x-secondary w-full py-3 px-3 mb-3 outline-0 rounded'
          placeholder='Group Tagline'
          onChange={(e)=>setGtag(e.target.value)}/>

          <button onClick={handleGroupCreate} className='w-full bg-primary py-2.5 rounded font-nunito font-semibold text-xl text-white mt-3' >Create</button>
        </div>
      
     ) 
     :
     (grouplist.map(item=>(
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
            <button
            onClick={() => handleGroupJoin(item)} className='font-nunito font-bold text-xl bg-primary text-white py-2.5 px-5 rounded'>Join</button>
        </div>
        </div>
       )))
      }
     

    </div>
  )
}

export default Grouplist