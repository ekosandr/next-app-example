import React, { FC } from 'react';
import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';
import cn from 'classnames';

const Footer: FC<FooterProps> = ({ className, ...props }) => {
    return (
        <footer className={cn(className, styles.footer)} {...props}>
            <div>@2023г. Все права защищены</div>
            <a href="#" target="_blank">
                Пользовательское соглашение
            </a>
            <a href="#" target="_blank">
                Политика конфиденциальности
            </a>
        </footer>
    );
};

export default Footer;
