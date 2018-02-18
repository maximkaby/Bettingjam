import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Match from './Match';


function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 0 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = () => ({
  root: {
    backgroundColor: '#e8e6e6',
    width: '100%',
  },
  contentHeight: {
    height: '415px',
    background: '#e8e6e6',
  },
  label: {
    fontSize: '18px!important',
    fontFamily: 'Calibri',
    color: 'rgb(47, 47, 47)',
    textTransform: 'none'
  },
  tab: {
    backgroundColor: '#e8e6e6'
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    console.log(this.props.matches, 'qwe');
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" classes={{ root: classes.root }}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="#e50f0f"
            textColor="secondary"
            fullWidth
          >
            <Tab classes={{ label: classes.label }} label="UEFA Champions League" />
            <Tab classes={{ label: classes.label }} label="Premier League" />
            <Tab classes={{ label: classes.label }} label="Championship" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          className={classes.contentHeight}
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            { this.props.matches.map((value) => {
              return <Match {...value} />;
            }) }
          </TabContainer>
          <TabContainer dir={theme.direction}>
           Primier
          </TabContainer>
          <TabContainer dir={theme.direction}>
            Championship
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.defaultProps = {
  matches: []
};

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    matches: state.UEFA,
  };
}

const UEFATab = withStyles(styles, { withTheme: true })(FullWidthTabs);

export default connect(mapStateToProps)(UEFATab);