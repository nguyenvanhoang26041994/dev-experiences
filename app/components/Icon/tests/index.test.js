import React from 'react';
import renderer from 'react-test-renderer';

import Icon from '../index';

describe('<Icon />', () => {
  it('Snapshoot', () => {
    const tree = renderer.create(<Icon type="sometype" className="someclassname" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
