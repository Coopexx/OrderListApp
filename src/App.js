import React, { useState, useEffect } from 'react';

import Item from './components/Item';
import Navigation from './components/Navigation';
import Description from './components/Description';
import Modal from './components/Modal';
// import Footer from './components/Footer';

import styles from './App.module.css';

function App() {
    const [allItems, setAllItems] = useState({}); //allItems
    const [toOrder, setToOrder] = useState({}); //toOrder
    const [ordered, setOrdered] = useState({}); //ordered
    const [delivered, setDelivered] = useState({}); //delivered

    const [renderedList, setRenderedList] = useState({});
    const [listLoaded, setListLoaded] = useState(false);

    const [mode, setMode] = useState('allItems');

    const [checkOrdered, setCheckOrdered] = useState(false);

    const [notificationStatus, setNotificationStatus] = useState('');
    const [notificationItem, setNotificationItem] = useState('');
    const [notificationType, setNotificationType] = useState('');

    const [show, setShow] = useState(false);

    const [modalShow, setModalShow] = useState(false);

    const [orderedCurrent, setOrderedCurrent] = useState('');

    //http://172.16.31.100:3001/api/v1/items/
    const url = 'http://127.0.0.1:3001/api/v1/items/';

    //SORTING DATA
    const alphanumericSorting = (alphanumericSortingObj) => {
        alphanumericSortingObj.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
        return alphanumericSortingObj;
    };

    const sortToOrder = (data) => {
        let toOrderObj = data.filter((dataObj) => {
            if (dataObj.amountVE > 0) {
                return true;
            }
            if (dataObj.amountPC > 0) {
                return true;
            } else {
                return false;
            }
        });
        return toOrderObj;
    };

    const sortOrdered = (data) => {
        const orderedObj = data.filter((dataObj) => {
            if (dataObj.history.length > 0) {
                return true;
            } else {
                return false;
            }
        });

        const filteredObj = [];

        for (const data in orderedObj) {
            if (orderedObj[data].history.length > 0) {
                for (let i = 0; i < orderedObj[data].history.length; i++) {
                    if (orderedObj[data].history[i].delivered === false) {
                        filteredObj.push({
                            name: orderedObj[data].name,
                            code: orderedObj[data].code,
                            amountVE: orderedObj[data].amountVE,
                            amountPC: orderedObj[data].amountPC,
                            id: orderedObj[data].id,
                            history: [orderedObj[data].history[i]],
                        });
                    }
                }
            }
        }

        return filteredObj;
    };

    const sortDelivered = (dataObj) => {
        const filteredData = [];
        for (const data in dataObj) {
            if (dataObj[data].history.length > 0) {
                for (let i = 0; i < dataObj[data].history.length; i++) {
                    if (dataObj[data].history[i].delivered === true) {
                        filteredData.push({
                            name: dataObj[data].name,
                            code: dataObj[data].code,
                            id: dataObj[data].id,
                            history: dataObj[data].history[i],
                        });
                    }
                }
            }
        }
        return filteredData;
    };

    const filterHandler = (searchString, type) => {
        if (type === 'allItems') {
            const filteredList = allItems.filter((data) => {
                if (
                    data.name
                        .toLowerCase()
                        .replace(/\s/g, '')
                        .includes(searchString.toLowerCase().replace(/\s/g, ''))
                ) {
                    return true;
                }
                if (
                    data.code
                        .toLowerCase()
                        .replace(/\s/g, '')
                        .includes(searchString.toLowerCase().replace(/\s/g, ''))
                ) {
                    return true;
                } else {
                    return false;
                }
            });
            setRenderedList(filteredList);
        }
        if (type === 'toOrder') {
            const filteredList = toOrder.filter((data) => {
                if (
                    data.name
                        .toLowerCase()
                        .replace(/\s/g, '')
                        .includes(searchString.toLowerCase().replace(/\s/g, ''))
                ) {
                    return true;
                }
                if (
                    data.code
                        .toLowerCase()
                        .replace(/\s/g, '')
                        .includes(searchString.toLowerCase().replace(/\s/g, ''))
                ) {
                    return true;
                } else {
                    return false;
                }
            });
            setRenderedList(filteredList);
        }
        if (type === 'ordered') {
            const filteredList = ordered.filter((data) => {
                if (
                    data.name
                        .toLowerCase()
                        .replace(/\s/g, '')
                        .includes(searchString.toLowerCase().replace(/\s/g, ''))
                ) {
                    return true;
                }
                if (
                    data.code
                        .toLowerCase()
                        .replace(/\s/g, '')
                        .includes(searchString.toLowerCase().replace(/\s/g, ''))
                ) {
                    return true;
                } else {
                    return false;
                }
            });
            setRenderedList(filteredList);
        }
        if (type === 'delivered') {
            const filteredList = delivered.filter((data) => {
                if (
                    data.name
                        .toLowerCase()
                        .replace(/\s/g, '')
                        .includes(searchString.toLowerCase().replace(/\s/g, ''))
                ) {
                    return true;
                }
                if (
                    data.code
                        .toLowerCase()
                        .replace(/\s/g, '')
                        .includes(searchString.toLowerCase().replace(/\s/g, ''))
                ) {
                    return true;
                } else {
                    return false;
                }
            });
            setRenderedList(filteredList);
        }
    };

    //FETCH DATA
    async function fetchItemsHandler(type) {
        const response = await fetch(url);
        const rawData = await response.json();
        const data = rawData.map((dataObj) => {
            return {
                id: dataObj._id,
                name: dataObj.name,
                code: dataObj.code,
                amountVE: dataObj.amountVE,
                amountPC: dataObj.amountPC,
                history: dataObj.history,
            };
        });
        alphanumericSorting(data);
        setAllItems(data);
        setToOrder(sortToOrder(data));
        setOrdered(sortOrdered(data));
        const filteredDelivered = sortDelivered(data);
        setDelivered(filteredDelivered);

        if (type === 'allItems') {
            setRenderedList(data);
        }
        if (type === 'toOrder') {
            setRenderedList(toOrder);
        }
        if (type === 'ordered') {
            // const slicedOrdered = ordered.slice(0, 10);
            // setRenderedList(slicedOrdered);
            setRenderedList(ordered);
        }
        if (type === 'delivered') {
            setRenderedList(delivered);
        }
        setListLoaded(true);
    }

    //DISPLAY DATA
    const modeHandler = (type) => {
        setMode(type);
        if (type === 'allItems') {
            fetchItemsHandler('allItems');
            setRenderedList(allItems);
            setCheckOrdered(false);
        }
        if (type === 'toOrder') {
            fetchItemsHandler('toOrder');
            setRenderedList(toOrder);
            setCheckOrdered(false);
        }
        if (type === 'ordered') {
            fetchItemsHandler('ordered');
            setRenderedList(ordered);
            setCheckOrdered(true);
        }
        if (type === 'delivered') {
            fetchItemsHandler('delivered');
            setRenderedList(delivered);
            setCheckOrdered(false);
        }
    };

    //POSTING & UPDATING DATA
    const addAmountHandler = async (dataObj, type) => {
        setNotificationItem(dataObj);
        setNotificationType('add');
        if (type === 'VE') {
            try {
                const response = await fetch(url, {
                    method: 'PATCH',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataObj),
                });
                const content = await response.json();
                setNotificationStatus(content.status);
            } catch (err) {
                console.log(err);
            }
        }
        if (type === 'PC') {
            try {
                const response = await fetch(url, {
                    method: 'PATCH',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataObj),
                });
                const content = await response.json();
                setNotificationStatus(content.status);
            } catch (err) {
                console.log(err);
            }
        }
        modeHandler('allItems');
        fetchItemsHandler('allItems');
        setShow(true);
    };

    const removeAmountHandler = async (dataObj, type) => {
        if (type === 'delete') {
            setNotificationItem(dataObj);
            setNotificationType('delete');
            try {
                const response = await fetch(url, {
                    method: 'PATCH',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataObj),
                });
                const content = await response.json();
                setNotificationStatus(content.status);
            } catch (err) {
                console.log(err);
            }
        }
        if (type === 'order') {
            setNotificationItem(dataObj);
            setNotificationType('order');
            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataObj),
                });
                const content = await response.json();
                setNotificationStatus(content.status);
            } catch (err) {
                console.log(err);
            }

            const updatedOrdered = [];
            dataObj.history.timestampOrdered =
                dataObj.history.timestampOrdered.toISOString();
            updatedOrdered.push(...ordered, {
                id: dataObj._id,
                name: dataObj.name,
                code: dataObj.code,
                amountVE: dataObj.amountVE,
                amountPC: dataObj.amountPC,
                history: [dataObj.history],
            });
            setOrdered(updatedOrdered);
        }
        const updatedToOrder = toOrder.filter((item) => {
            if (item.id === dataObj._id) {
                return false;
            } else {
                return true;
            }
        });
        setToOrder(updatedToOrder);
        setRenderedList(updatedToOrder);

        setShow(true);
    };

    const setModalHandler = (modalState) => {
        setModalShow(modalState);
    };

    const saveOrderedItemDataHandler = (orderedItemData) => {
        setOrderedCurrent(orderedItemData);
    };

    const handleModalInput = async (modalInput) => {
        orderedCurrent.storage = modalInput[0];
        orderedCurrent.initials = modalInput[1].toUpperCase();
        orderedCurrent.comment = modalInput[2];
        orderedCurrent.timestampDelivered = modalInput[3];
        orderedCurrent.delivered = true;

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderedCurrent),
            });
            const content = await response.json();
            setNotificationStatus(content.status);
        } catch (err) {
            console.log(err);
        }

        const updatedDelivered = [];

        updatedDelivered.push(...delivered, {
            id: orderedCurrent._id,
            code: orderedCurrent.code,
            name: orderedCurrent.name,
            history: {
                amountPC: orderedCurrent.amountPC,
                amountVE: orderedCurrent.amountVE,
                comment: orderedCurrent.comment,
                delivered: orderedCurrent.delivered,
                intials: orderedCurrent.initials,
                orderId: orderedCurrent.orderId,
                storage: orderedCurrent.storage,
                timestampDelivered:
                    orderedCurrent.timestampDelivered.toISOString(),
                timestampOrdered: orderedCurrent.timestampOrdered,
            },
        });

        const updatedOrdered = ordered.filter((item) => {
            if (item.history[0].orderId === orderedCurrent.orderId) {
                return false;
            } else {
                return true;
            }
        });
        setRenderedList(updatedOrdered);
        setDelivered(updatedDelivered);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 4000);
        return () => {
            clearTimeout(timer);
        };
    }, [show]);

    useEffect(() => {
        fetchItemsHandler('allItems');
    }, []);

    return (
        <div className={styles.background}>
            {show && (
                <div className={styles.notification}>
                    <p className={styles.notificationTagHeadline}>
                        {notificationStatus.charAt(0).toUpperCase() +
                            notificationStatus.slice(1) +
                            '!'}
                    </p>

                    {notificationType === 'add' ? (
                        <div className={styles.notificationMessage}>
                            <p className={styles.notificationTag}>Added </p>
                            <p className={styles.notificationTag}>
                                {notificationItem.name}
                            </p>
                            <p className={styles.notificationTagNewLine}>
                                <p className={styles.notificationTagCode}>
                                    {notificationItem.code}
                                </p>

                                <p className={styles.notificationTagVE}>
                                    <svg
                                        className={styles.add}
                                        viewBox="0 0 32 32"
                                    >
                                        <g fill="#000000">
                                            <path d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"></path>
                                        </g>
                                    </svg>
                                </p>
                                <p className={styles.notificationTagVE}>
                                    {typeof notificationItem.amountVE !==
                                    'undefined'
                                        ? `${notificationItem.amountVE} VE`
                                        : `${notificationItem.amountPC} PC`}
                                </p>
                            </p>

                            <p className={styles.notificationLast}>
                                You can find it under "Orders"
                            </p>
                        </div>
                    ) : (
                        ''
                    )}
                    {notificationType === 'order' ? (
                        <div className={styles.notificationMessage}>
                            <p className={styles.notificationTag}>Ordered </p>
                            <p className={styles.notificationTag}>
                                {notificationItem.name}
                            </p>
                            <p className={styles.notificationTagNewLine}>
                                <p className={styles.notificationTagCode}>
                                    {notificationItem.code}
                                </p>

                                <p className={styles.notificationTagVE}>
                                    <svg
                                        className={styles.add}
                                        viewBox="0 0 32 32"
                                    >
                                        <g fill="#000000">
                                            <path d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"></path>
                                        </g>
                                    </svg>
                                </p>
                                <p className={styles.notificationTagVE}>
                                    {notificationItem.amountVE} VE
                                    <p
                                        className={
                                            styles.notificationTagSeperator
                                        }
                                    ></p>
                                    {notificationItem.amountPC} PC
                                </p>
                            </p>

                            <p className={styles.notificationLast}>
                                You can find it under "Ordered"
                            </p>
                        </div>
                    ) : (
                        ''
                    )}
                    {notificationType === 'delete' ? (
                        <div className={styles.notificationMessage}>
                            <p className={styles.notificationTag}>Deleted </p>
                            <p className={styles.notificationTag}>
                                {notificationItem.name}
                            </p>
                            <p className={styles.notificationTagNewLine}>
                                <p className={styles.notificationTagCode}>
                                    {notificationItem.code}
                                </p>
                            </p>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            )}
            {modalShow && (
                <Modal
                    modal={setModalHandler}
                    deliveredNotes={handleModalInput}
                />
            )}

            <div className={styles.window}>
                <Navigation
                    modeHandler={modeHandler}
                    filterHandler={filterHandler}
                />
                <Description mode={mode} />
                <div className={styles.itemContainer}>
                    {checkOrdered &&
                        listLoaded &&
                        renderedList.map((data, i) => {
                            return data.history.map((dataHistory, index) => (
                                <Item
                                    data={renderedList[i]}
                                    key={`${data.id}${index}`}
                                    mode={mode}
                                    modal={setModalHandler}
                                    index={index}
                                    add={addAmountHandler}
                                    remove={removeAmountHandler}
                                    orderedItemData={saveOrderedItemDataHandler}
                                />
                            ));
                        })}
                    {!checkOrdered &&
                        listLoaded &&
                        renderedList.map((data, i) => (
                            <Item
                                data={renderedList[i]}
                                key={data.id}
                                mode={mode}
                                modal={setModalHandler}
                                add={addAmountHandler}
                                remove={removeAmountHandler}
                            />
                        ))}
                </div>
                {/* Footer only for "Ordered". Needs to cut list based on latest orders */}
                {/* <Footer></Footer> */}
            </div>
        </div>
    );
}

export default App;
