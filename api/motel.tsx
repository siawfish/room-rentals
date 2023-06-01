import axiosInstance from "./init";

const motelsApiService = (() => {
    const getAllMotels = () => {
        return axiosInstance.get('/api/get/motels');
    };

    const createMotel = (data: {motel_name: string, location: string}) => {
        return axiosInstance.post('/api/add/new/motel', data);
    };

    const updateMotel = (data: {id: string, motel_name: string}) => {
        return axiosInstance.post(`/api/update/motel`, data);
    };

    const toggleMotelStatus = (data: {id: string, status: boolean}) => {
        return axiosInstance.delete(`api/change/motel/status`);
    };

    return {
        getAllMotels,
        createMotel,
        updateMotel,
        toggleMotelStatus
    }
})()

export default motelsApiService;