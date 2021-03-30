import React from 'react'
import styled from 'styled-components'

const FormContainer = styled.div`
    padding: 10px;
    background: white;
    position: relative;
    text-align: center;
    border: none;
    width: 50%;
    border-radius: 25px;
    margin-left: 5%;
    box-shadow: 12px 16px 40px rgba(0, 72, 102, 0.05);
    @media screen and (max-width: 1000px) {
     width: 100%;
     }
     @media screen and (max-width: 1500px) {
     width: 80%;
     }
`

const Box = ({ children}) => {
    return  <FormContainer
                >{children}</FormContainer>;
    };
    
    export default Box