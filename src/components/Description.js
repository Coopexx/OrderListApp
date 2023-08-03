import React from 'react';
import styles from './Description.module.css';

const Description = (props) => {
    const AllItems = () => {
        return (
            <React.Fragment>
                <p className={styles.column}>Item</p>
                <p className={`${styles.flex}`}>Exact Code</p>
                <p className={`${styles.flex}`}></p>
            </React.Fragment>
        );
    };

    const ToOrder = () => {
        return (
            <React.Fragment>
                <p className={styles.column}>Item</p>
                <p className={`${styles.flex}`}>Exact Code</p>
                <p
                    className={`${styles.flex}`}
                    title="VE = Verpackungs-Einheiten"
                >
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
                <p className={styles.column}>Item</p>
                <p className={`${styles.flex}`}>Exact Code</p>
                <p
                    className={`${styles.flex}`}
                    title="VE = Verpackungs-Einheiten"
                >
                    VE
                </p>
                <p className={`${styles.flex}`} title="PC = Pieces">
                    PC
                </p>
                <p className={`${styles.flex}`}>Date</p>
                <p className={`${styles.flex}`}>Delivered?</p>
            </React.Fragment>
        );
    };

    const Delivered = () => {
        return (
            <React.Fragment>
                <p className={styles.column}>Item</p>
                <p className={`${styles.biggerFlex}`}>Exact Code</p>
                <p
                    className={`${styles.flex}`}
                    title="VE = Verpackungs-Einheiten"
                >
                    VE
                </p>
                <p className={`${styles.flex}`} title="PC = Pieces">
                    PC
                </p>
                <p className={`${styles.biggerFlex}`}>Ordered</p>
                <p className={`${styles.biggerFlex}`}>Delivered</p>
                <p className={`${styles.biggerFlex}`}>Initials</p>
                <p className={`${styles.biggerFlex}`}>Storage</p>
                <p className={`${styles.column}`}>Comment</p>
            </React.Fragment>
        );
    };

    return (
        <div className={styles.row}>
            {props.mode === 'allItems' ? <AllItems /> : ''}
            {props.mode === 'toOrder' ? <ToOrder /> : ''}
            {props.mode === 'ordered' ? <Ordered /> : ''}
            {props.mode === 'delivered' ? <Delivered /> : ''}
            <p></p>
        </div>
    );
};

export default Description;
