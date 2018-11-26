// @flow
import React from 'react';

// 型を定義
type Props = {
  name: string;
};

const Heading = (props: Props) => {
  const { name } = props;
  return <h1>{`Hello ${name} World`}</h1>;
};

export default Heading;
