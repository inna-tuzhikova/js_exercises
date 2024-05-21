import React from 'react';
import './index.css';
import cn from "classnames";

const Base = ({text, className}) => {
    const ccn = cn ('base', className);
    return <div className={ccn}>{text}</div>;
  };

export default Base;
  