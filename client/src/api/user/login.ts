import axios from 'axios';
import {IUserLogin, IUserToken} from "@/types/User";

const loginUserAPI = async (loginData: IUserLogin): Promise<string | IUserToken> => {
    try {
        const response = await axios.post('http://45.89.189.236/api/token/', {
            username: loginData.email,
            password: loginData.password
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return {access: response.data.access, refresh: response.data.refresh};
    } catch (error) {
        console.error('Ошибка при входе:', error);
        return "error"
    }
};

export default loginUserAPI;