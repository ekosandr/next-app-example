import React, { useEffect, useReducer } from 'react';
import { TopPageComponentProps } from './TopPageComponent.props';
import Htag from '@/components/Htag/Htag';
import Tag from '@/components/Tag/Tag';
import styles from './TopPageComponent.module.css';
import { HhData } from '@/components/HhData/HhData';
import { TopLevelCategory } from 'interfaces/page.interface';
import { Advantages } from '@/components/Advantages/Advantages';
import { Sort } from '@/components/Sort/Sort';
import { SortEnum } from '@/components/Sort/Sort.props';
import { sortReducer } from './sort.reducer';
import { Product } from '@/components/Product/Product';

const TopPageComponent = ({
    page,
    products,
    firstCategory,
}: TopPageComponentProps) => {
    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
        sortReducer,
        { products, sort: SortEnum.Rating },
    );

    const setSort = (sort: SortEnum) => {
        dispatchSort({ type: sort });
    };

    useEffect(() => {
        dispatchSort({ type: 'reset', initialState: products });
    }, [products]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {products && (
                    <Tag color="grey" size="m">
                        {products.length}
                    </Tag>
                )}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2">Вакансии - {page.category}</Htag>
                <Tag color="red" size="m">
                    hh.ru
                </Tag>
            </div>
            <div role="list">
                {sortedProducts &&
                    sortedProducts.map((p) => (
                        <Product
                            role="listitem"
                            // layout={shouldReduceMotion ? false : true}
                            key={p._id}
                            product={p}
                        />
                    ))}
            </div>
            <div className={styles.hh}>
                {firstCategory === TopLevelCategory.Courses && page.hh && (
                    <HhData
                        count={page.hh.count}
                        juniorSalary={page.hh.juniorSalary}
                        middleSalary={page.hh.middleSalary}
                        seniorSalary={page.hh.seniorSalary}
                    />
                )}
                {page.advantages && page.advantages.length > 0 && (
                    <>
                        <Htag tag="h2">Преимущства</Htag>
                        <Advantages advantages={page.advantages} />
                    </>
                )}
                {page.seoText && (
                    <div
                        className={styles.seo}
                        dangerouslySetInnerHTML={{ __html: page.seoText }}
                    />
                )}
                <Htag tag="h2">Получаемые навыки</Htag>
                {page.tags.map((t) => (
                    <Tag key={t} color="primary" size="s">
                        {t}
                    </Tag>
                ))}
            </div>
        </div>
    );
};

export default TopPageComponent;
