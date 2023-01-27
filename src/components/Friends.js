import React, { useEffect,useState } from 'react';
import {BsThreeDotsVertical} from "react-icons/bs";
import { getDatabase, ref, set, onValue, remove,push } from "firebase/database";
import { useSelector,useDispatch } from 'react-redux';
import {activeChat} from "../slices/activeChatSlice"


const Friends = () => {
    const db = getDatabase();
    let data = useSelector((state) => state.userLoginInfo.userInfo);
    let dispatch = useDispatch();

    let[friends,setFriends] = useState([]);


    useEffect(()=>{
        const friendRef = ref(db, 'friend');
        onValue(friendRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item)=>{
             console.log(item.val());
             if(data.uid == item.val().senderid || data.uid == item.val().receiverid){
                arr.push({...item.val(),key: item.key});
             }
            });
            setFriends(arr);
        });
    },[]);

    let handleBlock = (item)=>{
     if(data.uid == item.senderid){
        set(push(ref(db,"block")),{
            block: item.receivername,
            blockid: item.receiverid,
            blockby: item.sendername,
            blockbyid: item.senderid,
        }).then(()=>{
            remove(ref(db,"friend/"+item.key))
        });
     }else{
        set(push(ref(db,"block")),{
            block: item.sendername,
            blockid: item.senderid,
            blockby: item.receivername,
            blockbyid: item.receiverid,
        }).then(()=>{
            remove(ref(db,"friend/"+item.key))
        });
     }
    };

    let handleActiveGroupSingle = (item)=>{
        if(item.receiverid == data.uid){
            dispatch(activeChat({status:"single",id:item.senderid,name:item.sendername}));
        }else{
            dispatch(activeChat({status:"single",id:item.receiverid,name:item.receivername}));
        }
      ;
    };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg py-3 px-5 mt-3.5
    h-[365px] overflow-scroll">
     <div className="relative">
       <h3 className="font-nunito font-bold text-xl">Friends</h3>
        <BsThreeDotsVertical className='absolute top-[6px] right-[30px] text-primary'/>
     </div>
     {friends.map(item=>(
        <div onClick={()=>handleActiveGroupSingle(item)} className='flex gap-x-5 items-center border-b border-solid border-primary pb-3.5 mt-3.5'>
        <div>
            <img className='w-[70ox] h-[70px] rounded-full' src='images/friendrequest.png'/>
        </div>
        <div>
        <h3 className="font-nunito font-bold text-xl">
            {data.uid == item.senderid
            ?
            item.receivername
            :
            item.sendername}
            </h3>
        <p className="font-nunito font-semibold text-[14px] text-[#4D4D4D]">Hi Guys</p>
        </div>
        <div>
            <button onClick={()=>handleBlock(item)}className='font-nunito font-bold text-xl bg-primary text-white py-2.5 px-5 rounded'>Block</button>
        </div>
        </div>
     ))}
     

    </div>
  )
}

export default Friends