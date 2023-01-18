import React from 'react';
import {BsSearch} from "react-icons/bs";
import {BsThreeDotsVertical} from "react-icons/bs";

const Search = () => {
  return (
    <div className='relative'>
        <input type="text" placeholder="Search" className="w-full rounded-lg p-5 shadow-lg pl-[78px]" />
        <BsSearch className='absolute top-[26px] left-[30px]'/>
        <BsThreeDotsVertical className='absolute top-[26px] right-[30px]'/>
    </div>

  )
}

export default Search