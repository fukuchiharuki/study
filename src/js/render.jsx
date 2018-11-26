// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Heading from './heading';

class Render {
  constructor(targetId: string) {
    const target = document.getElementById(targetId);
    if (target) this.render(target);
  }

  render(target: HTMLElement) {
    ReactDOM.render(<Heading name="nekomimi" />, target);
  }
}

export default new Render('nekomimi-frontend');
