import React from 'react';
import styles from './Description.module.css';

const Description = (props) => {
    const AllItems = () => {
        return (
            <React.Fragment>
                <p className={`${styles.column} ${styles.flex}`}>VE</p>
                <p className={`${styles.column} ${styles.flex}`}>
                    <svg className={styles.svg} viewBox="0 0 32 32">
                        <g fill="#3cb043">
                            <path d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"></path>
                        </g>
                    </svg>
                </p>
            </React.Fragment>
        );
    };

    const ToOrder = () => {
        return (
            <React.Fragment>
                <p className={`${styles.column} ${styles.flex}`}>VE</p>
                <p className={`${styles.column} ${styles.flex}`}>
                    <svg className={styles.svg} viewBox="0 0 32 32">
                        <g fill="#d0312d">
                            <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
                            <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
                        </g>
                    </svg>
                </p>
            </React.Fragment>
        );
    };

    const Ordered = () => {
        return (
            <React.Fragment>
                <p className={`${styles.column} ${styles.flex}`}>Date</p>
                <p className={`${styles.column} ${styles.flex}`}>Amount</p>
            </React.Fragment>
        );
    };

    return (
        <div className={styles.row}>
            <p className={styles.column}>Item</p>
            <p className={`${styles.column} ${styles.flex}`}>Exact Code</p>
            {props.mode === 'allItems' ? <AllItems /> : ''}
            {props.mode === 'toOrder' ? <ToOrder /> : ''}
            {props.mode === 'ordered' ? <Ordered /> : ''}
        </div>
    );
};

export default Description;
