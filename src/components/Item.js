import React, { useState, useRef } from 'react';
import styles from './Item.module.css';

const Item = (props) => {
    const inputRef = useRef(null);
    const inputRefAmountVE = useRef(null);
    const inputRefAmountPC = useRef(null);
    const selectionRef = useRef(null);

    const [changeAmount, setChangeAmount] = useState(false);

    const uniqueId = () => {
        const dateString = Date.now().toString(36);
        const randomness = Math.random().toString(36).substr(2);
        return dateString + randomness;
    };

    //CRUD OPERATIONS
    const orderItemHandler = (event) => {
        event.preventDefault();
        props.remove(
            {
                _id: props.data.id,
                name: props.data.name,
                code: props.data.code,
                amountVE: props.data.amountVE,
                amountPC: props.data.amountPC,
                history: {
                    orderId: uniqueId(),
                    timestampOrdered: new Date(),
                    amountVE: props.data.amountVE || 0,
                    amountPC: props.data.amountPC || 0,
                    storage: '',
                    initials: '',
                    comment: '',
                    delivered: false,
                },
            },
            'order'
        );
    };
    const removeItemHandler = (event) => {
        event.preventDefault();
        props.remove(
            {
                _id: props.data.id,
                name: props.data.name,
                code: props.data.code,
                amountVE: 0,
                amountPC: 0,
            },
            'delete'
        );
    };

    const editItemHandler = (event) => {
        event.preventDefault();
        setChangeAmount(!changeAmount);
        if (changeAmount) {
            const refAmountVE = Number(inputRefAmountVE.current.value);
            const refAmountPC = Number(inputRefAmountPC.current.value);
            //if statements don't work properly
            if (
                refAmountVE !== props.data.amountVE &&
                refAmountPC !== props.data.amountPC
            ) {
                console.log('VE + PC');
                props.add(
                    {
                        _id: props.data.id,
                        name: props.data.name,
                        code: props.data.code,
                        amountVE: refAmountVE,
                        amountPC: refAmountPC,
                    },
                    'both'
                );
            } else if (refAmountVE !== props.data.amountVE) {
                console.log('VE');
                props.add(
                    {
                        _id: props.data.id,
                        name: props.data.name,
                        code: props.data.code,
                        amountVE: refAmountVE,
                        amountPC: props.data.amountPC,
                    },
                    'both'
                );
            } else if (refAmountPC !== props.data.amountPC) {
                console.log('PC');
                props.add(
                    {
                        _id: props.data.id,
                        name: props.data.name,
                        code: props.data.code,
                        amountVE: props.data.amountVE,
                        amountPC: refAmountPC,
                    },
                    'both'
                );
            }
        }
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (selectionRef.current.value === 'VE') {
            props.add(
                {
                    _id: props.data.id,
                    name: props.data.name,
                    code: props.data.code,
                    amountVE:
                        props.data.amountVE + Number(inputRef.current.value),
                },
                'VE'
            );
        }
        if (selectionRef.current.value === 'PC') {
            props.add(
                {
                    _id: props.data.id,
                    name: props.data.name,
                    code: props.data.code,
                    amountPC:
                        props.data.amountPC + Number(inputRef.current.value),
                },
                'PC'
            );
        }
    };

    const setModalHandler = (event) => {
        event.preventDefault();
        props.modal(true);
        props.orderedItemData({
            _id: props.data.id,
            code: props.data.code,
            name: props.data.name,
            amountVE: props.data.amountVE,
            amountPC: props.data.amountPC,
            history: props.data.history[props.index],
            timestampOrdered: props.data.history[props.index].timestampOrdered,
            orderId: props.data.history[props.index].orderId,
        });
    };

    //CONDITONAL RENDERING
    const AllItems = () => {
        return (
            <div className={styles.row}>
                <p className={styles.biggerFlex}>{props.data.name}</p>
                <p className={styles.otherItems}>{props.data.code}</p>
                <div className={styles.buttonDiv}>
                    <form onSubmit={formSubmitHandler}>
                        <input
                            className={styles.input}
                            ref={inputRef}
                            type="number"
                            min="0"
                            placeholder="0"
                            title="Amount"
                        ></input>
                        <select
                            className={styles.select}
                            ref={selectionRef}
                            title="VE = Verpackungs-Einheiten; PC = Pieces"
                        >
                            <option defaultValue="VE" value="VE">
                                VE
                            </option>
                            <option value="PC">PC</option>
                        </select>
                        <button
                            type="submit"
                            className={styles.buttonSubmit}
                            title='Add to "toOrder"'
                        >
                            <svg className={styles.add} viewBox="0 0 32 32">
                                <g fill="#3cb043">
                                    <path d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"></path>
                                </g>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    const ToOrder = () => {
        return (
            <div className={styles.row}>
                <p className={styles.biggerFlex}>{props.data.name}</p>
                <p className={styles.otherItems}>{props.data.code}</p>
                {changeAmount && (
                    <React.Fragment>
                        <div className={styles.otherItems}>
                            <input
                                className={styles.input}
                                ref={inputRefAmountVE}
                                type="number"
                                min="0"
                                placeholder={props.data.amountVE}
                                title="Amount"
                            ></input>
                        </div>
                        <div className={styles.otherItems}>
                            <input
                                className={styles.input}
                                ref={inputRefAmountPC}
                                type="number"
                                min="0"
                                placeholder={props.data.amountPC}
                                title="Amount"
                            ></input>
                        </div>
                    </React.Fragment>
                )}
                {!changeAmount && (
                    <React.Fragment>
                        <p className={styles.otherItems}>
                            {props.data.amountVE}
                        </p>
                        <p className={styles.otherItems}>
                            {props.data.amountPC}
                        </p>
                    </React.Fragment>
                )}

                <div className={styles.buttonDiv}>
                    {!changeAmount && (
                        <React.Fragment>
                            <button
                                onClick={orderItemHandler}
                                title="Order item"
                            >
                                <svg
                                    className={styles.svg}
                                    fill="#3cb043"
                                    viewBox="0 0 32 32"
                                >
                                    <g id="SVGRepo_iconCarrier">
                                        {' '}
                                        <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
                                    </g>
                                </svg>
                            </button>
                        </React.Fragment>
                    )}
                    <button onClick={editItemHandler} title="Edit from order">
                        <svg
                            className={styles.svg}
                            fill="#FA8128"
                            viewBox="0 0 32 32"
                        >
                            <g id="icon-pencil" viewBox="0 0 32 32">
                                <path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path>
                            </g>
                        </svg>
                    </button>
                    {!changeAmount && (
                        <React.Fragment>
                            <button
                                onClick={removeItemHandler}
                                title='Remove from "toOrder"'
                            >
                                <svg
                                    className={styles.svg}
                                    fill="#EA0B00"
                                    viewBox="0 0 32 32"
                                >
                                    <g id="SVGRepo_iconCarrier">
                                        {' '}
                                        <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
                                        <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
                                    </g>
                                </svg>
                            </button>
                        </React.Fragment>
                    )}
                </div>
            </div>
        );
    };

    const Ordered = () => {
        return (
            <div className={styles.row}>
                <p className={styles.biggerFlex}>{props.data.name}</p>
                <p className={styles.otherItems}>{props.data.code}</p>
                <p className={styles.otherItems}>
                    {props.data.history[props.index].amountVE || 0}
                </p>
                <p className={styles.otherItems}>
                    {props.data.history[props.index].amountPC || 0}
                </p>
                <p className={styles.otherItems}>
                    {props.data.history[props.index].timestampOrdered.slice(
                        0,
                        10
                    )}
                </p>
                <div className={styles.buttonOrderedDiv}>
                    <button
                        onClick={setModalHandler}
                        className={styles.buttonOrdered}
                        title='Mark item as "delivered"'
                    >
                        <svg
                            className={styles.svg}
                            fill="#3cb043"
                            viewBox="0 0 32 32"
                        >
                            <g id="SVGRepo_iconCarrier">
                                {' '}
                                <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

    const Delivered = () => {
        return (
            <div className={styles.row}>
                <p className={styles.biggerFlex}>{props.data.name}</p>
                <p className={styles.mediumFlex}>{props.data.code}</p>
                <p className={styles.otherItems}>
                    {props.data.history.amountVE}
                </p>
                <p className={styles.otherItems}>
                    {props.data.history.amountPC}
                </p>
                <p className={styles.mediumFlex}>
                    {props.data.history.timestampOrdered.slice(0, 10)}
                </p>
                <p className={styles.mediumFlex}>
                    {props.data.history.timestampDelivered.slice(0, 10)}
                </p>
                <p className={styles.mediumFlex}>
                    {props.data.history.initials}
                </p>
                <p className={styles.mediumFlex}>
                    {props.data.history.storage}
                </p>
                <p className={styles.biggerFlex}>
                    {props.data.history.comment}
                </p>
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
            {props.mode === 'delivered' ? <Delivered /> : ''}
        </React.Fragment>
    );
};

export default Item;
