import { RoomsDTO } from "../app/components/RoomsForm";
import axiosInstance from "./init";

const roomsApiService = (() => {
    const createRoom = (data: RoomsDTO) => {
        return axiosInstance.post('/api/add/new/room', data);
    };

    return {
        createRoom
    }
})()

export default roomsApiService;