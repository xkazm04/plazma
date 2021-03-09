
import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input` 
    margin-left: 10%;
    margin-top: 10%;
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
    width: ${props => props.width || '70%'};

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
     width: ${props => props.smallerWidth || '90%'}
     }
`

const StyledLabel = styled.label`
    position: absolute;
    margin-bottom: 100px;
    font-family: inter;
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