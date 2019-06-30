import database from "../database/mysql";
import queries from "../migrations/queriesSql";

const { con, queryPromise } = database;
const { listingPosts, getSingleItemFromPostsPerId, insertIntoPosts } = queries;

const listingAllPosts = () => queryPromise(listingPosts);

async function list(req, res, next) {
  const posts: Array = await listingAllPosts();
  res
    .status(200)
    .send({ success: true, message: "A list of all posts", body: posts });
  await next;
}

function getSinglePost(userId) {
  return new Promise((resolve, reject) => {
    con.query(getSingleItemFromPostsPerId, [Number(userId)], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

const get = async (req, res, next) => {
  const { id }: { id: string } = req.params;

  const post: Object = await getSinglePost(id);
  res
    .status(200)
    .send({ success: true, message: "An item of posts", body: post });
  await next;
};

function addNewPost(userId, textVal, likesVal, commnetsVal) {
  return new Promise((resolve, reject) => {
    con.query(
      insertIntoPosts,
      [userId, textVal, likesVal, commnetsVal],
      (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      }
    );
  });
}

const create = async (req, res, next) => {
  const {
    text,
    likes,
    userId,
    comments
  }: {
    text: ?string,
    likes: ?number,
    userId: ?number,
    comments: ?number
  } = req.body;

  const createdPayload = await addNewPost(userId, text, likes, comments);
  res.status(201).send({
    success: true,
    message: "Post is added",
    body: { text, likes, comments }
  });

  await next;
};

const updatePost = ({ text, likes, comments, id }) =>
  new Promise((resolve, reject) => {
    con.query(
      queries.updatePosts,
      [text, likes, comments, Number(id)],
      (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      }
    );
  });

const update = async (req, res, next) => {
  const { id }: { id: string } = req.params;
  const {
    text,
    likes,
    userId,
    comments
  }: {
    text: ?string,
    likes: ?number,
    userId: ?number,
    comments: ?number
  } = Object.assign({}, req.body);
  const post = await updatePost({ text, likes, comments, id });
  res
    .status(200)
    .send({ success: true, message: "The post has been updated", body: post });
  await next;
};

function deletE(id) {
  return new Promise((resolve, reject) => {
    const deletePostByIdQuery = "DELETE FROM posts WHERE id = ?";
    con.query(deletePostByIdQuery, Number(id), (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}
const del = async (req, res, next) => {
  const { id }: { id: string } = req.params;
  const del = await deletE(id);
  res
    .status(200)
    .send({ success: true, message: "an item of posts", body: post });
  await next;
};

export default {
  list,
  create,
  get,
  del,
  update
};
