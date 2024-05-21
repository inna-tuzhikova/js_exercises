import React from 'react';
import Base from './../base';
import './index.css';
import cn from "classnames";

const Item = ({className}) => {
    const ccn = cn ('sizer', className);
    return <Base className={ccn} text='Hello, world!'/>;
  };

export default Item;
  