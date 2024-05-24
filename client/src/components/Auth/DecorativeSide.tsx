import "./authForm.css"

import Image from "next/image";
import AuthImage from "../../../public/AuthFormImage.png";

const DecorativeSide = () => {
    return (
        <div className="right-component">
            <h1 className="auth-heading">
                <div className="">Revolutionizing the</div>
                <div className="">way we build</div>
            </h1>
            <Image src={AuthImage} alt={"Картинка"} className="image"/>
        </div>
    );
};

export default DecorativeSide