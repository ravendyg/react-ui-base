import React from 'react';
import cn from 'classnames';

import styles from './styles.module.css';

type PageComponentProps = {
    className?: string
}
export const PageComponent: React.FC<PageComponentProps> = (props) => {
    return <div className={cn(styles.Page, props.className)}>
        {props.children}
    </div>;
}
