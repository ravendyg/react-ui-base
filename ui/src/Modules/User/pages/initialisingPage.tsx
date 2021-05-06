import React from 'react';
import { Spin } from 'antd';

import styles from './styles.module.css';
import { PageComponent } from 'Modules/Pages/components/pageComponent';

export const InitialisingPageComponent: React.FC<{}> = () => {
    return <PageComponent className={styles.InitialisingPage}>
        <Spin size='large' />
    </PageComponent>;
};

export const InitialisingPage = React.memo(InitialisingPageComponent);
