import React from 'react';
import Logo from '../../assests/logo2.png'
import { FaPlane, FaPlus, FaEnvelope, FaUsers, FaHome } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import { getData } from '../../Functions/LocalStorage';
import Notifications from '../Notifications/Notifications';

const Header = () => {
  // Define an array of navigation items
  const location = useLocation();
  const profile_logo = getData('user')?.profile_pic || 'https://tse4.mm.bing.net/th?id=OIP.SWjOyXq5-r0qKj7QFI44RQAAAA&pid=Api&P=0&h=180'
  const activeStyle = 'text-main font-bold underline decoration-4 underline-offset-8'
  const unActiveStyle = 'hover:scale-105 duration-200 hover:underline decoration-4 underline-offset-8'
  const navItems = [
    {
      path: '/travelers',
      icon: <FaPlane className={location.pathname.includes('/travelers') ? 'text-cyan-600' : 'text-gray-400'} />,
      title: 'Travelers',
    },
    {
      path: '/publish',
      icon: <FaPlus className={location.pathname.includes('/publish') ? 'text-cyan-600' : 'text-gray-400'}/>,
      title: 'Publish',
    },
    {
      path: '/chats',
      icon: <FaEnvelope className={location.pathname.includes('/chats') ? 'text-cyan-600' : 'text-gray-400'}/>,
      title: 'Messages',
    },
    // {
    //   path: '/requests',
    //   icon: <FaUsers className={location.pathname.includes('/requests') ? 'text-cyan-600' : 'text-gray-400'}/>,
    //   title: 'Requests',
    // },
    {
      path: null,
      source : <Notifications mobile = {false}/>
    },
    {
      path: '/profile',
      icon: <img src={profile_logo} alt='User Logo' className={'h-8 cp mt-5 ml-3 rounded-full'} />,
      title: '',
    },
  ];

  return (
    <div className='flex justify-between items-center'>
      <div className='flex justify-between items-center'>
        <img src={Logo} className="h-16" alt="Logo" />
        {/* <h1 className='text-main font-semibold font-mono text-xl md:text-3xl'>TravelMates</h1> */}
      </div>
      <div className="md:flex hidden items-center">
        <NavLink to={'/'}>
          <button className={`mx-2 ${unActiveStyle} ${location.pathname === '/' ? activeStyle : ''} `}>
            <center>
              {<FaHome className={location.pathname === '/' ? 'text-cyan-600' : 'text-gray-400'}/>}
                <span className="ml-1">{'Home'}</span>
            </center>
          </button>
        </NavLink>
        {navItems.map((item, index) => (
          item.path ?
          <button key={index} className={`mx-2 ${unActiveStyle} ${location.pathname.includes(item.path) ? activeStyle : ''} `}>
            <center>
              <NavLink to={item.path}>
                {item.icon}
                <span className="ml-1">{item.title}</span>
              </NavLink>
            </center>
          </button>
          :
          item.source
        ))}
      </div>
      <div className='flex items-center md:hidden'>
        <Notifications mobile = {true}/>
        <button className={`mx-2 flex items-center md:hidden ${unActiveStyle} ${location.pathname.includes('/profile') ? activeStyle : ''} `}>
          <center>
            <NavLink to={'/profile'}>
              <img src={profile_logo} alt='User Logo' className={`h-9 cp ml-3 mt-5 rounded-full`} />
              <span className="ml-1">{''}</span>
            </NavLink>
          </center>
        </button>
      </div>

    </div>
  );
};

export default Header;
