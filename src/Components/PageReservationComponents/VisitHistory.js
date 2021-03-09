import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import { makeStyles } from "@material-ui/core/styles";
import styled from 'styled-components'
import { useTranslation } from "react-i18next";


function createData(date, center, payout) {
    return { date, center, payout};
  }
  
  const rows = [
      createData('22.4. 2015', "UnicaPlasma", "500"),
      createData('21.5. 2016', "UnicaPlasma", "300"),
      createData('21.2. 2015', "UnicaPlasma", "0"),
      createData('22.3. 2015', "UnicaPlasma", "500"),
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


export default function DasboardTable() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.container}>
        <MyPaper>
      <Table size='small' className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell  className={classes.tableHead}  variant='head'>Visit date</TableCell>
            <TableCell  className={classes.tableHead} >Centrum</TableCell>
            <TableCell  className={classes.tableHead} > Odměna(kč)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.date}>
              <TableCell className={classes.tableRow} >{row.date}</TableCell>
              <TableCell className={classes.tableRow}>{row.center}</TableCell>
              <TableCell className={classes.tableRow}>{row.payout}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </MyPaper>
    </div>
  );
}
