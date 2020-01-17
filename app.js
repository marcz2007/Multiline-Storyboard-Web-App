
const express = require('express');
const app = express();


const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended: true}));

const preWrittenSentence = 'The mouse awoke one day to a mesmerising sound being produced from below.';
const dag = {
    value: preWrittenSentence,
    topField: {},
    leftField: {},
    rightField: {},
    bottomField: {}
};

let currentNode = dag


app.set('views', './views');
app.set('view engine', 'jade');

function getStringValues(obj) {

    const jadeArguments = {
        value: obj.value,
        topField: obj.topField.value,
        leftField: obj.leftField.value,
        rightField: obj.rightField.value,
        bottomField: obj.bottomField.value
    }

    return jadeArguments;

}


app.get('/', function (req, res) {

    if (req.query.position != undefined) {
        currentNode = currentNode[req.query.position]


    } else {
        currentNode = dag;
    }

    res.render('index', getStringValues(currentNode));


});

app.post('/', function (req, res) {

        if (req.body.topField != undefined) {
            currentNode.topField = {
                value: req.body.topField,
                topField: {},
                leftField: {},
                rightField: {},
                bottomField: {}

            }
        } else if (req.body.leftField != undefined) {
            currentNode.leftField = {
                value: req.body.leftField,
                topField: {},
                leftField: {},
                rightField: {},
                bottomField: {}

            }
        } else if (req.body.rightField != undefined) {
            currentNode.rightField = {
                value: req.body.rightField,
                topField: {},
                leftField: {},
                rightField: {},
                bottomField: {}
            }

        } else if (req.body.bottomField != undefined) {
            currentNode.bottomField = {
                value: req.body.bottomField,
                topField: {},
                leftField: {},
                rightField: {},
                bottomField: {}
            }

        }

        res.render('index', getStringValues(currentNode));





    }
)
;


app.listen(8081);
module.exports = app;


