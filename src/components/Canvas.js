// packages
import React, { Component } from 'react';
// material UI components
import { withStyles } from '@material-ui/core/styles';
// misc
import BaseStyle from '../assets/BaseStyle.js';

// Change ExampleComponent to match the name of your component
class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      animations: [],
      shapes: []
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateAnimations = this.updateAnimations.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.drawRectangle = this.drawRectangle.bind(this);
  }

  componentDidMount() {
    if (this.props.width) {
      this.setState({
        width: this.props.width,
        height: this.props.height
      })
    } else {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }
    // set animations to run at 120 fps or 8.33ms
    this.timer = setInterval(this.updateAnimations, 8.33);
    // pull shapes and animations from props
    this.setState({
      shapes: this.props.shapes,
      animations: this.props.animations
    })
    // paint the shapes to the canvas
    this.updateCanvas();
    // run the animations one frame to fix initial shape dimensions to animation rules
    this.updateAnimations();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    clearInterval(this.timer);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  updateAnimations() {
    const { animations, shapes } = this.state;
    var tempShapes = [].concat(shapes);

    for (let i = 0; i < animations.length; i++) {
      if (animations[i].type === 'move') {
        for (let x = 0; x < tempShapes.length; x++) {
          if (tempShapes[i].id === animations[i].id) {
            if (tempShapes[i][animations[i].dimension] < animations[i].startValue || tempShapes[i][animations[i].dimension] > animations[i].endValue) {
              tempShapes[i][animations[i].dimension] = animations[i].startValue;
            } else {
              tempShapes[i][animations[i].dimension] = tempShapes[i][animations[i].dimension] + animations[i].rate;
            }
            this.setState({
              shapes: tempShapes
            });
            break
          }
        }
      } else if (animations[i].type === 'scale') {
        for (let x = 0; x < tempShapes.length; x++) {
          if (tempShapes[i].id === animations[i].id) {
            if (tempShapes[i][animations[i].dimension] < animations[i].startValue || tempShapes[i][animations[i].dimension] > animations[i].endValue) {
              tempShapes[i][animations[i].dimension] = animations[i].startValue;
            } else {
              tempShapes[i][animations[i].dimension] = tempShapes[i][animations[i].dimension] + animations[i].rate;
            }
            this.setState({
              shapes: tempShapes
            });
            break
          }
        }
      } else {
        console.log(`Unknown type ${animations[i].type}. Please use a supported shape type such as move or scale.`);
      }
    }
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    // clear canvas for next paint
    ctx.clearRect(0, 0, this.state.width, this.state.height);
    // draw children “components”
    for (let i = 0; i < this.state.shapes.length; i++) {
      if (this.state.shapes[i].type === 'rectangle') {
        this.drawRectangle({ ctx, ...this.state.shapes[i] });
      } else if (this.state.shapes[i].type === 'circle') {
        this.drawCircle({ ctx, ...this.state.shapes[i] });
      } else {
        console.log(`Unknown type ${this.state.shapes[i].type}. Please use a supported shape type such as rectangle or circle.`);
      }
    }
  }

  drawRectangle(props) {
    const { ctx, x, y, width, height, fillBool } = props;
    if (fillBool) {
      ctx.fillRect(x, y, width, height);
    } else {
      ctx.strokeRect(x, y, width, height);
    }
  }

  drawCircle(props) {
    const { ctx, x, y, r, sinAngle, eAngle, fillBool } = props;
    ctx.beginPath();
    ctx.arc(x, y, r, sinAngle * Math.PI, eAngle * Math.PI);
    if (fillBool) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <canvas ref="canvas" width={this.state.width} height={this.state.height} />
        <div className={classes.text}>{this.state.animationWidth}</div>
      </div>
    );
  }
}

const styles = {
  ...BaseStyle,
  text: {
    fontSize: 100
  }
};

// dont forget to change it down here and remove these comments
export default withStyles(styles)(Canvas);

