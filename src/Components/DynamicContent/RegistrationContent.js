import ParagraphText from "../Texts/ParagraphText";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';



const Kontejner = styled.div`
  display: flex;
      position: relative;
      flex-direction: column;
`


export default function RegistrationContent({branch}) {
  const { t } = useTranslation();

  const NaFrantisku = {
      title: 'Registration to reservation system - Nemocnice na Františku',
      text1: "We accept first time donors on email nafrantisku@net.cz or phone number: +420: 123456789. Thank you.",
  } 

  const Kladno = {
      title: 'Registration to reservation system - Kladno',
     text1: '"We accept first time donors on email kladno@net.cz or phone number: +420: 123456789. Thank you."',
  }

  const Ostrava = {
    title: 'Registration to reservation system - Ostrava',
   text1: '"We accept first time donors on email kladno@net.cz or phone number: +420: 123456789. Thank you."',
}
    return (
      <Kontejner>
{branch === null ? <div>{t('form_branchNotSelected')}</div> : null}  
{branch == 1 ? <ParagraphText content={NaFrantisku.title}/> : null}
{branch == 2 ? <ParagraphText content={Kladno.title}/> : null}
{branch == 3 ? <ParagraphText content={Ostrava.title}/> : null}



{/* Space for dynamic */}
{/* <div className={classes.textPoints}>
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
</div> */}

</Kontejner>
  );
}


