import { RentalDTO } from "../app/components/forms/RentalForm";
import axiosInstance from "./init";

const rentalApiService = (() => {
    const recordRental = (data: RentalDTO) => {
        return axiosInstance.post('/api/add/new/service', data);
    };

    return {
        recordRental
    }
})()

export default rentalApiService;