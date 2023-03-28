const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();
console.log(process.env);
// const uri = process.env.DATABASE;

const app = express();
app.use(express.urlencoded({ extended: true }), bodyParser());

const port = 3000;
const uri =
    'mongodb+srv://acCELLerate:u74gQ5EpDgFM74mz2TX7@orderlist.tggdj44.mongodb.net/OrderList?retryWrites=true&w=majority';

//SCHEMA
const itemSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    amountVE: {
        type: Number,
        required: true,
    },
    amountPC: {
        type: Number,
        required: true,
    },
    history: Array,
});

const Item = mongoose.model('Item', itemSchema); //must match name of collection

async function displayAll() {
    const items = await Item.find();
    return items;
}

const getItems = async (req, res) => {
    const items = await displayAll();
    res.status(200).json(items);
};

// POST ITEM
const postItem = async (req, res) => {};

//PATCH ITEM
const patchItem = async (req, res) => {
    try {
        console.log(req.body);
        const updatedItemVE = await Item.findByIdAndUpdate(req.body._id, {
            amountVE: req.body.amountVE,
        });
        const updatedItemPC = await Item.findByIdAndUpdate(req.body._id, {
            amountPC: req.body.amountPC,
        });

        res.status(201).json({
            status: 'success',
            itemVE: updatedItemVE,
            itemPC: updatedItemPC,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
            data: req.body,
        });
    }
};

const deleteItem = async (req, res) => {
    try {
        const updatedAmount = await Item.findByIdAndUpdate(req.body._id, {
            amountVE: 0,
            amountPC: 0,
        });

        const updatedHistory = await Item.findByIdAndUpdate(req.body._id, {
            $push: { history: req.body.history },
        });

        res.status(201).json({
            status: 'success',
            amount: updatedAmount,
            history: updatedHistory,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
            data: req.body,
        });
    }
};

//CONTROLLER
app.get('/api/v1/items', getItems);
app.post('/api/v1/items', postItem);
app.patch('/api/v1/items', patchItem);
app.delete('/api/v1/items', deleteItem);

//SERVER
async function connect() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}
connect();

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
