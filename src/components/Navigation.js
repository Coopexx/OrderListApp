import React, { useState, useEffect } from 'react';

import styles from './Navigation.module.css';

const Navigation = (props) => {
    const [textfield, setTextfield] = useState('');
    const [filter, setFilter] = useState('');
    const [allItemsClicked, setAllItemsClicked] = useState(false);
    const [toOrderClicked, setToOrderClicked] = useState(false);
    const [orderedClicked, setOrderedClicked] = useState(false);
    const [deliveredClicked, setDeliveredClicked] = useState(false);
    const [type, setType] = useState('allItems');

    const showTextfield = () => {
        if (textfield) {
            setTextfield('');
        } else {
            setTextfield(1);
        }
    };
    const formSubmitHandler = (event) => {
        event.preventDefault();
        setFilter('');
    };

    const filterChangeHandler = (event) => {
        setFilter(event.target.value);
        props.filterHandler(event.target.value, type);
    };

    const resetAll = () => {
        setAllItemsClicked(false);
        setToOrderClicked(false);
        setOrderedClicked(false);
        setDeliveredClicked(false);
    };

    const changeModeHandler = (type) => {
        setType(type);
        if (type === 'allItems') {
            resetAll();
            props.modeHandler('allItems');
            setAllItemsClicked(true);
        }
        if (type === 'toOrder') {
            resetAll();
            props.modeHandler('toOrder');
            setToOrderClicked(true);
        }
        if (type === 'ordered') {
            resetAll();
            props.modeHandler('ordered');
            setOrderedClicked(true);
        }
        if (type === 'delivered') {
            resetAll();
            props.modeHandler('delivered');
            setDeliveredClicked(true);
        }
        setFilter('');
        setTextfield('');
    };
    useEffect(() => {
        setAllItemsClicked(true);
    }, []);

    return (
        <div className={styles.background}>
            <div className={styles.column}>
                <p
                    onClick={() => {
                        changeModeHandler('allItems');
                    }}
                    className={`${allItemsClicked ? styles.active : null} ${
                        styles.navItem
                    }`}
                >
                    ALL ITEMS
                </p>
                <p
                    onClick={() => {
                        changeModeHandler('toOrder');
                    }}
                    className={`${toOrderClicked ? styles.active : null} ${
                        styles.navItem
                    }`}
                >
                    TO ORDER
                </p>
                <p
                    onClick={() => {
                        changeModeHandler('ordered');
                    }}
                    className={`${orderedClicked ? styles.active : null} ${
                        styles.navItem
                    }`}
                >
                    ORDERED
                </p>
                <p
                    onClick={() => {
                        changeModeHandler('delivered');
                    }}
                    className={`${deliveredClicked ? styles.active : null} ${
                        styles.navItem
                    }`}
                >
                    DELIVERED
                </p>
            </div>
            <div className={styles.filterDiv}>
                {textfield && (
                    <form onSubmit={formSubmitHandler}>
                        <input
                            onChange={filterChangeHandler}
                            placeholder="ITEM, CODE"
                            value={filter}
                        ></input>
                    </form>
                )}

                <svg
                    className={styles.filter}
                    height="32px"
                    width="32px"
                    onClick={showTextfield}
                >
                    <g fill="#000">
                        <path d="M28 6l-10 10v10h-4v-10l-10-10h24z"></path>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default Navigation;
