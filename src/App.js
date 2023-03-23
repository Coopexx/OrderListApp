import React, { useState, useEffect } from 'react';

import Item from './components/Item';
import Navigation from './components/Navigation';
import Description from './components/Description';

import styles from './App.module.css';

function App() {
    const [allItems, setAllItems] = useState({}); //allItems
    const [toOrder, setToOrder] = useState({}); //toOrder
    const [ordered, setOrdered] = useState({}); //ordered

    const [renderedList, setRenderedList] = useState({});
    const [listLoaded, setListLoaded] = useState(false);

    const [mode, setMode] = useState('allItems');

    const [checkOrdered, setCheckOrdered] = useState(false);

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
        // data.map((a, b) => {
        //     console.log(a, b);
        //     a.map((arr, i) => {
        //         console.log(arr);
        //         if (arr.history[i].timestamp < arr.history[i].timestamp) {
        //             return -1;
        //         }
        //         return 0;
        //     });
        // });
        // return data;
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
        // const orderedObj2 = sortByDate(orderedObj);
        // console.log(orderedObj2);
        return orderedObj;
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
            console.log('called');
        }
        if (type === 'ordered') {
            setRenderedList(ordered);
            setCheckOrdered(true);
        }
    };

    //POSTING & UPDATING DATA
    const addAmountHandler = async (dataObj) => {
        console.log(dataObj);
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
            console.log(content); //Include in notification upper right corner
            modeHandler('allItems');
            fetchItemsHandler();
        } catch (err) {
            console.log(err);
        }
    };

    const removeAmountHandler = async (dataObj) => {
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
            console.log(content); //Include in notification upper right corner
            modeHandler('toOrder');
            fetchItemsHandler();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchItemsHandler();
    }, []);

    return (
        <div className={styles.background}>
            <div className={styles.window}>
                <Navigation modeHandler={modeHandler} />
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
