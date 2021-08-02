
# Conway's Game of Life



[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

  
## Screenshots

![App Screenshot](https://github.com/Alonso-Pablo/game-of-life/blob/main/preview/preview.png?raw=true)

  
## Notes
About [Conway's Game of Life in Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
---
#### 🧮 Create the initial array for the board:
```javascript
// Now:
const createArray = (n) => {
 return Array(n).fill(0).map(()=> Array(n).fill(0));
};

// Before:
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
#### InitialFrame looks something like this:
```javascript
const initialFrame = createArray(30);
  let [ actualFrame, setActualFrame ] = useState(initialFrame);

```
![App Screenshot](https://github.com/Alonso-Pablo/game-of-life/blob/main/preview/initialFrame.png?raw=true)

#### ⚙ Render Game:
```Javascript
// Initially, initialFrame = actualFrame
  const renderGame = () => actualFrame.map((row, indexRow) =>
    row.map((cellular, indexColumn) =>
      cellular === 0
      ? <Cellular isGrid={isGrid.value} cellular={cellular} onClick={() => handleClick(indexRow, indexColumn) } key={`row${indexRow}-column${indexColumn}`}></Cellular>
      : <Cellular isGrid={isGrid.value} cellular={cellular} onClick={() => handleClick(indexRow, indexColumn) } key={`row${indexRow}-column${indexColumn}`}></Cellular>
    )
  );
//...
  <Game isGrid={isGrid.value} rowsTotal={gameProperty.rowsTotal} columnsTotal={gameProperty.columnsTotal}>
    {
      renderGame()
    }
  </Game>
//... Styled Components 💅
const Cellular = styled.button`
  width: ${({isGrid}) => isGrid ? '95%' : '100%'};
  height: ${({isGrid}) => isGrid ? '95%' : '100%'};
  background-color: ${({cellular}) => cellular > 0 ? 'black' : 'white'};
  border: ${({isGrid}) => isGrid ? '1px solid #D1D1D1' : 'none'};
  cursor: pointer;
`;

const Game = styled.div`
  box-sizing: border-box;
  display: grid;
  //...
  grid-template-rows: repeat(${({rowsTotal}) => rowsTotal || 10}, 1fr);
  grid-template-columns: repeat(${({columnsTotal}) => columnsTotal || 10}, 1fr);
  // ...
  }
  @media only screen and (min-width: 400px) { ... }
  @media only screen and (min-width: 768px) { ... }
  @media only screen and (min-width: 1100px) { ... }
  @media only screen and (min-width: 1910px) { ... }
`;
```
---
#### 🔍 To create the next frame, each cell and its neighboring cells are analyzed:
⬜     | Left        | Center    | Right 
------ | ----------- | --------- | -------
Top    | n[y-1][x-1] | n[y-1][x] | n[y-1][x+1] 
Center | n[y][x-1]   |  n[y][x]  |  n[y][x+1] 
Bottom | n[y+1][x-1] | n[y+1][x] | n[y+1][x+1] 

---

#### 🧭 Taking the cardinal points as a reference. If the neighboring cell of the Northwest (NW) is equal to 1, internally in the `CalculateCardinals ()` function and thus the same with N, NE, E, SE, S, SW and W:
```javascript
const CalculateCardinals = (array, row, column) => {
    let NW = 0;
    let N = 0;
    let NE = 0
    let E = 0;
    let SE = 0;
    let S = 0;
    let SW = 0;
    let W = 0;

  // Corners
    if (row === 0 && column === 0) { // array[0][0]
      E = array[row][column + 1];
      SE = array[row + 1][column + 1];
      S = array[row + 1][column];
      let result = E + SE + S;
      return result
    }
    if (row === 0 && column === gameProperty.limitMapX) { // array[0][limitMap.x]
      S = array[row + 1][column];
      SW = array[row + 1][column - 1];
      W = array[row][column - 1];
      let result = S + SW + W;
      return result
    }
    if (row === gameProperty.limitMapY && column === gameProperty.limitMapX) { // array[limitMap.y]][limitMap.x]
      NW = array[row - 1][column - 1];
      N = array[row - 1][column];
      W = array[row][column - 1];
      let result = NW + N + W;
      return result
    }
    if (row === gameProperty.limitMapY && column === 0) { // array[limitMap.y][0]
      N = array[row - 1][column];
      NE = array[row - 1][column + 1];
      E = array[row][column + 1];
      let result = N + NE + E;
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
      let result = E + SE + S + SW + W;
      return result
    }
    // Bottom
    if (row === gameProperty.limitMapY) {
      NW = array[row - 1][column - 1];
      N = array[row - 1][column];
      NE = array[row - 1][column + 1];
      E = array[row][column + 1];
      W = array[row][column - 1];
      let result = NW + N + NE + E + W;
      return result
    }
    // left
    if (column === 0) {
      N = array[row - 1][column]
      NE = array[row - 1][column + 1]
      E = array[row][column + 1]
      SE = array[row + 1][column + 1]
      S = array[row + 1][column]
      let result = N + NE + E + SE + S;
      return result
    }
    // right
    if (column === gameProperty.limitMapX) {
      NW = array[row - 1][column - 1]
      N = array[row - 1][column]
      S = array[row + 1][column]
      SW = array[row + 1][column - 1]
      W = array[row][column - 1]
      let result = NW + N + S + SW + W;
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
  }; // CalculateCardinals()
```
---
#### 🏗 The result is processed by the sumLife() function:

``` javascript
const sumLife = (array, row, column, center) => {

    const result = CalculateCardinals(array, row, column);

    if (center === 0) { // if it's a dead cellular
        if (result === 3) return 1
        return 0
    }
    if (center === 1) { // if it's a living cellular
        if (result === 2 || result === 3) return 1
        return 0
    }
}; // sumLife()
```
---
#### 🎦 And finally actualFrame is modified with a useEffect () to show an updated "frame" of the next generation:
```javascript
useEffect(() => {
    if (isGameRun.value) { // Check if it is paused before executing the code

        if (actualFrame.toString() === gameProperty.noLife) { // If no more life...
        return isGameRun.setFalse();
        } else {
            const saveFrame = initialFrame; // We keep a copy

            setTimeout(() => {
                generation.increase();
                actualFrame.forEach((row, indexRow) => {
                    row.forEach((cellular, indexColumn) => {
                        return saveFrame[indexRow][indexColumn] = sumLife(actualFrame, indexRow, indexColumn, cellular);
                    })
                })
                setActualFrame(saveFrame);
            }, generationSpeed.value); // default generationSpeed.value === 0
        };
    };
}, [isGameRun.value, actualFrame]);
```