import * as React from 'react';
import { Form, Input, Button, InputNumber, Select, message, FormInstance, Result } from 'antd';
import { useInjection } from 'inversify-react';
import Moment from 'react-moment';
import { SlotService } from '../services/slot';
import { CustomerService } from '../services/customer';

const { Option } = Select;

export const FormRegister: React.FC<any> = () => {

    const slotService = useInjection<SlotService>('SlotService');
    const customerService = useInjection<CustomerService>('CustomerService');
    const formRef = React.createRef<FormInstance>();
    const [slots, setSlots] = React.useState([]);

    const fetchSlots = () => {

        slotService.getSlots()
        .then(({ data }) => {
            setSlots(data);
        }).catch(console.log);

    }

    React.useEffect(fetchSlots, []);

    const onSubmit = (values: any): void => {

        customerService.register(values).then(() => {

            fetchSlots();
            formRef.current?.resetFields();

            message.success('You are reserved slot :)');

        })
        .catch((err: Error) => {
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
                ref={formRef}
                layout={'vertical'}
                initialValues={{

                }}
                onFinish={onSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="First Name"
                    name="firstName"
                    hasFeedback
                    rules={[{
                        required: true,
                        message: 'Please input your firstname!',
                        type: 'string'
                    }]}
                >
                    <Input
                        size={'large'}
                        placeholder={'Example: Andrei'} />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    hasFeedback
                    rules={[{
                        required: true,
                        message: 'Please input your lastname!',
                        type: 'string'
                    }
                    ]}
                >
                    <Input
                        size={'large'}
                        placeholder={'Example: Dediuc'} />
                </Form.Item>

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
                        placeholder={'Example: lkfox993@gmail.com'} />
                </Form.Item>

                <Form.Item
                    name="slot"
                    label="Time"
                    rules={[{
                        required: true,
                        message: 'Please input your time!',
                        type: 'string'
                    }]}
                >
                    <Select
                        size={'large'}
                        style={{ width: '100%' }}>

                        {slots.filter(({ customer }) => !customer).map((slot: any) => {

                            const disabled: boolean = slot.customer ? true : false;
                            return (
                                <Option value={slot._id} disabled={disabled}>
                                    <Moment date={slot.startTime} format="hh:mm" />
                                </Option>)
                        })}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{
                        required: true,
                        message: 'Please input your phone number!',
                        type: 'number'
                    }]}
                >
                    <InputNumber
                        placeholder={'Example: 079199979'}
                        size={'large'}
                        style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item>
                    <Button
                        size={'large'}
                        type="primary"
                        htmlType="submit"
                        block>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}