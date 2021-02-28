

import ParagraphText from "../Texts/ParagraphText";
import Point from "../Texts/PointText";
import NoteText from "../Texts/NoteText";
import Title from "../Texts/Title";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const useStyles = makeStyles(() => ({
  textPoints: {
    textAlign: 'left',
    marginLeft: '2%'
},

}))

const Kontejner = styled.div`
  display: flex;
      position: relative;
      flex-direction: column;
      text-align: left;
      margin-left: 25%;
      margin-bottom: 2%;
  @media screen and (max-width: 700px) {
     margin-left: 5%;
`


export default function RegistrationContent({location}) {
  const classes = useStyles();
  
//  1. Target solution to retrieve text from PS Administration
//  useEffect send location, receive texts
// Text1,Text2,Text3,Text4


//  2. Until that hardcoded text for each branch needed

  const NaFrantisku = {
      title: 'Registration to reservation system - Nemocnice na Františku',
      text1: "We accept first time donors on email nafrantisku@net.cz or phone number: +420: 123456789. Thank you.",
  } 

  const Kladno = {
      title: 'Registration to reservation system - Kladno',
     text1: '"We accept first time donors on email kladno@net.cz or phone number: +420: 123456789. Thank you."',
  }

    return (
      <Kontejner>
         

{/* Static option */}
{ location === '1' ? <Title title={NaFrantisku.title}/> :  <Title title={Kladno.title}/> }
{ location === '1' ? <ParagraphText content={NaFrantisku.text1}/> :  <ParagraphText content={Kladno.text1}/> }


{/* Space for dynamic */}
<div className={classes.textPoints}>
<Point content={" Po      8:30 – 11:30 a 13:30 - 17:15"} />
<Point content={" Út     8:30 – 11:30 a 13:30 - 17:15"} />
<Point content={" St      8:30 – 11:30 a 13:30 - 17:15"} />
<Point content={" Čt       8:30 – 11:30 a 13:30 - 17:15"} />
<Point content={" Pá      8:30 – 11:30 a 13:30 - 17:15"} />

</div>

<ParagraphText
content={
  "Please arrive at least 30 minutes before the ordered time!!!"
}
/>
<ParagraphText content={'Financial rewards and other benefits:'}/>
<div className={classes.textPoints}>
<Point content={"1st collection – deposit 400 Kč from amount 700 Kč*"} /> 
<Point content={"2nd collection – 1000 Kč**"} />
<Point content={"3rd and every next collection – 700 Kč*"} />
<NoteText
content={
  "* according to § 32 par. 2 of Act No. 373/2011 Coll. more information: https://www.mojeplazma.cz/cz/darujte-krevni-plasmu.html"
}
/>
<NoteText
content={
  "** the amount represents a supplement for the 1st collection and financial compensation for the 2nd collection"
}
/>
</div>

</Kontejner>
  );
}


