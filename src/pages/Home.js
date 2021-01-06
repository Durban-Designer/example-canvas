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
      data: [],
      animations: [],
      shapes: []
    }
    this.updateAnimations = this.updateAnimations.bind(this);
  }

  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:3001');
    this.ws.onmessage = (event) => {
      var tempShapes = [].concat(this.state.shapes);
      var tempData = [].concat(this.state.data);
      var eventData = JSON.parse(event.data);
      tempShapes.push({
        type: 'rectangle',
        x: ((tempShapes.length * 50) + 5) + 50,
        y: 500 - eventData.price,
        width: 50,
        height: eventData.price,
        fillBool: true,
        id: `rectangle${eventData.index}`
      });
      if (tempShapes.length === 21) {
        tempShapes.shift();
        tempShapes = this.updateAnimations(tempShapes);
      }
      tempData.push(eventData);
      this.setState({
        data: tempData,
        shapes: tempShapes
      });
      this.refs.canvasReact.updateFromProps();
    };
  }

  updateAnimations(tempShapes) {
    for (let i = 0; i < tempShapes.length; i++) {
      tempShapes[i] = {
        type: tempShapes[i].type,
        x: tempShapes[i].x - 50,
        y: tempShapes[i].y,
        width: tempShapes[i].width,
        height: tempShapes[i].height,
        fillBool: tempShapes[i].fillBool,
        id: tempShapes[i].id
      };
    }
    return tempShapes;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <Canvas ref="canvasReact" className={classes.canvas} shapes={this.state.shapes} animations={this.state.animations} />
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
