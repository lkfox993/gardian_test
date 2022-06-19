import * as React from 'react';
import useSSR from 'use-ssr';
import { useMitt } from 'react-mitt'
import fetch from 'isomorphic-unfetch'
import { Table, PageHeader, Space } from 'antd';
import Moment from 'react-moment';
import { useInjection } from 'inversify-react';
import Layout from '../../components/static/Layout';
import { withSecure } from '../../context/auth/AuthProvider';

import { CustomerService } from '../../services/customer';

const CustomersPage = () => {

  const customerService = useInjection<CustomerService>('CustomerService');

  const { emitter } = useMitt();
  const [loading, setLoading] = React.useState(true);
  const [customers, setCustomers] = React.useState([]);

  const fetchCustomers = () => {

    setLoading(true);

    customerService.getCustomers()
      .then(({ data }) => {

        setCustomers(data);
        setLoading(false);

      }).catch(() => {
        setLoading(false);
      });

  }

  React.useEffect(() => {

    fetchCustomers();
    emitter.on('fetchSlots', fetchCustomers);

  }, []);

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Time',
      dataIndex: 'slot',
      key: 'slot',
      render(slot: any) {
        return <Moment date={slot.startTime} format="DD.MM.YYYY / hh:mm" />
      }
    },

    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];

  return (
    <Layout>
      <Space
        direction={'vertical'}
        style={{
          width: '100%'
        }}>

        <PageHeader
          style={{
            background: '#fff'
          }}
          title={'Customers'}
        />

        <Table
          loading={loading}
          dataSource={customers}
          columns={columns} />
      </Space>
    </Layout>
  )
}

CustomersPage.getInitialProps = async (ctx: any) => {

  return { a: 1 }
}

export default withSecure(CustomersPage);