import React, { useState } from 'react';

import { Inter } from '@next/font/google';
import Htag from '@/components/Htag/Htag';
import Btn from '@/components/Btn/Btn';
import Rating from '@/components/Rating/Rating';
import { withLayout } from '@/layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { MenuItem } from 'interfaces/menu.interface';

const inter = Inter({ subsets: ['latin'] });

function Home({ menu, fisrtCategory }: HomeProps): JSX.Element {
    return (
        <>
            <Htag tag="h1">Text</Htag>
            <Btn appearence="primary" arrow="down">
                Button
            </Btn>
            <Rating rating={3} />
            <ul>
                {menu.map((i, k) => (
                    <li key={k}>{i._id.secondCategory}</li>
                ))}
            </ul>
        </>
    );
}
export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
        { firstCategory },
    );

    return {
        props: {
            menu,
            firstCategory,
        },
    };
};

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}
