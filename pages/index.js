import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head'
import styled from 'styled-components';

import { initialFrame30x30 } from '../initialFrame';

const useCounter = () => {
  const [ counter, setCounter ] = useState(0)
  
  const increase = () => setCounter(counter + 1);
  const reset = () => setCounter(0);

  return {
    counter,
    increase,
    reset
  };
};

const useBoolean = () => {
  const [ boolean, setBoolean ] = useState(false);

  const setInvert = () => setBoolean(!boolean);
  const setTrue = () => setBoolean(true);
  const setFalse = () => setBoolean(false);

  return {
    boolean,
    setInvert,
    setTrue,
    setFalse,
  };
};

// const useGame = (initialValue) => {
//   const [ frame, setFrame ] = useState(initialValue);
//   const savedFrame, setSavedFrame ] = useState(initialValue);

//   const handleFrame = (indexRow, indexColumn) => {
//     if (frame[indexRow][indexColumn] > 0) {
//       return setFrame(frame[indexRow][indexColumn] = 0)
//     }
//     return
//   };

//   const memoizedFrame = useMemo(() =>
//     frame.map((row, indexRow) => (
//       row.map((cellular, indexColumn) => {
//         const result = sumLife(frame, indexRow, indexColumn, cellular);
//         if (result > 0) return setSavedFrame()
//         ? savedFrame[indexRow][indexColumn] = 0
//         : savedFrame[indexRow][indexColumn] = 1
//       })
//     ))
//   , [frame])

//   useEffect(() => {
//     if (isGameRun.boolean) {
//       generation.increase();

//       setTimeout(() => {
//         memoizedFrame()
//       }, 200);
//     }
//   }, [isGameRun.boolean, frame])
// }


