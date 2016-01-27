/// <reference path="../../lib/definitions/react.d.ts" />
/// <reference path="../../lib/definitions/react-dom.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as Util from './util';

class DemoProps {
  public name: string;
  public x: number;
  public y: number;
}

class Demo extends React.Component<DemoProps, any> {
  constructor(props: DemoProps) {
    super(props);
  }

  render() {
    return <div>Hello {this.props.name} - {Util.add(this.props.x, this.props.y)}</div>
  }
}

ReactDOM.render(
  <Demo name="Bob" x={2} y={3} />,
  document.getElementById('react-app')
);
