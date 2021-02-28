
import { useState } from 'react';



export default initialVal =>{
    // Hook to set state and method
    const  [value, setValue] = useState(initialVal);
    // Handle input change
    const handleChange = (e) => {setValue(e.target.value);};
    // Reset value in form
    const reset = () => {
        setValue ("");
    };

    return [value, handleChange, reset];
};









