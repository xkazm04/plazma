import React from "react";
import styled from "styled-components";
import { AlertErrorIcon,AlertInfoIcon } from "../Icons/Icons";

const StyledTitle = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  text-align: left;
  padding: 0.5rem 0.5rem;
  font-family: Inter;
  font-size: 14px;
  outline: none;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  border-radius: 4px;
  font-weight: 700;
  border: 1px solid ${(props) => props.color};
  border-left: 3px solid ${(props) => props.color};
  @media screen and (max-width: 700px) {
    font-size: 0.8rem;
    padding: 0.5rem 1.5rem;
  }
`;

const MessageTitle = styled.div`
  color: ${(props) => props.color};
`;

const Message = styled.div`
  font-weight: 400;
  color:${(props) => props.color};
`;

const IconDiv = styled.div`
  position: relative;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3%;
`;

export const ErrorMessage = ({ title, message }) => {
  return (
    <StyledTitle background={"#fff0f1"} color={"#98000E"}>
      <IconDiv>
        <AlertErrorIcon />
      </IconDiv>
      <MessageBox>
        <MessageTitle color={'#98000E'}>{title}</MessageTitle>
        <Message color={'#98000E'}>{message}</Message>
      </MessageBox>
    </StyledTitle>
  );
};

export const InfoMessage = ({ title, message }) => {
  return (
    <StyledTitle background={'linear-gradient(0deg, rgba(0, 133, 255, 0.05), rgba(0, 133, 255, 0.05)), #FFFFFF'} color={"#008EDE"}>
      <IconDiv>
        <AlertInfoIcon />
      </IconDiv>
      <MessageBox>
        <MessageTitle color={"#008EDE"}>{title}</MessageTitle>
        <Message color={"#008EDE"}>{message}</Message>
      </MessageBox>
    </StyledTitle>
  );
};

export const SuccessMessage = ({ title, message }) => {
  return (
    <StyledTitle background={"white"} color={"green"}>
      <IconDiv>
        <AlertErrorIcon />
      </IconDiv>
      <MessageBox>
        <MessageTitle  color={"green"}>{title}</MessageTitle>
        <Message  color={"green"}>{message}</Message>
      </MessageBox>
    </StyledTitle>
  );
};
