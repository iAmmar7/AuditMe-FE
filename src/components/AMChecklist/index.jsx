import React, {useState} from 'react';
import { Button, message, Collapse, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ProForm, {
    ProFormText,
    ProFormDatePicker,
    ProFormRadio,
  } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import styles from './AMChecklist.less';

const { Panel } = Collapse;
const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

const AMChecklist = () => {
    const [loading, setLoading] = useState(false);
    return (
        <ProCard>
            <ProForm
          onFinish={async (values) => {
            console.log(values);
            setLoading(true);
            await waitTime(1000);
            message.success('Checklist Complete');
            setLoading(false);
          }}
          formprops={{
            validateMessages: {
              required: 'This field is required',
            },
          }}
        >
        <Collapse defaultActiveKey={['1']} className={styles.form_collapse}>
            <Panel header="Basic Information" key="1">
                <ProFormText
                name="BENumber"
                label="BE Number"
                wrapperCol={{xl: 6, md: 24}}
                tooltip="BE Number"
                placeholder="Enter BE Number"
                rules={[{ required: true }]}
                />

                <ProFormText
                name="station"
                label="Station Name"
                wrapperCol={{xl: 6, md: 24}}
                tooltip="Station Name"
                placeholder="Enter Station Name"
                rules={[{ required: true }]}
                />

                <ProFormText
                name="SMName"
                label="Station Manager Name"
                wrapperCol={{xl: 6, md: 24}}
                tooltip="Station Manager Name"
                placeholder="Enter Station Manager Name"
                rules={[{ required: true }]}
                />

                <ProFormText
                name="AMName"
                label="Area Manager Name"
                wrapperCol={{xl: 6, md: 24}}
                tooltip="Area Manager Name"
                placeholder="Enter Area Manager Name"
                rules={[{ required: true }]}
                />

                <ProFormDatePicker name="date" label="Date" rules={[{ required: true }]}/>
            </Panel>
            <Panel header="Housekeeping - Exterior" key="2">
                <ProFormRadio.Group
                    label="Signage is clean and working properly / Cladding is clean"
                    name="signage_exterior"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload id="signageImages" >
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Shutter door is clean"
                    name="shutter_door_exterior"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Pillars properly cleaned / no tape marks & stickers on pillars"
                    name="pillars_exterior"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="No squeegee cleaners / mops in front of station (Cleaning material etc.)"
                    name="cleaning_material_exterior"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
            </Panel>
            <Panel header="Housekeeping - Customer Lounge" key="3">
                <ProFormRadio.Group
                    label="Customer Lounge - Clean, floor is mopped and organized properly / No extra things inside the lounge"
                    name="floor_customer_lounge"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Tea - coffee arrangements"
                    name="tea_arrangement_customer_lounge"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Waste Bin is not overfilled - No posters and stickers at walls."
                    name="waste_bin_customer_lounge"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Water Dispenser - Neat and Clean"
                    name="water_dispenser_customer_lounge"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Computer table - Clean, no extra things on table, paper work should be properly arranged in folders, no dust
                    behind the system, wires properly arranged"
                    name="computer_table_customer_lounge"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="TV - In working condition / No dust on top and behind the screens"
                    name="tv_customer_lounge"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Furniture must be properly cleaned / tidy / not damaged"
                    name="furniture_customer_lounge"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Covid related stckers are well in place."
                    name="covid_customer_lounge"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="VAT certificate has been displayed min. at 2 visible locations - One must be near POS."
                    name="VAT_cert_customer_lounge"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
            </Panel>
            <Panel header="Housekeeping - Comfort Area" key="4">
                <ProFormRadio.Group
                    label="CR seat & basin clean and no stains"
                    name="seat_basin_comfort_area"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Soap available"
                    name="soap_comfort_area"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Floor, Mirror and walls clean"
                    name="floor_mirror_comfort_area"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
            </Panel>
            <Panel header="Housekeeping - Bay Area" key="5">
                <ProFormRadio.Group
                    label="Floor & ceiling is clean / No dirty hands on walls"
                    name="floor_ceiling_bay_area"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="All machines are clean"
                    name="machines_bay_area"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Pit rollers are clean (Also sides)"
                    name="pit_rollers_bay_area"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Oil & water hoses are clean"
                    name="oil_water_hoses_bay_area"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Used oil pump & pipes are clean"
                    name="used_oil_pump_bay_area"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Tools properly arranged"
                    name="tools_bay_area"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="No extra things in bay area / nothing should be on top of pit-rollers / no hangers hanged on walls / no cartons
                    placed at top of tools trolley/ nothing should be inside bays(pits)"
                    name="extra_things_bay_area"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Tire equipments and tires properly arranged and clean"
                    name="tire_bay_area"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Battery display as per the SOP (No old batteries )"
                    name="battery_display_bay_area"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="All wall corners should be properly cleaned. No posters & stikers at walls."
                    name="wall_corners_bay_area"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="No used gloves to be used to stop bulk oil nozzles or bulk oil pipes (Should be reported to maintenance)"
                    name="oil_nozzle_bay_area"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Clean fans / Cleaning cloth to be placed inside the tools trolley / Properly clean garbage containers"
                    name="fans_bay_area"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
            </Panel>
            <Panel header="Housekeeping - Stock Room" key="6">
                <ProFormRadio.Group
                    label="Stock room properly arranged, cleaned and marked"
                    name="arranged_stock_room"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="No dust on bulk oil tank / properly clean"
                    name="dust_oil_tank_stock_room"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload>
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="No extra things at top of the bulk oil tank / remove all old stuff which cannot be used in future"
                    name="extra_things_oil_tank_stock_room"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload name="extra_things_oil_tank_stock_room_images">
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
                <ProFormRadio.Group
                    label="Oil compressor change checklist pasted on compressor"
                    name="oil_compressor_stock_room"
                    initialValue="No"
                    options={['Yes', 'No']}
                    rules={[{required: true}]}
                />
                <Upload name="oil_compressor_stock_room_images">
                    <Button className={styles.image_upload} icon={<UploadOutlined />}>Select multiple images</Button>
                </Upload>
            </Panel>
        </Collapse>
        </ProForm>
      </ProCard>)
};


export default AMChecklist;