import React, { FC } from 'react';
import { HeaderProps } from './Header.props';
import styles from './P.module.css';
import cn from 'classnames';

const Header: FC<HeaderProps> = ({ ...props }) => {
    return <div {...props}>Header</div>;
};

export default Header;
