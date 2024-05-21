const ClickBoxStyle = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    margin: '10px',
  },
  header: {
    color: '#aaa',
  },
  btn: {
    margin: theme.spacing(1),
    backgroundColor: 'teal',
    '&:hover': { backgroundColor: 'teal',}
  },
});

export default ClickBoxStyle;
