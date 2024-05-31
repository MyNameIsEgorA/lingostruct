import axios from 'axios';
import {type IUserRegisterInfo} from "@/types/User";

const registerUserAPI = async (loginData: IUserRegisterInfo): Promise<boolean> => {
    try {
        const response = await axios.post('http://api.lingostruct.ru/api/profile/register/', {
            username: loginData.name,
            password: loginData.password1,
            password2: loginData.password2,
            email: loginData.email,
        }, {
            headers: {
                'Content-Type': 'application/json',
                // 'X-CSRFTOKEN': 'lZQ3OQZ7tFG9luXmY8YegJB3p8RjUIKx3u1UEUYf0wCU8GDXbtXudQbCVLiKeMyY',
            }
        });
        console.log(response.data)
        return response.status === 201
    } catch (error) {
        console.error('Ошибка при входе:', error);
        return false;
    }
};

export default registerUserAPI;