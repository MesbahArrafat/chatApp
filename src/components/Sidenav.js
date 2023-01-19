import React,{useState} from 'react';
import {AiOutlineHome} from "react-icons/ai";
import {BsCloudUploadFill} from "react-icons/bs";
import {AiOutlineMessage} from "react-icons/ai";
import {IoIosNotificationsOutline} from "react-icons/io";
import {FiSettings} from "react-icons/fi";
import {AiOutlineLogout} from "react-icons/ai";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginInfo } from '../slices/userSlice';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString,getDownloadURL  } from "firebase/storage";

const Sidenav = () => {
    const auth = getAuth();
    const storage = getStorage();
    let navigate = useNavigate();
    let dispatch = useDispatch();

    let data = useSelector((state) => state.userLoginInfo.userInfo.photoURL);
    
    // for image crop
    const [image, setImage] = useState("");
    const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState();

     // for image upload
     let [imageUploadModal,setImageUpoadModal] = useState(false);

let handleLogOut = ()=>{
    signOut(auth).then(() => {
      dispatch(userLoginInfo(null));
      localStorage.removeItem("userInfo");
      navigate("/login");
      }).catch((error) => {
        // An error happened.
      });
};
let handleImageUpload = ()=>{
  setImageUpoadModal(true);
};
let handleImageUploadModal = ()=>{
  setImageUpoadModal(false);
  setImage("");
  setCropData("");
  setCropper("");
} 
// image crop function
const handleProfileUpload = (e) => {
  e.preventDefault();
  let files;
  if (e.dataTransfer) {
    files = e.dataTransfer.files;
  } else if (e.target) {
    files = e.target.files;
  }
  const reader = new FileReader();
  reader.onload = () => {
    setImage(reader.result);
  };
  reader.readAsDataURL(files[0]);
};
const getCropData = () => {
  if (typeof cropper !== "undefined") {
    setCropData(cropper.getCroppedCanvas().toDataURL());

    // storage code

    const storageRef = ref(storage, auth.currentUser.uid);
    const message4 = cropper.getCroppedCanvas().toDataURL();
    uploadString(storageRef, message4, 'data_url').then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        updateProfile(auth.currentUser, { 
          photoURL: downloadURL,
        }).then( () => {
          setImageUpoadModal(false);
          setImage("");
          setCropData("");
          setCropper("");
        });
      });
    });
  }
};
  return (
    <div className='w-full bg-primary h-screen rounded-3xl p-9'>
      <div className='group relative w-28 rounded-full'>
      <img className='mx-auto w-full h-full rounded-full' src={data} />
      <div onClick={handleImageUpload} className="opacity-0 group-hover:opacity-100 group-hover:w-full h-full bg-[rgba(0,0,0,.4)] rounded-full bg-state-50 absolute top-0 left-0 flex justify-center items-center">
        <BsCloudUploadFill className='text-white text-3xl'/>
      </div>
      </div>
     
    
     <div className="mt-16 relative z-[1] after:z-[-1] after:bg-white after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:w-[135%] after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-primary before:absolute before:top-[-16px] before:right-[-36px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg">
     <AiOutlineHome className='text-5xl text-primary mx-auto'/>
     </div>

     <div className="mt-10 relative z-[1] after:z-[-1] after:bg-none after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:w-[135%] after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-none before:absolute before:top-[-16px] before:right-[-36px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg">
     <AiOutlineMessage className='text-5xl text-white mx-auto'/>
     </div>

     <div className="mt-10 relative z-[1] after:z-[-1] after:bg-none after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:w-[135%] after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-none before:absolute before:top-[-16px] before:right-[-36px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg">
     <IoIosNotificationsOutline className='text-5xl text-white mx-auto'/>
     </div>

     <div className="mt-10 relative z-[1] after:z-[-1] after:bg-none after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:w-[135%] after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-none before:absolute before:top-[-16px] before:right-[-36px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg">
     <FiSettings className='text-5xl text-white mx-auto'/>
     </div>

     <div onClick={handleLogOut} className="mt-28 relative z-[1] after:z-[-1] after:bg-none after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:w-[135%] after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-none before:absolute before:top-[-16px] before:right-[-36px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg">
     <AiOutlineLogout className='text-5xl text-white mx-auto'/>
     </div>
     {imageUploadModal && (
        <div className='z-50 w-full h-screen bg-primary absolute top-0 left-0 flex justify-center  items-center'>
        <div className='w-3/6 bg-white rounded-lg p-5'>
         <h2 className='font-nunito text-center md:text-left font-bold text-3xl lg:text-4xl'>Upload Your Profile</h2>
         {image
         ?
         (<div className='group relative w-28 h-28 overflow-hidden rounded-full mx-auto'>
         <div
             className="img-preview w-full h-full rounded-full"
         />
         </div>)
        :
        (<img className='mx-auto w-28 h-28 rounded-full' src={data} />)
        }
        
         
         <input onChange={handleProfileUpload} className='mt-8' type="file"/>
         <br/>
         <br/>
         {image &&(
         <Cropper
         style={{ height: 400, width: "100%" }}
         zoomTo={0.5}
         initialAspectRatio={1}
         preview=".img-preview"
         src={image}
         viewMode={1}
         minCropBoxHeight={10}
         minCropBoxWidth={10}
         background={false}
         responsive={true}
         autoCropArea={1}
         checkOrientation={false}
         onInitialized={(instance) => {
           setCropper(instance);
         }}
         guides={true}
         />
         )}
        
         <button onClick={getCropData} className='w-40 bg-primary py-4 rounded font-nunito font-semibold text-xl text-white mt-8' >Upload</button>
 
         <button onClick={handleImageUploadModal} className='w-40 bg-red-500 py-4 rounded font-nunito font-semibold text-xl text-white mt-8 ml-8' >Cancle</button>
        </div>
       </div>
     )}
   
    </div>
  )
}

export default Sidenav