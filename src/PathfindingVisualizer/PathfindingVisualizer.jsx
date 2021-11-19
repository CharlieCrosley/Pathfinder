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
    };
    this.pathInProgress = false;
    this.clearGrid = false;
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const wallToggle = true ? this.state.grid[row][col].isWall : false; // Place or erase wall (false = place)
    AddWall(this.state.grid, row, col, wallToggle);
    this.setState({mouseIsPressed: true, wallToggle:wallToggle});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    AddWall(this.state.grid, row, col, this.state.wallToggle);
  }

  handleMouseUp() {
    const {grid} = this.state;
    this.setState({grid, mouseIsPressed: false}); // Set state only on mouse release to reduce lag
  }

  animateSearch(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        this.timeoutPath =setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 5 * i);
        this.clearGrid = false;
        this.pathInProgress = false;
        return;
      }
      const node = visitedNodesInOrder[i];
      if (!node.isStart && !node.isFinish){
        this.timeout = setTimeout(() => {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
        }, 3 * i);
      }
      
    } 
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 30 * i);
    }
  }

  /* visualizeDijkstra() {
    const {grid, pathInProgress, clearGrid} = this.state;
    if (this.pathInProgress) { // already calculating a path
      return;
    } 
    if (!this.clearGrid) {
      this.ClearPreviousVisualization();
    }
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateSearch(visitedNodesInOrder, nodesInShortestPathOrder);
  } */

  visualizeAlgorithm(algorithm) {
    const {grid, pathInProgress, clearGrid} = this.state;
    if (this.pathInProgress) { // already calculating a path
      return;
    } 
    if (!this.clearGrid) {
      this.ClearPreviousVisualization();
    }
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    var visitedNodesInOrder = [];
    if (this.state.selectedAlgorithm === "Dijkstra") visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    else if (this.state.selectedAlgorithm === "A*") visitedNodesInOrder = astar(grid, startNode, finishNode);

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateSearch(visitedNodesInOrder, nodesInShortestPathOrder);
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
    grid = getInitialGrid();
    this.pathInProgress = false;
    this.clearGrid = true;
    this.setState({grid});
  }

  foo() {

  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            {/* <Navbar.Brand>Pathfinder</Navbar.Brand> */}
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

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < GRID_COLS; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
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