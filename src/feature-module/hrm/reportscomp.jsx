import React, { useState } from "react";
import ReportsPage from "./reportspage";
import { useParams } from "react-router-dom";
import { Expenses, ExpensesDelete, leavebalance, leavecolumns, Payments, PaymentsDelete } from "./hrmcolumn";

var reportName;
const ReportsComp = () => {
  const { id } = useParams();
  const [columns, setColumns] = useState([]);
  const [datasource, setDataSource] = useState([]);

  const leaveColumn = leavecolumns;
  const leaveBalanceColumn = leavebalance;
  const expenseColumn = Expenses;
  const deleteExpenseColumn = ExpensesDelete;
  const paymentColumn = Payments;
  const paymentDeleteColumn = PaymentsDelete;

  React.useEffect(() => {
    switch (id) {
      case "1":
        setColumns(leaveColumn);
        reportName = "Leave Reports";
        break;
      case "2":
        reportName = "Leave Balance";
        setColumns(leaveBalanceColumn)
        break;
      case "3":
        reportName = "Leave Calander";
        setColumns([])
        break;
      case "4":
        reportName = "Expenses";
        setColumns(expenseColumn)
        break;
      case "5":
        reportName = "Payment";
        setColumns(paymentColumn)
        break;
      case "6":
        reportName = "Delete Expenses";
        setColumns(deleteExpenseColumn)
        break;
      case "7":
        reportName = "Deleted Payments";
        setColumns(paymentDeleteColumn)
        break;
      default:
        reportName = "report";
        break;
    }
  }, [id]);

  return (
    <>
      <ReportsPage columns={columns} reportName={reportName} />
    </>
  );
};

export default ReportsComp;
