import React from 'react';

import classes from './buildControl.module.css';

const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>
        {props.label}
      </div>
      <p className={classes.LabelButton}>{props.count}</p>
      <button className={classes.Less}
        onClick={props.remove}
        disabled={props.disabled}>
        Less
      </button>
      <button className={classes.More}
        onClick={props.added}>
        More
      </button>
    </div>
  );
}

export default buildControl;