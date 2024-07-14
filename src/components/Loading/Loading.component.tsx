import React from 'react';
import classes from './Loading.module.scss';

const Loading: React.FC = () => {
    return (
        <div className={classes.loading}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Loading;