import React, { useEffect,useState } from 'react';
import {BsThreeDotsVertical} from "react-icons/bs";
import { getDatabase, ref, onValue, set, push} from "firebase/database";
import { useSelector } from 'react-redux';
import {BsSearch} from "react-icons/bs";

const Userlist = () => {
    const db = getDatabase();
    let data = useSelector((state) => state.userLoginInfo.userInfo);
    let[userlist,setUserlist] = useState([]);
    let[friendrequestlist,setFriendrequestlist] = useState([]);
    let[friendlist,setFriendlist] = useState([]);
    let[filteruserlist,setFilterUserList] = useState([]);

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

  
  let handleSearch = (e)=>{
    let arr =[];
    if(e.target.value.length == 0){
      setFilterUserList([]);
    }else{
      userlist.filter(item=>{
        if(item.username.toLowerCase().includes(e.target.value.toLowerCase())){
          arr.push(item)
        };
        setFilterUserList(arr);
      });
    };
   
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg py-3 px-5 mt-3.5
    h-[365px] overflow-scroll">
      <div className='relative mb-2'>
        <input onChange={handleSearch} type="text" placeholder="Search" className="w-full rounded-lg p-4 shadow-lg pl-[78px]" />
        <BsSearch className='absolute top-[20px] left-[30px]'/>
        <BsThreeDotsVertical className='absolute top-[20px] right-[30px]'/>
    </div>
     <div className="relative">

       <h3 className="font-nunito font-bold text-xl">User List</h3>
        <BsThreeDotsVertical className='absolute top-[6px] right-[30px] text-primary'/>
     </div>
    {filteruserlist.length > 0 
    ? 
    (filteruserlist.map(item=>(
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
  )))
    :
    (userlist.map(item=>(
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
  )))
    }
   </div>
  )
}

export default Userlist