
# Conway's Game of Life



[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

  
## Screenshots

![App Screenshot](https://github.com/Alonso-Pablo/game-of-life/blob/main/preview/preview.png?raw=true)

  
## Notes
[About Conway's Game of Life in Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
#### 🧮 Create the initial array for the board:
```javascript
const createArray = (n = 10) => {
  const arrayOfArray = [];
  for (let i = 0;i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(0)
    };
    arrayOfArray.push(row)
  };
  return arrayOfArray;
};
```
#### Render Game: 
```Javascript
<Game rowsTotal={rowsTotal} columnsTotal={columnsTotal}>
    {
    actualFrame.map((row, indexRow) => (
        row.map((cellular, indexColumn) =>
        cellular === 0
        ? <Cellular cellular={cellular} onClick={() => handleClick(indexRow, indexColumn) } key={`row${indexRow}-column${indexColumn}`}></Cellular>
        : <Cellular cellular={cellular} onClick={() => handleClick(indexRow, indexColumn) } key={`row${indexRow}-column${indexColumn}`}></Cellular>
        )
    ))
    }
</Game>
//... Styled Components 💅
const Game = styled.div`
  box-sizing: border-box;
  display: grid;

  //...

  grid-template-rows: repeat(${({rowsTotal}) => rowsTotal || 10}, 1fr);
  grid-template-columns: repeat(${({columnsTotal}) => columnsTotal || 10}, 1fr);
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  // ...
  }
`;
```

#### 🔍 To create the next frame, each cell and its neighboring cells are analyzed:
⬜     | Left        | Center    | Right 
------ | ----------- | --------- | -------
Top    | n[y-1][x-1] | n[y-1][x] | n[y-1][x+1] 
Center | n[y][x-1]   |  n[y][x]  |  n[y][x+1] 
Bottom | n[y+1][x-1] | n[y+1][x] | n[y+1][x+1] 

#### 📍 Taking the cardinal points as a reference. If the neighboring cell of the Northwest (NW) is equal to 1, internally in the `CalculateCardinals ()` function and thus the same with N, NE, E, SE, S, SW and W.:
```javascript
    const CalculateCardinals = (array, row, column) => {

    // Corners
      if (row === 0 && column === 0) { // array[0][0]
        E = array[row][column + 1];
        SE = array[row + 1][column + 1];
        S = array[row + 1][column];
        let result = NW + N + NE + E + SE + S + SW + W;
        return result
      }
      if (row === 0 && column === limitMapX) { // array[0][limitMap.x]
        S = array[row + 1][column];
        SW = array[row + 1][column - 1];
        W = array[row][column - 1];
        let result = NW + N + NE + E + SE + S + SW + W;
        return result
      }
      if (row === limitMapY && column === limitMapX) { // array[limitMap.y]][limitMap.x]
        NW = array[row - 1][column - 1];
        N = array[row - 1][column];
        W = array[row][column - 1];
        let result = NW + N + NE + E + SE + S + SW + W;
        return result
      }
      if (row === limitMapY && column === 0) { // array[limitMap.y][0]
        N = array[row - 1][column];
        NE = array[row - 1][column + 1];
        E = array[row][column + 1];
        let result = NW + N + NE + E + SE + S + SW + W;
        return result
      }

      // Edges
      // Top
      if (row === 0) {
        E = array[row][column + 1];
        SE = array[row + 1][column + 1];
        S = array[row + 1][column];
        SW = array[row + 1][column - 1];
        W = array[row][column - 1];
        let result = NW + N + NE + E + SE + S + SW + W;
        return result
      }
      // Bottom
      if (row === limitMapY) {
        NW = array[row - 1][column - 1];
        N = array[row - 1][column];
        NE = array[row - 1][column + 1];
        E = array[row][column + 1];
        W = array[row][column - 1];
        let result = NW + N + NE + E + SE + S + SW + W;
        return result
      }
      // left
      if (column === 0) {
        N = array[row - 1][column]
        NE = array[row - 1][column + 1]
        E = array[row][column + 1]
        SE = array[row + 1][column + 1]
        S = array[row + 1][column]
        let result = NW + N + NE + E + SE + S + SW + W;
        return result
      }
      // right
      if (column === limitMapX) {
        NW = array[row - 1][column - 1]
        N = array[row - 1][column]
        S = array[row + 1][column]
        SW = array[row + 1][column - 1]
        W = array[row][column - 1]
        let result = NW + N + NE + E + SE + S + SW + W;
        return result
      } else { // Inside
        NW = array[row - 1][column - 1]
        N = array[row - 1][column]
        NE = array[row - 1][column + 1]
        E = array[row][column + 1]
        SE = array[row + 1][column + 1]
        S = array[row + 1][column]
        SW = array[row + 1][column - 1]
        W = array[row][column - 1]
        let result = NW + N + NE + E + SE + S + SW + W;
        return result
      }
    } // CalculateCardinals()
```
