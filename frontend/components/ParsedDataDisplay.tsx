import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

const ParsedDataDisplayComponent = ({ data }) => {
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
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.transactionDate}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right">{`SAR ${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default function SimplePaper({ data }) {
  return (
    <Box sx={{ width: "100%" }}>
      <ParsedDataDisplayComponent data={data} />
    </Box>
  );
}
