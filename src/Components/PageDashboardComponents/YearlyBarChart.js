
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

import {VictoryChart, VictoryGroup, VictoryBar, VictoryAxis} from 'victory';


const data = {
    Vyplaceno: [
        { x: 'Leden', y: 14350},
        { x: 'Únor', y: 5000},
        { x: 'Březen', y: 2000},
        { x: 'Duben', y: 4000},
    ]
}

const useStyles = makeStyles(() => ({
  container: {
  },
}));


export default function YearlyBarChart() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.container}>
        <VictoryChart>
                <VictoryGroup offset={500}>
                    <VictoryBar data={data.Vyplaceno}  barWidth={10} 
                         style={{ data: { fill: "#c43a31", stroke: "black", strokeWidth: 2 }}}/>
                </VictoryGroup>
        </VictoryChart>
    </div>
  );
}
