import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input` 
    margin: 0.5rem;
    font-size: ${props => props.theme.fonts.p};
    outline: none;
    background-color: ${props => props.theme.colors.blackWhite};
    color: ${props => props.theme.colors.text};
    position: relative;
    padding: .5rem;
    font-size: 0.8rem;
    font-family: inter;
    border: none;
    border-bottom: 1px solid ${props => props.theme.colors.borderColor};
    text-align: 'left';
    transition-duration: 0.4s;
    width: ${props => props.width || '10rem'};

    &:hover{
        background-color: ${props => props.theme.colors.main};
        transition-duration: 0.4s;
        border-radius: 25px;
    }
    &:focus{
        background-color: ${props => props.theme.colors.main};
        transition-duration: 0.4s;
        border-radius: 25px;
    }
    &::placeholder {
        font-size: 0.8rem;
        color: ${props => props.theme.colors.text};
        opacity: 0.5;
  }
  @media screen and (max-width: 700px) {
     font-size: 0.7rem;
     width: ${props => props.smallerWidth || '70%'}
     }
`



const FormInput = ({ value, type, onChange, placeholder, width, smallerWidth, pattern, required, magLength}) => {
return  <StyledInput 
           value={value} onChange={onChange} placeholder={placeholder} type={type} width={width} smallerWidth={smallerWidth} pattern={pattern} required={required} maxLength={magLength}
            />  
            ;
};

export default FormInput
