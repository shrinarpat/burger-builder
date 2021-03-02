import React, { Component } from 'react';

import Auxilary from '../Auxilary/auxilary';
import classes from './layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/sideDrawer';
import Backdrop from '../../components/UI/Backdrop/backdrop';

class Layout extends Component {
  state = {
    showBackdrop: false
  }

  closeBackdropHandler = () => {
    this.setState({ showBackdrop: false })
  }
  openBackdropHandler = () => {
    this.setState({ showBackdrop: true })
  }
  render() {
    return (
      <Auxilary>
        <Backdrop show={this.state.showBackdrop}
          clicked={this.closeBackdropHandler} />
        <Toolbar
          clicked={this.openBackdropHandler} />
        <SideDrawer
          open={this.state.showBackdrop} />
        <div className={classes.Content}>{this.props.children}</div>
      </Auxilary>
    );
  }
}

export default Layout;