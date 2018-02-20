import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    '&:hover': {
      background: 'red'
    },
    margin: theme.spacing.unit,
    background: '#e50f0f',
    color: '#fff',
    fontFamily: 'Calibri',
    fontSize: '18px',
    width: '130px'
  },
  input: {
    display: 'none',
  },
});

function RaisedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button onClick={props.submit} variant="raised" className={classes.button}>
        Start
      </Button>
    </div>
  );
}

RaisedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RaisedButtons);