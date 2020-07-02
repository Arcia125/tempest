import React from 'react';

interface ErrorState {
  error: any;
  info: any;
}

export default class ErrorBoundary extends React.Component<{
  onError: (errorState: ErrorState) => void;
}> {
  state = { error: null, info: null };
  componentDidCatch(error: any, info: any) {
    const state = { error, info };
    this.setState(state);
    this.props.onError(state);
  }
  render() {
    return this.props.children;
  }
}
