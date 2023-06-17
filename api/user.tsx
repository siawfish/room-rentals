import { UserDTO } from "../app/components/forms/UserForm";
import axiosInstance from "./init";

const usersApiService = (() => {
    const createUser = (data: UserDTO) => {
        return axiosInstance.post('/api/add/user', data);
    };

    const updateUser = (data: UserDTO) => {
        return axiosInstance.post('/api/update/user/info', data);
    };

    const toggleUserStatus = (data: { user_id:number, status:number}) => {
        return axiosInstance.post('/api/change/user/status', data);
    };

    const changePassword = (data: { user_id:number, password:string, new_password:string}) => {
        return axiosInstance.post('/api/change/password', data);
    };

    return {
        createUser,
        updateUser,
        toggleUserStatus,
        changePassword
    }
})()

export default usersApiService;