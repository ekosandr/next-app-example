import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import React, { FC } from 'react';
import { LayoutProps } from './Layout.props';

import styles from './Layout.module.css';
import { AppContextProvider, IAppContext } from 'context/app.context';

export const Layout: FC<LayoutProps> = ({ children, ...props }) => {
    return (
        <div className={styles.wrapper}>
            <Header className={styles.header} />
            <Sidebar className={styles.sidebar} />
            <div className={styles.body}>{children}</div>

            <Footer className={styles.footer} />
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
    Component: FC<T>,
) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider
                menu={props.menu}
                firstCategory={props.firstCategory}
                setMenu={props.setMenu}>
                <Layout>
                    <Component {...props} />
                </Layout>
            </AppContextProvider>
        );
    };
};
