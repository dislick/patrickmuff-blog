import React from 'react';

const secondsToYearsFraction = seconds => {
  return seconds / 60 / 60 / 24 / 365.25;
};

const getAgeInSeconds = birthday => {
  return Math.round((Date.now() - birthday.getTime()) / 1000);
};

/**
 * A playful component to display a persons age in seconds (and years).
 */
export const CurrentAge = props => {
  const [age, setAge] = React.useState(getAgeInSeconds(props.birthday));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAgeInSeconds(props.birthday));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [props.birthday]);

  return (
    <span>
      {age.toLocaleString()} seconds (
      {secondsToYearsFraction(age).toFixed(1) + ' years'})
    </span>
  );
};
