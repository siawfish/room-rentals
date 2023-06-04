import { UserDTO } from "../app/components/forms/UserForm";
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