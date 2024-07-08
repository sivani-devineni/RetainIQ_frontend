import React from 'react';
import { FaHome, FaUser, FaCog, FaChartBar } from 'react-icons/fa';
import '../styles/sideBar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="icon-wrapper" style={{marginTop:'100px'}}>
       <img src='images/retainiqlogo.png'style={{width:'100%',height:'90%'}}></img>
      </div>
      <div className="icon-wrapper">
        <FaUser className="sidebar-icon" />
      </div>
      <div className="icon-wrapper">
        <FaCog className="sidebar-icon" />
      </div>
      <div className="icon-wrapper">
        <FaChartBar className="sidebar-icon" />
      </div>
    </div>
  );
};

export default Sidebar;
