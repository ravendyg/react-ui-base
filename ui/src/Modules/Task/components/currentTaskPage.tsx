import React from 'react';
import { observer } from 'mobx-react-lite';
import { Spin } from 'antd';

import { useDeps } from 'deps';
import { PageComponent } from 'Modules/Router/components/pageComponent';
import styles from './styles.module.css';
import { CurrentTaskComponent } from './currentTaskComponent';
import { NeedToCreateComponent } from './needToCreateComponent';

export const CurrentTaskPage: React.FC<{}> = observer(() => {
    const { task } = useDeps();

    if (task.loadingCurrent || task.loadingNeedToCreate) {
        return <PageComponent className={styles.CurrentTaskPage}>
            <Spin size='small' />
        </PageComponent>;
    }

    return <PageComponent className={styles.CurrentTaskPage}>
        <NeedToCreateComponent />
        <CurrentTaskComponent />
    </PageComponent>;
});
