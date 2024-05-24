import axios from 'axios';
import {IUserLogin, IUserToken} from "@/types/User";

const loginUserAPI = async (loginData: IUserLogin): Promise<string | IUserToken> => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {
            username: loginData.email,
            password: loginData.password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': 'yK6HruoSIthkI2pnlIPQ0VbEfw6mOqB4MEWbMEs9XKoBEvj1Qf22FyAJMKUs3qqb'
            }
        });
        return {access: response.data.access, refresh: response.data.refresh};
    } catch (error) {
        console.error('Ошибка при входе:', error);
        return "error"
    }
};

export default loginUserAPI;