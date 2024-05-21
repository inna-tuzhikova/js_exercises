const AppStyle = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  countersContainer: {
    width: '50%',
    height: '50vh',
    display: 'flex',
    border: '1px solid #ccc',
    borderRadius: '10px',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflowY: 'auto'
  },

});

export default AppStyle;
