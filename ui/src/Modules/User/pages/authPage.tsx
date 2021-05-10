import React from 'react';
import GoogleButton from 'react-google-button';
import { observer } from 'mobx-react-lite';

import { PageComponent } from 'Modules/Router/components/pageComponent';
import { useDeps } from 'deps';
import styles from './styles.module.css';
import { SpinnerOverlay } from 'Components/SpinerOverlay';

export const AuthPage: React.FC<{}> = observer(() => {
    const { user } = useDeps();

    return <PageComponent className={styles.AuthPage}>
        <h2 className={styles.AuthPage__title}>
            Auth page
        </h2>
        <GoogleButton onClick={user.loginWithGoogle} />
        <SpinnerOverlay displayed={user.loading} />
    </PageComponent>;
});
