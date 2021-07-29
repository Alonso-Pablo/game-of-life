import { useState, useEffect } from 'react';
import Head from 'next/head'
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  let [ isGameStarted, setIsGameStarted ] = useState(false);

  const initialFrame = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  const saveFrame = initialFrame;

  let [ actualFrame, setActualFrame ] = useState(saveFrame);

  let [ previusFrame, setPreviusFrame ] = useState(saveFrame);

  let [ generationNumber, setGenerationNumber ] = useState(0);

  const limitMap = {'x': 9, 'y': 9};

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
    if (isGameStarted) {
      setTimeout(() => {
        setGenerationNumber(generationNumber += 1)
        previusFrame.map((row, indexRow) => {
          row.map((cellular, indexColumn) => {
            const result = sumLife(previusFrame, indexRow, indexColumn, cellular);
            result === 0
            ? saveFrame[indexRow][indexColumn] = 0
            : saveFrame[indexRow][indexColumn] = 1
          })
        })
        setPreviusFrame(saveFrame);
        setActualFrame(saveFrame);
        
        return
      }, 300)
    }
  }, [isGameStarted, actualFrame])

  return (
    <>
      <Head>
        <title>Conway&apos;s Game of Life</title>
        <meta name="description" content="Recreation of Conway&apos;s Game of Life" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>

      <Main>

        <Container>
        {actualFrame.map((row, indexRow) => {
            return row.map((cellular, indexColumn) =>
              cellular === 0
              ? <ButtonWhite onClick={() => handleClick(indexRow, indexColumn) } key={uuidv4()}></ButtonWhite>
              : <ButtonBlack onClick={() => handleClick(indexRow, indexColumn) } key={uuidv4()}></ButtonBlack>
            )
          })
        }
        
        </Container>

        <ControllersContainer>

          <Controller fill="black" onClick={() => setIsGameStarted(!isGameStarted) }>
            { !isGameStarted
              ?
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 13 13" fill="none">
                    <path d="M1 13V1.5L11 7.5L1 13Z" stroke="black"/>
                  </svg>
                  START
                </>
              : 
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 13 13" fill="none">
                    <path d="M1 0.5V12H12.5V0.5H1Z" stroke="black"/>
                  </svg>
                  STOP
                </>
            }
          </Controller>

          <Controller>GENERATION:<br/>{generationNumber}</Controller>

          <Controller onClick={() => {setActualFrame(initialFrame); setPreviusFrame(initialFrame); setGenerationNumber(0)} }>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 13 13" fill="none">
              <path d="M12 2.57139V5.19037L9.5 4.14278L10.9137 3.2542L12 2.57139Z" fill="black"/>
              <path d="M11 9.38074C10.5 10.4283 8.77701 12.0239 6.5 11.9997C3.32153 11.966 1 10.4283 1 6.76176C1 3.09519 3.5 1 6.5 1C9.5 1 10.5 2.57139 11.5 4.14278M12 5.19037V2.57139L9.5 4.14278L12 5.19037Z" stroke="black"/>
            </svg>
            RESET
          </Controller>
        </ControllersContainer>
        
      </Main>

      <footer>
        
      </footer>
    </>
  )
}
const Main = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const Container = styled.div`
  box-sizing: border-box;
  display: grid;
  width: 90%;
  height: 90%;
  max-width: 300px;
  max-height: 300px;
  padding: 4px;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(10, 1fr);
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

const ButtonBlack = styled.button`
  height: 100%;
  background-color: black;
  border: 1px solid black;
  border-radius: 2px;
  cursor: pointer;
`;

const ButtonWhite = styled(ButtonBlack)`
  background-color: white;
  border: 1px solid black;
`;

const ControllersContainer = styled.div`
  display: flex;
`;

const Controller = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  margin: 0 5px;
  background-color: white;
  border: 1px solid black;
  border-top: none;
  top: -1px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 700;

  & svg {
    padding: 5px 0;
    margin-right: 5px;
  }

  &:hover svg path {
    fill: ${({fill}) => fill || ''};
  }

  @media only screen and (min-width: 768px) {
    height: 40px;
    margin: 0 15px;

  }
  @media only screen and (min-width: 1910px) {
    height: 40px;
    margin: 0 20px;
  }
`;