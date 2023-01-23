import React, { useEffect,useState } from 'react';
import {BsThreeDotsVertical} from "react-icons/bs";
import { getDatabase, ref, onValue} from "firebase/database";
import { useSelector } from 'react-redux';


const Blockedlist = () => {
    const db = getDatabase();
    let data = useSelector((state) => state.userLoginInfo.userInfo);
    let[blocklist,setBlocklist] = useState([]);


    useEffect(()=>{
        const blockRef = ref(db, 'block');
        onValue(blockRef, (snapshot) => {
            let arr = [];
          snapshot.forEach((item)=>{
            if(item.val().blockbyid == data.uid){
                arr.push({
                    id: item.key,
                    block:item.val().block,
                    blockid:item.val().blockid,
                });
            }else{
                arr.push({
                    id: item.key,
                    blockbyid:item.val().blockbyid,
                    blockby:item.val().blockby,
                });
            }
        //   arr.push({...item.val(), key: item.key });
          });  
          setBlocklist(arr);
        });
    },[]);

  return (
    <div className="w-full bg-white shadow-lg rounded-lg py-3 px-5 mt-3.5
    h-[335px] overflow-scroll">
     <div className="relative">
       <h3 className="font-nunito font-bold text-xl">Blocked List</h3>
        <BsThreeDotsVertical className='absolute top-[6px] right-[30px] text-primary'/>
     </div>
     {blocklist.map(item=>(
             <div className='flex gap-x-5 items-center border-b border-solid border-primary pb-3.5 mt-3.5'>
             <div>
                 <img className='w-[70ox] h-[70px] rounded-full' src='images/friendrequest.png'/>
             </div>
             <div>
             <h3 className="font-nunito font-bold text-xl">{item.block}</h3>
             <h6 className="font-nunito font-bold">{item.blockby}</h6>
             <p className="font-nunito font-semibold text-[14px] text-[#4D4D4D]">Hi Guys</p>
             </div>
             <div>
                {item.blockbyid && (
                <button className='font-nunito font-bold text-xl bg-primary text-white py-2.5 px-5 rounded'>Unblock</button>
                )}
                 
             </div>
          </div>
        ))}



    </div>
  )
}

export default Blockedlist