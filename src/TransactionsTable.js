import React from "react";
import TransactionItem from "./TransactionItem";

function TransactionsTable({
  transactions,
  categories,
  saveMemo,
  saveCategory,
}) {
  return (
    <div className="TransactionsTable">
      {transactions.map((transaction, idx) => {
        return (
          <TransactionItem
            key={idx}
            saveMemo={saveMemo}
            saveCategory={saveCategory}
            categories={categories}
            transaction={transaction}
          />
        );
      })}
    </div>
  );
}

export default TransactionsTable;
