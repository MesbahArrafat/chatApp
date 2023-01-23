import React, { useEffect,useState } from 'react';
import {BsThreeDotsVertical} from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove} from "firebase/database";
import { useSelector } from 'react-redux';

const Friendrequest = () => {

    const db = getDatabase();
    let data = useSelector((state) => state.userLoginInfo.userInfo);
    let[friendrequestlist,setFriendrequestlist] = useState([]);

    useEffect(() => {
        const friendrequestRef = ref(db, 'friendrequest');
        onValue(friendrequestRef, (snapshot) => {
          let arr = [];
          snapshot.forEach((item) => {
            if(item.val().receiverid == data.uid){
                arr.push({...item.val(), id: item.key});
            } 
            
          }); 
          setFriendrequestlist(arr);
        });
    },[]);
    
    let handleFriendAccept = (item)=>{
      console.log(item);
      set(push(ref(db, 'friend')), {
       ...item,
      }).then(()=>{
        remove(ref(db, 'friendrequest/'+item.id)).then(() => {
            console.log("Data Deleted.")
        });
      });
    
    }

  return (
    <div className="w-full bg-white shadow-lg rounded-lg py-3 px-5 mt-7
    h-[305px] overflow-scroll">
     <div className="relative">
       <h3 className="font-nunito font-bold text-xl">Friend Request</h3>
        <BsThreeDotsVertical className='absolute top-[6px] right-[30px] text-primary'/>
     </div>
     {friendrequestlist.map(item=>(
       <div className='flex gap-x-5 items-center border-b border-solid border-primary pb-3.5 mt-3.5'>
       <div>
           <img className='w-[70ox] h-[70px] rounded-full' src='images/friendrequest.png'/>
       </div>
       <div>
       <h3 className="font-nunito font-bold text-xl">{item.sendername}</h3>
       <p className="font-nunito font-semibold text-[14px] text-[#4D4D4D]">Hi Guys</p>
       </div>
       <div>
           <button onClick={()=>handleFriendAccept(item)}className='font-nunito font-bold text-xl bg-primary text-white py-2.5 px-5 rounded'>Accept</button>
       </div>
    </div>
     ))}
    

    </div>
  )
}

export default Friendrequest