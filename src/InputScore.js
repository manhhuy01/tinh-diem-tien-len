import React, { useRef, useState } from 'react'

export default ({ player, onChangeValue }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState();

  return (
    <div className='input-score' key={player}>
      <span>{player}:</span>
      <span>
        <input ref={inputRef} value={value} onChange={(e) => { setValue(e.target.value); onChangeValue(e.target.value) }} />
      </span>
    </div>
  )
}