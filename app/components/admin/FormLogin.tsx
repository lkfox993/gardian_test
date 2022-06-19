import * as React from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, InputNumber, Select, message } from 'antd';
import { useInjection } from 'inversify-react'

import { AuthService } from '../../services/auth';

export const FormLogin: React.FC<any> = () => {

    const authService = useInjection<AuthService>('AuthService');
    const router = useRouter();
    
    const onSubmit = (values: any): void => {

        authService.login(values)
        .then(() => {

            message.success('Authorization successful, redirecting', 3, ()=>{
                router.push('/admin/users');
            });

        }).catch((err: Error) => {
            message.error('Something wa wrong');
        });
    }

    return (
        <div   
            style={{ 
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 400, 
                margin: '0 auto',
                right: 0,
                left: 0
            }}>

            <Form
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

                <Form.Item>
                    <Button 
                        size={'large'}
                        type="primary" 
                        htmlType="submit" 
                        block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}