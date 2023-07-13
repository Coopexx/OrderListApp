import React from 'react';
import styles from './Description.module.css';

const Description = (props) => {
    const AllItems = () => {
        return (
            <React.Fragment>
                <p className={`${styles.flex}`}>Exact Code</p>
                <p className={`${styles.flex}`}></p>
            </React.Fragment>
        );
    };

    const ToOrder = () => {
        return (
            <React.Fragment>
                <p className={`${styles.flex}`}>Exact Code</p>
                <p className={`${styles.flex}`} title="VE = Volumen-Einheiten">
                    VE
                </p>
                <p className={`${styles.flex}`} title="PC = Pieces">
                    PC
                </p>
                <p className={`${styles.flex}`}></p>
            </React.Fragment>
        );
    };

    const Ordered = () => {
        return (
            <React.Fragment>
                <p className={`${styles.empty}`}></p>
                <p className={`${styles.flex}`}>Exact Code</p>
                <p className={`${styles.empty2}`}></p>
                <p className={`${styles.flex}`}>Date</p>
                <p className={`${styles.empty3}`}></p>
                <p className={`${styles.flex}`} title="VE = Volumen-Einheiten">
                    VE
                </p>
                <p className={`${styles.empty4}`}></p>
                <p className={`${styles.flex}`} title="PC = Pieces">
                    PC
                </p>
                <p className={`${styles.flex}`}>Delivered?</p>
            </React.Fragment>
        );
    };

    const Delivered = () => {
        return (
            <React.Fragment>
                <p className={`${styles.column} ${styles.flex}`}>Exact Code</p>
                <p className={`${styles.column} ${styles.flex}`}>Ordered</p>
                <p className={`${styles.column} ${styles.flex}`}>Delivered</p>
                <p
                    className={`${styles.column} ${styles.flex}`}
                    title="VE = Volumen-Einheiten"
                >
                    VE
                </p>
                <p
                    className={`${styles.column} ${styles.flex}`}
                    title="PC = Pieces"
                >
                    PC
                </p>
            </React.Fragment>
        );
    };

    return (
        <div className={styles.row}>
            <p className={styles.column}>Item</p>
            {props.mode === 'allItems' ? <AllItems /> : ''}
            {props.mode === 'toOrder' ? <ToOrder /> : ''}
            {props.mode === 'ordered' ? <Ordered /> : ''}
            {props.mode === 'delivered' ? <Delivered /> : ''}
            <p></p>
        </div>
    );
};

export default Description;
