//TODO: seeds script should come here, so we'll be able to put some data in our local env

require("dotenv").config();
require("../models/User");
require("../models/Item");
require("../models/Comment");

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

if (!process.env.MONGODB_URI) {
  console.warn("Missing Mongo db URI in .env");
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

const User = mongoose.model("User");
const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");

const createUsers = async (numUsers) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    users.push({
      username: faker.database.mongodbObjectId(),
      email: faker.internet.email(),
      bio: faker.lorem.paragraph(),
      image: faker.image.avatar(),
      role: "user",
      favorites: [],
      following: [],
    });
  }
  await User.create(users);
};

const createItems = async (numItems) => {
  const items = [];
  for (let i = 0; i < numItems; i++) {
    const title = faker.commerce.productName() + " " + faker.datatype.uuid();
    items.push({
      title,
      slug: faker.helpers.slugify(title),
      description: faker.commerce.productDescription(),
      image: faker.image.image(),
      tagList: title.split(" "),
      comments: [],
    });
  }
  await Item.create(items);
};

const createComments = async (numComments) => {
  const comments = [];
  for (let i = 0; i < numComments; i++) {
    comments.push({
      body: faker.lorem.paragraph(),
      seller: await User.findOne()._id,
      item: await Item.findOne()._id,
    });
  }
  await Comment.create(comments);
};

const seed = async () => {
  await User.deleteMany({});
  await Item.deleteMany({});
  await Comment.deleteMany({});
  await createUsers(100);
  await createItems(100);
  await createComments(100);
  console.log("Database seeded successfully!");
  mongoose.connection.close();
};

seed()
  .then(() => {
    process.exit();
  })
  .catch((e) => {
    console.error(e);
    process.exit();
  });
