import React from 'react';
import { Spin } from 'antd';

import styles from './spiner-overlay.module.css';

export class SpinnerOverlay extends React.PureComponent<{ displayed: boolean }, {}> {
    render() {
        return this.props.displayed && <div className={styles.SpinerOverlay}>
            <Spin size='large' />
        </div>;
    }
}
