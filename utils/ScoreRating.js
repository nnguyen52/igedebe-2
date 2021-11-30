import React, { useEffect, useState } from 'react';
const ScoreRating = ({ number }) => {
  const [score, setScore] = useState(undefined);
  const [color, setColor] = useState(undefined);
  useEffect(() => {
    if (!number) setScore('No rating');
    if (number > 0 && number <= 20) {
      setScore('Sad');
      setColor('#ff0000');
    }
    if (number > 20 && number <= 40) {
      setScore('Ehh...');
      setColor('#ff6060');
    }
    if (number > 40 && number <= 60) {
      setScore('Mixed');
      setColor('#f1ff00');
    }
    if (number > 60 && number <= 80) {
      setScore('Great!');
      setColor('#7dff00');
    }
    if (number > 80 && number <= 100) {
      setScore('Superb!');
      setColor('#7dff00');
    }
  }, [number]);
  return (
    <div className="score_rating" style={{ color: color ? color : 'grey' }}>
      {score}
    </div>
  );
};
export const colorRating = (number) => {
  if (!number) return 'grey';
  if (number > 0 && number <= 20) {
    return '#ff0000';
  }
  if (number > 20 && number <= 40) {
    return '#ff6060';
  }
  if (number > 40 && number <= 60) {
    return '#f1ff00';
  }
  if (number > 60 && number <= 80) {
    return '#7dff00';
  }
  if (number > 80 && number <= 100) {
    return '#1fff00';
  }
};
export default ScoreRating;
