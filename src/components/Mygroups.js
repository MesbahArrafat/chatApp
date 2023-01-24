import React, { useEffect, useState } from 'react';
import {BsThreeDotsVertical} from "react-icons/bs";
import { getDatabase, ref, onValue} from "firebase/database";
import { useSelector } from 'react-redux';


const Mygroups = () => {
    const db = getDatabase();
    let data = useSelector((state) => state.userLoginInfo.userInfo);
    let [grouplist,setGrouplist] = useState([]);
    let [grouprequestlist,setGrouprequestlist] = useState([]);
    let [show,setShow] = useState(false);
    
    useEffect(()=>{
        const groupRef = ref(db, 'group');
        onValue(groupRef, (snapshot) => {
            let arr =[];
            snapshot.forEach((item)=>{
             if(data.uid == item.val().adminid){
                arr.push({...item.val(), key: item.key});
             }
            
            });
            setGrouplist(arr);
        });
    },[]);

    let handleGroupRequestShow = (gitem) => {
        setShow(true);
        const groupRef = ref(db, 'groupJoinRequest');
        onValue(groupRef, (snapshot) => {
            let arr =[];
            snapshot.forEach((item)=>{
             if(data.uid == item.val().adminid && item.val().groupid == gitem.key){
                arr.push({...item.val(), key: item.key});
             }
            
            });
            setGrouprequestlist(arr);
        });   
    };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg py-3 px-5 mt-3.5
    h-[335px] overflow-scroll">
     <div className="relative">
       <h3 className="font-nunito font-bold text-xl">My Groups</h3>
       {show && 
       (<button onClick={()=>setShow(false)}className="font-nunito font-bold text-xl bg-primary  py-1 px-2 rounded absolute top-[0px] right-[30px] text-white">Go Back</button>
       )}
     </div>
     {grouplist.length == 0
     ?
     (<p className='bg-red-500 p-2.5 text-white'>No Group Available</p>)
    :
    (
        show 
        ? 
        grouprequestlist.map(item=>(
            <div className='flex gap-x-5 items-center border-b border-solid border-primary pb-3.5 mt-3.5'>
            <div>
                <img className='w-[70ox] h-[70px] rounded-full' src='images/friendrequest.png'/>
            </div>
            <div>
            <h3 className="font-nunito font-bold text-xl">{item.username}{""}</h3>
            </div>
            <div>
                <button className='font-nunito font-bold  bg-primary text-white p-1.5 rounded mr-1'>Accept</button>
                <button className='font-nunito font-bold  bg-red-500 text-white p-1.5 rounded'>Reject</button>
            </div>
            </div>
        ))
        :
        grouplist.map(item=>(
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
                <button className='font-nunito font-bold  bg-primary text-white p-1.5 rounded mb-2'>Info</button><br/>
                <button onClick={()=>handleGroupRequestShow(item)} className='font-nunito font-bold  bg-primary text-white p-1.5 rounded'>Request</button>
            </div>
            </div>
            ))
    )}
     
   </div>
  );
};

export default Mygroups