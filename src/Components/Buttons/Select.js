import React from 'react'
import styled from 'styled-components'
import Select from '@material-ui/core/Select';


const StyledSelect = styled(Select)` 

`

const ToggleButton = ({ options}) => {
return  <StyledSelect >{options}</StyledSelect>;
};

export default ToggleButton
