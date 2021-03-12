import React from 'react'
import styled from 'styled-components'



const StyledCheckbox = styled.input` 
    position:'relative';
    width: 20px;
    height: 20px;
    border: 1px solid #C9CCD4;
    border: solid 1px ${props => props.theme.colors.borderColor}; 
    cursor: pointer;
     &:hover{
        background-color: ${props => props.theme.colors.borderColor};
     }
     &:active{
        background-color: red;
     }
     &:focus{
        background-color:  green;
        color: green;
     }
`
const StyledLabel = styled.label`

`


const Checkbox = ({checked, onChange, children}) => {
return  <StyledLabel><StyledCheckbox type="checkbox" checked={checked} onChange={onChange} />{children}</StyledLabel>

  
};

export default Checkbox
