//TODO: seeds script should come here, so we'll be able to put some data in our local env

require("dotenv").config();
const mongoose = require("mongoose");
require("../models/User");
require("../models/Item");
require("../models/Comment");

const User = mongoose.model("User");
const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");

const connect = () => {
  const connection = process.env.MONGODB_URI || "mongodb://localhost:27017";
  mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set("debug", true);
};

connect();

async function main() {
  await User.remove({});
  await Item.remove({});
  await Comment.remove({});
  for (let i = 0; i < 100; i++) {
    const user = new User();
    user.username = `user${i}`;
    user.email = `user${i}@test.com`;
    await user.save();

    const item = new Item({
      slug: `slug${i}`,
      title: `title ${i}`,
      description: `description ${i}`,
      seller: user,
    });
    await item.save();

    let commentIds = [];
    for (let j = 0; j < 100; j++) {
      const comment = new Comment({
        body: `body ${j}`,
        seller: user,
        item: item,
      });
      await comment.save();
      commentIds.push(comment._id);
    }
    item.comments = commentIds;
    await item.save();
  }
}

main()
  .then(() => {
    console.log("DB seeding complete");
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((err) => {
    console.log(`Error ${err.message}`);
    mongoose.connection.close();
    process.exit(1);
  });
