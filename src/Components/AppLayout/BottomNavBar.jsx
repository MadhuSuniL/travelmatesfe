import React from 'react';
import { FaPlane, FaPlus, FaEnvelope, FaUsers, FaHome } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';

const BottomNavBar = () => {
  // Define an array of navigation items
  
  const location = useLocation();
  const navItems = [
    {
      path: '/travelers',
      icon: <FaPlane className={location.pathname.includes('/travelers') ? 'text-cyan-600' : 'text-gray-400'}/>,
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
    {
      path: '/requests',
      icon: <FaUsers className={location.pathname.includes('/requests') ? 'text-cyan-600' : 'text-gray-400'}/>,
      title: 'Requests',
    },
  ];
  const activeStyle = 'text-main font-bold'


  return (
    <div className="btm-nav">
      <button className={`${location.pathname === '/' ? 'active '+activeStyle : ''}`}>
        <NavLink to={'/'}>
          <center>
            {<FaHome className={location.pathname === '/' ? 'text-cyan-600' : 'text-gray-400'}/>}
            <span className="btm-nav-label">{'Home'}</span>
          </center>
        </NavLink>
      </button>
      {navItems.map((item, index) => (
        <button key={index} className={location.pathname.includes(item.path) ? 'active '+activeStyle : ''}>
          <NavLink to={item.path}>
            <center>
              {item.icon}
              <span className="btm-nav-label">{item.title}</span>
            </center>
          </NavLink>
        </button>
      ))}
    </div>
  );
};

export default BottomNavBar;
