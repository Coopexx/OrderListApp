import React, { useState, useEffect } from 'react';
import Item from './components/Item';
import Navigation from './components/Navigation';
import Description from './components/Description';

import styles from './App.module.css';

function App() {
    const [allItems, setAllItems] = useState({}); //allItems
    const [toOrder, setToOrder] = useState({}); //toOrder
    const [ordered, setOrdered] = useState({});
    const [renderedList, setRenderedList] = useState({});
    const [listLoaded, setListLoaded] = useState(false);
    const [mode, setMode] = useState('');

    const url = 'http://127.0.0.1:3000/api/v1/items';

    //historyFiltered

    const renderToOrder = (data) => {
        let orders = data.filter((dataObj) => {
            if (dataObj.amount > 0) {
                return true;
            } else {
                return false;
            }
        });
        setToOrder(orders);
        setListLoaded(true);
    };

    const renderOrdered = (data) => {
        const history = data.filter((dataObj) => {
            if (dataObj.history.length > 0) {
                return true;
            } else {
                return false;
            }
        });
        setOrdered(history);
    };

    function compare(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

    const alphanumericSorting = (dataObj) => {
        dataObj.sort(compare);
        return dataObj;
    };

    //DATA IMPORT
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
        renderToOrder(data);
        renderOrdered(data);
        setRenderedList(data);
    }

    const modeHandler = (mode) => {
        if (mode === 'allItems') {
            console.log(allItems);
            setRenderedList(allItems);
        }
        if (mode === 'toOrder') {
            console.log(toOrder);
            setRenderedList(toOrder);
        }
        if (mode === 'ordered') {
            console.log(ordered);
            setRenderedList(ordered);
        }
    };

    useEffect(() => {
        fetchItemsHandler();
    }, []);

    return (
        <div className={styles.background}>
            <div className={styles.window}>
                <Navigation modeHandler={modeHandler} />
                <Description />
                <div className={styles.itemContainer}>
                    {listLoaded &&
                        renderedList.map((data, i) => (
                            <Item
                                data={renderedList[i]}
                                key={data.id}

                                // add={addAmountHandler}
                                // remove={removeAmountHandler}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default App;
