import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Loader from "react-spinners/GridLoader";
import Branches from "../../enums/Branches";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";

import ReactMapGL, { Marker} from "react-map-gl";

const Kontejner = styled.div`
  position: relative;
  margin-left: 2%;
  margin-top: 2%;
`;

const heartSvg = (
  <svg
    width="32"
    height="24"
    viewBox="0 0 25 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.44588 0C7.88613 0 7.43237 0.453765 7.43237 1.01351V16.4865C7.43237 17.0462 7.88613 17.5 8.44588 17.5C9.00563 17.5 9.45939 17.0462 9.45939 16.4865V1.01351C9.45939 0.453766 9.00563 0 8.44588 0ZM4.39193 0.625C3.83218 0.625 3.37842 1.07877 3.37842 1.63851V13.3615C3.37842 13.9212 3.83218 14.375 4.39193 14.375C4.95168 14.375 5.40545 13.9212 5.40545 13.3615V1.63851C5.40545 1.07877 4.95168 0.625 4.39193 0.625ZM0 5.38851C0 4.82877 0.453766 4.375 1.01351 4.375C1.57326 4.375 2.02703 4.82877 2.02703 5.38851V8.36149C2.02703 8.92123 1.57326 9.375 1.01351 9.375C0.453766 9.375 0 8.92123 0 8.36149V5.38851ZM25 5.38851C25 4.82877 24.5462 4.375 23.9865 4.375C23.4267 4.375 22.973 4.82877 22.973 5.38851V8.36149C22.973 8.92123 23.4267 9.375 23.9865 9.375C24.5462 9.375 25 8.92123 25 8.36149V5.38851ZM21.6216 1.63851C21.6216 1.07877 21.1678 0.625 20.6081 0.625C20.0483 0.625 19.5946 1.07877 19.5946 1.63851V13.3615C19.5946 13.9212 20.0483 14.375 20.6081 14.375C21.1678 14.375 21.6216 13.9212 21.6216 13.3615V1.63851ZM17.5676 1.01351C17.5676 0.453765 17.1139 0 16.5541 0C15.9944 0 15.5406 0.453766 15.5406 1.01351V16.4865C15.5406 17.0462 15.9944 17.5 16.5541 17.5C17.1139 17.5 17.5676 17.0462 17.5676 16.4865V1.01351ZM12.4998 2.5C11.9401 2.5 11.4863 2.95376 11.4863 3.51351V18.9865C11.4863 19.5462 11.9401 20 12.4998 20C13.0596 20 13.5134 19.5462 13.5134 18.9865V3.51351C13.5134 2.95377 13.0596 2.5 12.4998 2.5Z"
      fill="#ED1B2F"
    />
  </svg>
);

const ContactContainer = styled.div`
  font-family: Roboto;
  font-size: 16px;
  margin-top: 2%;
  padding-top: 2%;
  padding-bottom: 1%;
`

const Contact = styled.div`
    font-size: 0.9rem;
    font-family: Roboto;
    font-weight: 400;
    color: #858795;
    display: flex;
  justify-content: space-between;
`

const GreyGrid = styled(Grid)`
  background: linear-gradient(180.13deg, #FAFAFA 0.11%, rgba(255, 255, 255, 0) 25.72%);
  margin-top: 0;
`
const Day = styled.div`
  font-size: 14px;
  margin: 0;
`

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

export default function BranchSpecificContent(branch) {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const LocId = "cs";
  const [branchContent, setBranchContent] = useState(null);
  const [emailContact, setEmailContact] = useState(null);
  const [phoneContact, setPhoneContact] = useState(null);
  const [text1, setText1] = useState(null);
  const [text2, setText2] = useState(null);
  const [text3, setText3] = useState(null);
  const [text4, setText4] = useState(null);
  const [text5, setText5] = useState(null);
  const [text6, setText6] = useState(null);
  const [text7, setText7] = useState(null);

  // Branch selectionfunctions
  const [openBranches, setOpenBranches] = useState(false);
  const [newBranch, setBranch] = useState(branch);

  const handleOpenBranches = () => {
    setOpenBranches(true);
  };
  const handleCloseBranches = () => {
    setOpenBranches(false);
  };
  const handleChangeBranch = (event) => {
    setBranch(event.target.value);
    getMeTheContent();
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


  // Get next reservation based on Donor Id
  const getMeTheContent = async (branch) => {
    try {
      const res = await axios({
        method: "post",
        url:
          "https://virtserver.swaggerhub.com/xkazm04/User/1.0.0/getDynamicBranchContent",
        data: {
          PlaceId: newBranch,
          LocId,
          ContentType: 1
        },
      });
      setLoading(true)
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      console.log(res.data);
      setEmailContact(res.data.EmailContact);
      setPhoneContact(res.data.PhoneContact);
      setText1(res.data.Text1)
      setText2(res.data.Text2)
      setText3(res.data.Text3)
      setText4(res.data.Text4)
      setText5(res.data.Text5)
      setText6(res.data.Text6)
      setText7(res.data.Text7)

      // Reset error message
    } catch (err) {
      // Error
      if (err.response) {
        // client received an error response (5xx, 4xx)
        console.log(err.response);
        setLoading(false);
      } else if (err.request) {
        // client never received a response, or request never left
        console.log(err.request);
        setLoading(false);
      } else {
        // anything else
      }
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Kontejner>
      {/* Branch select */}
      {/* Dynamic component title based on chosen brnach */}
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            {t("form_branch")}
          </InputLabel>
          <MyBranchSelect
            label="Age"
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            displayEmpty
            disableUnderline
            open={openBranches}
            value={newBranch}
            onChange={handleChangeBranch}
            onOpen={handleOpenBranches}
            onClose={handleCloseBranches}
            inputProps={{
              name: "age",
              id: "outlined-age-native-simple",
            }}
            defaultValue={t("landing_chooseBranchSelect")}
          >
            <MyMenuItem value={null}>
              <em>{t("chooseBranchSelect")}</em>
            </MyMenuItem>
            {Branches.map((loc) => (
              <MyMenuItem value={loc.id}>{loc.locationName}</MyMenuItem>
            ))}
          </MyBranchSelect>
        </Grid>
        {/* {branch === null ? null : (
        <GreyGrid item xs={12} sm={6} md={3} lg={3}>
       
            <ContactContainer>
           <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <Contact><label>Email contact:</label><a>{emailContact}</a> </Contact> }  </ol>
           <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <Contact><label>Phone contact:</label><a>{phoneContact}</a></Contact> }  </ol>    
            </ContactContainer>
            </GreyGrid>
      )} */}

      {/* Map component */}
      {process.env.SHOW_MAP == 1 ?
        <MapContainer>
        <ReactMapGL {...viewport}
         mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
         mapStyle="mapbox://styles/mapbox/light-v10"
         onViewportChange={viewport=> {
          setViewport(viewport);
         }}>
              <Marker     latitude= {50.0755381} longitude={14.4378005}>{heartSvg}</Marker>
         </ReactMapGL>
                    </MapContainer>
                    : null}

          {/* Working hours */}
          <GreyGrid item xs={12} sm={6} md={3} lg={3}>
          <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <Day> {text1}</Day> }  </ol>
          <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <Day> {text2}</Day> }  </ol>
          <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <Day> {text3}</Day> }  </ol>
          <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <Day> {text4}</Day> }  </ol>
          <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <Day> {text5}</Day> }  </ol>
          <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <Day> {text6}</Day> } </ol>
         <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <Day> {text7}</Day> }  </ol> 
           </GreyGrid>

      </Grid>
    </Kontejner>
  );
}
