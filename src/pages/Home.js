// packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
// material UI components
import { withStyles } from '@material-ui/core/styles';
// components
import Canvas from '../components/Canvas';
// misc
import BaseStyle from '../assets/BaseStyle.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animations: [
        {
          id: 'circle1',
          type: 'move',
          dimension: 'x',
          loop: true,
          startValue: 100,
          endValue: 1000,
          rate: 0.4
        },
        {
          id: 'rectangle1',
          type: 'scale',
          dimension: 'width',
          loop: true,
          startValue: 10,
          endValue: 920,
          rate: 0.6
        }
      ],
      shapes: [
        {
          type: 'circle',
          x: 400,
          y: 250,
          r: 50,
          sinAngle: 0,
          eAngle: 2,
          fillBool: true,
          id: 'circle1'
        },
        {
          type: 'rectangle',
          x: 0,
          y: 0,
          width: 50,
          height: 500,
          fillBool: false,
          id: 'rectangle1'
        }
      ]
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <Canvas className={classes.canvas} shapes={this.state.shapes} animations={this.state.animations} />
      </div>
    );
  }
}

const styles = {
  ...BaseStyle,
  canvas: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
};

function mapStateToProps(state) {
  return {
    // for when customer redux is added
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // for when login redux is added
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
