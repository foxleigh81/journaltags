const { db } = require('../util/admin');

exports.getAllTags = (_request, response) => {
  db.collection('tags')
    .get()
    .then((data) => {
      let tags = [];
      data.forEach((doc) => {
        const { name, type, body } = doc.data();

        tags.push({
          id: doc.id,
          name,
          type,
          body
        });
      });
      return response.json(tags);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.addTag = (request, response) => {
  if (request.body.body.trim() === '') {
    return response.status(400).json({ body: 'Must not be empty' });
  }

  if (request.body.name.trim() === '') {
    return response.status(400).json({ name: 'Must not be empty' });
  }

  if (request.body.type.trim() === '') {
    return response.status(400).json({ type: 'Must not be empty' });
  }

  const newTag = {
    name: request.body.name,
    body: request.body.body,
    type: request.body.type
  };
  db.collection('tags')
    .add(newTag)
    .then((doc) => {
      const responseTagItem = newTag;
      responseTagItem.id = doc.id;
      return response.json(responseTagItem);
    })
    .catch((err) => {
      response.status(500).json({ error: 'Something went wrong' });
      console.error(err);
    });
};

exports.editTag = (request, response) => {
  if (request.body.type || request.body.name || request.body.id) {
    response.status(403).json({ message: 'Not allowed to edit' });
  }
  let document = db.collection('tags').doc(`${request.params.id}`);
  document
    .update(request.body)
    .then(() => {
      response.json({ message: 'Updated successfully' });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({
        error: err.code
      });
    });
};

exports.deleteTag = (request, response) => {
  const document = db.doc(`/tags/${request.params.id}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: 'Tag not found' });
      }
      return document.delete();
    })
    .then(() => {
      response.json({ message: 'Delete successfull' });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};
