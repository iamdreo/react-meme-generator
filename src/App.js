import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GenerateMemeButton from './components/Button';
import TextInput from './components/TextInput';
import UploadButton from './components/UploadButton';
import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      marginTop: 50,
      width: '80vw',
      height: '80vh',

    },
  },
}));

/**
 * Holds entire app state, this is the first step to buiding a meme application,
 * ideally app should have some form of validation for input field and generate button 
 *
 */

function App() {
  const [image, setImage] = useState("")
  const [text, setText] = useState({
    text1: '',
    text2: ''
  })
  const canvas = useRef(null)
  const classes = useStyles();

  const onUploadClick = (e) => {

    setImage(URL.createObjectURL(e.target.files[0]))
  }


  /**
   * once image updates, it updates the canvas
   */
  useEffect(() => {
    myCanvas()
  }, [image])

  /**
   * once text updates, it updates the canvas
   */
  useEffect(() => {
    drawTopText()
  }, [text])
  const myCanvas = () => {

    var ctx = canvas.current.getContext("2d");

    var img = document.getElementById("meme-image");
    img.onload = function () {
      ctx.drawImage(img, 0, 0, 250, 350);
    }
  }

  //sets state any time input field updates
  const onChangeText = (e) => {
    const { name, value } = e.target
    setText({ ...text, [name]: value })

  }
  //draws text on canvas

  const drawTopText = () => {
    var ctx = canvas.current.getContext("2d");
    var img = document.getElementById("meme-image");


    ctx.font = "30px Impact";
    ctx.fillStyle = "#ffffff"


    ctx.drawImage(img, 0, 0, 250, 350);
    ctx.fillText(text.text1, 30, 30);
    ctx.fillText(text.text2, 30, 340)
  }

  //generates meme when user clicks the button

  const generateMeme = () => {
    var downloadLink = document.querySelector('a')
    var dataurl = canvas.current.toDataURL();
    downloadLink.href = dataurl
    downloadLink.download = "meme.png"

    downloadLink.click()


  }



  return (
    <div className="App">
      <header className="App-header">
        <h4>Meme Generator</h4>
      </header>
      <div className={classes.root}>
        <Paper elevation={3}>
          <div className="container-grid">

            <div >

              <img id="meme-image" src={image} alt="meme" style={{ display: 'none' }} />
              <a>
                <canvas ref={canvas} width='250' height='350'
                  style={{ border: '1px solid #d3d3d3', marginTop: '20%', marginLeft: '5%' }}>
                  Your browser does not support the HTML5 canvas tag.</canvas>
              </a>
            </div>
            <div>
              <UploadButton onChange={onUploadClick} />

              <TextInput name="text1" onChange={onChangeText} value={text.text1} />
              <TextInput name="text2" onChange={onChangeText} value={text.text2} />
              <GenerateMemeButton onClick={generateMeme} />



            </div>
          </div>

        </Paper>
      </div>
    </div>
  );
}

export default App;
