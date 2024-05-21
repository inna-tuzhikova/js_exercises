import React from 'react';
import Bg from './../background_painter';
import './index.css';
import cn from "classnames";

const Item = ({className}) => {
    const ccn = cn(className, 'font');
    return <Bg className={ccn} />;
  };

export default Item;
  