import React from 'react';

const Progress =(props)=>{

    return(
      <div className="progress">
        {/* Elapsed Time */}
        <span className="player__time-elapsed">{props.elapsed}</span>
        {/* Progress Bar */}
        <progress
        value={props.position}
        max="1">
        </progress>
        {/* Total Time */}
        <span className="player__time-total">{props.total}</span>
      </div>
    );
  
}

export default Progress;