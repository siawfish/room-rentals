import axiosInstance from "./init";

type Payment = {
    guest_id: number;
    motel_id: number;
    room_id: number;
    amount: number;
    service_id: number;
    added_by: number;
}

const paymentsApiService = (() => {
    const addPayment = (data: Payment) => {
        return axiosInstance.post('/api/add/new/payment', data);
    };

    return {
        addPayment
    }
})()

export default paymentsApiService;