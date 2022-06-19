import * as React from 'react';
import useSSR from 'use-ssr';
import { useMitt } from 'react-mitt'
import { Table, PageHeader, Button, message, Tag, Space } from 'antd';
import Moment from 'react-moment';
import Layout from '../../components/static/Layout';
import { useInjection } from 'inversify-react';
import { withSecure } from '../../context/auth/AuthProvider';
import { SlotService} from '../../services/slot';
import { CreateSlotModal } from '../../components/admin/CreateSlotModal';

const SlotsPage = () => {

  const slotService = useInjection<SlotService>('SlotService');
  const { emitter } = useMitt();
  const { isBrowser } = useSSR()

  const [loading, setLoading] = React.useState(true);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [slots, setSlots] = React.useState([]);

  const fetchSlots = () => {

    setLoading(true);

    slotService.getSlots()
      .then(({ data }) => {
        setSlots(data);
        setLoading(false);
      }).catch(()=>{
        setLoading(false)
      });
   
  }

  React.useEffect(() => {

    fetchSlots();

    emitter.on('fetchSlots', fetchSlots);
    emitter.on('setVisible', setVisible);

  }, []);

  const columns = [
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render(startTime: string){
        return <Moment date={startTime} format="DD.MM.YYYY / hh:mm"/>
      }
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render(endTime: any){
        return <Moment date={endTime} format="DD.MM.YYYY / hh:mm"/>
      }
    },

    {
      title: 'Notify Time',
      dataIndex: 'notifyTime',
      key: 'notifyTime',
      render(notifyTime: any){
        return <Moment date={notifyTime} format="DD.MM.YYYY / hh:mm"/>
      }
    },

    {
      title: 'Notified',
      dataIndex: 'notified',
      key: 'notified',
      render(notified: boolean) {

        const color = notified ? 'green' : 'red';

        return (
          <Tag color={color}>
            {notified ? 'Yes' : 'No'}
          </Tag>
        )
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render(status: boolean, row: any) {

        const color = row.customer ? 'red' : 'green';

        return (
          <Tag color={color}>
            {row.customer ? 'Reserved' : 'Available'}
          </Tag>
        )
      }
    }
  ];

  return (
    <React.Fragment>

      {isBrowser && <CreateSlotModal
        onCancel={() => {
          setVisible(false);
        }}
        visible={visible} />}

      <Layout>

        <Space
          direction={'vertical'}
          style={{
            width: '100%'
          }}>

          <PageHeader
            title={'Slots'}
            style={{
              background: '#fff'
            }}
            extra={[
              <Button onClick={() => {
                setVisible(true);
              }}>New slot</Button>
            ]}
          />

          <Table
            loading={loading}
            dataSource={slots}
            columns={columns} />
        </Space>

      </Layout>

    </React.Fragment>
  )
}


export default withSecure(SlotsPage);