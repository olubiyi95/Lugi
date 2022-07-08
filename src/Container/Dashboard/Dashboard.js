import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LaptopOutlined,
    UserOutlined,
    NotificationOutlined,
    MailOutlined, AppstoreOutlined, SettingOutlined
  } from '@ant-design/icons';
  import { Layout,  Input } from 'antd';
  import  img  from '../../assets/logo.png'
  import { useNavigate } from "react-router-dom";
  import Employees from '../../Components/Employee/Employee'
  import EmployeeLoginPage from '../../Components/EmployeeLogin/EmployeeLoginPage';
  import { Menu } from 'antd';
  import { useSelector } from 'react-redux';
  import { toast } from 'react-toastify';
  import { LogOutUser } from '../../Store/Actions';
  import './style.css'
 

   export const Dashboard = () => {

    const { user } = useSelector(state => state.data);
    const { Header, Sider, Content } = Layout;
    const [current, setCurrent] = useState('');
    const [defaultselected] = useState("")
    const [collapsed, setCollapsed] = useState(false);
    const [ currentUser, setCurrentUser ] = useState(null)
    const navigate = useNavigate()

const handleLogOutUser = async () => {
    try {
        await LogOutUser
        toast.success("Logout Successful")
        navigate("/login")
    } catch (error) {
        toast.error(error)
    }
}



    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }
      const items = [
        getItem('Dashboard', 'sub1', <MailOutlined />, [
            {
                label: 'Em',
                key: 'mail',
                icon: <NotificationOutlined />,
              },
         
        ]),
        getItem('Employees', 'sub2', <AppstoreOutlined />, [
            {
                label: 'View employees',
                key: 'card',
                icon: <SettingOutlined />,
              },
        ]),
        getItem('Employee Login', 'sub4', <LaptopOutlined />, [
            {
                label: 'Login',
                key: 'cap',
                icon: <UserOutlined />,
              },
        ]),
      ];

     const onClick =(e) => {
        setCurrent(e.key)
     }
   return (
    <>
        <div className=''>
        <Layout>
           <div className='dashboard'>
           <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="logo" />
                  <div className='logo-img'>
                      <img src={ img } className="" />
                  </div>

              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={defaultselected}
                items={items}
                onClick={onClick}
              />
      </Sider>
           </div>
     
      <Layout className="site-layout">
        <div className='dashboard'>
            <div className='dashHeader'>
              <div className='leftSide'>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
              <h5 className='text-light pt-1'>LUGI</h5>
              </div>
              <div className='rightSide'>
                <button className='admin-logout' onClick={handleLogOutUser}>Log out</button>
              </div>
            </div>
        </div>
        
        {current === "" && (
                    <Content
                    className="site-layout-background"
                    style={{
                      margin: '24px 16px',
                      padding: 24,
                      minHeight: 280,
                    }}
                  >
                    <div className=''>
                        <h1> Admin</h1>
                    </div>
                  </Content>
        )}
        {current === 'mail' && (
                    <Content
                    className="site-layout-background"
                    style={{
                      margin: '24px 16px',
                      padding: 24,
                      minHeight: 280,
                    }}
                  >
                    <div className=''>
                        <h1>Welcome Admin Biyi</h1>
                    </div>
                  </Content>
        )}
        {current === 'card' && (
             <Content
             className="site-layout-background"
             style={{
               margin: '24px 16px',
               padding: 24,
               minHeight: 280,
             }}
           >
             <div className=''>
                <Employees/>
             </div>
           </Content>
        )}
          {current === 'cap' && (
             <Content
             className="site-layout-background"
             style={{
               margin: '24px 16px',
               padding: 24,
               minHeight: 280,
             }}
           >
             <div className=''>
               <EmployeeLoginPage/>
             </div>
           </Content>
        )}
      </Layout>
    </Layout>
        </div>
    </>
      
   )
  }


  

  
