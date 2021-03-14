
import React from 'react'
import styled from 'styled-components'


const StyledLabel = styled.label`
    font-size: 0.9rem;
    margin-left: 5%;   
    position: relative;
    font-family: Roboto;
    font-weight: 400;
    color: #858795;
`


export const FormLabel = ({ label, id}) => {
  return <>
    <StyledLabel htmlFor={id}>{label}</StyledLabel>
  </>
}