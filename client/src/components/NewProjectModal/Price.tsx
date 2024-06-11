import {ReactNode, useEffect, useState} from "react";
import projectInfoModalStore from "@/stores/ProjectInfoModalStore";

const Price = (): ReactNode => {

    const [price, setPrice] = useState<string>(projectInfoModalStore.projectCost)

    const onChangePrice = (e: any): void => {
        const value: string = e.target.value
        if (value === "" || !isNaN(Number(value))) {
            setPrice(value);
        }
    }

    useEffect(() => {
        projectInfoModalStore.setCost(price)
    }, [price]);

    return (
        <div className={"mt-5"}>
            <h5>Project TGA Cost Estimation</h5>
            <input type="text"
                   className={"input-section w-full mt-2"}
                   onChange={onChangePrice}
                   value={price}
                   placeholder={"€ Enter value"}
            />
            <div className={"mt-2 text-gray-600"}>
                The Billing is structured based on the Estimation you provide, you are paying 0.75% of the
                TGA Costs you are having. As disclosed in the contract between our two parties all
                information must be truthful and accurate.
            </div>
        </div>
    )
}

export default Price