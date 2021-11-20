import React, {Component} from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {astar} from '../algorithms/astar';

import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 65;
const GRID_ROWS = 37;
const GRID_COLS = 80;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      wallToggle: false,
      selectedAlgorithm: "Dijkstra",
      startPlaced: true,
      finishPlaced: true,
      movingStart: false,
      movingFinish: false,
    };
    this.pathInProgress = false;
    this.pathFound = false;
    this.clearGrid = false;
    this.cancelPathAnimation = false;
    this.cancelShortestPathAnimation = false;

    this.movingStart = false;
    this.movingFinish = false;
    this.startPos = [START_NODE_ROW, START_NODE_COL]; // Storing in state kills performance :(
    this.finishPos = [FINISH_NODE_ROW, FINISH_NODE_COL]
  }

  componentDidMount() {
    const grid = getInitialGrid(this.startPos, this.finishPos);
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const moveStart = true ? this.state.grid[row][col].isStart : false;
    const moveFinish = true ? this.state.grid[row][col].isFinish : false;
    if (moveStart) {
      this.startPos = [row, col];
      this.setState({mouseIsPressed: true, movingStart: true});
    }
    else if (moveFinish) {
      this.finishPos = [row, col];
      this.setState({mouseIsPressed: true, movingFinish: true});
    }
    else {
      const wallToggle = true ? this.state.grid[row][col].isWall : false; // Place or erase wall (false = place)
      AddWall(this.state.grid, row, col, wallToggle);
      this.setState({mouseIsPressed: true, wallToggle:wallToggle});
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;

    if (this.state.movingStart) {
      if (!this.state.grid[row][col].isStart) {
        if (!this.clearGrid) this.ClearPreviousVisualization();

        /* if (this.pathFound){
          setTimeout(() => {
            const startNode = this.state.grid[this.startPos[0]][this.startPos[1]];
            const finishNode = this.state.grid[this.finishPos[0]][this.finishPos[1]];
            const visitedNodesInOrder = dijkstra(this.state.grid, startNode, finishNode);
            this.previousNodesInOrder = visitedNodesInOrder;
            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            this.instantAnimateShortestPath(nodesInShortestPathOrder);
          }, 100);
          
        } */
        
        
        const {grid} = this.state;
        grid[row][col].isStart = true;
        grid[this.startPos[0]][this.startPos[1]].isStart = false;
        document.getElementById(`node-${row}-${col}`).className = 'node node-start';
        document.getElementById(`node-${this.startPos[0]}-${this.startPos[1]}`).className = 'node';
        this.startPos = [row, col];
      }
    }
    else if (this.state.movingFinish) {
      if (!this.state.grid[row][col].isFinish) {
        if (!this.clearGrid) this.ClearPreviousVisualization();
  
        const {grid} = this.state;
        grid[row][col].isFinish = true;
        grid[this.finishPos[0]][this.finishPos[1]].isFinish = false;

        document.getElementById(`node-${row}-${col}`).className = 'node node-finish';
        document.getElementById(`node-${this.finishPos[0]}-${this.finishPos[1]}`).className = 'node';
        this.finishPos = [row, col];
      }
    }
    else {
      AddWall(this.state.grid, row, col, this.state.wallToggle);
    }
  }

  handleMouseUp() {
    const {grid} = this.state;
    this.setState({grid, mouseIsPressed: false, movingStart: false, movingFinish: false}); // Set state only on mouse release to reduce lag
  }

  animateSearch(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (this.cancelPathAnimation) {
        this.clearGrid = false;
        this.pathInProgress = false;
        this.cancelPathAnimation = false;
        this.cancelShortestPathAnimation = true;
        while (this.timeoutPath) {
          clearTimeout(this.timeoutPath); // cancels all timeouts/animations, will do nothing if no timeout with id is present
          this.timeoutPath--;
        }
        this.visualizeAlgorithm();
        return;
      }
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
          this.clearGrid = false;
          this.pathInProgress = false;
        }, 3 * i);
        return;
      }
      const node = visitedNodesInOrder[i];
      if (!node.isStart && !node.isFinish){
        this.timeoutPath = setTimeout(() => {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
        }, 3 * i);
      }
    } 
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      if (this.cancelShortestPathAnimation) {
        while (this.timeoutShortestPath) {
          clearTimeout(this.timeoutShortestPath); // will do nothing if no timeout with id is present
          this.timeoutShortestPath--;
        }
        this.cancelShortestPathAnimation = false;
        return;
      }
      this.timeoutShortestPath = setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!node.isStart && !node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
        }
      }, 30 * i);
    }
  }

  instantAnimateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const node = nodesInShortestPathOrder[i];
      if (!node.isStart && !node.isFinish) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-shortest-path-instant';
      }
      
    }
  }

  visualizeAlgorithm() {
    const {grid} = this.state;
    if (this.pathInProgress) { // already calculating a path
      this.cancelPathAnimation = true;
    } 
    if (!this.clearGrid) {
      this.ClearPreviousVisualization();
    }
    this.pathInProgress = true;
    const startNode = grid[this.startPos[0]][this.startPos[1]];
    const finishNode = grid[this.finishPos[0]][this.finishPos[1]];

    var visitedNodesInOrder = [];
    if (this.state.selectedAlgorithm === "Dijkstra") visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    else if (this.state.selectedAlgorithm === "A*") visitedNodesInOrder = astar(grid, startNode, finishNode);

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateSearch(visitedNodesInOrder, nodesInShortestPathOrder);
    this.pathFound = true;
  }

  ClearPreviousVisualization() {
    // Keeps walls in clear
    const {grid} = this.state;
    for(const row of grid) {
      for(const node of row) {
        if (node.isStart) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start';
        } 
        else if (node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish';
          node.distance = Infinity;
          node.previousNode = null;
          node.isVisited = false;
        } 
        else if (!node.isWall) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
          node.isVisited = false;
          node.distance = Infinity;
          node.previousNode = null;
        } 
        else {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-wall';
        }
      }
    }
  }

  ClearGrid() {
    var {grid} = this.state;
    for(const row of grid) {
      for(const node of row) {
        if (node.isStart) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start';
        } 
        else if (node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish';
        } 
        else {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
        }
      }
    }
    grid = getInitialGrid(this.startPos, this.finishPos);
    this.pathInProgress = false;
    this.clearGrid = true;
    this.pathFound = false;
    this.setState({grid});
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <h1 id="title">Pathfinder</h1>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title={this.state.selectedAlgorithm} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => this.setState({selectedAlgorithm:"Dijkstra"})}>Dijkstras</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.setState({selectedAlgorithm:"A*"})}>A*</NavDropdown.Item>
                </NavDropdown>
                <button className="Navbar-button" onMouseDown={() => this.visualizeAlgorithm()}>Visualize</button>
                <button className="Navbar-button" onMouseDown={() => this.ClearGrid()}>Clear Grid</button>
                <button className="Navbar-button" onMouseDown={() => this.PlaceStart()}>Place Start</button>
                <button className="Navbar-button" onMouseDown={() => this.PlaceFinish()}>Place Finish</button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div className="grid-row" key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall, isVisited} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isVisited={isVisited}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = (startPos, finishPos) => {
  console.log(startPos);
  const grid = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < GRID_COLS; col++) {
      currentRow.push(createNode(col, row, startPos, finishPos));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row, startPos, finishPos) => {
  return {
    col,
    row,
    isStart: row === startPos[0] && col === startPos[1],
    isFinish: row === finishPos[0] && col === finishPos[1],
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const AddWall = (grid, row, col, wallToggle) => {
  if (!wallToggle) {
    document.getElementById(`node-${row}-${col}`).className = 'node node-wall';
  } else {
    document.getElementById(`node-${row}-${col}`).className = 'node';
  }
  grid[row][col].isWall = !wallToggle;  
};