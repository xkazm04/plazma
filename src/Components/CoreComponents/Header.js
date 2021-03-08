import { useContext } from "react";
import { Link } from "react-router-dom";

import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { UserContext } from "../Utils/UserContext";
import Button from "../Buttons/FormButton";
import MenuButton from "../Buttons/MenuButton";

import styled from "styled-components";

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: "1%",
    display: "flex",
    flexDirection: "row",
    paddingBottom: "1%",
    paddingRight: "2%",
    marginBottom: "1%",
  },
  leftBox: {
    flexGrow: "1",
    justifySelf: "left",
    textAlign: "left",
    paddingLeft: "2%",
    textDecoration: "none",
  },
  centerLogo: {
    flexGrow: "1",
    marginTop: "1rem",
    fontSize: "35px",
  },
  userRightPart: {
    transitionDuration: "1s",
    textDecoration: "none",
    flexWrap: "nowrap",
    flexGrow: "2",
    "&:hover": {
      color: "red",
    },
  },
}));

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0.3rem;
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

export default function Header() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { isAuth, setIsAuth } = useContext(UserContext);
  const branch = localStorage.getItem("defaultSubcenter");

  // Logout function
  const handleLogout = () => {
    setIsAuth(false);
    console.log(isAuth);
    localStorage.removeItem("defaultSubcenter");
    localStorage.removeItem("token");
    localStorage.removeItem("donorCode");
    localStorage.removeItem("theme");
  };

  return (
    <div className={classes.container}>
      {/* Left logo part */}
      <div className={classes.leftBox}>
        <StyledLink
          className={classes.logo}
          activeStyle={{ backgroundColor: "red" }}
          to="/"
        >
          {heartSvg}
          <i>PlasmaStream</i>
        </StyledLink>
      </div>
      {/* Center branch part, remove for mobile */}
      {/* <div className={classes.centerLogo}>{branch}</div> */}
      {/* Right menu part */}
      <div>
        <Link className={classes.userRightPart} to="/">
          <MenuButton width={"3rem"} label={heartSvg} />
        </Link>
        {/* <Link className={classes.userRightPart} to="/reservations"><Button width={"3rem"} label={<DateRangeIcon/>}/></Link> */}
        <Link className={classes.userRightPart} to="/profile">
          <MenuButton width={"3rem"} label={<AccountCircleIcon />} />
        </Link>
        <MenuButton
          width={"3rem"}
          label={<PowerSettingsNewIcon />}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}
