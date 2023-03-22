import React, { useState } from 'react';
import styles from './Item.module.css';

const Item = (props) => {
    const [inputValue, setInputValue] = useState('');

    //CRUD OPERATIONS
    const removeItemHandler = () => {
        props.remove({
            _id: props.data.id,
            name: props.data.name,
            code: props.data.code,
            amount: props.data.amount,
            history: { timestamp: new Date(), amount: props.data.amount },
        });
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

    //CONDITONAL RENDERING
    const AllItems = () => {
        return (
            <React.Fragment>
                <p className={styles.otherItems}>{props.data.amount}</p>
                <form
                    onSubmit={formSubmitHandler}
                    className={styles.otherItems}
                >
                    <input
                        className={styles.input}
                        onChange={inputChangeHandler}
                        value={inputValue}
                        type="number"
                        min="0"
                    ></input>
                </form>
            </React.Fragment>
        );
    };

    const ToOrder = () => {
        return (
            <React.Fragment>
                <p className={styles.otherItems}>{props.data.amount}</p>
                <button
                    onClick={removeItemHandler}
                    className={styles.otherItems}
                >
                    Remove
                </button>
            </React.Fragment>
        );
    };

    const Ordered = () => {
        // console.log(Date());
        //Date needs to be extracted, when server posting date works
        return (
            <React.Fragment>
                {props.data.history.map((itemObj, i) => {
                    return (
                        <React.Fragment>
                            <p className={styles.otherItems}>
                                {props.data.history[i].timestamp}
                            </p>
                            <p className={styles.otherItems}>
                                {props.data.history[i].amount}
                            </p>
                        </React.Fragment>
                    );
                })}
            </React.Fragment>
        );
    };

    return (
        <div className={styles.history}>
            <p className={styles.biggerFlex}>{props.data.name}</p>
            <p className={styles.otherItems}>{props.data.code}</p>
            {props.mode === 'allItems' ? <AllItems /> : ''}
            {props.mode === 'toOrder' ? <ToOrder /> : ''}
            {props.mode === 'ordered' ? (
                <Ordered key={props.data.history[0].timestamp} />
            ) : (
                ''
            )}
        </div>
    );
};

export default Item;
