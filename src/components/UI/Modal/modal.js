import React, { Component } from 'react';

import classes from './modal.module.css';
import Auxilary from '../../../hoc/Auxilary/auxilary';
import Backdrop from '../Backdrop/backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }
  componentDidUpdate() {
    console.log('[Modal] component');
  }
  render() {
    return (
      <Auxilary>
        <Backdrop show={this.props.show} clicked={this.props.modelClose} />
        <div className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? 1 : 0
          }}>
          {this.props.children}
        </div>
      </Auxilary>
    );
  }
}

export default Modal;