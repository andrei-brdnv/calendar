import React, {FC, useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {rules} from "../utils/rules";

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void
}

export const EventForm: FC<EventFormProps> = ({ guests, submit }) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: '',
    } as IEvent)

    const {user} = useTypedSelector(state => state.auth)

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }

    const submitForm = () => {
        submit({...event, author: user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Event name"
                name="description"
                rules={[{ required: true, message: 'Field is required' }]}
            >
                <Input
                    onChange={(e) => setEvent({...event, description: e.target.value })}
                    value={event.description}
                />
            </Form.Item>

            <Form.Item
                label="Event date"
                name="date"
                rules={[rules.required(), rules.isDateAfter("Event must not be with a past date")]}
            >
                <DatePicker
                    onChange={(date) => selectDate(date)}
                />
            </Form.Item>

            <Form.Item
                label="Select guests"
                name="guest"
                rules={[{ required: true, message: 'Field is required' }]}
            >
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {guests.map(guest =>
                        <Select.Option value={guest.username} key={guest.username}>
                            {guest.username}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>


            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};