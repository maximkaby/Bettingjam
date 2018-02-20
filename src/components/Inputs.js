import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '300px'
  },
  input: {
    '&:after': {
      backgroundColor: 'red'
    },
    margin: theme.spacing.unit,
    fontFamily: 'Calibri',
    fontSize: '18px',
    width: '100%'
  },
});

function Inputs(props) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <Input
        onChange={props.onChange}
        value={props.value}
        type="Email"
        placeholder="Email"
        className={classes.input}
        inputProps={{
          'aria-label': 'Description',
        }}
      />
    </div>
  );
}

Inputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inputs);