import { useState, useEffect } from 'react';
import { useValue } from '../hooks/useValue';
import styled from 'styled-components';
import Head from 'next/head';

const createArray = (n) => {
 return Array(n).fill(0).map(()=> Array(n).fill(0));
};

export default function Home() {

  const initialFrame = createArray(30);
  const generation = useValue(0);

  const generationSpeed = useValue(0);
  const isGameRun = useValue(false);
  const isConfigDisplay = useValue(false);
  const isGrid = useValue(true);
  
  let [ actualFrame, setActualFrame ] = useState(initialFrame);
  let [ gameProperty , setGameProperty ] = useState({
    rowsTotal: initialFrame.length,
    columnsTotal: initialFrame[0].length,
    limitMapX: (initialFrame[0].length - 1),
    limitMapY: (initialFrame.length - 1),
    noLife: initialFrame.toString()
  });

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
  
  useEffect(() => {
    if (isGameRun.value) {

      if (actualFrame.toString() === gameProperty.noLife) { // If no more life...
        return isGameRun.setFalse();
      } else {
        const saveFrame = initialFrame;

        setTimeout(() => {
          generation.increase();
          actualFrame.forEach((row, indexRow) => {
            row.forEach((cellular, indexColumn) => {
              return saveFrame[indexRow][indexColumn] = sumLife(actualFrame, indexRow, indexColumn, cellular);
            })
          })
          setActualFrame(saveFrame);
        }, generationSpeed.value);
      };
    };
  }, [isGameRun.value, actualFrame]);

  const handleClick = (indexRow, indexColumn) => {
    actualFrame[indexRow][indexColumn] === 1
    ? setActualFrame(actualFrame[indexRow][indexColumn] = 0)
    : setActualFrame(actualFrame[indexRow][indexColumn] = 1)
    return setActualFrame(Object.values(actualFrame))
  };

  const renderGame = () => actualFrame.map((row, indexRow) =>
    row.map((cellular, indexColumn) =>
      cellular === 0
      ? <Cellular isGrid={isGrid.value} cellular={cellular} onClick={() => handleClick(indexRow, indexColumn) } key={`row${indexRow}-column${indexColumn}`}></Cellular>
      : <Cellular isGrid={isGrid.value} cellular={cellular} onClick={() => handleClick(indexRow, indexColumn) } key={`row${indexRow}-column${indexColumn}`}></Cellular>
    )
  );

  return (
    <>
      <Head>
        <meta name="robots" content="index" />
        <meta name="robots" content="follow" />
        <title>Conway&apos;s Game of Life</title>
        <meta name="description" content="Recreation of Conway&apos;s Game of Life in Next.js by Alonso Pablo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>

      <Main>

        <GitHub title="Go to the repository of this project." href="https://github.com/Alonso-Pablo/game-of-life">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="120" viewBox="0 24 180 168" fill="none">
            <path d="M180 168L0 0H180V168Z" fill="black"/>
            <path fill="white" fillRule="evenodd" clipRule="evenodd" d="M129 9C105.775 9 87 27.7946 87 51.0441C87 69.6299 99.0298 85.3616 115.719 90.9304C117.805 91.348 118.57 90.0255 118.57 88.9117C118.57 87.9372 118.5 84.5959 118.5 81.1154C106.818 83.6214 104.384 76.1036 104.384 76.1036C102.507 71.2309 99.7252 69.9779 99.7252 69.9779C95.9007 67.4024 100.003 67.4024 100.003 67.4024C104.245 67.6808 106.47 71.7182 106.47 71.7182C110.225 78.1222 116.275 76.3124 118.709 75.1986C119.056 72.4839 120.169 70.6044 121.351 69.5603C112.033 68.5857 102.228 64.966 102.228 48.8166C102.228 44.2224 103.897 40.4635 106.54 37.5399C106.123 36.4958 104.662 32.18 106.957 26.4024C106.957 26.4024 110.503 25.2886 118.5 30.7182C121.838 29.8132 125.454 29.326 129 29.326C132.546 29.326 136.162 29.8132 139.5 30.7182C147.497 25.2886 151.043 26.4024 151.043 26.4024C153.338 32.18 151.877 36.4958 151.46 37.5399C154.172 40.4635 155.772 44.2224 155.772 48.8166C155.772 64.966 145.967 68.5161 136.579 69.5603C138.109 70.8828 139.43 73.3888 139.43 77.3565C139.43 82.9949 139.361 87.5195 139.361 88.9117C139.361 90.0255 140.126 91.348 142.212 90.9304C158.901 85.3616 170.93 69.6299 170.93 51.0441C171 27.7946 152.156 9 129 9Z"/>
            <path fill="white" d="M102.924 69.3514C102.854 69.5603 102.507 69.6299 102.228 69.4907C101.95 69.3514 101.742 69.073 101.881 68.8642C101.95 68.6553 102.298 68.5857 102.576 68.725C102.854 68.8642 102.993 69.1426 102.924 69.3514Z"/>
            <path fill="white" d="M104.593 71.2309C104.384 71.4397 103.967 71.3005 103.758 71.0221C103.48 70.7436 103.411 70.326 103.619 70.1171C103.828 69.9083 104.175 70.0475 104.454 70.326C104.732 70.674 104.801 71.0917 104.593 71.2309Z"/>
            <path fill="white" d="M106.262 73.6672C105.983 73.8761 105.566 73.6672 105.358 73.3192C105.079 72.9711 105.079 72.4839 105.358 72.3446C105.636 72.1358 106.053 72.3446 106.262 72.6927C106.54 73.0407 106.54 73.4584 106.262 73.6672Z"/>
            <path fill="white" d="M108.556 76.034C108.348 76.3124 107.861 76.2428 107.444 75.8947C107.096 75.5467 106.957 75.0594 107.235 74.8506C107.444 74.5722 107.93 74.6418 108.348 74.9898C108.695 75.2683 108.765 75.7555 108.556 76.034Z"/>
            <path fill="white" d="M111.685 77.3565C111.616 77.7046 111.129 77.8438 110.642 77.7046C110.156 77.5654 109.877 77.1477 109.947 76.8693C110.017 76.5212 110.503 76.382 110.99 76.5212C111.477 76.6604 111.755 77.0085 111.685 77.3565Z"/>
            <path fill="white" d="M115.093 77.635C115.093 77.983 114.675 78.2615 114.189 78.2615C113.702 78.2615 113.285 77.983 113.285 77.635C113.285 77.2869 113.702 77.0085 114.189 77.0085C114.675 77.0085 115.093 77.2869 115.093 77.635Z"/>
            <path fill="white" d="M118.291 77.0781C118.361 77.4261 118.013 77.7742 117.526 77.8438C117.04 77.9134 116.623 77.7046 116.553 77.3565C116.483 77.0085 116.831 76.6604 117.318 76.5908C117.805 76.5212 118.222 76.73 118.291 77.0781Z"/>
          </svg>
        </GitHub>

        <ControllersContainer top="1px" justifyContent="flex-end">
          {isConfigDisplay.value &&
          <>
            <Configuration title="Speed between generations" isDisplay={isConfigDisplay.value} borderBottom="none" borderRadius="2px 2px 0 0">

              <Button onClick={() => generationSpeed.slowDown()}> - </Button>

              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.5" r="6" stroke="black"/>
                <Path isdisplay={generationSpeed.value >= 1000} xmlns="http://www.w3.org/2000/svg" d="M2.53205 6.9768L7.33303 6.43528C7.59325 6.40593 7.83221 6.58188 7.88143 6.83909C7.94342 7.16299 7.68107 7.45743 7.35219 7.43309L2.53396 7.07635C2.4734 7.07186 2.4717 6.98361 2.53205 6.9768Z" fill="black" stroke="black" strokeWidth="0.5"/>
                <Path isdisplay={generationSpeed.value >= 800 && generationSpeed.value < 1000} d="M3.22559 3.36516L6.75918 6.66005C6.95071 6.83864 6.97245 7.13459 6.80908 7.33925C6.60334 7.59698 6.20905 7.58918 6.01367 7.32351L3.15121 3.43135C3.11523 3.38242 3.18117 3.32374 3.22559 3.36516Z" fill="black" stroke="black" strokeWidth="0.5"/>
                <Path isdisplay={generationSpeed.value >= 500 && generationSpeed.value < 800} d="M6.9551 2.53536L6.87383 7.3661C6.86943 7.62794 6.66417 7.84224 6.40276 7.85793C6.07358 7.87769 5.81537 7.57961 5.88187 7.25661L6.85613 2.52444C6.86838 2.46496 6.95612 2.47464 6.9551 2.53536Z" fill="black" stroke="black" strokeWidth="0.5"/>
                <Path isdisplay={generationSpeed.value >= 200 && generationSpeed.value < 500} d="M9.71122 4.34534L6.29822 7.765C6.11323 7.95035 5.81672 7.96203 5.61772 7.7918C5.36712 7.57743 5.38831 7.18363 5.66046 6.99738L9.64759 4.26876C9.69771 4.23446 9.75412 4.30235 9.71122 4.34534Z" fill="black" stroke="black" strokeWidth="0.5"/>
                <Path isdisplay={generationSpeed.value >= 0 && generationSpeed.value < 200} d="M10.8474 7.34423L6.02277 7.60094C5.76126 7.61486 5.53313 7.42509 5.4992 7.16542C5.45647 6.83842 5.73576 6.56 6.06263 6.60375L10.8513 7.24474C10.9115 7.2528 10.908 7.341 10.8474 7.34423Z" fill="black" stroke="black" strokeWidth="0.5"/>
                <line x1="2" y1="6.75" x2="2.8" y2="6.75" stroke="black" strokeWidth="0.5"/>
                <line x1="6.75" y1="2" x2="6.75" y2="3.5" stroke="black" strokeWidth="0.5"/>
                <line x1="9.97414" y1="3.23833" x2="8.69476" y2="4.5045" stroke="black" strokeWidth="0.5"/>
                <line x1="3.81112" y1="4.16378" x2="3.15599" y2="3.40827" stroke="black" strokeWidth="0.5"/>
                <line x1="9" y1="6.75" x2="11.2" y2="6.75" stroke="black" strokeWidth="0.5"/>
              </svg>

              <Button onClick={() => generationSpeed.speedUp()}> + </Button>

            </Configuration>

            <Controller title="Show/Hidden Grid" isDisplay={isConfigDisplay.value} onClick={isGrid.setInvert} borderBottom="none" borderRadius="2px 2px 0 0">
              
              <Svg isDisplay={isGrid.value} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 13 13" fill="none">
                <path d="M5 1V12M8.5 1V12M1 5H12.5M1 8.5H12.5M1 1L12 12" stroke="black"/>
              </Svg>

              <Svg isDisplay={!isGrid.value} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 11 11" fill="none">
                <path d="M4 0V11M7.5 0V11M0 4H11.5M0 7.5H11.5" stroke="black"/>
              </Svg>

            </Controller>
          </>
          }

          <Controller title="Configuration" onClick={() => isConfigDisplay.setInvert()} borderBottom="none" borderRadius="2px 2px 0 0">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 15 15" fill="none">
              <path d="M8.51562 1H6.89062L6.28125 2.42188L4.85938 3.03125L3.64062 2.42188L2.42188 3.64062L3.03125 5.0625L2.42188 6.28125L1 6.6875V8.3125L2.42188 8.92188L3.03125 10.1406L2.42188 11.5625L3.64062 12.7812L4.85938 12.1719L6.07812 12.5781L6.6875 14H8.51562L8.92188 12.5781L10.3438 12.1719L11.5625 12.7812L12.7812 11.5625L12.1719 10.1406L12.7812 8.92188L14 8.3125V6.6875L12.5781 6.28125L12.1719 4.85938L12.7812 3.64062L11.5625 2.42188L10.1406 3.03125L8.92188 2.42188L8.51562 1Z" stroke="black"/>
              <circle cx="7.5" cy="7.5" r="2" stroke="black" />
            </svg>
          </Controller>

        </ControllersContainer>

        <Game isGrid={isGrid.value} rowsTotal={gameProperty.rowsTotal} columnsTotal={gameProperty.columnsTotal}>
          { 
            renderGame()
          }
        </Game>

        <ControllersContainer top="-1px" >

          <Controller title="Play/Pause generation" borderTop="none" borderRadius="0 0 2px 2px" fill="black" onClick={() => isGameRun.setInvert() }>

            <Svg isDisplay={!isGameRun.value} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 13 13" fill="none">
              <path d="M1 13V1.5L11 7.5L1 13Z" stroke="black"/>
            </Svg>

            <Svg isDisplay={isGameRun.value} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 13 13" fill="none">
              <path d="M1 0.5V12H12.5V0.5H1Z" stroke="black"/>
            </Svg>

          </Controller>

          <Controller title="Generation" borderTop="none" borderRadius="0 0 2px 2px">
            GENERATION:<br/>{generation.value}
          </Controller>

          <Controller title="Clean all cells" borderTop="none" borderRadius="0 0 2px 2px" onClick={() => {setActualFrame(initialFrame); generation.reset()} }>
            
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 13 13" fill="none">
              <path d="M12 2.57139V5.19037L9.5 4.14278L10.9137 3.2542L12 2.57139Z" fill="black"/>
              <path d="M11 9.38074C10.5 10.4283 8.77701 12.0239 6.5 11.9997C3.32153 11.966 1 10.4283 1 6.76176C1 3.09519 3.5 1 6.5 1C9.5 1 10.5 2.57139 11.5 4.14278M12 5.19037V2.57139L9.5 4.14278L12 5.19037Z" stroke="black"/>
            </svg>

          </Controller>

        </ControllersContainer>
        
      </Main>

    </>
  )
}

