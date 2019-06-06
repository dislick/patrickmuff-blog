import React from 'react';
import classnames from 'classnames';
import styles from './current_age.module.css';

const getAgeFloat = birthday => {
  return (Date.now() - birthday.getTime()) / 1000 / 60 / 60 / 24 / 365.25;
};

/**
 * A playful component to display a persons age like `25.123456789`.
 */
export const CurrentAge = props => {
  const [age, setAge] = React.useState(getAgeFloat(props.birthday));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAgeFloat(props.birthday));
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [props.birthday]);

  return (
    <span className={classnames('monospace', styles.root)}>
      {age.toFixed(9)}
    </span>
  );
};
