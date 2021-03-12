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

const Kontejner = styled.div`
  position: relative;
  margin-left: 2%;
  margin-top: 2%;
`;

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

export default function BranchSpecificContent(branch) {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const lang = "cz";
  const [branchContent, setBranchContent] = useState(null);
  const [emailContact, setEmailContact] = useState(null);
  const [phoneContact, setPhoneContact] = useState(null);
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


  // Get next reservation based on Donor Id
  const getMeTheContent = async (branch) => {
    try {
      const res = await axios({
        method: "post",
        url:
          "https://virtserver.swaggerhub.com/xkazm04/User/1.0.0/getDynamicBranchContent",
        data: {
          branch,
          lang,
        },
      });
      setLoading(true)
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      console.log(res.data);
      setEmailContact(res.data.EmailContact);
      setPhoneContact(res.data.PhoneContact);

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
      <Grid container spacing={3}>
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
        {branch === null ? null : (
        <GreyGrid item xs={12} sm={12} md={3} lg={3}>
       
            <ContactContainer>
           <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <Contact><label>Email contact:</label><a>{emailContact}</a> </Contact> }  </ol>
           <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <Contact><label>Phone contact:</label><a>{phoneContact}</a></Contact> }  </ol>    
            </ContactContainer>
            </GreyGrid>
         
      )}
          <GreyGrid item xs={12} sm={12} md={3} lg={3}>
          <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <div> Monday 7:00 - 19:30</div> }  </ol>
          <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <div> Tuesday 7:00 - 19:30</div> }  </ol>
          <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <div> Wednesday 7:00 - 19:30</div> }  </ol>
          <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <div> Thursday 7:00 - 19:30</div> }  </ol>
          <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <div> Friday 7:00 - 19:30</div> }  </ol>
          <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <div> Saturday 7:00 - 19:30</div> }  </ol>
          <ol>{isLoading ?  <Loader size={10} color={"#f54275"} loading={isLoading} /> :  <div> Sunday 7:00 - 19:30</div> }  </ol>
           </GreyGrid>
      </Grid>
    </Kontejner>
  );
}
