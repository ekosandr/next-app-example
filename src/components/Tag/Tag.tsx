import React from 'react';
import { TagProps } from './Tag.props';
import styles from './Tag.module.css';
import cn from 'classnames';

const Tag = ({
    size = 'm',
    children,
    color = 'ghost',
    href,
    className,
    ...props
}: TagProps) => {
    return (
        <div
            className={cn(styles.tag, className, {
                [styles.s]: size === 's',
                [styles.m]: size === 'm',
                [styles.ghost]: color === 'ghost',
                [styles.red]: color === 'red',
                [styles.primary]: color === 'ghost',
                [styles.grey]: color === 'grey',
                [styles.green]: color === 'green',
            })}
            {...props}>
            {href ? <a href={href}>{children}</a> : <>{children}</>}
        </div>
    );
};

export default Tag;
