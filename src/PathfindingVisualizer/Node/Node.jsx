import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {

  constructor() {
    super();
    this.state = {
      col:0,
      isFinish:false,
      isStart:false,
      isWall:false,
      isVisited:false,
      onMouseDown:null,
      onMouseEnter:null,
      onMouseUp:null,
      row:0,
    };
  }


  changeVisitedState = () => {
    const {isVisited} = this.state;
    this.setState({isVisited: !isVisited});
  }

  changeWallState = () => {
    console.log(true);
    const {isWall} = this.state;
    this.setState({isWall: !isWall});
  }

  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      isVisited,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;

    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : isVisited
      ? 'node-visited'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}
