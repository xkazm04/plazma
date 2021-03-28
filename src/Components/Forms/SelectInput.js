
import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'

  // react-select styling
  const customSelectStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '2px dotted green',
      color: state.isSelected ? 'yellow' : 'black',
      backgroundColor: state.isSelected ? 'green' : 'white'
    }),
    control: (provided) => ({
      ...provided,
      marginTop: "5%",
    })
  }


const SelectContainer = styled.div`
margin-top: 7%;
`
const SelectInput = ({ onChange, options,noOptionsMessage, placeholder}) => {
  return <>
      <SelectContainer>
            <Select
              styles ={customSelectStyles}
              onChange={onChange}
              options={options}
              placeholder={placeholder}
              noOptionsMessage={noOptionsMessage}
            /> </SelectContainer>

  </>
}

export default SelectInput