export default function Home() {

  const generation = useCounter();
  const isGameRun = useBoolean();
  const isConfigDisplay = useBoolean();

  const initialFrame = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  const saveFrame = initialFrame;

  const rowsTotal = saveFrame.length;
  const columnsTotal = saveFrame[0].length;
  const limitMap = {'x': (columnsTotal - 1), 'y': (rowsTotal - 1) };

  let [ actualFrame, setActualFrame ] = useState(initialFrame);

  // const ResizeArray = (index, decrease) => {

  //   if (decrease === 1) {
  //     actualFrame.forEach((row) => row.splice(index, decrease));
  //     actualFrame.splice(index, decrease);
  //     console.log(actualFrame);
  //     return actualFrame
  
  //   } else {
  //     const element = 0;
  //     actualFrame.forEach((row) => row.splice(index, decrease, element))
  //     actualFrame.splice(index, decrease, actualFrame[0]);
  //     console.log(actualFrame);
  //     return actualFrame
  //   }
  // }

  const sumLife = (array, row, column, center) => {
    let NW = 0;
    let N = 0;
    let NE = 0
    let E = 0;
    let SE = 0;
    let S = 0;
    let SW = 0;
    let W = 0;

  /*
      n[y-1][x-1]  n[y-1][x]  n[y-1][x+1]

       n[y][x-1]    n[y][x]    n[y][x+1]

      n[y+1][x-1]  n[y+1][x]  n[y+1][x+1]
  */

    // row => y
    // column => x
    const CalculateCardinals = (array, row, column) => {
    // Corners
      if (row === 0 && column === 0) { // array[0][0]
        E = array[row][column + 1];
        SE = array[row + 1][column + 1];
        S = array[row + 1][column];
        let result = NW + N + NE + E + SE + S + SW + W;
        return result
      }
      if (row === 0 && column === limitMap.x) { // array[0][limitMap.x]
        S = array[row + 1][column];
        SW = array[row + 1][column - 1];
        W = array[row][column - 1];
        let result = NW + N + NE + E + SE + S + SW + W;
        return result
      }
      if (row === limitMap.y && column === limitMap.x) { // array[limitMap.y]][limitMap.x]
        NW = array[row - 1][column - 1];
        N = array[row - 1][column];
        W = array[row][column - 1];
        let result = NW + N + NE + E + SE + S + SW + W;
        return result
      }
      if (row === limitMap.y && column === 0) { // array[limitMap.y][0]
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
      if (row === limitMap.y) {
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
      if (column === limitMap.x) {
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

  const handleClick = (indexRow, indexColumn) => {
    actualFrame[indexRow][indexColumn] === 1
    ? setActualFrame(actualFrame[indexRow][indexColumn] = 0)
    : setActualFrame(actualFrame[indexRow][indexColumn] = 1)
    setActualFrame(Object.values(actualFrame = actualFrame))
  };

  useEffect(() => {
    if (isGameRun.boolean) {
      setTimeout(() => {
        generation.increase();

        actualFrame.map((row, indexRow) => {
          row.map((cellular, indexColumn) => {
            return saveFrame[indexRow][indexColumn] = sumLife(actualFrame, indexRow, indexColumn, cellular);
          })
        })
        setActualFrame(saveFrame);
      }, 200)
    }
  }, [isGameRun.boolean, actualFrame])

  return (
    <>
      <Head>
        <title>Conway&apos;s Game of Life</title>
        <meta name="description" content="Recreation of Conway&apos;s Game of Life in Next.js by Alonso Pablo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>

      <Main>

        <ControllersContainer top="1px" justifyContent="flex-end">
          { isConfigDisplay.boolean &&
            <Configuration borderBottom="none" borderRadius="2px 2px 0 0">

              <Button onClick={() => {isGameRun.setFalse(false); ResizeArray((rowsTotal - 1), 1)}}>-</Button>

              <div>
                <p>SIZE</p>
                {`${rowsTotal} X ${columnsTotal}`}
              </div>

              <Button onClick={() => {isGameRun.setFalse(false); ResizeArray((rowsTotal - 1), 0)} }>+</Button>

            </Configuration>
          }
          

          <Controller onClick={() => isConfigDisplay.setInvert()} borderBottom="none" borderRadius="2px 2px 0 0">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 15 15" fill="none">
              <path d="M8.51562 1H6.89062L6.28125 2.42188L4.85938 3.03125L3.64062 2.42188L2.42188 3.64062L3.03125 5.0625L2.42188 6.28125L1 6.6875V8.3125L2.42188 8.92188L3.03125 10.1406L2.42188 11.5625L3.64062 12.7812L4.85938 12.1719L6.07812 12.5781L6.6875 14H8.51562L8.92188 12.5781L10.3438 12.1719L11.5625 12.7812L12.7812 11.5625L12.1719 10.1406L12.7812 8.92188L14 8.3125V6.6875L12.5781 6.28125L12.1719 4.85938L12.7812 3.64062L11.5625 2.42188L10.1406 3.03125L8.92188 2.42188L8.51562 1Z" stroke="black"/>
              <circle cx="7.5" cy="7.5" r="2" stroke="black" />
            </svg>
          </Controller>

        </ControllersContainer>

        <Game rowsTotal={rowsTotal} columnsTotal={columnsTotal}>
          {
            actualFrame.map((row, indexRow) => {
              return row.map((cellular, indexColumn) =>
                cellular === 0
                ? <Cellular cellular={cellular} onClick={() => handleClick(indexRow, indexColumn) } key={`row${indexRow}-column${indexColumn}`}></Cellular>
                : <Cellular cellular={cellular} onClick={() => handleClick(indexRow, indexColumn) } key={`row${indexRow}-column${indexColumn}`}></Cellular>
              )
            })
          }
        </Game>

        <ControllersContainer top="-1px" >

          <Controller borderTop="none" borderRadius="0 0 2px 2px" fill="black" onClick={() => isGameRun.setInvert() }>
            { !isGameRun.boolean
              ?
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 13 13" fill="none">
                  <path d="M1 13V1.5L11 7.5L1 13Z" stroke="black"/>
                </svg>
              : 
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 13 13" fill="none">
                  <path d="M1 0.5V12H12.5V0.5H1Z" stroke="black"/>
                </svg>
            }
          </Controller>

          <Controller borderTop="none" borderRadius="0 0 2px 2px">
            GENERATION:<br/>{generation.counter}
          </Controller>

          <Controller borderTop="none" borderRadius="0 0 2px 2px" onClick={() => {setActualFrame(initialFrame); generation.reset()} }>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 13 13" fill="none">
              <path d="M12 2.57139V5.19037L9.5 4.14278L10.9137 3.2542L12 2.57139Z" fill="black"/>
              <path d="M11 9.38074C10.5 10.4283 8.77701 12.0239 6.5 11.9997C3.32153 11.966 1 10.4283 1 6.76176C1 3.09519 3.5 1 6.5 1C9.5 1 10.5 2.57139 11.5 4.14278M12 5.19037V2.57139L9.5 4.14278L12 5.19037Z" stroke="black"/>
            </svg>
          </Controller>

        </ControllersContainer>
        
      </Main>

      <footer>
        
      </footer>
    </>
  )
}


const Cellular = styled.button`
  height: 100%;
  background-color: ${({cellular}) => cellular > 0 ? 'black' : 'white'};
  border: 1px solid black;
  cursor: pointer;
`;

// const ButtonWhite = styled(ButtonBlack)`
//   background-color: white;
//   border: 1px solid black;
// `;

const Main = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Game = styled.div`
  box-sizing: border-box;
  display: grid;
  width: 90%;
  height: 90%;
  max-width: 300px;
  max-height: 300px;
  padding: 4px;
  grid-template-rows: repeat(${({rowsTotal}) => rowsTotal || 10}, 1fr);
  grid-template-columns: repeat(${({columnsTotal}) => columnsTotal || 10}, 1fr);
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 2px;
  border: 1px solid black;
  border-radius: 2px;

  @media only screen and (min-width: 768px) {
    max-width: 520px;
    max-height: 520px;
    padding: 8px;
  }
  @media only screen and (min-width: 1910px) {
    max-width: 1000px;
    max-height: 1000px;
    padding: 8px;
  }
`;

const ControllersContainer = styled.div`
  width: 300px;
  position: relative;
  top: ${({top}) => top || ''};
  display: flex;
  justify-content: ${({justifyContent}) => justifyContent || 'center'};

  @media only screen and (min-width: 768px) {
    width: 520px;
  }
  @media only screen and (min-width: 1910px) {
    width: 1000px;
  }
`;

const Controller = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  margin: 0 5px;
  background-color: white;
  border: 1px solid black;
  border-top: ${({borderTop}) => borderTop || ''};
  border-bottom: ${({borderBottom}) => borderBottom || ''};
  border-radius: ${({borderRadius}) => borderRadius || ''};
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 700;

  & svg {
    padding: 8px;
  }

  &:hover svg path {
    fill: ${({fill}) => fill || ''};
  }

  @media only screen and (min-width: 768px) {
    margin: 0 15px;

  }
  @media only screen and (min-width: 1910px) {
    margin: 0 20px;
  }
`;

const Configuration = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  margin: 0 5px;
  background-color: white;
  border: 1px solid black;
  border-bottom: ${({borderBottom}) => borderBottom || ''};
  border-radius: ${({borderRadius}) => borderRadius || ''};

  & div {
    text-align: center;
    padding: 0 5px
  }
`;

const Button = styled.button`
  padding: 4px 8px;
  background-color: white;
  border: 1px solid black;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: black;
    color: white;
  }
`;