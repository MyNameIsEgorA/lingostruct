"use client"

import React, { useState } from 'react';
import "./inputFields.css";
import { IUserLogin } from "@/types/User";
import userStore from "@/stores/UserStore";

const LoginFormInput = () => {
    const [loginData, setLoginData] = useState<IUserLogin>({ email: "", password: "" });

    const changeData = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {
        if (type === "email") {
            setLoginData({
                ...loginData,
                email: e.target.value
            });
        }
        if (type === "password") {
            setLoginData({
                ...loginData,
                password: e.target.value,
            });
        }
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response: string | undefined = await userStore.loginUser(loginData);
            if (typeof response === "string") {
                window.location.href = '/';
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex items-center justify-center mt-8">
            <div className="w-[344px]">
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-900 text-[14px] mb-1">
                            Email
                        </label>
                        <input
                            value={loginData.email}
                            onChange={(e) => changeData("email", e)}
                            id="email"
                            className="border rounded-lg w-full py-3 h-11 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mt-5">
                        <label htmlFor="password" className="block text-gray-900 text-[14px] mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => changeData("password", e)}
                            className="border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-11"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full mt-[52px]"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginFormInput;