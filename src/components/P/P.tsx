import React, { FC } from 'react';
import { PProps } from './P.props';
import styles from './P.module.css';
import cn from 'classnames';

const P: FC<PProps> = ({ children, size = 'm', className, ...props }) => {
    return (
        <p
            className={cn(styles.p, className, {
                [styles.s]: size === 's',
                [styles.m]: size === 'm',
                [styles.l]: size === 'l',
            })}
            {...props}>
            {children}
        </p>
    );
};

export default P;
