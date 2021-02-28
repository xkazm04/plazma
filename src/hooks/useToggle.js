
// eslint-disable-next-line
import React, { useState } from 'react';


function useToggle(initialVal = false){
    // call useState, reserver peace of state
    const [state,setState] = useState(initialVal);
    // toggle function
    const toggle = () =>{
        setState(!state);
    };
    return[state, toggle]
}

export default useToggle;