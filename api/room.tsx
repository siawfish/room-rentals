import { RoomsDTO } from "../app/components/forms/RoomsForm";
import axiosInstance from "./init";

const roomsApiService = (() => {
    const createRoom = (data: RoomsDTO) => {
        return axiosInstance.post('/api/add/new/room', data);
    };

    const getRooms = (motel_id:string) => {
        return axiosInstance.get(`/api/get/all/rooms/${motel_id}`);
    };

    const updateRoom = (data: RoomsDTO) => {
        return axiosInstance.put('/api/update/room/info', data);
    };

    return {
        createRoom,
        getRooms,
        updateRoom
    }
})()

export default roomsApiService;