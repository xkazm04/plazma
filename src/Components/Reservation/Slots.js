
import styled from "styled-components";
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(134, 1fr) minmax(200px, 1fr);
  /* overflow: hidden; */
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 5px;
  margin-left: 100px;
`
const HeadRow = styled.div`
  display: grid;
  font-size: 13px;
  grid-template-columns: repeat(134, 1fr) minmax(200px, 1fr);
  /* overflow: hidden; */
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 8px;
  margin-left: 100px;
`

const GridItem = styled.div`
  border-radius: 3px;
  text-align: center;
  color: ${props => props.theme.colors.text};
`

const GridFirstItem = styled.div`
  margin-right: 30px;
  text-align: center;
  color: ${props => props.theme.colors.text};
  position: absolute;
  
`

const GridKontejner = styled.div`
    margin: 3rem;
`

const SlotButton = styled.button`
    padding: 1rem;
    background-color:  ${props => props.theme.colors.slot};
    border: none;
    animation: 2s ease-in;
    transition-duration: 0.4s;
    &:hover{
        background: ${props => props.theme.colors.slotInput};
        cursor: pointer;
    }
`

const SlotButtonRed = styled.button`
    padding: 1rem;
    background-color:  ${props => props.theme.colors.slotRed};
    border: none;
    animation: 2s ease-in;
    transition-duration: 0.4s;
`

export default function Slots() {

  return (
    <GridKontejner>
<HeadRow >
  <GridItem>
     10:00
  </GridItem>
  <GridItem>
    10:15
  </GridItem>
  <GridItem>
    10:30
  </GridItem>
  <GridItem>
    10:45
  </GridItem>
  <GridItem>
    11:00
  </GridItem>
  <GridItem>
     11:00
  </GridItem>
  <GridItem>
    11:15
  </GridItem>
  <GridItem>
    11:30
  </GridItem>
  <GridItem>
    11:45
  </GridItem>
  <GridItem>
     12:00
  </GridItem>
  <GridItem>
    12:15
  </GridItem>
  <GridItem>
    12:30
  </GridItem>
  <GridItem>
    12:45
  </GridItem>
  <GridItem>
    13:00
  </GridItem>
</HeadRow>

<GridFirstItem>
   21.5. Pondělí 
  </GridFirstItem>
<Grid >
  <GridItem>
  <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButtonRed disabled></SlotButtonRed>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
</Grid>

<GridFirstItem>
   22.5. Úterý 
  </GridFirstItem>
<Grid >

  <GridItem>
  <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
  <GridItem>
    <SlotButton></SlotButton>
  </GridItem>
</Grid>
    </GridKontejner>
  );
}
