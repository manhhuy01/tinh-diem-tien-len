import React, { useRef, useState } from 'react'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ player, onChangeValue }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState();
  const addSubValue = (delta) => {
    let newValue;
    if ((+value === 0 && delta === -1) || (+value === -1 && delta === 1)) {
      newValue = undefined;
      inputRef.current.value = '';
      setValue(newValue);
      return onChangeValue(newValue);
    }
    if(value === undefined && delta === 1){
      newValue = 0;
      setValue(newValue);
      return onChangeValue(newValue);
    }
    newValue = (+value || 0) + delta;
    setValue(newValue);
    onChangeValue(newValue);
  }
  return (
    <div className='input-score' key={player}>
      <span>{player}</span>
      <span>
        <span className='button__increase' onClick={() => addSubValue(-1)}>-</span>
        <input ref={inputRef} value={value} onChange={(e) => { setValue(e.target.value); onChangeValue(e.target.value) }} />
        <span className='button__descrease' onClick={() => addSubValue(1)}>+</span>
      </span>
    </div>
  )
}