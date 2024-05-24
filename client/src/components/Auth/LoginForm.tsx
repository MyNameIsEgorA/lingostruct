import "./authForm.css"
import Logo from "../../../public/TGA.png"
import Image from "next/image";
import LoginFormInput from "@/components/Auth/LoginFormInput";

const LoginForm = () => {
    return (
        <div className="left-component">
            <div>
                <Image src={Logo} alt={"TGA"}/>
            </div>
            <h3 className="form-heading">Login</h3>
            <div className="form-description">Let’s build together!</div>
            <LoginFormInput/>
        </div>
    )
}

export default LoginForm