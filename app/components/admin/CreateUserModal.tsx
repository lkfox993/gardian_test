import * as React from 'react';
import { useMitt } from 'react-mitt';
import { Modal, ModalProps, Form, FormInstance, Input, Select, message } from 'antd';
import { useInjection } from 'inversify-react';
import { UserService } from '../../services/user';

const { Option } = Select;

export type UserModalProps = {
    visible: boolean;
}

export const CreateUserModal: React.FC<ModalProps> = (props) => {

    const userService  = useInjection<UserService>('UserService');
    const { emitter } = useMitt();
    const formRef = React.createRef<FormInstance>();
    
    const onSubmit = (values: any) => {

        userService.createUser(values)
            .then(() => {
                emitter.emit('fetchUsers');
                emitter.emit('setVisible', false);

                message.success('User created :)');
            });
        
    }

    return (
        <React.Fragment>
            <Modal
                onOk={() => {
                    formRef.current?.submit();
                }}
                {...props}>
                <Form
                    ref={formRef}
                    layout={'vertical'}
                    initialValues={{ remember: true }}
                    onFinish={onSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        hasFeedback
                        rules={[{
                            required: true,
                            message: 'Please input your email!',
                            type: 'email'
                        }]}
                    >
                        <Input
                            size={'large'}
                            placeholder={'Example: test@gmail.com'} />
                    </Form.Item>

                    <Form.Item
                        label="Role"
                        name="role"
                        hasFeedback
                        rules={[{
                            required: true,
                            message: 'Please input your role!',
                            type: 'string'
                        }]}
                    >
                        <Select
                            size={'large'}
                            defaultValue={'guest'}
                            >
                            <Option value={'administrator'}>Administrator</Option>
                            <Option value={'moderator'}>Moderator</Option>
                            <Option value={'guest'}>Guest</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        hasFeedback
                        rules={[{
                            required: true,
                            message: 'Please input your password!',
                            type: 'string'
                        }]}
                    >
                        <Input
                            type={'password'}
                            size={'large'}
                            placeholder={'Example: qwerty'} />
                    </Form.Item>

                </Form>

            </Modal>

        </React.Fragment>
    )
}