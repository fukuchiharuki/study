// @flow
import React from 'react';
import styles from '../css/heading.css';

// 型を定義
type Props = {
  name: string;
};

const Heading = (props: Props) => {
  const { name } = props;
  return (
    <h2 className={styles.text}>
      {`Hello ${name} World`}
      <span className={styles.sub}>will nest work?</span>
    </h2>
  );
};

export default Heading;
