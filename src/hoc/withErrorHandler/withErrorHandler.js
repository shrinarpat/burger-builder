import React, { Component } from 'react';

import Auxilary from '../Auxilary/auxilary';
import Modal from '../../components/UI/Modal/modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null
      };
    }

    componentWillMount() {
      this.reqInterceptoes = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptoes = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptoes);
      axios.interceptors.response.eject(this.resInterceptoes);
    }

    errorConfirmed = () => {
      this.setState({ error: null });
    }
    render() {
      return (
        <Auxilary>
          <Modal show={this.state.error} modelClose={this.errorConfirmed}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxilary>
      );
    }
  }
}

export default withErrorHandler;