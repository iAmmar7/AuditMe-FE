/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout from '@ant-design/pro-layout';
import React from 'react';
import { Link, connect, history } from 'umi';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, message } from 'antd';

import logo from '../assets/logo.svg';
import userAvatar from '../assets/user_avatar.png';

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;

  const user = JSON.parse(localStorage.getItem('user'));

  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    message.success('Logout successfully');
    history.push('/auth');
  };

  return (
    <ProLayout
      logo={logo}
      {...props}
      {...settings}
      onCollapse={handleMenuCollapse}
      onMenuHeaderClick={() => {
        if (location.pathname !== '/user') history.push('/user');
      }}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: 'User',
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={() => (
        <p style={{ textAlign: 'center', color: 'grey' }}>
          Coppyright &copy; {`${new Date().getFullYear()} Petrimon`}
        </p>
      )}
      rightContentRender={() => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={logoutUser}>
                <UserOutlined />
                Logout
              </Menu.Item>
            </Menu>
          }
          placement="bottomRight"
          arrow
        >
          <p style={{ paddingTop: '4px', cursor: 'pointer' }}>
            <img
              src={userAvatar}
              alt="avatar"
              style={{ width: '25px', height: 'auto', paddingBottom: '-4px', marginRight: '4px' }}
            />
            {user.name}
          </p>
        </Dropdown>
      )}
    >
      {children}
    </ProLayout>
  );
};

// export default BasicLayout;
export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
