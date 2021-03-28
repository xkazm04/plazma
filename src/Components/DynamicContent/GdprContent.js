import branchEnum from '../../enums/branches.json'
import ParagraphText from "../Texts/ParagraphText";
import Title from '../Texts/Title';
import { useTranslation } from "react-i18next";

export default function GdprContent({branch}) {
  const { t } = useTranslation();
  return (
    <>
    
      {branchEnum.data.filter(data => data.id === branch).map(filteredData => (
        <>
        <Title title={t("gdprTitle")}/>
        {filteredData.gdpr1 ? <>  <p> <ParagraphText content={filteredData.gdpr1}/>   </p></> : null}
         {filteredData.gdpr2 ? <> <p> <ParagraphText content={filteredData.gdpr2}/>  </p></> : null}
         {filteredData.gdpr_a ? <>  <p> <ParagraphText content={filteredData.gdpr_a}/>   </p></> : null}
         {filteredData.gdpr_b ? <> <p> <ParagraphText content={filteredData.gdpr_b}/>  </p></> : null}
         {filteredData.gdpr_c ? <>  <p> <ParagraphText content={filteredData.gdpr_c}/>   </p></> : null}
         {filteredData.gdpr_d ? <> <p> <ParagraphText content={filteredData.gdpr_d}/>  </p></> : null}
         {filteredData.gdpr_e ? <>  <p> <ParagraphText content={filteredData.gdpr_e}/>   </p></> : null}
         {filteredData.gdpr_f ? <> <p> <ParagraphText content={filteredData.gdpr_f}/>  </p></> : null}
         {filteredData.gdpr_g ? <> <p> <ParagraphText content={filteredData.gdpr_g}/>  </p></> : null}
         {filteredData.gdpr_h ? <> <p> <ParagraphText content={filteredData.gdpr_h}/>  </p></> : null}
         {filteredData.gdpr_footer ? <> <p> <ParagraphText content={filteredData.gdpr_footer}/>  </p></> : null} 
         </>
      ))}
    </>
  );
}
