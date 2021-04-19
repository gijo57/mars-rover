// Rover grid - obstacle marked with "X"
const grid = [
  ["R1", "", "", "", "", "X", "", "", "", ""],
  ["", "", "", "", "", "", "", "X", "", ""],
  ["", "", "X", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "X", "", "", "", ""],
  ["", "", "", "", "", "", "", "X", "", ""],
  ["", "", "X", "", "X", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "X", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
];

// Rover object goes here:
const rover1 = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [],
};

// ======================

function turnLeft(rover) {
  let direction = rover.direction;
  switch (direction) {
    case "N":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "N";
      break;
  }
}

function turnRight(rover) {
  let direction = rover.direction;
  switch (direction) {
    case "N":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "N";
      break;
  }
}

function moveForward(rover) {
  let direction = rover.direction;
  switch (direction) {
    case "N":
      rover.y--;
      break;
    case "S":
      rover.y++;
      break;
    case "W":
      rover.x--;
      break;
    case "E":
      rover.x++;
      break;
  }

  if (!isInsideGrid(rover)) {
    console.log("Stay inside the grid!");
    moveBackward(rover);
  } else if (locationHasObstacle(rover)) {
    console.log("Encountered an obstacle, can't move!");
    moveBackward(rover);
  }
}

function moveBackward(rover) {
  let direction = rover.direction;
  switch (direction) {
    case "N":
      rover.y++;
      break;
    case "S":
      rover.y--;
      break;
    case "W":
      rover.x++;
      break;
    case "E":
      rover.x--;
      break;
  }

  if (!isInsideGrid(rover)) {
    console.log("Stay inside the grid!");
    moveForward(rover);
  } else if (locationHasObstacle(rover)) {
    console.log("Encountered an obstacle, can't move!");
    moveForward(rover);
  }
}

function isInsideGrid(rover) {
  return rover.x >= 0 && rover.x <= 9 && rover.y >= 0 && rover.y <= 9;
}

function locationHasObstacle(rover) {
  return grid[rover.y][rover.x] === "X";
}

function moveRover(rover, commands) {
  let previousPosition;
  for (let i = 0; i < commands.length; i++) {
    previousPosition = { x: rover.x, y: rover.y };
    grid[rover.y][rover.x] = "";
    let command = commands[i];
    switch (command) {
      case "f":
        rover.travelLog.push(previousPosition);
        moveForward(rover);
        break;
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
      case "b":
        rover.travelLog.push(previousPosition);
        moveBackward(rover);
        break;
      default:
        console.log(`Invalid input: ${command}`);
        break;
    }
    grid[rover.y][rover.x] = "R";
    console.log(
      `Turn: ${i}\nCurrent direction: ${rover.direction}\nCurrent position: x=${rover.x} y=${rover.y}\nGrid:`
    );
    console.table(grid);
  }
  console.log("Travel log:");
  rover.travelLog.forEach((position) => console.log(position));
}

moveRover(rover1, "rffrfflfffff");
