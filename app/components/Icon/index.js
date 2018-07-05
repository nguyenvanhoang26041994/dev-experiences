// @flow
import * as React from 'react';
import classNames from 'classnames';

import './style';
import './app.font';

type Props = {
  children?: React.Node,
  type: string,
  className?: string,
  rest?: Array<any>,
};

export default class Icon extends React.PureComponent<Props> {
  static defaultProps = {
    className: '',
  };

  render(): React.Node {
    const { type, className, ...rest } = this.props;
    return (
      <span
        className={classNames('anticon', `app-icon-${type}`, className)}
        {...rest}
      />
    );
  }
}
