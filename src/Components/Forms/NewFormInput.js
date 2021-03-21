
import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input` 
    margin-left: 5%;
    font-size: ${props => props.theme.fonts.p};
    outline: none;
    background-color: ${props => props.theme.Primitive.Shade};
    color: ${props => props.theme.colors.text};
    position: relative;
    padding: .5rem;
    font-size: 0.8rem;
    border: none;
    border: ${prop => prop.error ? '1px solid #98000E' : 'none'};
    text-align: 'left';
    transition-duration: 0.4s;
    
    width: ${props => props.width || '85%'};
    &:hover{
        background-color: ${props => props.theme.colors.main};
        transition-duration: 0.4s;
        border-radius: 10px;
    }
    &:focus{
        background-color: ${props => props.theme.colors.main};
        transition-duration: 0.4s;
        border-radius: 10px;
    }
    &::placeholder {
        font-size: 0.8rem;
        color: ${props => props.theme.colors.text};
        opacity: 0.5;
  }
  @media screen and (max-width: 700px) {
     font-size: 0.7rem;
     width: ${props => props.smallerWidth || '90%'};
     margin-top: 2%;
     margin-bottom: 2%;
     }
`

const StyledLabel = styled.label`
    font-size: 0.9rem;
    margin-left: 5%;   
    position: relative;
    font-family: Roboto;
    font-weight: 400;
    padding-top: 2%;
    color: ${prop => prop.error ? '#98000E': '#858795'};
`


export const NewFormInput = ({ error, label, id, ...inputProps}) => {
  return <>
    <StyledLabel error={error} htmlFor={id}>{label}</StyledLabel>
    <StyledInput error={error}
      {...inputProps}
    />
  </>
}