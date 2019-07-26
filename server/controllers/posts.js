function createPost(req, res) {
  const db = req.app.get('db');

  const { userId, content } = req.body;

  db.posts 
    .save({
      userId,
      content,
    })
    .then(post => res.status(201).json(post)) 
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function getUserPosts(req, res) {

  const db = req.app.get('db');

  db.posts
    .find({
      userId: req.params.userId,
    })
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}


function postList(req, res) {
  const db = req.app.get('db');

  db.posts
    .find()
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function getSinglePost(req, res) {
  const db = req.app.get('db');
  
   db.posts
   .find(req.params.userId)
   .then(post => {
       db.comments
     .find(req.params.postId)
     .then(comment => res.status(200).json({post,comment}))
     .catch(err => {
         console.error(err)
         res.status(500).end()
     })
   })
   .catch(err => {
       console.log(err)
       res.status(500).end()
   })

}


function updatePost(req, res) {
  const db = req.app.get('db')
  const {content} = req.body

    db.posts
    .update(req.params.id, {content: content})
    .then(item => res.status(200).json(item))
  
}

module.exports = {
  createPost,
  getUserPosts,
  postList,
  updatePost,
  getSinglePost
};