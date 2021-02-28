


import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

import ParagraphText from "../Texts/ParagraphText";
import Point from "../Texts/PointText";

const useStyles = makeStyles(() => ({
  container: {
  },

}));




export default function InfoTable1() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.container}>
        
        <ParagraphText
        content={
          "We accept first time donors on email martin@net.cz or phone number: +420: 123456789. Thank you."
        }
      />
      <Point content={"Mo       8:30 – 11:30 a 13:30 - 17:15"} />
      <Point content={"Tu      8:30 – 11:30 a 13:30 - 17:15"} />
      <Point content={"We       8:30 – 11:30 a 13:30 - 17:15"} />
      <Point content={"Th       8:30 – 11:30 a 13:30 - 17:15"} />
      <Point content={"Fr       8:30 – 11:30 a 13:30 - 17:15"} />
      <ParagraphText fontWeight={'bold'}
        content={
          "Please arrive at least 30 minutes before the ordered time!!!"
        }
      />
    </div>
  );
}
