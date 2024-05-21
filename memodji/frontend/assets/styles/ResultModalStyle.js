const ResultsModalStyle = ({
	modal: {
    display: 'inline-block',
    position: 'absolute',

    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '350px',

    borderRadius: '9px',
    outline: 'none',

    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#434344',
  },
  modal__header: {
    margin: '30px 0px 0px',
    fontSize: '48px',
    fontWeight: 'bold',
  },
  modal__btn: {
    margin: '40px 0px 30px',
    fontSize: '20px',
    height: '40px',
    padding: '10px 30px',
    color: '#fff',
    background: 'linear-gradient(to right, #19668d, #22ab93)',
    outline: 'none',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '7px',
    boxShadow: '1px 1px 1px #999',
    '&:active': {
        boxShadow: 'inset 2px 1px 8px #555',
    },
  }
});

export default ResultsModalStyle;
