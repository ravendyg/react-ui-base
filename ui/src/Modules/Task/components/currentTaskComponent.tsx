import { useDeps } from 'deps';
import React from 'react';
import cn from 'classnames';

import styles from './styles.module.css';

export const CurrentTaskComponent: React.FC<{}> = () => {
    const { currentTask } = useDeps().task;
    if (!currentTask) {
        return <div className={cn(styles.CurrentTaskComponent, styles.CurrentTaskPage__block)}>
            <div>
                #text Вы повторили все фразы на сегодня.
            </div>
        </div>;
    }
    return <div className={styles.CurrentTaskComponent}>

    </div>;
};
