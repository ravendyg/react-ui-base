import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useDeps } from 'deps';
import { ROUTES } from 'Modules/Router/constants';
import styles from './styles.module.css';

export const NeedToCreateComponent: React.FC<{}> = observer(() => {
    const { needToCreate } = useDeps().task;
    if (!needToCreate) return null;

    return <div className={cn(styles.NeedToCreate, styles.CurrentTaskPage__block)}>
        <div>
            #text Сегодня вы добавили {needToCreate.added} фраз из {needToCreate.required}.
        </div>
        <div>
            #text <Link to={ROUTES.ADD_TASK}>Добавьте ещё</Link>, чтобы не остаться без практики.
        </div>
    </div>;
});
