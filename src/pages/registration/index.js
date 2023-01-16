import React ,{useState} from 'react';
import { RiEyeOffFill } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification  } from "firebase/auth";
// import { ToastContainer, toast } from 'react-toastify';
import { BallTriangle } from  'react-loader-spinner';
import {Link,useNavigate } from "react-router-dom";



const Registration = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let [nameerr, setNameerr] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [passworderr, setPassworderr] = useState("");
  let [passwordShow, setPasswordShow] = useState(false);
  let [success, setSuccess] = useState(false);
  let [loading, setLoading] = useState(false);

  let handleName = (e) =>{
    setName(e.target.value);
    setNameerr("");
  };
  let handleEmail = (e) =>{
    setEmail(e.target.value);
    setEmailerr("");
  };
  let handlePassword = (e) =>{
    setPassword(e.target.value);
    setPassworderr("");
  };

  let handleSubmit = (e) =>{
    if(!name){
      setNameerr("Name is required");
    }

    if(!email){
      setEmailerr("Email is required");
    }else{
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
        setEmailerr("Invalid Email");
      };
    }

    if(!password){
      setPassworderr("Password is required");
     }
    // else{
    //   if(!/^(?=.*[a-z])/.test(password)){
    //     setPassworderr("Lowercase required");
    //   }
    //   else if(!/^(?=.*[A-Z])/.test(password)){
    //     setPassworderr("Uppercase required");
    //   }
    //   else if(!/^(?=.*[0-9])/.test(password)){
    //     setPassworderr("Number required");
    //   }
    //   else if(!/^(?=.*[!@#$%^&*])/.test(password)){
    //     setPassworderr("Special character required");
    //   }
    //   else if(!/^(?=.{6,})/.test(password)){
    //     setPassworderr("Six characters or longer");
    //   }
    // }
    if(email && name && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password).then(() =>{
        // toast.success("Registration Successful.Please verify your email.")
        setSuccess("Registration Successful.Please verify your email.")
        setName("");
        setEmail("");
        setPassword("");
        sendEmailVerification(auth.currentUser);
        setLoading(false);
        setTimeout(()=>{
          navigate("/login");
        },2000);
      }).catch((error)=>{
        if(error.code.includes("auth/email-already-in-use")){
          setEmailerr("Email already in use");
          setLoading(false);
        };
      })
    }
  };
  return (
    
    <div className='flex'>


      {/* <ToastContainer position="bottom-center" theme="dark"/> */}
        <div className="w-2/4 flex justify-end">
            <div className='mr-16 mt-32'>
              <h3 className='font-nunito font-bold text-4xl text-heading'>Get started with easily register</h3>
              <p className='font-nunito text-xl mt-1 text-secondary'>Free register and you can enjoy it</p>

              {success && 
             (<p className='text-white w-96 font-semibold text-2xl mt-2 px-4 bg-green-500'>{success}</p>)
            }

              <div className='relative  mt-6'>
            <input onChange={handleName} 
            type='text' className='border border-solid border-x-secondary w-96 py-4 px-14 rounded-lg' value={name}/>
            <p  className='font-nunito font-semibold text-heading text-sm absolute top-[-10px] left-[34px] bg-white px-[18px]'>Full Name</p>
            {nameerr && 
            (<p className='text-white w-96 font-semibold mt-2 px-4 bg-red-600'>{nameerr}</p>)
            }
            
            </div>

            <div className='relative  mt-6'>
            <input  onChange={handleEmail} 
            type='email' className='border border-solid border-x-secondary w-96 py-4 px-14 rounded-lg' value={email}/>
            <p  className='font-nunito font-semibold text-heading text-sm absolute top-[-10px] left-[34px] bg-white px-[18px]'>Email Address</p>
            {emailerr && 
             (<p className='text-white w-96 font-semibold mt-2 px-4 bg-red-600'>{emailerr}</p>)
            }
           
            </div>

            <div className='relative  mt-6'>
            <input onChange={handlePassword}  type={passwordShow ? "text" :"password"} className='border border-solid border-x-secondary w-96 py-4 px-14 rounded-lg' value={password}/>
            <p  className='font-nunito font-semibold text-heading text-sm absolute top-[-10px] left-[34px] bg-white px-[18px]'>Password</p>
          { passwordShow ? 
           (<RiEyeFill onClick={()=>setPasswordShow(!passwordShow)} className='absolute top-[20px] right-[150px]'/>)  
          :
            (<RiEyeOffFill onClick={()=>setPasswordShow(!passwordShow)} className='absolute top-[20px] right-[150px]'/>)
          }
            {passworderr && 
              (<p className='text-white w-96 font-semibold mt-2 px-4 bg-red-600'>{passworderr}</p>)
            }
          
            </div>

          {loading ? 
          <div className='flex justify-center w-96'>
           <BallTriangle
           height={100}
           width={100}
           radius={3}
           color="#5F35F5"
           ariaLabel="ball-triangle-loading"
           wrapperClass={{}}
           wrapperStyle=""
           visible={true}
           />
          </div>
          
          :
          <button onClick={handleSubmit}  className='w-96 bg-primary py-4 rounded-full font-nunito font-semibold text-xl text-white mt-8' >Sign Up</button>
          }
          

         
         

          <p className='w-96 text-center mt-4'>Already  have an account ? <Link to='/login' className='font-nunito font-semibold text-[#EA6C00]'>Sign In</Link></p>
            </div>
        </div>
        <div className="w-2/4">
            <img className='w-full h-screen object-cover' src='images/registration.png' /> 
        </div>
        <div></div>
    </div>
  )
}

export default Registration