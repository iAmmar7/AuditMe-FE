import React from 'react';
import { Button, message, Collapse, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ProForm, { ProFormText, ProFormDatePicker, ProFormRadio } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';

import styles from './AMChecklist.less';

const { Panel } = Collapse;

const AMChecklist = ({ loading, images, setImages, onFinish, form }) => {
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
        initialValues={
          {
            // BENumber: '123456',
            // stationName: 'ABC Station',
            // SMName: 'John Doe SM',
            // date: '2021-03-20',
          }
        }
        submitter={{
          render: (submitProps) => {
            return (
              <>
                <Button
                  type="secondary"
                  loading={loading}
                  disabled={!['am'].includes(JSON.parse(localStorage.user).role)}
                  onClick={() => submitProps?.form?.resetFields()}
                  style={{ marginRight: '4px' }}
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
            <ProFormText
              name="BENumber"
              label="BE Number"
              wrapperCol={{ xl: 6, md: 24 }}
              tooltip="BE Number"
              placeholder="Enter BE Number"
              rules={[{ required: true, message: 'Please enter BE number' }]}
            />
            <ProFormText
              name="stationName"
              label="Station Name"
              wrapperCol={{ xl: 6, md: 24 }}
              tooltip="Station Name"
              placeholder="Enter Station Name"
              rules={[{ required: true, message: 'Please enter station name' }]}
            />
            <ProFormText
              name="SMName"
              label="Station Manager Name"
              wrapperCol={{ xl: 6, md: 24 }}
              tooltip="Station Manager Name"
              placeholder="Enter Station Manager Name"
              rules={[{ required: true, message: 'Please enter station manager name' }]}
            />
            <ProFormDatePicker
              name="date"
              label="Date"
              rules={[{ required: true, message: 'Please select date' }]}
            />
          </Panel>
          <Panel header="Housekeeping - Exterior" key="2">
            <ProFormRadio.Group
              label="Signage is clean and working properly / Cladding is clean"
              name="question1"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question1')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Shutter door is clean"
              name="question2"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question2')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Pillars properly cleaned / no tape marks & stickers on pillars"
              name="question3"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question3')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="No squeegee cleaners / mops in front of station (Cleaning material etc.)"
              name="question4"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question4')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
          </Panel>
          <Panel header="Housekeeping - Customer Lounge" key="3">
            <ProFormRadio.Group
              label="Customer Lounge - Clean, floor is mopped and organized properly / No extra things inside the lounge"
              name="question5"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question5')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Tea - coffee arrangements"
              name="question6"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question6')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Waste Bin is not overfilled - No posters and stickers at walls."
              name="question7"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question7')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Water Dispenser - Neat and Clean"
              name="question8"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question8')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Computer table - Clean, no extra things on table, paper work should be properly arranged in folders, no dust
                    behind the system, wires properly arranged"
              name="question9"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question9')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="TV - In working condition / No dust on top and behind the screens"
              name="question10"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question10')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Furniture must be properly cleaned / tidy / not damaged"
              name="question11"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question11')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Covid related stckers are well in place."
              name="question12"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question12')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="VAT certificate has been displayed min. at 2 visible locations - One must be near POS."
              name="question13"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question13')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
          </Panel>
          <Panel header="Housekeeping - Comfort Area" key="4">
            <ProFormRadio.Group
              label="CR seat & basin clean and no stains"
              name="question14"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question14')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Soap available"
              name="question15"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question15')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Floor, Mirror and walls clean"
              name="question16"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question16')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
          </Panel>
          <Panel header="Housekeeping - Bay Area" key="5">
            <ProFormRadio.Group
              label="Floor & ceiling is clean / No dirty hands on walls"
              name="question17"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question17')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="All machines are clean"
              name="question18"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question18')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Pit rollers are clean (Also sides)"
              name="question19"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question19')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Oil & water hoses are clean"
              name="question20"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question20')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Used oil pump & pipes are clean"
              name="question21"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question21')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Tools properly arranged"
              name="question22"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question22')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="No extra things in bay area / nothing should be on top of pit-rollers / no hangers hanged on walls / no cartons
                    placed at top of tools trolley/ nothing should be inside bays(pits)"
              name="question23"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question23')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Tire equipments and tires properly arranged and clean"
              name="question24"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question24')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Battery display as per the SOP (No old batteries )"
              name="question25"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question25')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="All wall corners should be properly cleaned. No posters & stikers at walls."
              name="question26"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question26')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="No used gloves to be used to stop bulk oil nozzles or bulk oil pipes (Should be reported to maintenance)"
              name="question27"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question27')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Clean fans / Cleaning cloth to be placed inside the tools trolley / Properly clean garbage containers"
              name="question28"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question28')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
          </Panel>
          <Panel header="Housekeeping - Stock Room" key="6">
            <ProFormRadio.Group
              label="Stock room properly arranged, cleaned and marked"
              name="question29"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question29')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="No dust on bulk oil tank / properly clean"
              name="question30"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question30')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="No extra things at top of the bulk oil tank / remove all old stuff which cannot be used in future"
              name="question31"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question31')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
            <ProFormRadio.Group
              label="Oil compressor change checklist pasted on compressor"
              name="question32"
              options={['Yes', 'No']}
              rules={[{ required: true, message: 'Please select yes or no' }]}
            />
            <Upload {...imageUploadProps('question32')}>
              <Button className={styles.image_upload} icon={<UploadOutlined />}>
                Select multiple images
              </Button>
            </Upload>
          </Panel>
        </Collapse>
      </ProForm>
    </ProCard>
  );
};

export default AMChecklist;
