import React, { useState } from 'react';
import {
  ConfigProvider,
  Typography,
  Modal,
  Popconfirm,
  message,
  Avatar,
  Form,
  Tag,
  Button,
} from 'antd';
import ProTable from '@ant-design/pro-table';
import enUS from 'antd/lib/locale/en_US';
import axios from 'axios';

import AddForm from './AddForm';
import EditForm from './EditForm';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

function UserTable({ onRequest, tableRef }) {
  const [form] = Form.useForm();
  const [editModeOn, setEditModeOn] = useState(false);
  const [addModeOn, setAddModeOn] = useState(false);

  const editOk = () => {
    setEditModeOn(false);
  };

  const editCancel = () => {
    setEditModeOn(false);
  };

  const addOk = () => {
    setAddModeOn(false);
  };

  const addCancel = () => {
    setAddModeOn(false);
  };

  const deleteUser = (record) => {
    // Send axios request
    axios
      .delete(`${URL}/api/user/delete-user/${record.id}`, {
        headers: { Authorization: localStorage.userToken },
      })
      .then((res) => {
        tableRef.current.reload();
        if (res.data.success) {
          message.success('User has been successfully deleted!');
        }
      })
      .catch(() => {
        message.error('Unable to delete user, please try later!', 10);
      });
  };

  const columns = [
    {
      dataIndex: 'id',
      valueType: 'avatar',
      search: false,
      width: 48,
      render: (_, props) => {
        return (
          <Avatar shape="square" size="small">
            {props.name.charAt(0)}
          </Avatar>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 200,
      ellipsis: true,
      sorter: () => null,
      render: (_) => <Typography.Text strong>{_}</Typography.Text>,
    },
    {
      title: 'Badge Number',
      dataIndex: 'badgeNumber',
      render: (_) => <Typography.Text>{_}</Typography.Text>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      search: false,
      filters: [
        {
          text: 'Auditor',
          value: 'auditor',
        },
        {
          text: 'RM',
          value: 'rm',
        },
        {
          text: 'AM',
          value: 'am',
        },
        {
          text: 'SM',
          value: 'sm',
        },
        {
          text: 'Viewer',
          value: 'viewer',
        },
      ],
      // eslint-disable-next-line consistent-return
      render: (role) => {
        if (role === 'auditor') return <Tag color="purple">Auditor</Tag>;
        if (role === 'sm') return <Tag color="green">SM</Tag>;
        if (role === 'rm') return <Tag color="orange">RM</Tag>;
        if (role === 'am') return <Tag color="red">AM</Tag>;
        if (role === 'viewer') return <Tag color="pink">Viewer</Tag>;
      },
    },
    {
      title: 'Password',
      dataIndex: 'password',
      editable: true,
      search: false,
      copyable: true,
      render: (_) => <Typography.Text>{_}</Typography.Text>,
    },
    {
      title: 'Operation',
      valueType: 'option',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            form.setFieldsValue({ id: record.id });
            form.setFieldsValue({ name: record.name });
            form.setFieldsValue({ badgeNumber: record.badgeNumber });
            form.setFieldsValue({ password: record.password });
            setEditModeOn(true);
          }}
        >
          Edit
        </a>,
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => deleteUser(record)}
          okText="Yes"
          cancelText="No"
          key="delete"
        >
          <a>Delete</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        columns={columns}
        actionRef={tableRef}
        request={onRequest}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        pagination={{
          showQuickJumper: true,
          pageSize: 20,
          pageSizeOptions: [10, 20, 50],
        }}
        options={{
          density: false,
        }}
        scroll={{ x: '650px' }}
        toolBarRender={() => [
          <Button key="add-user" type="primary" onClick={() => setAddModeOn(true)}>
            Add New User
          </Button>,
        ]}
      />
      <Modal
        title="Edit User Info"
        visible={editModeOn}
        onOk={editOk}
        onCancel={editCancel}
        footer={null}
      >
        <EditForm form={form} modalClose={editCancel} tableRef={tableRef} />
      </Modal>
      <Modal
        title="Add New User"
        visible={addModeOn}
        onOk={addOk}
        onCancel={addCancel}
        footer={null}
      >
        <AddForm modalClose={addCancel} tableRef={tableRef} />
      </Modal>
    </ConfigProvider>
  );
}

export default UserTable;
