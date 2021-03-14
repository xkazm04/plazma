
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
    text-align: 'left';
    transition-duration: 0.4s;
    width: ${props => props.width || '85%'};
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
     width: ${props => props.smallerWidth || '90%'}
     }
`



export const FormInputYup = ({ ref,error, ...inputProps}) => {
  return <>
    <StyledInput
      {...inputProps}
    />
    {error && <div>{error.message}</div>} 
  </>
}