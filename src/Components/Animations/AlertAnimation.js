import React from 'react'
import {motion} from 'framer-motion';



const AlertAnimation = ({ children}) => {
return  <motion.div initial={{ y: -250}} animate={{ y: -10 }} transition={{ delay: 0, type: 'spring', stiffness: 200 }} > {children} </motion.div>;
};

export default AlertAnimation
