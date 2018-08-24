/* eslint-disable prettier/prettier, no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LoveWrapper = styled.div`
  display: flex;
  margin: 4px 0;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  padding: 30px 15px;
  border-radius: 8px;
  background-color: ${props => props.color};
`;

class Love extends React.PureComponent {
  componentDidMount() {
    $('.love').fadeOut(500).fadeIn(500);
  }
  render() {
    const { color, content } = this.props;
    return (
      <LoveWrapper className="love" color={color}>
        {content}
      </LoveWrapper>
    );
  }
};

Love.propTypes = {
  content: PropTypes.string,
  color: PropTypes.string,
};

export default Love;
