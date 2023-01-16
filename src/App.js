import React, { useEffect, useRef, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import Popup from 'reactjs-popup';
import InputScore from './InputScore';


function App() {
  const [isAddPlayer, setAddPlayer] = useState(false)
  const [players, setPlayers] = useState([])
  const inputRef = useRef(null);

  const [handScores, setHandScores] = useState([])
  const [isSetScore, setIsSetScore] = useState(false)
  const [score, setScore] = useState({})
  const [totalScore, setTotalScore] = useState({})
  const addPlayers = () => {
    setPlayers([...players, ...inputRef.current.value.split(',')])
    setAddPlayer(false);
  }
  const addScores = () => {
    handScores.push(score);
    setScore({});
    setHandScores([...handScores]);
    setIsSetScore(false);
  }
  const setScorePlayer = ({ player, value }) => {
    score[player] = Number.isInteger(+value) ? +value : '-';
    setScore(score);
  }

  useEffect(() => {
    const players = JSON.parse(localStorage.getItem('players') || '[]');
    const handScores = JSON.parse(localStorage.getItem('handScores') || '[]');
    const totalScore = JSON.parse(localStorage.getItem('totalScore') || '{}');
    setPlayers(players);
    setHandScores(handScores);
    setTotalScore(totalScore);
  }, [])

  useEffect(() => {
    let newTotalScore = players.reduce((agg, player) => {
      agg[player] = 0;
      return agg;
    }, {})
    handScores.forEach(handScore => {
      Object.keys(handScore).forEach(player => {
        if (+handScore[player]) {
          newTotalScore[player] += handScore[player]
        }
      })
    })
    setTotalScore(newTotalScore)
  }, [handScores, players])

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players))
    localStorage.setItem('handScores', JSON.stringify(handScores))
    localStorage.setItem('totalScore', JSON.stringify(totalScore))
  }, [players, handScores, totalScore])

  const onCloseModal = () => {
    setScore({});
    setIsSetScore(false);
    setAddPlayer(false);
  }
  const clearData = () => {
    if (window.confirm('chắc chưa?')) {
      setPlayers([]);
      setHandScores([])
      setScore({});
      setIsSetScore(false);
      setAddPlayer(false);
      setTotalScore({})
    }

  }
  return (
    <div className="App">
      <div className="App-header">
        <div className='menu'>
          <button className='button' onClick={() => setAddPlayer(true)}>Thêm người chơi</button>
          <button className='button' onClick={clearData}>Xóa dữ liệu</button>
        </div>
        { !!players.length && <button className='button button--float' onClick={() => setIsSetScore(true)}>Thêm điểm</button> }
        <div className="detail">
          <table className='table-score'>
            <thead>
              <tr>
                {
                  players.map(player => <th key={player}><div>
                    <div className='score--total'>{totalScore[player]}</div>
                    <div>{player}</div>
                  </div></th>)
                }
              </tr>
            </thead>
            <tbody>
              {
                handScores.map((handScore, i) => {
                  return (
                    <tr key={i}>
                      {
                        players.map(player => {
                          const score = handScore[player] === undefined ? '-' : handScore[player]
                          return (
                            <td key={player}>{score}</td>
                          )
                        })
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <Popup open={isAddPlayer} modal onClose={onCloseModal}>
        <div className='modal-container'>
          <input ref={inputRef} placeholder="vd: huy,thuy,tien..." />
          <button className='button' onClick={addPlayers}>Ok</button>
        </div>
      </Popup>
      <Popup open={isSetScore} modal onClose={onCloseModal}>
        <div className='modal-container'>
          {
            players.map((player) => {
              return (
                <InputScore key={player} player={player} onChangeValue={(value) => setScorePlayer({ player, value })} />
              )
            })
          }
          <button className='button' onClick={addScores}>Ok</button>
        </div>
      </Popup>
    </div>
  );
}

export default App;
