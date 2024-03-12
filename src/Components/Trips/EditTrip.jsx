import React from 'react'
import { MdOutlineModeEdit } from "react-icons/md";

const EditTrip = () => {
  return (
    <div className = 'flex badge badge-outline p-3 items-center'>
        <MdOutlineModeEdit className='mx-1' size={17}/>
        <span>Edit Details</span>
    </div>
  )
}

export default EditTrip