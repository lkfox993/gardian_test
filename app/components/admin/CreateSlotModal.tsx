import * as React from 'react';
import { useMitt } from 'react-mitt';
import { Modal, ModalProps, Form, FormInstance, DatePicker, message } from 'antd';
import { useInjection } from 'inversify-react';
import { SlotService } from '../../services/slot';

export type SlotModalProps = {
    visible: boolean;
}

export const CreateSlotModal: React.FC<ModalProps> = (props) => {

    const slotService = useInjection<SlotService>('SlotService');
    const { emitter } = useMitt();
    const formRef = React.createRef<FormInstance>();

    const onSubmit = (values: any) => {
        
        slotService.createSlot(values)
        .then(() => {

            emitter.emit('fetchSlots');
            emitter.emit('setVisible', false);
            
            message.success('Slot created :)');
        
        }).catch(console.log)

        // fetch('http://localhost:3000/api/slots',{
        //     method: 'post',
        //     body: new URLSearchParams(values)
        // })
        // .then(res=> res.json())
        // .then(() => {

        //     emitter.emit('fetchSlots');
        //     emitter.emit('setVisible', false);
            
        //     message.success('Slot created :)');
        
        // }).catch(console.log);
    }

    return (
        <React.Fragment>
            <Modal 
            onOk={()=>{
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
                        label="Start Time"
                        name="startTime"
                        hasFeedback
                        rules={[{
                            required: true,
                            message: 'Please input your start time!',
                            type: 'date'
                        }]}
                    >
                        <DatePicker
                            style={{
                                width: '100%'
                            }}
                            placeholder={'Start time'}
                            size={'large'}
                            showTime={{
                                hideDisabledOptions: true,
                            }}
                            format="YYYY-MM-DD HH:mm"
                            />
                    </Form.Item>

                    <Form.Item
                        label="End Time"
                        name="endTime"
                        hasFeedback
                        rules={[{
                            required: true,
                            message: 'Please input your end time!',
                            type: 'date'
                        }]}
                    >
                        <DatePicker
                            style={{
                                width: '100%'
                            }}
                            placeholder={'End time'}
                            size={'large'}
                            showTime={{
                                hideDisabledOptions: true
                            }}
                            format="YYYY-MM-DD HH:mm"
                            />
                    </Form.Item>

                </Form>

            </Modal>
        </React.Fragment>
    )
}