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
            <div className={styles.row}>
                <p className={styles.biggerFlex}>{props.data.name}</p>
                <p className={styles.otherItems}>{props.data.code}</p>
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
            </div>
        );
    };

    const ToOrder = () => {
        return (
            <div className={styles.row}>
                <p className={styles.biggerFlex}>{props.data.name}</p>
                <p className={styles.otherItems}>{props.data.code}</p>
                <p className={styles.otherItems}>{props.data.amount}</p>
                <div className={styles.buttonDiv}>
                    <button
                        onClick={removeItemHandler}
                        className={styles.trash}
                    >
                        <svg className={styles.svg} viewBox="0 0 32 32">
                            <g fill="#000">
                                <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

    const Ordered = () => {
        // console.log(Date());
        //Date needs to be extracted, when server posting date works
        return (
            <div className={styles.row}>
                <React.Fragment>
                    <p className={styles.biggerFlex}>{props.data.name}</p>
                    <p className={styles.otherItems}>{props.data.code}</p>
                </React.Fragment>

                <React.Fragment>
                    <p className={styles.otherItems}>
                        {props.data.history[props.index].timestamp}
                    </p>
                    <p className={styles.otherItems}>
                        {props.data.history[props.index].amount}
                    </p>
                </React.Fragment>
            </div>
        );
    };
    return (
        <React.Fragment>
            {props.mode === 'allItems' ? <AllItems /> : ''}
            {props.mode === 'toOrder' ? <ToOrder /> : ''}
            {props.mode === 'ordered' ? (
                <Ordered key={props.data.history[0].timestamp} />
            ) : (
                ''
            )}
        </React.Fragment>
    );
};

export default Item;
