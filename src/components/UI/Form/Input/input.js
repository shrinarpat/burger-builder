import React from 'react';

import classes from './input.module.css';

const input = (props) => {
  let inputElement = null;
  let validationError = null;
  let inputClasses = [classes.InputElement];
  if (props.inValid && props.touched) {
    inputClasses.push(classes.Invalid);
    validationError = <p className={classes.ValidationError}>Please Enter valid {props.valueType}</p>
  }
  switch (props.elementType) {
    case ('input'):
      inputElement = <input {...props.elementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed} />;
      break;
    case ('textarea'):
      inputElement = <textarea {...props.elementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed} />;
      break;
    case ('select'):
      inputElement = <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
        {props.elementConfig.options.map(op => {
          return (<option key={op.value} value={op.value}>{op.displayValue}</option>);
        })}
      </select>;
      break;
    default:
      inputElement = <input {...props.elementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed} />;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>
        {props.label}
      </label>
      {inputElement}
      {validationError}
    </div>
  );
}

export default input;