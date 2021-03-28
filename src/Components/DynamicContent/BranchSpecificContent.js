import {useContext, useState} from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Branches from "../../enums/Branches";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";

import {HeartIcon} from '../Icons/Icons'
import { BranchContext } from "../Utils/BranchContext";

import WorkingHours from './WorkingHours'
import ReactMapGL, { Marker} from "react-map-gl";

const Kontejner = styled.div`
  position: relative;
  margin-left: 2%;
  margin-top: 2%;
`;

const MyBranchSelect = styled(Select)`
  padding: 0.2rem;
  font-size: 0.8rem;
  text-align: left;
  border-radius: 0.5em;
  padding-left: 1rem;
  cursor: pointer;
  outline: none;
  min-width: 220px;
  transition-duration: 0.4s;
  font-family: Roboto;
  margin-bottom: 2rem;
  background-color: ${(props) => props.theme.Primitive.Shade};

  &:hover {
    background-color: ${(props) => props.theme.colors.main};
    border-bottom: none;
  }
  &:focus {
    background-color: ${(props) => props.theme.colors.main};
    border-bottom: none;
  }
  &:active {
    background-color: ${(props) => props.theme.colors.main};
    border-bottom: none;
  }
`;

const MyMenuItem = styled(MenuItem)`
  background-color: ${(props) => props.theme.colors.input};
  color: ${(props) => props.theme.colors.text};
  font-size: 0.8rem;
  &:hover {
    background-color: ${(props) => props.theme.colors.inputOption};
  }

  &:focus {
    background-color: ${(props) => props.theme.colors.inputOption};
    &:hover {
      background-color: ${(props) => props.theme.colors.inputOption};
    }
  }
`;

const MapContainer = styled.div`
  @media screen and (max-width: 700px) {
    display: none;
  }
`



export default function BranchSpecificContent() {
  const { t } = useTranslation();
  const { branch, setBranch } = useContext(BranchContext);
  const LocId = "cs";


  // Branch selectionfunctions
  const [openBranches, setOpenBranches] = useState(false);

  const handleOpenBranches = () => {
    setOpenBranches(true);
  };
  const handleCloseBranches = () => {
    setOpenBranches(false);
  };
  const handleChangeBranch = (event) => {
    setBranch(event.target.value);
  };

  // Map try
  const [selectedFacility, setSelectedFacility] = useState(null)
  const [viewport, setViewport] = useState({
    latitude: 50.0755381,
    longitude: 14.4378005,
    width: "30vw",
    height: "30vh",
    zoom: 13
  })


  return (
    <Kontejner>
      {/* Branch select */}
      {/* Dynamic component title based on chosen brnach */}
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            {t("form_branch")}
          </InputLabel>
          <MyBranchSelect
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            displayEmpty
            disableUnderline
            open={openBranches}
            value={branch}
            onChange={handleChangeBranch}
            onOpen={handleOpenBranches}
            onClose={handleCloseBranches}
            defaultValue={t("landing_chooseBranchSelect")}
          >
            <MyMenuItem value={null}>
              <em>{t("chooseBranchSelect")}</em>
            </MyMenuItem>
            {Branches.map((loc) => (
              <MyMenuItem value={loc.id}>{loc.locationName}</MyMenuItem>
            ))}
          </MyBranchSelect>
          <WorkingHours branch={branch}/>   
        </Grid>

      {/* Map component */}
      {process.env.REACT_APP_SHOW_MAP === 1 ?
        <MapContainer>
        <ReactMapGL {...viewport}
         mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
         mapStyle="mapbox://styles/mapbox/light-v10"
         onViewportChange={viewport=> {
          setViewport(viewport);
         }}>
              <Marker     latitude= {50.0755381} longitude={14.4378005}><HeartIcon/></Marker>
         </ReactMapGL>
                    </MapContainer>
           : null}        
      </Grid>       
    </Kontejner>
  );
}
