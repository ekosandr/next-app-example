import { AppContext } from 'context/app.context';
import { FirstLevelMenuItem, PageItem } from 'interfaces/menu.interface';
import React, { useContext } from 'react';
import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import { TopLevelCategory } from 'interfaces/page.interface';
import styles from './Menu.module.css';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from 'helpers/helpers';
import { motion } from 'framer-motion';

const Menu = () => {
    const { menu, firstCategory, setMenu } = useContext(AppContext);
    const router = useRouter();
    const variants = {
        visible: {
            marginBottom: 20,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1,
            },
        },
        hidden: { marginBottom: 0 },
    };

    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 29,
        },
        hidden: { opacity: 0, height: 0 },
    };

    const openSecondLevel = (secondCategory: string) => {
        setMenu &&
            setMenu(
                menu.map((m) => {
                    if (m._id.secondCategory === secondCategory) {
                        m.isOpened = true;
                    }
                    return m;
                }),
            );
    };

    const buildFirstLevel = () => {
        return (
            <div className={styles.firstLevelList}>
                {firstLevelMenu.map((m) => {
                    console.log(1, m);

                    return (
                        <div key={m.route}>
                            <Link legacyBehavior href={`/${m.route}`}>
                                <a>
                                    <div
                                        className={cn(styles.firstLevel, {
                                            [styles.firstLevelActive]:
                                                m.id === firstCategory,
                                        })}>
                                        {m.icon}
                                        <span>{m.name}</span>
                                    </div>
                                </a>
                            </Link>

                            {m.id === firstCategory && buildSecondLevel(m)}
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menu.map((m) => {
                    console.log(2, m);
                    if (
                        m.pages
                            .map((p) => p.alias)
                            .includes(router.asPath.split('/')[2])
                    ) {
                        m.isOpened = !m.isOpened;
                    }
                    return (
                        <div key={m._id.secondCategory}>
                            <div
                                className={styles.secondLevel}
                                onClick={() =>
                                    openSecondLevel(m._id.secondCategory)
                                }>
                                {m._id.secondCategory}
                            </div>
                            <motion.div
                                layout
                                variants={variants}
                                initial={'hidden'}
                                animate={m.isOpened ? 'visible' : 'hidden'}
                                className={cn(styles.secondLevelBlock, {
                                    [styles.secondLevelBlockOpened]: m.isOpened,
                                })}>
                                {buildThirdLevel(m.pages, menuItem.route)}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return pages.map((p) => (
            <motion.div key={p._id} variants={variantsChildren}>
                <Link legacyBehavior href={`/${route}/${p.alias}`}>
                    <a
                        className={cn(styles.thirdLevel, {
                            [styles.thirdLevelActive]:
                                `/${route}/${p.alias}` === router.asPath,
                        })}>
                        {p.category}
                    </a>
                </Link>
            </motion.div>
        ));
    };

    return <div>{buildFirstLevel()}</div>;
};

export default Menu;
