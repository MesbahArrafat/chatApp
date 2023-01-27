import React, { useEffect, useState } from 'react';
import ModalImage from "react-modal-image";
import {BsThreeDotsVertical,BsFillTriangleFill} from "react-icons/bs";
import {GrGallery} from "react-icons/gr";
import {MdSend} from "react-icons/md";
import {BsFillCameraFill,BsFillMicFill,BsFillEmojiSmileFill} from "react-icons/bs";
import { useSelector } from 'react-redux';
import { getDatabase, ref, set, onValue, remove,push } from "firebase/database";
import { getStorage, ref as sref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import moment from 'moment/moment';
import EmojiPicker from 'emoji-picker-react';


const Chat = () => {
    const db = getDatabase();
    const storage = getStorage();
    let data = useSelector((state) => state.userLoginInfo.userInfo);
    let activeChatName = useSelector(state=> state.activeChat);
    let [message,setMessage]=useState("");
    let [messagelist,setMessagelist]=useState([]);
    let [showemoji,setShowEmoji]=useState(false);
    

    let handleMessageSend = ()=>{
      if(activeChatName.active.status == "single"){
       set(push(ref(db,"singleMessage")),{
         message:message,
         whosendid:data.uid,
         whosendname:data.displayName,
         whoreceiveid:activeChatName.active.id,
         whoreceivename:activeChatName.active.name,
         date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`,
       });
      }else{
        console.log("Ami group")
      }
    };


    useEffect(()=>{
      onValue(ref(db,"singleMessage"),(snapshot)=>{
        let arr = [];
        snapshot.forEach((item)=>{
         if(
            (item.val().whosendid == data.uid && item.val().whoreceiveid == activeChatName.active.id) ||  (item.val().whoreceiveid == data.uid && item.val().whosendid == activeChatName.active.id)
         ){
            arr.push(item.val());
        }
        });
        setMessagelist(arr);
      });
    },[activeChatName.active.id]);



    let handleImageUpload = (e)=>{
      console.log(e.target.files[0]);
      const storageRef = sref(storage, e.target.files[0].name);

        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            
        }, 
        (error) => {
            console.log(error);
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            set(push(ref(db,"singleMessage")),{
                image:downloadURL,
                whosendid:data.uid,
                whosendname:data.displayName,
                whoreceiveid:activeChatName.active.id,
                whoreceivename:activeChatName.active.name,
                date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`,
              });
            });
        }
        );
    };

    let handleEmojiSelect = (emoji)=>{
       console.log(emoji);
       setMessage(message + emoji.emoji);
    };

  return (
    <div className='bg-white shadow-xl rounded-xl py-6 px-12'>
        <div className='flex items-center gap-x-8 border-b border-solid border-[rgba(0,0,0,.25)] pb-6 mb-10'>
            <div className='w-[75px] h-[75px] rounded-full shadow-lg relative'>
            <img src='
            images/profile.png'/>
            <div className='w-[16px]
            h-[16px] rounded-full bg-green-500 border border-solid border-white absolute bottom-[11px] right-0 shadow-lg'></div>
            <BsThreeDotsVertical className='absolute top-[35px] left-[720px] text-primary'/>
            </div>
            <div>
                <h3 className='font-Nunito font-semibold text-2xl'>{activeChatName.active.name}</h3>
                <p className='font-Nunito font-regular text-sm'>Online</p>
            </div>
        </div>

        {/* message part start */}
        <div>
            <div className='overflow-y-scroll h-[500px] border-b border-solid border-red-500'>
            {/* receive message start */}
             {activeChatName.active.status == "single" 
             ?( 
            messagelist.map((item)=>
            item.whosendid == data.uid 
            ?
            item.message ? 
            
            (<div className='mb-8 text-right'>
               <div className='bg-primary inline-block py-3 px-12 rounded-md relative mr-5 w-[600px]'>
                    <p className='text-white font-Nunito font-semibold text-left'>{item.message}</p>
                    <BsFillTriangleFill className='text-3xl absolute bottom-[-2.5px] right-[-8px] text-primary'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] mr-5'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
            </div>)
            :
            (<div className='mb-8 text-right'>
            <div className='bg-primary inline-block p-3 rounded-md relative mr-5 w-[300px]'>
                <ModalImage
                small={item.image}
                large={item.image}
                />
                <BsFillTriangleFill className='text-3xl absolute bottom-[-2.5px] right-[-8px] text-primary'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] mr-5'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
            </div>)
            : 
            item.message ? 
            (<div className='mb-8'>
                <div className='bg-[#e0e7da] inline-block py-3 px-12 rounded-md relative ml-5 w-[600px]'>
                        <p className='font-Nunito font-semibold'>{item.message}</p>
                        <BsFillTriangleFill className='text-3xl absolute bottom-[-2px] left-[-8px] text-[#e0e7da]'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] ml-5'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
             </div>)
             :
             ( <div className='mb-8'>
             <div className='bg-[#e0e7da] inline-block p-3 rounded-md relative ml-5 w-[300px]'>
                 <ModalImage
                 small={item.image}
                 large={item.image}
                 />
                 <BsFillTriangleFill className='text-3xl absolute bottom-[-2px] left-[-8px] text-[#e0e7da]'/>
                 </div>
                 <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] ml-5'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
             </div>)
              )
             ):
              (<h1>There are group message</h1>)
             }
            {/* receive message ends */}

