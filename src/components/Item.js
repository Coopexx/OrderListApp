import React, { useState, useRef } from 'react';
import styles from './Item.module.css';

const Item = (props) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

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
            amount: props.data.amount + Number(inputRef.current.value),
        });
        inputRef.current.value = '';
    };

    //CONDITONAL RENDERING
    const AllItems = () => {
        return (
            <div className={styles.row}>
                <p className={styles.biggerFlex}>{props.data.name}</p>
                <p className={styles.otherItems}>{props.data.code}</p>
                <form
                    onSubmit={formSubmitHandler}
                    className={styles.otherItems}
                >
                    <input
                        className={styles.input}
                        ref={inputRef}
                        type="number"
                        min="0"
                    ></input>
                    <p className={styles.VE}>VE</p>
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
                        <svg
                            className={styles.svg}
                            fill="#000000"
                            height="200px"
                            width="200px"
                            version="1.1"
                            id="Capa_1"
                            viewBox="0 0 460.775 460.775"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {' '}
                                <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path>{' '}
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

    const Ordered = () => {
        return (
            <div className={styles.row}>
                <React.Fragment>
                    <p className={styles.biggerFlex}>{props.data.name}</p>
                    <p className={styles.otherItems}>{props.data.code}</p>
                </React.Fragment>

                <React.Fragment>
                    <p className={styles.otherItems}>
                        {props.data.history[props.index].timestamp.slice(0, 10)}
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
