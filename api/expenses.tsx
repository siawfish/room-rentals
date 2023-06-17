import { ExpensesDTO } from "../app/components/forms/ExpensesForm";
import axiosInstance from "./init";

const expensesApiService = (() => {
    const addExpense = (data: ExpensesDTO) => {
        return axiosInstance.post('/api/add/new/expense', data);
    };

    const getExpenses = (motel_id:string) => {
        return axiosInstance.get(`/api/get/motel/expenses/${motel_id}`);
    };

    return {
        addExpense,
        getExpenses
    }
})()

export default expensesApiService;