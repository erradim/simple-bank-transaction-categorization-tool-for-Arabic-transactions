import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

import axios from "axios";

const categories = [
  "Groceries",
  "Utilities",
  "Dining Out",
  "Entertainment",
  "Shopping",
  "Transportation",
  "Healthcare",
  "Technology",
  "Travel",
];

interface Row {
  id: number;
  transactionDate: string;
  description: string;
  amount: number;
}

export default function Orders() {
  const [rows, setRows] = React.useState<Row[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.name;
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  React.useEffect(() => {
    // Function to fetch transactions for a specific category or all transactions
    /**
     * Fetches transactions from the server based on the specified category.
     * If no category is provided, it fetches all transactions.
     *
     * @param category - The category of transactions to fetch.
     * @returns An array of fetched rows representing the transactions.
     */
    async function fetchTransactions(category: string = ""): Promise<Row[]> {
      try {
        const url = category
          ? `http://127.0.0.1:8000/transactions/${category}/`
          : "http://127.0.0.1:8000/get_all_transactions/";
        const res = await axios.get(url);
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
        return fetchedRows;
      } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
      }
    }

    // Initialize an empty array to store transactions from all selected categories
    let allFetchedTransactions: Row[] = [];

    /**
     * Updates the transactions based on the selected categories.
     * If no category is selected, fetches all transactions.
     * If categories are selected, fetches transactions for each selected category and aggregates them.
     */
    const updateTransactions = async () => {
      if (selectedCategories.length === 0) {
        // If no category is selected, fetch all transactions
        const transactions = await fetchTransactions();
        setRows(transactions);
      } else {
        // Fetch transactions for each selected category and aggregate them
        for (const category of selectedCategories) {
          const categoryTransactions = await fetchTransactions(category);
          allFetchedTransactions = [
            ...allFetchedTransactions,
            ...categoryTransactions,
          ];
        }
        setRows(allFetchedTransactions);
      }
    };

    // Call the update function
    updateTransactions();

    // Fetch transactions when categories change
    selectedCategories.forEach((category) => {
      fetchTransactions(category);
    });
  }, [selectedCategories]);

  function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <Title>Transactions</Title>
      <FormGroup row>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={handleCategoryChange}
                name={category}
              />
            }
            label={category}
          />
        ))}
      </FormGroup>
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
        Reload transactions
      </Link>
    </React.Fragment>
  );
}
