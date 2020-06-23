import React, { useState, useEffect } from "react";
import "./App.scss";
import TransactionsTable from "./TransactionsTable";
import {
  getTransactions,
  getCategories,
  setTransactionCategory,
  setTransactionMemo,
} from "./TransactionAPI";

function App() {
  const [transactions, setTransactions] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getTransactions()
      .then((resp) => {
        setTransactions(resp);
        return getCategories();
      })
      .then((resp) => {
        setCategories(resp);
      });
  }, []);

  const saveCategory = (transactionId, categoryId) => {
    setTransactionCategory(transactionId, categoryId).then((respCategory) => {
      const { id } = respCategory;
      const newTransaction = { ...transactions };
      newTransaction[id] = respCategory;
      setTransactions(newTransaction);
    });
  };

  const saveMemo = (id, memo) => {
    setTransactionMemo(id, memo).then((respTransaction) => {
      const { id } = respTransaction;
      const newTransaction = { ...transactions };
      newTransaction[id] = respTransaction;
      setTransactions(newTransaction);
    });
  };

  if (!categories || transactions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <TransactionsTable
        saveMemo={saveMemo}
        saveCategory={saveCategory}
        categories={categories}
        transactions={Object.values(transactions)}
      />
    </div>
  );
}

export default App;
