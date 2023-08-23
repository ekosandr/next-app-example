import React, { FC } from 'react';
import { CardProps } from './Card.props';
import styles from './Card.module.css';
import cn from 'classnames';

const Card: FC<CardProps> = ({
    children,
    className,
    color = 'white',
    ...props
}) => {
    return (
        <div
            {...props}
            className={cn(styles.card, className, {
                [styles.blue]: color === 'blue',
            })}>
            {children}
        </div>
    );
};

export default Card;
