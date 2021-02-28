import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import { makeStyles } from "@material-ui/core/styles";
import styled from 'styled-components'
import { useTranslation } from "react-i18next";


function createData(date, payout) {
    return { date, payout};
  }
  
  const rows = [
      createData('1st visit', "250"),
      createData('2nd visit', "500"),
      createData('3rd and more', "750"),
  ];

const useStyles = makeStyles(() => ({
  container: {
  },
  tableHead:{
      fontWeight: 'bold',
  },
  tableRow:{
    border: 'none',
}
}));

const MyPaper = styled(Paper)`
    background-color: ${props => props.theme.colors.light};
    
`
const Tabulka = styled(Table)`
  background-color: ${props => props.theme.colors.light};
`


export default function PayoutTable() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.container}>
        <MyPaper>
      <Tabulka size='small'>
        <TableHead>
          <TableRow>
            <TableCell  className={classes.tableHead}  variant='head'>Visit date</TableCell>
            <TableCell  className={classes.tableHead} > Payout(CZK)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.date}>
              <TableCell className={classes.tableRow} >{row.date}</TableCell>
              <TableCell className={classes.tableRow}>{row.payout}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Tabulka>
      </MyPaper>
    </div>
  );
}
