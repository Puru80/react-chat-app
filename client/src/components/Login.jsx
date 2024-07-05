import {Link} from "react-router-dom";
import axios from 'axios'
import {useNavigate} from "react-router-dom";
import {Button, Form, Input} from "antd";
import React from "react";

function Login() {

    const navigate = useNavigate()

    const onFinish = (e, values) => {
        console.log('Success:', values);
        e.preventDefault()
        axios.post('http://localhost:8080/api/users/login', values)
            .then((result) => {
                console.log(result)
                if (result.data === "Success") {
                    navigate("/home")
                } else {
                    navigate("/register")
                    alert("You are not registered to this service")

                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }


    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-auto h-auto">
                <h2>
                    <center>Login</center>
                </h2>

                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" className={"btn btn-success"}>
                            SignUp
                        </Button>
                    </Form.Item>
                </Form>

                <p>Don&apos;t have an account?</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>

            </div>
        </div>
    );
}

export default Login;