import React from 'react'
import styled from 'styled-components'
import {AlertErrorIcon} from '../Icons/Icons';

const StyledTitle = styled.div` 
    margin-top: 20px;
    margin-left: 7%;
    display: flex;
    flex-direction: row;
    text-align: left;
    padding: 0.5rem 0.5rem;
    font-family: Inter;
    font-size: 14px;
    outline: none;
    color: #98000E;
    background-color: #fff0f1;
    border-radius: 4px;
    font-weight: 700;
    border: 1px solid #98000E;
    border-left:  3px solid #98000E;
    width: 80%;
    @media screen and (max-width: 700px) {
     font-size: 0.8rem;
     padding: 0.5rem 1.5rem;
  }
`

const MessageTitle = styled.div`
  color: #98000E;
`

const Message = styled.div`
   font-weight: 400;
   color: #98000E;
`

const IconDiv = styled.div`
  position: relative;
`

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3%;
`

const Title = ({title, message}) => {
return  <StyledTitle><IconDiv><AlertErrorIcon/></IconDiv>

<MessageBox><MessageTitle>{title}</MessageTitle><Message>{message}</Message></MessageBox></StyledTitle>;
};

export default Title
