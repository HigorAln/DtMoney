import React, { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type GlobalContextProps = {
  children: ReactNode;
}

type TransactionsData = {
  id:number;
  title:string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}
type MyContextProps = {
  transactions: TransactionsData[];
  createTransaction: (transaction: TransactionInput)=> Promise<void>;
}
// Omit e usado para tirar herdar algum outro type exeto alguns
// Pick e usado para herdar alguns tipos de parametros de algum tipo
type TransactionInput = Omit<TransactionsData, 'id' | 'createdAt'>

export const MyContext= createContext({} as MyContextProps)

export function GlobalContext({children}:GlobalContextProps){

  const [transactions, setTransactions] = useState<TransactionsData[]>([]);

  useEffect(()=>{
    api.get('transactions')
      .then(result => setTransactions(result.data.transactions))
  },[])

  async function createTransaction(transactionInput: TransactionInput){
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    })

    const { transaction } = response.data;

    setTransactions([...transactions, transaction])
  }

  return(
    <MyContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </MyContext.Provider>
  )
}