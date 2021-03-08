import React from 'react'
import styled from 'styled-components'

const StyledSelect = styled.select` 
    margin: 1.5rem;
    font-size: ${props => props.theme.fonts.p};
    outline: none;
    background-color: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.text};
    position: relative;
    padding: .5rem;
    font-weight: bold;
    font-size: 0.8rem;
    text-align: center;
    border: 1px solid palevioletred;
    border-radius: .5em;
    cursor: pointer;
    outline: none;
    width: 100%;
    animation: 2s ease-in;
    transition-duration: 0.4s;
    &:hover{
        color: #360000;
        background-color: ${props => props.theme.colors.main};
    }
    option {
    color: black;
    background: inherit;
    display: flex;
    color: inherit;
    padding: 0.5rem
  }
`

// přes Children to udělat

const Select = ({value, option}) => {
return  <StyledSelect>
        <option value="1">Audi</option>
        <option value="2">BMW</option>
        <option value="3">Citroen</option>
        <option value="4">Ford</option>
</StyledSelect>;
};

export default Select
