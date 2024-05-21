import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AddBoxStyle from './../assets/styles/AddBoxStyle';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const AddBox = ({classes, onAdd}) => {
  const btnText = 'Add';
  const handleClick = () => {
    onAdd();
  };
  return (
    <div
      className={classes.root}>
        <IconButton
          className={classes.btn}
          onClick={handleClick}>
          <AddIcon />
        </IconButton>
    </div>
  );
}

export default withStyles(AddBoxStyle)(AddBox);
