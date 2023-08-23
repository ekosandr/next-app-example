import React, { useState } from 'react';

import { Inter } from '@next/font/google';
import { withLayout } from '@/layout/Layout';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import axios from 'axios';
import { MenuItem } from 'interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from 'interfaces/page.interface';
import { ParsedUrlQuery } from 'node:querystring';
import { ProductModel } from 'interfaces/product.interface';
import { firstLevelMenu } from 'helpers/helpers';
import TopPageComponent from '@/components/pageComponents/TopPageComponent/TopPageComponent';

function TopPage(props: TopPageProps): JSX.Element {
    return <TopPageComponent {...props} />;
}
export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];

    for (const m of firstLevelMenu) {
        const { data: menu } = await axios.post<MenuItem[]>(
            process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
            { firstCategory: m.id },
        );

        paths = paths.concat(
            menu.flatMap((menu) =>
                menu.pages.map((page) => `/${m.route}/` + page.alias),
            ),
        );
    }

    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
    params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true,
        };
    }
    const firstCategoryItem = firstLevelMenu.find(
        (m) => m.route === params.type,
    );

    if (!firstCategoryItem) {
        return {
            notFound: true,
        };
    }

    try {
        const { data: menu } = await axios.post<MenuItem[]>(
            process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
            { firstCategory: firstCategoryItem.id },
        );

        if (!menu) {
            return {
                notFound: true,
            };
        }

        const { data: page } = await axios.get<TopPageModel>(
            process.env.NEXT_PUBLIC_DOMAIN +
                '/api/top-page/byAlias/' +
                params.alias,
        );

        const { data: products } = await axios.post<ProductModel[]>(
            process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find',
            {
                category: page.category,
                limit: 10,
            },
        );

        return {
            props: {
                menu,
                firstCategory: firstCategoryItem.id,
                page,
                products,
            },
        };
    } catch {
        return {
            notFound: true,
        };
    }
};

interface TopPageProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}
