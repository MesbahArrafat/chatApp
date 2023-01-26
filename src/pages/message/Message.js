import React from 'react';
import Sidenav from "../../components/Sidenav";
import Search from "../../components/Search";
import Friends from "../../components/Friends";
import MessageGroups from "../../components/MessageGroups";
import Chat from '../../components/Chat';

const Message = () => {
  return (
    <div className='flex justify-between'>
        <div className='w-[186px] pl-2.5'>
          <Sidenav active="message"/>
        </div>
        <div className='w-[420px]'>
         <Search />
         <MessageGroups />
         <Friends />
        </div>

        <div className='w-[850px]'>
        <Chat/>
        </div>
    </div>
  )
}

export default Message