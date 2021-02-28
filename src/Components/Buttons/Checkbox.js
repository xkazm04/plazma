import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components'

const StyledCheckbox = styled(Checkbox)` 
    color: ${props => props.theme.colors.main};
    border: solid 1px ${props => props.theme.colors.borderColor}; 
    border-radius: 0px;
    padding: 0;
     &:hover{
        background-color: ${props => props.theme.colors.borderColor};;
     }
`

const MyCheckbox = ({ checked, onChange}) => {
return  <StyledCheckbox checked={checked} onChange={onChange}/>
};

export default MyCheckbox
