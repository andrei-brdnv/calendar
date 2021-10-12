import React, {FC, useState} from 'react';
import {Button, Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/ac";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

export const LoginForm: FC = () => {
    const {error, isLoading} = useTypedSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useActions()

    const submit = () => {
        login(username, password)
    }

    return (
        <Form
            onFinish={submit}
        >
            {error && <div>{error}</div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};