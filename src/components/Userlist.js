import React, { useEffect,useState } from 'react';
import {BsThreeDotsVertical} from "react-icons/bs";
import { getDatabase, ref, onValue, set, push} from "firebase/database";
import { useSelector } from 'react-redux';

const Userlist = () => {
    const db = getDatabase();
    let data = useSelector((state) => state.userLoginInfo.userInfo);
    let[userlist,setUserlist] = useState([]);
    let[friendrequestlist,setFriendrequestlist] = useState([]);
    let[friendlist,setFriendlist] = useState([]);

    useEffect(()=>{
        const userRef = ref(db, "users");
        onValue(userRef, (snapshot) => {
        //   const data = snapshot.val();
        //   updateStarCount(postElement, data);
          let arr = [];
          snapshot.forEach((item) => {
            if(data.uid != item.key){     
              arr.push({ ...item.val(), userid: item.key 
                }); 
            };
          }); 
          setUserlist(arr);
        });
    },[2000]);
    
      let handleFriendRequest = (item)=>{
        console.log(item);
        set(push(ref(db, 'friendrequest')), {
         sendername: data.displayName,
         senderid: data.uid,
         receivername: item.username,
         receiverid: item.userid,
        });      
      };

      useEffect(() => {
        const friendrequestRef = ref(db, 'friendrequest');
        onValue(friendrequestRef, (snapshot) => {
          let arr = [];
          snapshot.forEach((item) => {
            // console.log("SenderID-ReceiverID:",item.val().senderid+item.val().receiverid); 
            arr.push(item.val().senderid+item.val().receiverid);
          }); 
          setFriendrequestlist(arr);
        });
    },[]);


    useEffect(() => {
      const friendRef = ref(db, 'friend');
      onValue(friendRef, (snapshot) => {
        let arr = [];
        snapshot.forEach((item) => { 
          arr.push(item.val().senderid+item.val().receiverid);
        }); 
        setFriendlist(arr);
      });
  },[]);

  return (
    <div className="w-full bg-white shadow-lg rounded-lg py-3 px-5 mt-3.5
    h-[365px] overflow-scroll">
     <div className="relative">
       <h3 className="font-nunito font-bold text-xl">User List</h3>
        <BsThreeDotsVertical className='absolute top-[6px] right-[30px] text-primary'/>
     </div>

    {userlist.map(item=>(
        <div className='flex gap-x-5 items-center border-b border-solid border-primary pb-3.5 mt-3.5'>
        <div>
            <img className='w-[70ox] h-[70px] rounded-full' src='images/friendrequest.png'/>
        </div>
        <div>
        <h3 className="font-nunito font-bold text-xl">{item.username}</h3>
        <p className="font-nunito font-semibold text-[12px] text-[#4D4D4D]">{item.userid}</p>
        </div>
        <div>

        {friendlist.includes(item.userid + data.uid) || friendlist.includes( data.uid+item.userid)
        ?
        (<button onClick={()=>handleFriendRequest(item)}className='font-nunito font-bold text-xl bg-primary text-white py-2.5 px-5 rounded'>F</button>)
        :
        (friendrequestlist.includes(item.userid + data.uid) || friendrequestlist.includes( data.uid+item.userid)
          ?(
            <button onClick={()=>handleFriendRequest(item)}className='font-nunito font-bold text-xl bg-primary text-white py-2.5 px-5 rounded'>P</button>
          )
        : (
          <button onClick={()=>handleFriendRequest(item)}className='font-nunito font-bold text-xl bg-primary text-white py-2.5 px-5 rounded'>+</button>
        ))
        }
        </div>
     </div>
    ))}

   

    </div>
  )
}

export default Userlist