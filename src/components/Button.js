import React from 'react';
import Button from '@material-ui/core/Button';

const styles = {
  button: {
    marginTop: 50
  }
}

const GenerateMemeButton = ({ onClick }) => {
  return (
    <Button style={styles.button} variant="contained" color="primary" onClick={onClick}>
      Generate Meme
</Button>
  )
}

export default GenerateMemeButton;