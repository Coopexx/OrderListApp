import React, { useState } from 'react';
import styles from './Item.module.css';
const classNames = require('classnames');

const Item = (props) => {
    const [isActive, setIsActive] = useState(false);
    const [add, setAdd] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const removeItemHandler = () => {
        setIsActive(true);
        props.remove({
            _id: props.data.id,
            name: props.data.name,
            code: props.data.code,
            amount: props.data.amount,
            history: { timestamp: Date.now(), amount: props.data.amount },
        });
    };

    const changeClassHandler = () => {
        if (isActive) {
            return true;
        } else {
            return false;
        }
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        props.add({
            _id: props.data.id,
            name: props.data.name,
            code: props.data.code,
            amount: props.data.amount + Number(inputValue),
        });
        setInputValue('');
    };

    const inputChangeHandler = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className={styles.history}>
            <p className={styles.biggerFlex}>{props.data.name}</p>
            <p className={styles.otherItems}>{props.data.code}</p>
            <p className={styles.otherItems}>{props.data.amount}</p>
            <form onSubmit={formSubmitHandler}>
                <input
                    className={styles.input}
                    onChange={inputChangeHandler}
                    value={inputValue}
                    type="number"
                    min="0"
                ></input>
            </form>
        </div>
    );
};

export default Item;
