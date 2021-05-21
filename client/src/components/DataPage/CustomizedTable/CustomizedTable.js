import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, username, password, email, cnic, phoneNumber, designation, roles) {
  return { name, username, password, email, cnic, phoneNumber, designation, roles };
}

const rows = [
  createData("Muhammad Bader", "CS172083", "pwd@123", "tester@test.com", "31313-3131331-3", "+923001234567", "Student", "None"),
  createData("Muhammad Bader", "CS172084", "pwd@123", "tester@test.com", "31313-3131331-3", "+923001234567", "Student", "None"),
  createData("Muhammad Bader", "CS172085", "pwd@123", "tester@test.com", "31313-3131331-3", "+923001234567", "Student", "None"),
  createData("Muhammad Bader", "CS172086", "pwd@123", "tester@test.com", "31313-3131331-3", "+923001234567", "Student", "None"),
  createData("Muhammad Bader", "CS172087", "pwd@123", "tester@test.com", "31313-3131331-3", "+923001234567", "Student", "None"),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Username</StyledTableCell>
            <StyledTableCell align="center">Password</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">CNIC</StyledTableCell>
            <StyledTableCell align="center">Ph. No.</StyledTableCell>
            <StyledTableCell align="center">Designation</StyledTableCell>
            <StyledTableCell align="center">Roles</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.username}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.username}</StyledTableCell>
              <StyledTableCell align="center">{row.password}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.cnic}</StyledTableCell>
              <StyledTableCell align="center">{row.phoneNumber}</StyledTableCell>
              <StyledTableCell align="center">{row.designation}</StyledTableCell>
              <StyledTableCell align="center">{row.roles}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
