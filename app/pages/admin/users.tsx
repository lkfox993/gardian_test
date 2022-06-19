import * as React from 'react';
import useSSR from 'use-ssr';
import { useMitt } from 'react-mitt';
import { Table, Space, PageHeader, Button, Tag } from 'antd';
import { useInjection } from 'inversify-react';
import Layout from '../../components/static/Layout';
import { UserService } from '../../services/user';
import { withSecure } from '../../context/auth/AuthProvider';

import { CreateUserModal } from '../../components/admin/CreateUserModal';

const UsersPage = () => {

    const userService = useInjection<UserService>('UserService');
    const { emitter } = useMitt();
    const { isBrowser } = useSSR();

    const [loading, setLoading] = React.useState(false);
    const [visible, setVisible] = React.useState<boolean>(false);
    const [users, setUsers] = React.useState([]);

    const fetchUsers = () => {

        setLoading(true);

        userService.getUsers()
        .then(({ data }) => {
            setUsers(data);
            setLoading(false);
        })
        .catch(()=>{
            setLoading(false);
        });
        
    }

    React.useEffect(() => {

        fetchUsers();
        emitter.on('fetchUsers', fetchUsers);
        emitter.on('setVisible', setVisible);

    }, []);


    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render(role: string){
                return <Tag color={'green'}>{role}</Tag>
            }
        }
    ];

    return (

        <React.Fragment>

            {isBrowser && <CreateUserModal
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
                        style={{
                            background: '#fff'
                        }}
                        title={'Users'}
                        extra={[
                            <Button onClick={() => {
                              setVisible(true);
                            }}>New user</Button>
                          ]}
                    />

                    <Table
                        loading={loading}
                        dataSource={users}
                        columns={columns} />
                </Space>
            </Layout>

        </React.Fragment>
    )
}

export default withSecure(UsersPage);