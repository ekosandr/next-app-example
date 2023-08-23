import React from 'react';
import { BtnProps } from './Btn.props';
import styles from './Btn.module.css';
import cn from 'classnames';

const Btn = ({ children, appearence, className, arrow = 'none', ...props }: BtnProps) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearence === 'primary',
        [styles.ghost]: appearence === 'ghost',
      })}
      {...props}>
      {children}
      {arrow !== 'none' ? (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow === 'down',
            [styles.rigtht]: arrow === 'rigtht',
          })}>
          <img src="./arrow.svg" />
        </span>
      ) : (
        false
      )}
    </button>
  );
};

export default Btn;
