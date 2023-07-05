const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config({ path: __dirname + '/./../.env' });
const uri = process.env.DATABASE;
const port = process.env.PORT;

const app = express();
app.use(express.urlencoded({ extended: true }), bodyParser());

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

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST,HEAD, OPTIONS,PUT, DELETE'
    );
    next();
});

var options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
app.use(cors(options));

app.get(
    'https://order-list-4ecb0490f6d0.herokuapp.com//api/v1/items',
    getItems
);
app.post(
    'https://order-list-4ecb0490f6d0.herokuapp.com//api/v1/items',
    postItem
);
app.patch(
    'https://order-list-4ecb0490f6d0.herokuapp.com//api/v1/items',
    patchItem
);
app.delete(
    'https://order-list-4ecb0490f6d0.herokuapp.com//api/v1/items',
    deleteItem
);

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

// '192.168.178.22'
app.listen(process.env.PORT || 3000, () => {
    console.log(`App running on port ${port}`);
});
