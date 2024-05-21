const AddBoxStyle = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    margin: '10px',
  },
  btn: {
    margin: theme.spacing(1),
    color: 'teal',
    '&:hover': {color: 'teal',}
  },
});

export default AddBoxStyle;
