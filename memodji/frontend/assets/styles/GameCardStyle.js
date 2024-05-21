const GameCardStyle = ({
  card: {
    width: '130px',
    height: '130px',
    margin: '12.5px',
    perspective: '600px',
    userSelect: 'none',
  },
  card_flipContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform .8s',
    transformStyle: 'preserve-3d',
  },
  card_flipContainer__face: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    backfaceVisibility: 'hidden',

    border: '5px solid #fff',
    borderRadius: '9px',
    boxShadow: '1px 1px 5px rgba(0,0,0,.5)',
  },
  front: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '75px',
    transform: 'rotateY(180deg)',
  },
  back: {
    background: 'linear-gradient(to top right, #22ab93, #19668d)',
  },
  flipped: {
    transform: 'rotateY(180deg)',
  },
  mismatch: {
    backgroundColor: '#f44336',
    border: '5px solid #f44336',
  },
  match: {
    backgroundColor: '#5ad66f',
    border: '5px solid #5ad66f',
  }

});

export default GameCardStyle;
