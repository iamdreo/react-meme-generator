import React from 'react';
import TextField from '@material-ui/core/TextField';

const styles = {
	input : {
		marginTop: 50
	}
}

const TextInput = ({onChange, value, name}) => {
  return (
    <div>
    <TextField style={styles.input} id={name} label={name} placeholder={name} variant="outlined" onChange={onChange} value={value} name={name}/>
    
    </div>
  )
}

export default TextInput;