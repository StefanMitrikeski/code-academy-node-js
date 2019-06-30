const insertIntoPosts = 'INSERT INTO posts (userId, text, likes, comments) VALUES (?, ?, ?, ?)';
const getSingleItemFromPostsPerId = 'SELECT * FROM posts WHERE id = ?';
const listingPosts = 'SELECT * FROM posts';
const updatePosts = 'UPDATE posts SET text = ?, likes = ?, comments = ? WHERE id = ?';



const innerJoin = `SELECT users.id, 
posts.id, 
text, 
likes, 
firstName, lastName FROM users AS Users INNER JOIN posts AS Posts ON Users.id = Posts.userId`

export default {
  insertIntoPosts,
  getSingleItemFromPostsPerId,
  listingPosts,
  updatePosts 
};
