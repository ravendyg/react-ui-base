import { observer } from 'mobx-react-lite';
import { PageComponent } from 'Modules/Router/components/pageComponent';
import React from 'react';

import styles from './styles.module.css';

export const AddTaskPage: React.FC<{}> = observer(() => {
    return <PageComponent className={styles.CurrentTaskPage}>
        AddTaskPage
    </PageComponent>;
});
