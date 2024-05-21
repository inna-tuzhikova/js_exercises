import React from 'react';
import Sizer from './../sizer';
import './index.css';
import cn from "classnames";

const Item = ({className}) => {
  const ccn = cn ('bg', className);
  return <Sizer className={ccn} />;
  };

export default Item;
  