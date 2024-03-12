import { NavLink } from "react-router-dom"

const NotificationLabelBox = ({
    ping
}) => {

    return (
        <div className='mt-4 mx-2 grid grid-cols-12 gap-1 items-center shadow shadow-gray-500 p-2 py-0 rounded-full'>
            <div className='col-span-2 flex justify-center'>
                <img className='rounded-full w-10' src = {ping?.user_by.user_details.profile_pic ? ping?.user_by.user_details.profile_pic : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}/>
            </div>
            <div className='col-span-10'>
                <sub className='text-main text-[11px]'>{'Madhu'}</sub><sub className='mx-2 text-[9px]'>{ping.created_at}</sub>
                <NavLink to={ping.redirect_path} className='text-white hover:text-white hover:underline'>
                    <h1 className='text-[13px] max-w-[300px] py-1'>{ping.label}</h1>
                </NavLink>
            </div>
        </div>
    )
}

export default NotificationLabelBox