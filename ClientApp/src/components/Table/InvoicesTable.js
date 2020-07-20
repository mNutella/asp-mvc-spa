import React from "react";
import Link from "@material-ui/core/Link";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import Table from "./Table";

export default function CustomTable({
  rows,
  loading,
  onEditClick,
  onDeleteClick,
}) {
  const renderHeader = () => {
    return (
      <TableRow>
        <TableCell align="right">Id</TableCell>
        <TableCell align="right">Name</TableCell>
        <TableCell align="right">Type</TableCell>
        <TableCell align="right">Amount</TableCell>
        <TableCell align="right">Company</TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right"></TableCell>
      </TableRow>
    );
  };

  const renderRow = (data) => {
    return (
      <TableRow key={data.id}>
        <TableCell component="th" scope="row" align="right">
          {data.id}
        </TableCell>
        <TableCell align="right">{data.name}</TableCell>
        <TableCell align="right">{data.type}</TableCell>
        <TableCell align="right">{data.amount}</TableCell>
        <TableCell align="right">{data.company.name}</TableCell>
        <TableCell align="right">
          <Link
            component="button"
            variant="body2"
            onClick={() => handleEditClick(data.id, data)}
          >
            Edit
          </Link>
        </TableCell>
        <TableCell align="right">
          <Link
            component="button"
            variant="body2"
            onClick={() => handleDeleteClick(data.id)}
          >
            Delete
          </Link>
        </TableCell>
      </TableRow>
    );
  };

  const renderRows = (data) => {
    if (!data.length) return <p>Table is empty</p>;

    return data && data.map((item) => renderRow(item));
  };

  const handleEditClick = (id, data) => {
    onEditClick && onEditClick(id, data);
  };

  const handleDeleteClick = (id) => {
    onDeleteClick && onDeleteClick(id);
  };

  return (
    <Table renderHeader={renderHeader} loading={loading}>
      {rows && renderRows(rows)}
    </Table>
  );
}
