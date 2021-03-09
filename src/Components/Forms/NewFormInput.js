
import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input` 
    margin-left: 10%;
    margin-top: 7%;
    font-size: ${props => props.theme.fonts.p};
    outline: none;
    background-color: ${props => props.theme.colors.blackWhite};
    color: ${props => props.theme.colors.text};
    position: relative;
    padding: .5rem;
    font-size: 0.8rem;
    font-family: inter;
    border: none;
    border: 1px solid #CFD0D7;
    text-align: 'left';
    transition-duration: 0.4s;
    width: ${props => props.width || '70%'};

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

const StyledLabel = styled.label`
    font-size: 0.9rem;
    position: absolute;
    font-family: Inter;
    color: ${props => props.theme.Primary.Dark};
`


export const NewFormInput = ({ register,error, label, id, ...inputProps}) => {
  return <>
    <StyledLabel htmlFor={id}>{label}</StyledLabel>
    <StyledInput
      id={id}
      register={register}
      {...inputProps}
    />
    {error && <div>{error.message}</div>} 
  </>
}