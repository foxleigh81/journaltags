const functions = require('firebase-functions');
const app = require('express')();

const { getAllTags, addTag, editTag, deleteTag } = require('./api/tags');

app.get('/tags', getAllTags);
app.post('/tag', addTag);
app.put('/tag/:id', editTag);
app.delete('/tag/:id', deleteTag);

exports.api = functions.https.onRequest(app);
