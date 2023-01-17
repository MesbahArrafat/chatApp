import  React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () =>{
    let navigate = useNavigate();
    let data = useSelector((state)=>state.userLoginInfo.userInfo);
    console.log(data);
    useEffect(()=>{
     if(!data){
      navigate("/login");
     }
    });
    return(
        <div>Home</div>
    )
}

export default Home;