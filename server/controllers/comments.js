function createComment(req, res) {
  const db = req.app.get('db');

   const {  userId, postId, comment } = req.body;

   db.comments
      .save({ 
        userId,
        postId,
        comment })
      .then(comments => res.status(201).json(comments)) 
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function commentList(req, res) {
  const db = req.app.get('db');

  db.comments
    .find()
    .then(comments => res.status(200).json(comments))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function editComment(req, res) {
  const db = req.app.get('db');
  const { comment } = req.body;

  db.comments
    .update(req.params.id, {comment: comment})
    .then(item => res.status(200).json(item))
}

module.exports = {
  createComment,
  editComment,
  commentList,
};