const GitHub = styled.a`
  position: absolute;
  top: 0%;
  right: 0%;
`;


const Cellular = styled.button`
  width: ${({isGrid}) => isGrid ? '95%' : '100%'};
  height: ${({isGrid}) => isGrid ? '95%' : '100%'};
  background-color: ${({cellular}) => cellular > 0 ? 'black' : 'white'};
  border: ${({isGrid}) => isGrid ? '1px solid #D1D1D1' : 'none'};
  cursor: pointer;
`;

const Main = styled.main`
 position: relative;
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
  padding: ${({isGrid}) => isGrid ? '4px' : '0'};
  grid-template-rows: repeat(${({rowsTotal}) => rowsTotal || 10}, 1fr);
  grid-template-columns: repeat(${({columnsTotal}) => columnsTotal || 10}, 1fr);
  border: 1px solid;
  border-radius: 2px;

  @media only screen and (min-width: 400px) {
    max-width: 380px;
    max-height: 380px;
    padding: ${({isGrid}) => isGrid ? '8px' : '0'};
  }

  @media only screen and (min-width: 768px) {
    max-width: 520px;
    max-height: 520px;
    padding: ${({isGrid}) => isGrid ? '8px' : '0'};
  }

  @media only screen and (min-width: 1100px) {
    max-width: 800px;
    max-height: 800px;
    padding: ${({isGrid}) => isGrid ? '8px' : '0'};
  }

  @media only screen and (min-width: 1910px) {
    max-width: 1000px;
    max-height: 1000px;
    padding: ${({isGrid}) => isGrid ? '8px' : '0'};
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
  display: ${({isDisplay}) => isDisplay ? 'flex' : 'none'};
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

  & svg {
    padding: 8px;
  }
`;

const Button = styled.button`
  padding: 4px 8px;
  background-color: white;
  border: 1px solid black;
  border-radius: 2px;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const Svg = styled.svg`
  display: ${({isDisplay}) => isDisplay ? 'flex' : 'none'};
`;
const Path = styled.path`
  display: ${({isdisplay}) => isdisplay ? 'flex' : 'none'};
`;