import { UserDTO } from "../app/components/UserForm";
import axiosInstance from "./init";

const usersApiService = (() => {
    const createUser = (data: UserDTO) => {
        return axiosInstance.post('/api/add/user', data);
    };

    return {
        createUser
    }
})()

export default usersApiService;