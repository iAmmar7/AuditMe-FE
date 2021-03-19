import React, {useState} from 'react';
import { message, Radio, Switch, Space,  } from 'antd';
import ProForm, { ProFormText, ProFormTextArea, } from '@ant-design/pro-form';
import styles from './FeedbackForm.less'

const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

const FeedbackForm = () => {
    const [feedbackFor, setFeedbackFor] = useState(null);
    const [anonymous, setAnonymous] = useState(false);
    return (
    <ProForm
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('Your feedback has been submitted');
      }}
      onReset={()=>{
        setAnonymous(false);
        setFeedbackFor(null);
      }}
    >
      <ProForm.Group>
        <ProFormText name="name" label="Name" tooltip="Name" placeholder="Enter Name" disabled={anonymous} />
        <ProFormText name="badgeNo" label="Badge #" placeholder="Enter your Badge No." disabled={anonymous} />
      </ProForm.Group>
      <ProForm.Group>
      <Space className={styles.switch_group}>
        Do you wish to stay anonymous?
        <Switch name='isAnonymous' checkedChildren="Yes" unCheckedChildren="No" checked={anonymous} onChange={(checked) => setAnonymous(checked)} />
      </Space>
      </ProForm.Group>
      <ProForm.Item label="Which department do you have a feedback for?" rules={[{ required: true}]} >
        <Radio.Group name="feedbackFor" onChange={(e) => setFeedbackFor(e.target.value)} value={feedbackFor}>
          <Radio value='sales'>Sales</Radio>
          <Radio value='customer_support'>Customer Support</Radio>
          <Radio value='business_development'>Business Development</Radio>
          <Radio value='other'>Other</Radio>
        </Radio.Group>
      </ProForm.Item>
      
      {/* <ProFormRadio.Group
        label="Which department do you have a feedback for?"
        name="feedbackFor"
        value={feedbackFor}
        onClick={(e) => console.log(e.target.value)}
        initialValue="Sales"
        options={['Sales', 'Customer Support', 'Business Development', 'Other']}
      /> */}
      {feedbackFor == 'other' && <ProFormText wrapperCol={{xl: 6, sm: 24}} name="otherDepartment" placeholder="Enter other department"/>}
      <ProFormText wrapperCol={{xl: 6, sm: 24}} name="subject" label="Subject" placeholder="Enter subject" rules={[{ required: true}]} />
      <ProFormTextArea name="message" label="Your Message" placeholder="Enter your message" rules={[{ required: true}]} />
    </ProForm>);
};


export default FeedbackForm;