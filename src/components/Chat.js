import React from 'react';
import ModalImage from "react-modal-image";
import {BsThreeDotsVertical,BsFillTriangleFill} from "react-icons/bs";
import {GrGallery} from "react-icons/gr";
import {BsFillCameraFill,BsFillMicFill} from "react-icons/bs";

const Chat = () => {
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
                <h3 className='font-Nunito font-semibold text-2xl'>Mesbah</h3>
                <p className='font-Nunito font-regular text-sm'>Online</p>
            </div>
        </div>

        {/* message part start */}
        <div>
            <div className='overflow-y-scroll h-[500px] border-b border-solid border-red-500'>
            {/* receive message start */}
            <div className='mb-8'>
            <div className='bg-[#e0e7da] inline-block py-3 px-12 rounded-md relative ml-5 w-[600px]'>
                    <p className='font-Nunito font-semibold'>Hey There !Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <BsFillTriangleFill className='text-3xl absolute bottom-[-2px] left-[-8px] text-[#e0e7da]'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] ml-5'>Today, 2:10 PM</p>
            </div>
            {/* receive message ends */}

            {/* send message start */}
            <div className='mb-8 text-right'>
            <div className='bg-primary inline-block py-3 px-12 rounded-md relative mr-5 w-[600px]'>
                    <p className='text-white font-Nunito font-semibold text-left'>Hey There ! Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <BsFillTriangleFill className='text-3xl absolute bottom-[-2.5px] right-[-8px] text-primary'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] mr-5'>Today, 2:10 PM</p>
            </div>
            {/* send message ends */}

            {/* receive image start */}
            <div className='mb-8'>
            <div className='bg-[#e0e7da] inline-block p-3 rounded-md relative ml-5 w-[300px]'>
                <ModalImage
                small={"images/login.png"}
                large={"images/login.png"}
                />
                <BsFillTriangleFill className='text-3xl absolute bottom-[-2px] left-[-8px] text-[#e0e7da]'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] ml-5'>Today, 2:10 PM</p>
            </div>
            {/* receive image ends */}

            {/* send image start */}
            <div className='mb-8 text-right'>
            <div className='bg-primary inline-block p-3 rounded-md relative mr-5 w-[300px]'>
                <ModalImage
                small={"images/registration.png"}
                large={"images/registration.png"}
                />
                <BsFillTriangleFill className='text-3xl absolute bottom-[-2.5px] right-[-8px] text-primary'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] mr-5'>Today, 2:10 PM</p>
            </div>
            {/* send image ends */}

            {/* receive audio start */}
            <div className='mb-8'>
            <div className='bg-[#e0e7da] inline-block py-3 px-12 rounded-md relative ml-5 w-[400px]'>
                    <audio controls>
                    </audio>
                    <BsFillTriangleFill className='text-3xl absolute bottom-[-2px] left-[-8px] text-[#e0e7da]'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] ml-5'>Today, 2:10 PM</p>
            </div>
            {/* receive audio ends */}

            {/* send audio start */}
            <div className='mb-8 text-right'>
            <div className='bg-primary inline-block py-3 px-12 rounded-md relative mr-5 w-[400px]'>
                    <audio controls>
                    </audio>
                    <BsFillTriangleFill className='text-3xl absolute bottom-[-2.5px] right-[-8px] text-primary'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] mr-5'>Today, 2:10 PM</p>
            </div>
            {/* send audio ends */}

            {/* receive video start */}
            <div className='mb-8'>
            <div className='bg-[#e0e7da] inline-block py-3 px-12 rounded-md relative ml-5 w-[400px]'>
                <video width="320" height="240" controls>
                </video>
                    <BsFillTriangleFill className='text-3xl absolute bottom-[-2px] left-[-8px] text-[#e0e7da]'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] ml-5'>Today, 2:10 PM</p>
            </div>
            {/* receive video ends */}

            {/* send video start */}
            <div className='mb-8 text-right'>
            <div className='bg-primary inline-block py-3 px-12 rounded-md relative mr-5 w-[400px]'>
                    <video width="320" height="240" controls>
                    </video>
                    <BsFillTriangleFill className='text-3xl absolute bottom-[-2.5px] right-[-8px] text-primary'/>
                </div>
                <p className='font-Nunito font-medium text-sm text-[rgba(0,0,0,.35)] mr-5'>Today, 2:10 PM</p>
            </div>
            {/* send video ends */}

            </div>

            <div className='flex mt-3'>
                <div className='w-[85%] relative'>
                <input className='bg-[#cfb8d5fe] p-3 w-full rounded-lg'/>
                <label>
                    <input className="hidden" type="file" />
                    <GrGallery className='absolute top-4 right-2'/>
                </label>
                <BsFillCameraFill className='absolute top-4 right-8'/>
                <BsFillMicFill className='absolute top-4 right-14'/>
                </div>
                <button className='bg-primary p-3 rounded-md text-white'>Send</button>
            </div>
        </div>
         {/* message part end */}
    </div>
  )
}

export default Chat 