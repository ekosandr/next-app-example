import React, { FC } from 'react';
import { SidebarProps } from './Sidebar.props';
import styles from './sidebar.module.css';
import cn from 'classnames';
import Menu from '../Menu/Menu';
import Logo from './logo.svg';
import { Search } from '../Search/Search';
const Sidebar: FC<SidebarProps> = ({ className, ...props }) => {
    return (
        <div className={cn(className, styles.sidebar)} {...props}>
            <Logo />
            <Search />
            <Menu />
        </div>
    );
};

export default Sidebar;
