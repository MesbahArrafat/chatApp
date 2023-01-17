import React ,{useState} from 'react';
import { RiEyeOffFill } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { BallTriangle } from  'react-loader-spinner';
import {Link,useNavigate } from "react-router-dom";
import {  useDispatch } from 'react-redux';
import { userLoginInfo } from '../../slices/userSlice';

const Login = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
  
    let [emailerr, setEmailerr] = useState("");
    let [passworderr, setPassworderr] = useState("");
    let [passwordShow, setPasswordShow] = useState(false);
    let [success, setSuccess] = useState(false);
    let [loading, setLoading] = useState(false);
  

    let handleEmail = (e) =>{
      setEmail(e.target.value);
      setEmailerr("");
    };
    let handlePassword = (e) =>{
      setPassword(e.target.value);
      setPassworderr("");
    };
  
    let handleSubmit = (e) =>{
    
  
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
      if(email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            setLoading(false);
            toast.success("Login Successfully.Please wait.");
            dispatch(userLoginInfo(user.user));
            localStorage.setItem("userInfo",JSON.stringify(user));

        // setSuccess("login Successfully.Please wait.");
       setTimeout(() => {
        navigate('/');
       }, 2000);
  })
  .catch((error) => {
    const errorCode = error.code;
    if(errorCode.includes("auth/user-not-found")){
        setEmailerr("Email not found");
    }
    if(errorCode.includes("auth/wrong-password")){
        setPassworderr("Password not match");
    }
    
    setLoading(false);
  });
    
      }
    };
    let handleGoogleSignIn = ()=>{
        signInWithPopup(auth, provider).then(()=>{
            setTimeout(() => {
                navigate('/');
               }, 2000);
        })
    };
    return(
        <div className='flex'>


      <ToastContainer position="bottom-center" theme="dark"/>
        <div className="w-2/4 flex justify-end">
            <div className='mr-16 mt-32'>
              <h3 className='font-nunito font-bold text-4xl text-heading'>Login to your account!</h3>
              <button onClick={handleGoogleSignIn} className='w-48 bg-white pl-8 py-4 rounded font-nunito font-bold text-sm text-heading mt-8 border border-solid border-neutral-300' >Login with Google</button>

              {success && 
             (<p className='text-white w-96 font-semibold text-2xl mt-2 px-4 bg-green-500'>{success}</p>)
            }

            <div className='relative  mt-10'>
            <input  onChange={handleEmail} 
            type='email' className='border-b border-solid border-x-secondary w-96 py-4 px-3 outline-0' value={email}/>
            <p  className='font-nunito font-semibold text-heading text-sm absolute top-[-10px] bg-white px-1.5'>Email Address</p>
            {emailerr && 
             (<p className='text-white w-96 font-semibold mt-2 px-4 bg-red-600'>{emailerr}</p>)
            }
           
            </div>

            <div className='relative  mt-10'>
            <input onChange={handlePassword}  type={passwordShow ? "text" :"password"} className='border-b border-solid border-x-secondary w-96 py-4 px-3 outline-0' value={password}/>
            <p  className='font-nunito font-semibold text-heading text-sm absolute top-[-10px] bg-white px-1.5'>Password</p>
          { passwordShow ? 
           (<RiEyeFill onClick={()=>setPasswordShow(!passwordShow)} className='absolute top-[20px] right-[20px]'/>)  
          :
            (<RiEyeOffFill onClick={()=>setPasswordShow(!passwordShow)} className='absolute top-[20px] right-[20px]'/>)
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
          <button onClick={handleSubmit}  className='w-96 bg-primary py-4 rounded font-nunito font-semibold text-xl text-white mt-8' >Login to your account</button>
          }
          
         


          <p className='w-96 text-center mt-4'>Don’t have an account ? <Link to='/registration' className='font-nunito font-semibold text-[#EA6C00]'>Sign Up</Link></p>

          <p className='w-96 text-center mt-4'><Link to='/forgotpassword' className='font-nunito font-semibold text-[#EA6C00]'>Forgot Password</Link></p>

            </div>
        </div>
        <div className="w-2/4">
            <img className='w-full h-screen object-cover' src='images/login.png' /> 
        </div>
        <div></div>
    </div>
    )
}

export default Login;