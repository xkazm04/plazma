import React from 'react'
import styled from 'styled-components'


const StyledButton = styled.button` 
    font-size: ${props => props.theme.fonts.p};
    outline: none;
    background-color: inherit;
    position: relative;
    padding: .5rem;
    font-weight: bold;
    font-size: 0.8rem;
    text-align: center;
    border: none;
    border-left: 1px solid ${props => props.theme.colors.borderColor};
    border-bottom: 1px solid ${props => props.theme.colors.borderColor};
    width: ${props => props.width || '15rem'};
    color: ${props => props.theme.colors.text};
`



const DataButton = ({ onClick, width, label}) => {
return  <StyledButton 
            onClick={onClick}
            width={width}
            >{label}</StyledButton>;
};

export default DataButton
