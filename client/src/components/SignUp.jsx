// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import {useNavigate} from "react-router-dom";
import {Button, Form, Input} from "antd";

const SignUp = () => {
    const navigate = useNavigate()

    const onFinish = (e, values) => {
        console.log('Success:', values);
        e.preventDefault()
        axios.post('http://localhost:8080/api/users/signup', values)
            .then((res) => {
                console.log(res.data)
                navigate('/login')
            })
            .catch((err) => {
                console.log(err)
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-auto h-auto">
                <h2>
                    <center>Sign Up</center>
                </h2>

                {/*<Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Name</strong>
                        </label>
                        <input type="text"
                               placeholder='Enter Name'
                               autoComplete='off'
                               name='email'
                               className='form-control rounded-0'
                               onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input type="text"
                               placeholder='Enter Email'
                               autoComplete='off'
                               name='email'
                               className='form-control rounded-0'
                               onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input type="password"
                               placeholder='Enter Password'
                               name='password'
                               className='form-control rounded-0'
                               onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Sign Up
                    </button>
                </Form>*/}

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
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

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

                <p>Already have an account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>

            </div>
        </div>
    );

}

export default SignUp;