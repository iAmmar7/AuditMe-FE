import React from 'react';
import { Card, Row, Col, Typography, Tag} from 'antd';
import styles from './DashboardTimeline.less'

const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

const closed_head_styles = {
    backgroundColor: "#f6ffed"
}

const open_head_styles = {
    backgroundColor: "#FFF8EA"
}

const body_styles = {
    padding: "8px", backgroundColor: '#fcfcfc'
}

const DashboardTimeline = () => {
    // const [feedbackFor, setFeedbackFor] = useState(null);
    // const [anonymous, setAnonymous] = useState(false);
    return (
    <Row className={styles.main_board}>
        <Col span={6} sm={24} className={styles.tasks_column_container}>
            <Card title="Open Observations" headStyle={open_head_styles} bodyStyle={body_styles}>
                <Card className={styles.task_card_style}>
                    <Col>
                    Date:{' '}
                    <Typography.Text strong>18 March, 2021</Typography.Text>
                    </Col>
                    <Col>
                    Region:{' '}
                    <Tag>
                        <Typography.Text strong>ER-South</Typography.Text>
                    </Tag>
                    </Col>
                    <Col>
                    Type:{' '}
                    <Tag>
                        <Typography.Text strong>Maintenance</Typography.Text>
                    </Tag>
                    </Col>
                    
                    <Col>
                    Issue Details:{' '}
                    <Typography.Text strong>Pole not fixed</Typography.Text>
                    </Col>
                </Card>
                <Card className={styles.task_card_style}>
                    <Col>
                    Date:{' '}
                    <Typography.Text strong>18 March, 2021</Typography.Text>
                    </Col>
                    <Col>
                    Region:{' '}
                    <Tag>
                        <Typography.Text strong>ER-South</Typography.Text>
                    </Tag>
                    </Col>
                    <Col>
                    Type:{' '}
                    <Tag>
                        <Typography.Text strong>Maintenance</Typography.Text>
                    </Tag>
                    </Col>
                    
                    <Col>
                    Issue Details:{' '}
                    <Typography.Text strong>Pole not fixed</Typography.Text>
                    </Col>
                </Card>
            </Card>
        </Col>
        <Col span={6} sm={24} className={styles.tasks_column_container}>
            <Card title="Closed Observations (Last 30 Days)" headStyle={closed_head_styles} bodyStyle={body_styles}>
                <Card className={styles.task_card_style}>
                    <Col>
                    Date:{' '}
                    <Typography.Text strong>18 March, 2021</Typography.Text>
                    </Col>
                    <Col>
                    Region:{' '}
                    <Tag>
                        <Typography.Text strong>ER-South</Typography.Text>
                    </Tag>
                    </Col>
                    <Col>
                    Type:{' '}
                    <Tag>
                        <Typography.Text strong>Maintenance</Typography.Text>
                    </Tag>
                    </Col>
                    
                    <Col>
                    Issue Details:{' '}
                    <Typography.Text strong>Pole not fixed</Typography.Text>
                    </Col>
                </Card>
            </Card>
        </Col>
        <Col span={6} sm={24} className={styles.tasks_column_container}>
            <Card title="Open Issues" headStyle={open_head_styles}  bodyStyle={body_styles}>
                <Card className={styles.task_card_style}>
                    <Col>
                    Date:{' '}
                    <Typography.Text strong>18 March, 2021</Typography.Text>
                    </Col>
                    <Col>
                    Region:{' '}
                    <Tag>
                        <Typography.Text strong>ER-South</Typography.Text>
                    </Tag>
                    </Col>
                    <Col>
                    Type:{' '}
                    <Tag>
                        <Typography.Text strong>Maintenance</Typography.Text>
                    </Tag>
                    </Col>
                    
                    <Col>
                    Issue Details:{' '}
                    <Typography.Text strong>Pole not fixed</Typography.Text>
                    </Col>
                </Card>
            </Card>
        </Col>
        <Col span={6} sm={24} className={styles.tasks_column_container}>
            <Card title="Closed Issues (Last 30 Days)" headStyle={closed_head_styles}  bodyStyle={body_styles}>
                <Card className={styles.task_card_style}>
                    <Col>
                    Date:{' '}
                    <Typography.Text strong>18 March, 2021</Typography.Text>
                    </Col>
                    <Col>
                    Region:{' '}
                    <Tag>
                        <Typography.Text strong>ER-South</Typography.Text>
                    </Tag>
                    </Col>
                    <Col>
                    Type:{' '}
                    <Tag>
                        <Typography.Text strong>Maintenance</Typography.Text>
                    </Tag>
                    </Col>
                    <Col>
                    Issue Details:{' '}
                    <Typography.Text strong>Pole not fixed</Typography.Text>
                    </Col>
                                
                </Card>
            </Card>
        </Col>
    </Row>
    )
};


export default DashboardTimeline;