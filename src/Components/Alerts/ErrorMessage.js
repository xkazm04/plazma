import React from 'react'
import styled from 'styled-components'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const StyledTitle = styled.div` 
    margin-top: 20px;
    display: flex;
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
    width: 75%;
    margin-left: 10%;
    @media screen and (max-width: 700px) {
     font-size: 0.8rem;
     padding: 0.5rem 1.5rem;
  }
`

const Icon = styled(ErrorOutlineIcon)`
  position: relative;
`

const MessageTitle = styled.div`
  margin-left: 1%;
  margin-top: 4px;
`


const Title = ({title}) => {
return  <StyledTitle><Icon/><MessageTitle>{title}</MessageTitle></StyledTitle>;
};

export default Title
