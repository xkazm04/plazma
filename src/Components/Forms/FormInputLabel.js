import React from 'react'
import styled from 'styled-components'

const StyledLabel = styled.label` 
    position:'relative';
    font-size: 1rem;
    font-weight: bold;
    @media screen and (max-width: 700px) {
     font-size: 0.8rem;}
`

const FormInputLabel = ({label}) => {
return  <StyledLabel >
                {label}
            </StyledLabel>     
};

export default FormInputLabel
