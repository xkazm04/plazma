import ParagraphText from "./ParagraphText";
import Point from "./PointText";
import styled from "styled-components";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

const StyledDialog = styled(DialogContent)`
  opacity: 0.9;
  background: ${(props) => props.theme.colors.blackWhite};
`;

const GdprDialog = ({location}) => {
  return (
    <StyledDialog>
      <DialogTitle>Obchodní podmínky</DialogTitle>
      <ParagraphText
        content={
          "Tímto výslovně, bezúplatně, informovaně, svobodně a dobrovolně uděluji souhlas se zpracováním, shromažďováním a uchováním svých osobních údajů správcem UNICAplasma s.r.o. (dále jen „Správce“), a to v rozsahu údajů uvedených v registračním formuláři, tj. jméno, příjmení, datum narození, telefonní číslo, e-mailová adresa. Beru na vědomí a souhlasím s tím, aby mé osobní údaje byly Správcem využity za účelem registrace do objednávkového systému správce za účelem objednání se na vyšetření či odběr krve nebo jejích složek a za účelem včasného připomenutí objednávky. Beru na vědomí, že právním základem pro zpracování mých osobních údajů je článek 6 odst. 1. písm. a) nařízení Evropského parlamentu a Rady (EU) č. 2016/679, obecné nařízení o ochraně osobních údajů (dále jen „GDPR“). Tento souhlas poskytuji na dobu určitou 2 let ode dne mého posledního přihlášení do objednávkového systému."
        }
      />

      <ParagraphText
        content={
          "Prohlašuji, že si jsem plně vědom/a svých práv podle GDPR, zejména jsem si vědom/a, že:"
        }
      />

      <Point
        content={
          "(a) mám právo požadovat od Správce přístup k osobním údajům a informacím uvedeným v čl. 15 GDPR, které se mne týkají, mám právo na opravu nebo výmaz osobních údajů, popřípadě omezení jejich zpracování a právo na přenositelnost údajů k jinému správci za podmínek a s omezeními uvedenými v čl. 20 GDPR"
        }
      />
      <Point content={"(b) mám právo tento souhlas kdykoliv odvolat"} />
      <Point
        content={
          "(c) pro případ, že budu nespokojen/a se zpracováním mých osobních údajů, mám právo podat stížnost u dozorového úřadu, kterým je v České republice Úřad pro ochranu osobních údajů, se sídlem Pplk. Sochora 27, 170 00 Praha 7, www.uoou.cz"
        }
      />
      <Point
        content={
          "(d) nemám povinnost své osobní údaje Správci poskytnout, poskytuji je však svobodně a dobrovolně; bez poskytnutí těchto údajů by mi Správce nemohl poskytnout příslušné služby, např. objednat mne na vyšetření či odběr krve nebo jejích složek elektronicky a připomenout mi zadané objednávky"
        }
      />
      <Point
        content={
          "(e) v žádném případě nedochází k automatizovanému rozhodování, vč. profilování, uvedenému v čl. 22 GDPR"
        }
      />
      <Point
        content={
          "(f)  mé osobní údaje nebudou předávány do třetích zemí nebo mezinárodní organizaci ve smyslu čl. 13 odst. 1. písm. f) GDPR"
        }
      />
      <Point
        content={
          "(g) příjemcem mých osobních údajů je Správce a zpracovatel – poskytovatel hostingových služeb, kterým ke dni udělení souhlasu je společnost MULTIMA a.s. (IČO: 25056051)"
        }
      />
      <Point
        content={
          "(h)  v situaci, kdy by byly osobní údaje zapotřebí pro účely uplatnění či ochrany mých práv či práv Správce ve sporech, v soudním či správním řízení, budou mé osobní údaje uchovávány po dobu trvání sporu, a to výhradně za účelem ochrany práv v takovém sporu."
        }
      />

      <ParagraphText
        content={
          "V případě, že budu mít jakýkoliv dotaz nebo požadavek, můžu se kdykoliv obrátit na Správce nebo jeho pověřence pro ochranu osobních údajů, kterým je: Personal Data Services s.r.o., IČO: 07064373, se sídlem Washingtonova 1624/5, Praha 1, 110 00, Česká republika, e-mail: dpo@dataservices.cz, www.dataservices.cz"
        }
      />
    </StyledDialog>
  );
};

export default GdprDialog;
