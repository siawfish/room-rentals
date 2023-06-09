import { ExpensesDTO } from "../app/components/forms/ExpensesForm";
import axiosInstance from "./init";

const expensesApiService = (() => {
    const addExpense = (data: ExpensesDTO) => {
        return axiosInstance.post('/api/add/new/expense', data);
    };

    return {
        addExpense
    }
})()

export default expensesApiService;