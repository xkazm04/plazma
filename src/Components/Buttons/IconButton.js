import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    outline: none; 
    margin: 1.5rem;
    position: relative;
    padding: .5rem;
    font-weight: bold;
    font-size: 0.8rem;
    text-align: center;
    cursor: pointer;
    background-color: ${props => props.theme.colors.main};
    border: 1px solid ${props => props.theme.colors.borderColor};
    border-radius: 5rem;
    flex-grow: '2';
    justify-self: end;
    transition-duration: 0.4s;
    color: ${props => props.theme.colors.text};
    &:hover{
        color: #541515;
        background-color: ${props => props.theme.colors.light};
  }
`


const IconButton = ({ onClick, label}) => {
return  <StyledButton 
            onClick={onClick}
            >{label}</StyledButton>;
};

export default IconButton
