import React from 'react'
import styled from 'styled-components'
import {CloseIcon} from '../Icons/Icons'


const StyledButton = styled.button` 
    margin-top: 10px;
    outline: none;
    color: ${props => props.theme.colors.blackWhite};
    background: ${props => props.theme.Primitive.Shade};
    position: relative;
    font-family: Roboto;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    animation: 2s ease-in;
    transition-duration: 0.4s;
    &:hover{
        background: ${props => props.theme.colors.slotInput};
    }
`

const DeleteButton = ({onClick}) => {
return  <StyledButton onClick={onClick} ><CloseIcon/></StyledButton>;
};

export default DeleteButton
