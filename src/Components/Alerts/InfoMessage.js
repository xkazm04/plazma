import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.div` 
    margin-top: 20px;
    display: flex;
    padding: 0.5rem 0.5rem;
    font-family: Inter;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    outline: none;
    color: #008EDE;
    background: linear-gradient(0deg, rgba(0, 133, 255, 0.05), rgba(0, 133, 255, 0.05)), #FFFFFF;
    border-radius: 4px;
    border-left:  3px solid #008EDE;
    width: 75%;
    @media screen and (max-width: 700px) {
     font-size: 0.8rem;
     padding: 0.5rem 1.5rem;
  }
`
const MessageTitle = styled.div`
  margin-left: 3%;
  color: #0078E8;

`

const InfoIcona = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842854 10.1217 0 8 0ZM8.02839 13.1909C7.13477 13.6228 5.75313 13.2512 5.99423 12.3514L7.29744 7.48782C7.7533 5.78645 6.49958 6.34431 5.93802 6.59077C6.28146 6.07449 6.7569 5.65962 7.31493 5.38928C8.20855 4.95738 9.59019 5.32893 9.34913 6.22871L8.04592 11.0923C7.59002 12.7937 8.84375 12.2358 9.4053 11.9894C9.06188 12.5057 8.58644 12.9205 8.02839 13.1909ZM10.0353 3.66937C9.99292 3.82752 9.9046 3.96955 9.7815 4.0775C9.65841 4.18546 9.50607 4.25449 9.34374 4.27586C9.18142 4.29723 9.0164 4.26999 8.86955 4.19758C8.72271 4.12517 8.60064 4.01084 8.51877 3.86905C8.43691 3.72726 8.39892 3.56438 8.40963 3.401C8.42034 3.23762 8.47925 3.08109 8.57891 2.9512C8.67858 2.8213 8.81453 2.72388 8.96957 2.67125C9.1246 2.61862 9.29177 2.61314 9.44991 2.65551C9.66198 2.71234 9.84279 2.85108 9.95256 3.04121C10.0623 3.23135 10.0921 3.4573 10.0353 3.66937Z" fill="#008EDE"/>
</svg>



const InfoMessage = ({message}) => {
return  <StyledTitle>{InfoIcona}<MessageTitle>{message}</MessageTitle></StyledTitle>;
};

export default InfoMessage
