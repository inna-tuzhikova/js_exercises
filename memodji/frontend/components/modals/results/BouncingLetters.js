import React from 'react';
import { useStyles } from './../../../util';
import BouncingLetterStyle from './../../../assets/styles/BouncingLetterStyle';

const BouncingLetters = ({text}) => {
  const classes = useStyles(BouncingLetterStyle);
  const letters = text.split('');
  const animationDurationSec = 1;
  const delta = animationDurationSec / letters.length;
  let styleSheet = document.styleSheets[0];
  let keyframes =
  `@keyframes letter_animation {
    0% {transform: scaleY(1);}
    50% {transform: scaleY(1.5);}
    100% {transform: scaleY(1);}
  }`;
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  return (
    <>
      {letters.map((letter, idx) =>
        <span
          key={idx}
          className={classes.letter}
          style={{
            animationDuration: `${animationDurationSec}s`,
            animationDelay: `${-animationDurationSec + idx*delta}s`,}}>
              {letter}
        </span>)}
    </>
  );
};

export default BouncingLetters;
