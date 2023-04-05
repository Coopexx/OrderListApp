import React from 'react';
import styles from './Description.module.css';

const Description = (props) => {
    const AllItems = () => {
        return (
            <React.Fragment>
                <p className={`${styles.column} ${styles.flex}`}></p>
            </React.Fragment>
        );
    };

    const ToOrder = () => {
        return (
            <React.Fragment>
                <p className={`${styles.column} ${styles.flex}`}>VE</p>
                <p className={`${styles.column} ${styles.flex}`}>PC</p>
                <p className={`${styles.column} ${styles.flex}`}></p>
            </React.Fragment>
        );
    };

    const Ordered = () => {
        return (
            <React.Fragment>
                <p className={`${styles.column} ${styles.flex}`}>Date</p>
                <p className={`${styles.column} ${styles.flex}`}>VE</p>
                <p className={`${styles.column} ${styles.flex}`}>PC</p>
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
            <p></p>
        </div>
    );
};

export default Description;
