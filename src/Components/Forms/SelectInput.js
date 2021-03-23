import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.select` 
    margin: 0.5rem;
    margin-bottom: 1rem;
    font-size: ${props => props.theme.fonts.p};
    outline: none;
    background-color: ${props => props.theme.colors.blackWhite};
    color: ${props => props.theme.colors.text};
    position: relative;
    padding: .5rem;
    font-size: 0.8rem;
    font-family: Inter;
    border: none;
    border: 1px solid #CFD0D7;
    text-align: 'left';
    transition-duration: 0.4s;
    width: ${props => props.width || '10rem'};

    option {
        color: black;
         background: ${props => props.theme.Primary.Shade};
         font-weight: small;
         display: flex;
         white-space: pre;
         min-height: 20px;
         padding: 0px 2px 1px;
         font-family: Inter;
         font-size: 1rem;
  }
    &:hover{
        background-color: ${props => props.theme.colors.main};
        transition-duration: 0.4s;
        border-radius: 15px;
    }
    &:focus{
        background-color: ${props => props.theme.colors.main};
        transition-duration: 0.4s;
        border-radius: 15px;
    }
    &::placeholder {
        font-size: 0.8rem;
        color: ${props => props.theme.colors.text};
        opacity: 0.5;
  }
  @media screen and (max-width: 700px) {
     font-size: 0.7rem;
     width: ${props => props.smallerWidth || '100%'};
     }
`


const FormInput = ({ value,  onChange, id,required,children}) => {
return  <StyledInput 
           id={id} value={value} onChange={onChange} required={required} >{children}</StyledInput>
            
};

export default FormInput
