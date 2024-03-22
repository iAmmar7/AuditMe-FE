import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Alert, Card, message } from 'antd';
import { useEffect, useState } from 'react';
import { history } from 'umi';

import { useAppContext } from '@/contexts/AppContext';
import { getUserByRole, raiseIssue } from '@/services/user';
import PriorityForm from '../../components/Priorities/PriorityForm';

const PrioritiesForm = () => {
  const [loading, setLoading] = useState(false);
  const [evidenceFileList, setEvidenceFileList] = useState([]);
  const [managers, setManagers] = useState({ am: [], rm: [] });
  const { user } = useAppContext();

  useEffect(() => {
    const fetch = async () => {
      const [areaManagers, regManagers] = await Promise.all([
        getUserByRole('am'),
        getUserByRole('rm'),
      ]);
      setManagers({
        am: areaManagers.data.users,
        rm: regManagers.data.users,
      });
    };
    fetch();
  }, []);

  const submitForm = async (values) => {
    setLoading(true);

    raiseIssue(values, evidenceFileList)
      .then((res) => {
        if (res.data.success) {
          message.success('Issue has been successfully published!');
          if (res?.data?.report?.isPrioritized) history.push('/user/reports/priorities-reports');
          else history.push('/user/reports/observation-reports');
        }
      })
      .catch(() => {
        message.error('Unable to publish issue!', 10);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const alertMessage = () => {
    const roleMessages = {
      rm:
        'You have signed up as regional manager, you cannot submit an issue. Please sign up as auditor or station manager in order to raise an issue.',
      am:
        'You have signed up as area manager, you cannot submit an issue. Please sign up as auditor or station manager in order to raise an issue.',
      viewer:
        'You have signed up as viewer, you cannot submit an issue. Please sign up as auditor or station manager, in order to raise an issue.',
    };

    let messageText = roleMessages[user.role];

    return (
      messageText && (
        <Alert
          style={{
            marginBottom: 24,
          }}
          message={messageText}
          type="error"
          showIcon
        />
      )
    );
  };

  return (
    <PageHeaderWrapper content="Raise an issue here by completing the form below">
      {alertMessage()}
      <Card>
        <PriorityForm
          loading={loading}
          submitForm={submitForm}
          evidenceFileList={evidenceFileList}
          setEvidenceFileList={setEvidenceFileList}
          managers={managers}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default PrioritiesForm;
