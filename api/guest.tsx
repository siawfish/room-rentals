import { GuestsDTO } from "../app/components/forms/GuestForm";
import axiosInstance from "./init";

const guestsApiService = (() => {
    const saveGuest = (data: GuestsDTO) => {
        return axiosInstance.post('/api/add/new/guest', data);
    };

    const getGuests = (motel_id:string) => {
        return axiosInstance.get(`/api/get/all/guests/${motel_id}`);
    };

    return {
        saveGuest,
        getGuests
    }
})()

export default guestsApiService;