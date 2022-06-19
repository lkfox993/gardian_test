import * as React from 'react';
import { Layout, Menu, Row, Col, Typography} from 'antd';
import { useRouter } from 'next/router';
import { useInjection } from 'inversify-react';
import { removeCookies } from 'cookies-next';
import { AuthService } from '../../services/auth';

const { Text } = Typography;

const { Header, Content } = Layout;

type LayoutProps = {
  children?: React.ReactNode
}

export default (props: LayoutProps) => {

  const authService = useInjection<AuthService>('AuthService');
  const router = useRouter();

  return (

    <Layout className="layout">
      <Header>
        <Row>
          <Col span={20}>
              <Menu
              onClick={({ key }) => {
                router.push(key);
              }}
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              items={[
                { label: 'Users', key: '/admin/users' }, // remember to pass the key prop
                { label: 'Customers', key: '/admin/customers' }, // which is required
                { label: 'Slots', key: '/admin/slots' }, // which is required
              ]}
            />
          </Col>

          <Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Text 
              onClick={ () => {

                authService.logout().then(()=>{
                  router.push('/admin/login');
                });

              }}
              style={{ color: '#fff'}}>Logout</Text>
          </Col>
        </Row>
        
        
      </Header>
      <Content style={{ padding: 50 }}>

        <div>
          {props.children}
        </div>
      </Content>
      
    </Layout>
  )
};