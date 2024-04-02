import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', age: 14 },
  { id: 2, lastName: 'Lannister', age: 31 },
  { id: 3, lastName: 'Lannister',  age: 31 },
  { id: 4, lastName: 'Stark',  age: 11 },
  { id: 5, lastName: 'Targaryen',  age: null },
  { id: 6, lastName: 'Melisandre', age: 150 },
  { id: 7, lastName: 'Clifford',  age: 44 },
  { id: 8, lastName: 'Frances',  age: 36 },
  { id: 9, lastName: 'Roxie', age: 65 },
];


const TableList = () => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}

export default TableList