import React, { useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import ImageLoaderStyle from './../assets/styles/ImageLoaderStyle';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const IDLE = 0;
const LOADING = 1;
const LOADED = 2;

const ImageLoader = ({classes}) => {
  const imgInput = useRef(null);
  const [imgUrl, setImgUrl] = useState('');
  const [state, setState] = useState(IDLE);

  const handleInputChange = e => {
    const file = e.target.files[0];
    setState(LOADING);
    setTimeout(() => {
      setImgUrl(URL.createObjectURL(file));
      setState(LOADED);
    }, 2000);
  };
  return (
    <Container maxWidth='md'>
      <Grid
        container
        className={classes.root}
        alignItems='center'>
        <Grid
          item
          className={classes.imageBox}>
            {state == LOADED && <img src={imgUrl} className={classes.img}/>}
            {state == LOADING && <h2>Loading...</h2>}
            <input
              className={classes.hidden}
              type='file'
              accept='image/*'
              onChange={handleInputChange}
              ref={imgInput} />
            <Button
              variant='outlined'
              onClick={() => imgInput.current.click()}>
                Load Image
            </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withStyles(ImageLoaderStyle)(ImageLoader);
