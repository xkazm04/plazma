


import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

import ParagraphText from "../Texts/ParagraphText";
import Point from "../Texts/PointText";
import NoteText from "../Texts/NoteText";

const useStyles = makeStyles(() => ({
  container: {
  },

}));




export default function InfoTable2() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.container}>
        

      <ParagraphText
        content={"Finanční náhrada pro prvodárce a další benefity:"}
      />
      <Point content={"1. odběr – záloha 400 Kč z částky 700 Kč*"} />
      <Point content={"2. odběr – 1000 Kč**"} />
      <Point content={"3. a každý další odběr – 700 Kč*"} />
      <NoteText
        content={
          "* dle § 32 ods. 2 zákona č. 373/2011 Sb. více informací: https://www.mojeplazma.cz/cz/darujte-krevni-plasmu.html"
        }
      />
      <NoteText
        content={
          "** částka představuje doplatek za 1. odběr a finanční náhradu za 2. odběr"
        }
      />
    </div>
  );
}
