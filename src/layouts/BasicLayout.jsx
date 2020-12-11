/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout from '@ant-design/pro-layout';
import React from 'react';
import { Link, connect, history } from 'umi';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, message, Avatar, Typography, Row, Col } from 'antd';

// import logo from '../assets/logo.svg';
// import userAvatar from '../assets/user_avatar.png';

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

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
      logo={false}
      {...props}
      {...settings}
      onCollapse={handleMenuCollapse}
      onMenuHeaderClick={() => {
        if (location.pathname !== '/user') history.push('/user');
      }}
      menuDataRender={(routes) => {
        const newRoutes = [...routes];
        if (JSON.parse(localStorage.user).isAdmin) newRoutes[4].hideInMenu = false;

        return newRoutes;
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
      menuProps={{
        onClick: handleMenuCollapse,
      }}
      footerRender={() => (
        <Typography.Text style={{ textAlign: 'center', color: 'grey', padding: '10px' }}>
          Copyright &copy; {new Date().getFullYear()} Business Excellence Team || Saad Khan
        </Typography.Text>
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
          <Row align="center" gutter={[4, 4]} style={{ cursor: 'pointer' }}>
            <Col>
              <Avatar
                shape="square"
                size="small"
                style={{ backgroundColor: ColorList[Math.floor(Math.random() * 4)] }}
              >
                {user.name.charAt(0)}
              </Avatar>
            </Col>
            <Col>
              <Typography.Text>{user.name}</Typography.Text>
            </Col>
          </Row>
        </Dropdown>
      )}
      // rightContentRender={() => (
      //   <div>
      //     <Avatar shape="square" size="small" icon={<UserOutlined />} />
      //   </div>
      // )}
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
