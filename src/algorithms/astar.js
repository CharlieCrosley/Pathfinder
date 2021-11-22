// Performs A* algorithm. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function astar(grid, startNode, finishNode) {

  const visitedNodesInOrder = [];
  const openSet = [];
  startNode.g = 0;
  startNode.f = 0;
  openSet.push(startNode);

  while (!!openSet.length) {
    // This operation can occur in O(1) time if openSet is a min-heap or a priority queue
    sortNodesByFScore(openSet);
    const current = openSet.shift();
    
    // If we encounter a wall, we skip it.
    if (current.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (current.g === Infinity) return visitedNodesInOrder;
    if (current === finishNode) return visitedNodesInOrder;

    visitedNodesInOrder.push(current);

    const unvisitedNeighbors = getUnvisitedNeighbors(current, grid);
    for (const neighbor of unvisitedNeighbors) {
        // tentative_gScore is the distance from start to the neighbor through current
        const tentative_gScore = current.g + 1;
        const tentative_fScore = tentative_gScore + Heuristic(neighbor, finishNode);
        if (tentative_gScore <= neighbor.g) {
            // This path to neighbor is better than any previous one. Record it!
            if (neighbor.g === Infinity) openSet.push(neighbor); // Unvisited node

            neighbor.previousNode = current;
            neighbor.g = tentative_gScore;
            neighbor.f = tentative_fScore;
        }   
      }
    }
  }

  function Heuristic(neighbor, finishNode) {
    /* Manhattan Distance since we are only allowed to move in 4 directions */
    return Math.abs(neighbor.row - finishNode.row) + Math.abs(neighbor.col - finishNode.col);
  }
  
  function sortNodesByFScore(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
  