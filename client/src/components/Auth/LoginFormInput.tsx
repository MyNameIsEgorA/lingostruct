"use client"

import React, { useState } from 'react';
import "./inputFields.css";
import { IUserLogin } from "@/types/User";
import userAuthStore from "@/stores/UserAuthStore";
import Link from "next/link";

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
            const response: string | undefined = await userAuthStore.loginUser(loginData);
            if (typeof response === "string") {
                window.location.href = '/my_organizations';
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex items-center justify-center mt-8">
            <div className="desktop:w-[344px]">
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-900 text-[14px] mb-1">
                            Email
                        </label>
                        <input
                            value={loginData.email}
                            onChange={(e) => changeData("email", e)}
                            id="email"
                            className="input-field"
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
                            className="input-field"
                            required
                        />
                    </div>
                    <div className="flex flex-col items-end space-y-4">
                        <button
                            type="submit"
                            className="submit-button"
                        >
                            Login
                        </button>
                        <Link
                            className="text-[10px] desktop:text-[14px] text-orange-500 hover:text-orange-700 transition-[500ms]"
                            href={"register"}
                        >create account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginFormInput;