import React, { useState } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown, Typography, Form, Input, InputNumber } from 'antd';
import EditableProTable, { TableDropdown } from '@ant-design/pro-table';

const columns = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    editable: false,
    width: 48,
  },
  {
    title: 'Badge Number',
    dataIndex: 'badgeNumber',
    editable: true,
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    editable: true,
    render: (_) => <Typography.Text strong>{_}</Typography.Text>,
  },
  {
    title: 'Password',
    dataIndex: 'password',
    editable: true,
    search: false,
    copyable: false,
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Operation',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        Edit
      </a>,
      <a
        key="delete"
        onClick={() => {
          console.log('Delete click', text, record, _, action);
        }}
      >
        Delete
      </a>,
    ],
  },
];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function UserTable(props) {
  const { onRequest, tableRef } = props;

  const [editableKeys, setEditableRowKeys] = useState([]);
  const [newRecord, setNewRecord] = useState({
    id: (Math.random() * 1000000).toFixed(0),
  });

  return (
    <EditableProTable
      columns={columns}
      actionRef={tableRef}
      request={onRequest}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 20,
      }}
      dateFormatter="string"
      editable={{
        editableKeys,
        onSave: async () => {
          console.log('onSave');
        },
        onChange: setEditableRowKeys,
      }}
    />
  );
}

// import React from 'react';
// import { ConfigProvider, Typography, Button, Tag, Space, Menu, Dropdown } from 'antd';
// import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
// import enUS from 'antd/lib/locale/en_US';
// import ProTable, { TableDropdown } from '@ant-design/pro-table';

// const columns = [
//   {
//     title: 'Badge Number',
//     dataIndex: 'badgeNumber',
//     render: (_) => <Typography.Text>{_}</Typography.Text>,
//   },
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     render: (_) => <Typography.Text strong>{_}</Typography.Text>,
//   },
//   {
//     title: 'Password',
//     dataIndex: 'password',
//     search: false,
//     copyable: true,
//     render: (_) => <Typography.Text>{_}</Typography.Text>,
//   },
//   {
//     title: 'Operation',
//     valueType: 'option',
//     render: (text, record, _, action) => [
//       <a
//         key="editable"
//         onClick={() => {
//           action.startEditable?.(record.id);
//         }}
//       >
//         Edit
//       </a>,
//       <a
//         key="delete"
//         onClick={() => {
//           console.log('delete has clicked', record.url);
//         }}
//       >
//         Delete
//       </a>,
//     ],
//   },
// ];

// const menu = (
//   <Menu>
//     <Menu.Item key=" 1 "> 1 st item </Menu.Item>
//     <Menu.Item key=" 2 "> 2 nd item </Menu.Item>
//     <Menu.Item key=" 3 "> 3 rd item </Menu.Item>
//   </Menu>
// );

// function UserTable(props) {
//   const { onRequest, tableRef } = props;

//   return (
//     <ConfigProvider locale={enUS}>
//       <ProTable
//         columns={columns}
//         request={onRequest}
//         actionRef={tableRef}
//         editable={{
//           type: 'multiple',
//         }}
//         rowKey="id"
//         pagination={{
//           showQuickJumper: true,
//           pageSize: 20,
//           pageSizeOptions: [10, 20, 50],
//         }}
//         search={{
//           labelWidth: 'auto',
//         }}
//         dateFormatter="string"
//         options={{
//           density: false,
//         }}
//       />
//     </ConfigProvider>
//   );
// }

export default UserTable;
