import { useEffect, useState } from "react"
import type { Expense } from "../types/Expense"

const useExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading,setLoadin] = useState(false);
    const [error, setError] = useState("");
    const [refresh,setRefresh] = useState(false);

    const host = import.meta.env.VITE_API_URL || 'http://unknown-api-url.com';

    const fetchExpenses = async () => {
        try {
            setLoadin(true);
            const response = await fetch(`${host}/api/expenses`);
            const res : Expense[] = await response.json(); 
            setExpenses(res);
            setLoadin(false);
        } catch (error) {
            setError(JSON.stringify(error));
        }
    }

    useEffect(() => {
        fetchExpenses();
    },[refresh])

    const addExpense = async (exp:Expense) => {
        try {
            // console.log(exp);
            const options = {
                method: "POST",
                body: JSON.stringify(exp),
                headers: {
                "Content-Type": "application/json",
                },
            };

            const response = await fetch(`${host}/api/expenses`,options);
            // console.log(JSON.stringify(response));
            if(!response.ok){
                throw new Error(
                `fetch error : ${response.status} : ${response.statusText}`
                );
            }
            setRefresh((prev) => !prev);
        } catch (error) {
            setError(JSON.stringify(error));
        }
    }

    const resetExpense = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
            };
            const response = await fetch(`${host}/api/expenses/reset`,options);
            if(!response.ok){
                throw new Error(
                `fetch error : ${response.status} : ${response.statusText}`
                );
            }
            setRefresh((prev) => !prev);
        } catch (error) {
            setError(JSON.stringify(error));
        }
    }
        return {expenses, loading, error, resetExpense, addExpense}
}
export default useExpenses