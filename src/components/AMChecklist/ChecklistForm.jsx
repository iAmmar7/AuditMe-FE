/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Button, message, Collapse, Upload, Alert, Row, Col, Image } from 'antd';
import { UploadOutlined, DeleteTwoTone } from '@ant-design/icons';
import ProForm, {
  ProFormText,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';

import ChecklistSkeleton from './Checklist.Skeleton';
import styles from './AMChecklist.less';

const { Panel } = Collapse;

const ChecklistForm = ({
  loading,
  images,
  regionalManagers,
  setImages,
  onFinish,
  form,
  initialValues = {},
  initialImages = {},
  deleteImage,
  URL,
}) => {
  console.log('initialImages', initialImages);
  const imageUploadProps = (name) => ({
    name,
    listType: 'picture',
    onRemove: (file) => {
      const index = images[name].indexOf(file);
      const newFileList = images[name].slice();
      newFileList.splice(index, 1);
      setImages({ ...images, [name]: newFileList });
    },
    beforeUpload: (file) => {
      if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
        message.error(`Supported image formats are png, jpg and jpeg`);
        return;
      }
      setImages({ ...images, [name]: images[name] ? [...images[name], file] : [file] });
      // eslint-disable-next-line consistent-return
      return false;
    },
    images,
  });

  if (regionalManagers?.fetching) return <ChecklistSkeleton />;

  return (
    <ProCard>
      <ProForm
        form={form}
        formprops={{
          validateMessages: {
            required: 'This field is required',
          },
        }}
        onFinish={onFinish}
        initialValues={{
          // date: '2021-03-20',
          // stationName: 'ABC Station',
          // region: 'CR-South',
          ...initialValues,
        }}
        submitter={{
          render: (submitProps) => {
            return (
              <>
                <Button
                  type="secondary"
                  loading={loading}
                  disabled={!['am'].includes(JSON.parse(localStorage.user).role)}
                  onClick={() => submitProps?.form?.resetFields()}
                  style={{ marginRight: '8px' }}
                >
                  Reset
                </Button>
                <Button
                  type="primary"
                  loading={loading}
                  disabled={!['am'].includes(JSON.parse(localStorage.user).role)}
                  onClick={() => submitProps?.form?.submit()}
                >
                  Submit
                </Button>
              </>
            );
          },
        }}
      >
        <Collapse
          defaultActiveKey={['1', '2', '3', '4', '5', '6']}
          className={styles.form_collapse}
        >
          <Panel header="Basic Information" key="1">
            <ProFormDatePicker
              width="s"
              name="date"
              label="Date"
              placeholder="Select date"
              rules={[{ required: true, message: 'Please select date' }]}
            />
            <ProFormText
              width="s"
              name="stationName"
              label="Station/BE Name"
              wrapperCol={{ xl: 6, md: 24 }}
              placeholder="Enter Station/BE Name"
              rules={[{ required: true, message: 'Please enter Station/BE Name' }]}
            />
            <ProForm.Group>
              <ProFormSelect
                width="s"
                name="region"
                label="Region"
                placeholder="Select region"
                options={[
                  { value: 'Southern', label: 'Southern' },
                  { value: 'CR-East', label: 'CR-East' },
                  { value: 'CR-North', label: 'CR-North' },
                  { value: 'CR-South', label: 'CR-South' },
                  { value: 'ER-North', label: 'ER-North' },
                  { value: 'ER-South', label: 'ER-South' },
                  { value: 'WR-North', label: 'WR-North' },
                  { value: 'WR-South', label: 'WR-South' },
                ]}
                rules={[{ required: true, message: 'Please select region!' }]}
              />
              <ProFormSelect
                width="s"
                name="RMName"
                label="Regional Manager"
                placeholder="Enter regional manager"
                showSearch
                options={(regionalManagers?.data || []).map((item) => ({
                  value: `${item.name} id_${item._id}`,
                  label: item.name,
                }))}
                rules={[{ required: true, message: 'Please select regional manager!' }]}
              />
            </ProForm.Group>
          </Panel>
          <Panel header="Housekeeping - Exterior" key="2">
            {[
              {
                label: 'Signage is clean and working properly / Cladding is clean',
                name: 'question1',
              },
              {
                label: 'Shutter door is clean',
                name: 'question2',
              },
              {
                label: 'Pillars properly cleaned / no tape marks & stickers on pillars',
                name: 'question3',
              },
              {
                label: 'No squeegee cleaners / mops in front of station (Cleaning material etc.)',
                name: 'question4',
              },
            ].map(({ label, name }) => (
              <div key={name} className={styles.image_upload}>
                <ProFormRadio.Group
                  label={label}
                  name={name}
                  options={['Yes', 'No']}
                  rules={[{ required: true, message: 'Please select yes or no' }]}
                />
                <Upload {...imageUploadProps(name)}>
                  <Button icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                {initialImages?.[name]?.length > 0 && (
                  <Row style={{ margin: '15px 0px' }} gutter={[8, 8]}>
                    {initialImages?.[name]?.map((image) => (
                      <Col key={image} className={styles.image_container}>
                        <DeleteTwoTone
                          className={styles.delete_btn}
                          twoToneColor="red"
                          onClick={() => deleteImage(initialValues?._id, name, image)}
                        />
                        <Image src={URL + image} className={styles.image} />
                      </Col>
                    ))}
                  </Row>
                )}
              </div>
            ))}
          </Panel>
          <Panel header="Housekeeping - Customer Lounge" key="3">
            {[
              {
                label:
                  'Customer Lounge - Clean, floor is mopped and organized properly / No extra things inside the lounge',
                name: 'question5',
              },
              {
                label: 'Tea - coffee arrangements',
                name: 'question6',
              },
              {
                label: 'Waste Bin is not overfilled - No posters and stickers at walls.',
                name: 'question7',
              },
              {
                label: 'Water Dispenser - Neat and Clean',
                name: 'question8',
              },
              {
                label:
                  'Computer table - Clean, no extra things on table, paper work should be properly arranged in folders, no dust behind the system, wires properly arranged',
                name: 'question9',
              },
              {
                label: 'TV - In working condition / No dust on top and behind the screens',
                name: 'question10',
              },
              {
                label: 'Furniture must be properly cleaned / tidy / not damaged',
                name: 'question11',
              },
              {
                label: 'Covid related stckers are well in place.',
                name: 'question12',
              },
              {
                label:
                  'VAT certificate has been displayed min. at 2 visible locations - One must be near POS.',
                name: 'question13',
              },
            ].map(({ label, name }) => (
              <div key={name} className={styles.image_upload}>
                <ProFormRadio.Group
                  label={label}
                  name={name}
                  options={['Yes', 'No']}
                  rules={[{ required: true, message: 'Please select yes or no' }]}
                />
                <Upload {...imageUploadProps(name)}>
                  <Button icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                {initialImages?.[name]?.length > 0 && (
                  <Row style={{ margin: '15px 0px' }} gutter={[8, 8]}>
                    {initialImages?.[name]?.map((image) => (
                      <Col key={image} className={styles.image_container}>
                        <DeleteTwoTone
                          className={styles.delete_btn}
                          twoToneColor="red"
                          onClick={() => deleteImage(initialValues?._id, name, image)}
                        />
                        <Image src={URL + image} className={styles.image} />
                      </Col>
                    ))}
                  </Row>
                )}
              </div>
            ))}
          </Panel>
          <Panel header="Housekeeping - Comfort Area" key="4">
            {[
              {
                label: 'CR seat & basin clean and no stains',
                name: 'question14',
              },
              {
                label: 'Soap available',
                name: 'question15',
              },
              {
                label: 'Floor, Mirror and walls clean',
                name: 'question16',
              },
            ].map(({ label, name }) => (
              <div key={name} className={styles.image_upload}>
                <ProFormRadio.Group
                  label={label}
                  name={name}
                  options={['Yes', 'No']}
                  rules={[{ required: true, message: 'Please select yes or no' }]}
                />
                <Upload {...imageUploadProps(name)}>
                  <Button icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                {initialImages?.[name]?.length > 0 && (
                  <Row style={{ margin: '15px 0px' }} gutter={[8, 8]}>
                    {initialImages?.[name]?.map((image) => (
                      <Col key={image} className={styles.image_container}>
                        <DeleteTwoTone
                          className={styles.delete_btn}
                          twoToneColor="red"
                          onClick={() => deleteImage(initialValues?._id, name, image)}
                        />
                        <Image src={URL + image} className={styles.image} />
                      </Col>
                    ))}
                  </Row>
                )}
              </div>
            ))}
          </Panel>
          <Panel header="Housekeeping - Bay Area" key="5">
            {[
              {
                label: 'Floor & ceiling is clean / No dirty hands on walls',
                name: 'question17',
              },
              {
                label: 'All machines are clean',
                name: 'question18',
              },
              {
                label: 'Pit rollers are clean (Also sides)',
                name: 'question19',
              },
              {
                label: 'Oil & water hoses are clean',
                name: 'question20',
              },
              {
                label: 'Used oil pump & pipes are clean',
                name: 'question21',
              },
              {
                label: 'Tools properly arranged',
                name: 'question22',
              },
              {
                label:
                  'No extra things in bay area / nothing should be on top of pit-rollers / no hangers hanged on walls / no cartons placed at top of tools trolley/ nothing should be inside bays(pits)',
                name: 'question23',
              },
              {
                label: 'Tire equipments and tires properly arranged and clean',
                name: 'question24',
              },
              {
                label: 'Battery display as per the SOP (No old batteries)',
                name: 'question25',
              },
              {
                label:
                  'All wall corners should be properly cleaned. No posters & stikers at walls.',
                name: 'question26',
              },
              {
                label:
                  'No used gloves to be used to stop bulk oil nozzles or bulk oil pipes (Should be reported to maintenance)',
                name: 'question27',
              },
              {
                label:
                  'Clean fans / Cleaning cloth to be placed inside the tools trolley / Properly clean garbage containers',
                name: 'question28',
              },
            ].map(({ label, name }) => (
              <div key={name} className={styles.image_upload}>
                <ProFormRadio.Group
                  label={label}
                  name={name}
                  options={['Yes', 'No']}
                  rules={[{ required: true, message: 'Please select yes or no' }]}
                />
                <Upload {...imageUploadProps(name)}>
                  <Button icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                {initialImages?.[name]?.length > 0 && (
                  <Row style={{ margin: '15px 0px' }} gutter={[8, 8]}>
                    {initialImages?.[name]?.map((image) => (
                      <Col key={image} className={styles.image_container}>
                        <DeleteTwoTone
                          className={styles.delete_btn}
                          twoToneColor="red"
                          onClick={() => deleteImage(initialValues?._id, name, image)}
                        />
                        <Image src={URL + image} className={styles.image} />
                      </Col>
                    ))}
                  </Row>
                )}
              </div>
            ))}
          </Panel>
          <Panel header="Housekeeping - Stock Room" key="6">
            {[
              {
                label: 'Stock room properly arranged, cleaned and marked',
                name: 'question29',
              },
              {
                label: 'No dust on bulk oil tank / properly clean',
                name: 'question30',
              },
              {
                label:
                  'No extra things at top of the bulk oil tank / remove all old stuff which cannot be used in future',
                name: 'question31',
              },
              {
                label: 'Oil compressor change checklist pasted on compressor',
                name: 'question32',
              },
            ].map(({ label, name }) => (
              <div key={name} className={styles.image_upload}>
                <ProFormRadio.Group
                  label={label}
                  name={name}
                  options={['Yes', 'No']}
                  rules={[{ required: true, message: 'Please select yes or no' }]}
                />
                <Upload {...imageUploadProps(name)}>
                  <Button icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                {initialImages?.[name]?.length > 0 && (
                  <Row style={{ margin: '15px 0px' }} gutter={[8, 8]}>
                    {initialImages?.[name]?.map((image) => (
                      <Col key={image} className={styles.image_container}>
                        <DeleteTwoTone
                          className={styles.delete_btn}
                          twoToneColor="red"
                          onClick={() => deleteImage(initialValues?._id, name, image)}
                        />
                        <Image src={URL + image} className={styles.image} />
                      </Col>
                    ))}
                  </Row>
                )}
              </div>
            ))}
          </Panel>
        </Collapse>
        {!Object.keys(initialValues).length && (
          <Alert
            style={{
              marginBottom: 24,
            }}
            message="After submitting this checklist, you can edit it within 1 hour"
            type="info"
            showIcon
          />
        )}
      </ProForm>
    </ProCard>
  );
};

export default ChecklistForm;