{/* ========================= */}
{/* <div className='mb-8'>
            <div className='bg-[#e0e7da] inline-block py-3 px-12 rounded-md relative ml-5 w-[600px]'>
                    <p className='font-Nunito font-semibold'>{item.message}</p>
                    <BsFillTriangleFill className='text-3xl absolute bottom-[-2px] left-[-8px] text-[#e0e7da]'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] ml-5'>Today, 2:10 PM</p>
    </div> */}
{/* ========================= */}

            {/* send message start */}
            {/* <div className='mb-8 text-right'>
            <div className='bg-primary inline-block py-3 px-12 rounded-md relative mr-5 w-[600px]'>
                    <p className='text-white font-Nunito font-semibold text-left'>Hey There ! Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <BsFillTriangleFill className='text-3xl absolute bottom-[-2.5px] right-[-8px] text-primary'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] mr-5'>Today, 2:10 PM</p>
            </div> */}
            {/* send message ends */}

            {/* receive image start */}
            {/* <div className='mb-8'>
            <div className='bg-[#e0e7da] inline-block p-3 rounded-md relative ml-5 w-[300px]'>
                <ModalImage
                small={"images/login.png"}
                large={"images/login.png"}
                />
                <BsFillTriangleFill className='text-3xl absolute bottom-[-2px] left-[-8px] text-[#e0e7da]'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] ml-5'>Today, 2:10 PM</p>
            </div> */}
            {/* receive image ends */}

            {/* send image start */}
            {/* <div className='mb-8 text-right'>
            <div className='bg-primary inline-block p-3 rounded-md relative mr-5 w-[300px]'>
                <ModalImage
                small={"images/registration.png"}
                large={"images/registration.png"}
                />
                <BsFillTriangleFill className='text-3xl absolute bottom-[-2.5px] right-[-8px] text-primary'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] mr-5'>Today, 2:10 PM</p>
            </div> */}
            {/* send image ends */}

            {/* receive audio start */}
            {/* <div className='mb-8'>
            <div className='bg-[#e0e7da] inline-block py-3 px-12 rounded-md relative ml-5 w-[400px]'>
                    <audio controls>
                    </audio>
                    <BsFillTriangleFill className='text-3xl absolute bottom-[-2px] left-[-8px] text-[#e0e7da]'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] ml-5'>Today, 2:10 PM</p>
            </div> */}
            {/* receive audio ends */}

            {/* send audio start */}
            {/* <div className='mb-8 text-right'>
            <div className='bg-primary inline-block py-3 px-12 rounded-md relative mr-5 w-[400px]'>
                    <audio controls>
                    </audio>
                    <BsFillTriangleFill className='text-3xl absolute bottom-[-2.5px] right-[-8px] text-primary'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] mr-5'>Today, 2:10 PM</p>
            </div> */}
            {/* send audio ends */}

            {/* receive video start */}
            {/* <div className='mb-8'>
            <div className='bg-[#e0e7da] inline-block py-3 px-12 rounded-md relative ml-5 w-[400px]'>
                <video width="320" height="240" controls>
                </video>
                    <BsFillTriangleFill className='text-3xl absolute bottom-[-2px] left-[-8px] text-[#e0e7da]'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] ml-5'>Today, 2:10 PM</p>
            </div> */}
            {/* receive video ends */}

            {/* send video start */}
            {/* <div className='mb-8 text-right'>
            <div className='bg-primary inline-block py-3 px-12 rounded-md relative mr-5 w-[400px]'>
                    <video width="320" height="240" controls>
                    </video>
                    <BsFillTriangleFill className='text-3xl absolute bottom-[-2.5px] right-[-8px] text-primary'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] mr-5'>Today, 2:10 PM</p>
            </div> */}
            {/* send video ends */}

            </div>

            <div className='flex mt-3'>
                <div className='w-[95%] relative'>
                <input onChange={(e)=>setMessage(e.target.value)} className='bg-[#cfb8d5fe] p-3 w-full rounded-lg required:border-red-500 ' value={message}/>
                <label>
                    <input onChange={handleImageUpload} className="hidden" type="file" />
                    <GrGallery className='absolute top-4 right-2'/>
                </label>
                <BsFillCameraFill className='absolute top-4 right-8'/>
                <BsFillMicFill className='absolute top-4 right-14'/>
                <BsFillEmojiSmileFill onClick={()=>setShowEmoji(!showemoji)} className='absolute top-4 right-20'/>
                {showemoji && 
            <div className="w-full absolute top-[-450px] right-0">
                  <EmojiPicker width="100%" onEmojiClick={(emoji)=>handleEmojiSelect(emoji)}/>
            </div>}
                </div>
                <button 
                onClick={handleMessageSend}className='bg-primary p-3 rounded-md text-white ml-2'>
                    <MdSend />
                </button>
            </div>
            
            
        </div>
         {/* message part end */}
    </div>
  )
}

export default Chat 











