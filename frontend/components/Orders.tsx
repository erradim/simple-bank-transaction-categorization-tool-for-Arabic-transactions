import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

import axios from "axios";

/*
function createData(
  id: number,
  transactionDate: string,
  description: string,
  amount: number
) {
  return { id, transactionDate, description, amount };
}*/

interface Row {
  id: number;
  transactionDate: string;
  description: string;
  amount: number;
}

/*const rows = [
  createData(1, "01/01/2024", "بقالة الأمان", 150.0),
  createData(2, "02/01/2024", "فاتورة الكهرباء", 200.0),
  createData(3, "03/01/2024", "مطعم النيل", 75.5),

  createData(4, "01/01/2024", "بقالة الأمان", 150.0),
  createData(5, "02/01/2024", "فاتورة الكهرباء", 200.0),
  createData(6, "03/01/2024", "مطعم النيل", 75.5),
  createData(7, "01/01/2024", "بقالة الأمان", 150.0),
  createData(8, "02/01/2024", "فاتورة الكهرباء", 200.0),
  createData(9, "03/01/2024", "مطعم النيل", 75.5),
  createData(10, "01/01/2024", "بقالة الأمان", 150.0),
  createData(11, "02/01/2024", "فاتورة الكهرباء", 200.0),
  createData(12, "03/01/2024", "مطعم النيل", 75.5),
  createData(13, "01/01/2024", "بقالة الأمان", 150.0),
  createData(14, "02/01/2024", "فاتورة الكهرباء", 200.0),
];*/

export default function Orders() {
  const [rows, setRows] = React.useState<Row[]>([]);

  React.useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/get_all_transactions/"
        );
        const fetchedRows: Row[] = res.data.transactions.map(
          (t: {
            id: number;
            transactionDate: string;
            description: string;
            amount: number;
          }) => ({
            id: t.id,
            transactionDate: t.transactionDate,
            description: t.description,
            amount: t.amount,
          })
        );
        setRows(fetchedRows);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
    fetchTransactions();
  }, []);

  function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <Title>Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Transaction Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.transactionDate}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{`SAR ${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
