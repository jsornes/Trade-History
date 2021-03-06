import React from "react";

import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "orderId", headerName: "Order Id", width: 110 },
  { field: "stock", headerName: "Instrument", width: 130 },
  { field: "direction", headerName: "Direction", width: 130 },
  {
    field: "orderType",
    headerName: "Order type",
    type: "number",
    width: 130,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    width: 120,
  },
  /* {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },*/
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 90,
  },
  {
    field: "openingTime",
    headerName: "Opening time",
    type: "datetime-local",
    sortable: true,
    width: 140,
  },
  {
    field: "closingTime",
    headerName: "Closing time",
    type: "datetime-local",
    sortable: true,
    width: 150,
  },
  {
    field: "closedBy",
    headerName: "Closed by",
    width: 130,
  },
  {
    field: "closingPrice",
    headerName: "Closing price",
    type: "number",
    width: 140,
  },
  {
    field: "result",
    headerName: "Result",
    type: "number",
    width: 110,
  } /*
  {
    field: "executionVenue",
    headerName: "Execution venue",
    width: 170,
  },
  {
    field: "exchangeRate",
    headerName: "Exchange rate",
    type: "number",
    width: 150,
  },
  {
    field: "totalCost",
    headerName: "Total cost",
    type: "number",
    width: 120,
  },
  {
    field: "priceChange",
    headerName: "Price change",
    type: "number",
    width: 140,
  },
  {
    field: "portafolioSize",
    headerName: "Portafolio size",
    type: "number",
    width: 150,
  },*/,
];
/*
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];*/

const rows = [];

const TradeHistoryTable = () => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default TradeHistoryTable;
