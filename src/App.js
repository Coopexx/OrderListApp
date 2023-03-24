import React, { useState, useEffect } from 'react';

import Item from './components/Item';
import Navigation from './components/Navigation';
import Description from './components/Description';

import styles from './App.module.css';

//Functionalities: filter ordered date, notification div

function App() {
    const [allItems, setAllItems] = useState({}); //allItems
    const [toOrder, setToOrder] = useState({}); //toOrder
    const [ordered, setOrdered] = useState({}); //ordered

    const [renderedList, setRenderedList] = useState({});
    const [listLoaded, setListLoaded] = useState(false);

    const [mode, setMode] = useState('allItems');

    const [checkOrdered, setCheckOrdered] = useState(false);

    const [notificationStatus, setNotificationStatus] = useState('');
    const [notificationItem, setNotificationItem] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const [itemModified, setItemModified] = useState(false);
    //write timer so itemModified will be set to false after timer runs out

    const url = 'http://127.0.0.1:3000/api/v1/items';

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

    const sortByDate = (data) => {
        const newArr = [];
        data.map((obj, i) => {
            // console.log(obj[i]);
            // obj[i].map((history, index) => {
            //     console.log(history);
            // });
            // console.log(obj);
        });
        // console.log(newArr);
        const sortedOrdered = data.sort((a, b) => {
            if (a.history[0].timestamp > b.history[0].timestamp) {
                return -1;
            } else {
                return 0;
            }
        });
        return sortedOrdered;
    };

    const sortToOrder = (data) => {
        let toOrderObj = data.filter((dataObj) => {
            if (dataObj.amount > 0) {
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
        const orderedObj2 = sortByDate(orderedObj);
        return orderedObj;
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
                }
                if (
                    data.history[0].timestamp
                        .slice(0, 10)
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
    async function fetchItemsHandler() {
        const response = await fetch(url);
        const rawData = await response.json();
        const data = rawData.map((dataObj) => {
            return {
                id: dataObj._id,
                name: dataObj.name,
                code: dataObj.code,
                amount: dataObj.amount,
                history: dataObj.history,
            };
        });
        alphanumericSorting(data);
        setAllItems(data);
        setToOrder(sortToOrder(data));
        setOrdered(sortOrdered(data));
        setRenderedList(data);
        setListLoaded(true);
    }

    //DISPLAY DATA
    const modeHandler = (type) => {
        setMode(type);
        if (type === 'allItems') {
            setRenderedList(allItems);
            setCheckOrdered(false);
        }
        if (type === 'toOrder') {
            setRenderedList(toOrder);
            setCheckOrdered(false);
        }
        if (type === 'ordered') {
            setRenderedList(ordered);
            setCheckOrdered(true);
        }
    };

    //POSTING & UPDATING DATA
    const addAmountHandler = async (dataObj) => {
        setNotificationItem(dataObj);
        setNotificationType('add');
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
            modeHandler('allItems');
            fetchItemsHandler();
        } catch (err) {
            console.log(err);
        }
        setItemModified(true);
    };

    const removeAmountHandler = async (dataObj) => {
        setNotificationItem(dataObj);
        setNotificationType('remove');
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
            modeHandler('toOrder');
            fetchItemsHandler();
        } catch (err) {
            console.log(err);
        }
        setItemModified(true);
    };

    useEffect(() => {
        fetchItemsHandler();
    }, []);

    return (
        <div className={styles.background}>
            {itemModified && (
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
                            <p className={styles.notificationTag}>
                                {notificationItem.code}
                            </p>
                            <p className={styles.notificationTag}>
                                {notificationItem.amount}
                            </p>
                            <p className={styles.notificationLast}>
                                You can find it under "Orders"
                            </p>
                        </div>
                    ) : (
                        ''
                    )}
                    {notificationType === 'remove' ? (
                        <div className={styles.notificationMessage}>
                            <p className={styles.notificationTag}>Ordered </p>
                            <p className={styles.notificationTag}>
                                {notificationItem.name}
                            </p>
                            <p className={styles.notificationTag}>
                                {notificationItem.code}
                            </p>
                            <p className={styles.notificationTag}>
                                {notificationItem.amount}
                            </p>
                            <p className={styles.notificationLast}>
                                You can find it under "Ordered"
                            </p>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
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
                                // Sort list by history timestamp and replace renderedList with that List
                                <Item
                                    data={renderedList[i]}
                                    key={data.id}
                                    mode={mode}
                                    index={index}
                                    add={addAmountHandler}
                                    remove={removeAmountHandler}
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
                                add={addAmountHandler}
                                remove={removeAmountHandler}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default App;
