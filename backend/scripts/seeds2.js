//TODO: seeds script should come here, so we'll be able to put some data in our local env

// require("dotenv").config();
// require("../models/User");
// require("../models/Item");
// require("../models/Comment");

// const mongoose = require("mongoose");
// const { faker } = require("@faker-js/faker");

// if (!process.env.MONGODB_URI) {
//   console.warn("Missing Mongo db URI in .env");
// }

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });

// if (process.env.NODE_ENV !== "production") {
//   mongoose.set("debug", true);
// }

// const User = mongoose.model("User");
// const Item = mongoose.model("Item");
// const Comment = mongoose.model("Comment");

// const user = () => {
//   return {
//     username: faker.database.mongodbObjectId(),
//     email: faker.internet.email(),
//     bio: faker.lorem.paragraph(),
//     image: faker.image.avatar(),
//     role: "user",
//     favorites: [],
//     following: [],
//   };
// };

// const item = () => {
//   const title = faker.commerce.productName() + " " + faker.datatype.uuid();
//   return {
//     title,
//     slug: faker.helpers.slugify(title),
//     description: faker.commerce.productDescription(),
//     image: faker.image.image(),
//     tagList: title.split(" "),
//     comments: [],
//   };
// };

// const comment = () => {
//   return {
//     body: faker.lorem.paragraph(),
//     seller: User.findOne()._id,
//     item: Item.findOne()._id,
//   };
// };

// const users = faker.helpers.uniqueArray(user, 100);
// const items = faker.helpers.uniqueArray(item, 100);
// const comments = faker.helpers.uniqueArray(comment, 100);

// const seed = async () => {
//   await User.deleteMany({});
//   await Item.deleteMany({});
//   await Comment.deleteMany({});
//   await User.insertMany(users);
//   await Item.insertMany(items);
//   await Comment.insertMany(comments);
//   console.log("Database seeded successfully!");
//   mongoose.connection.close();
// };

// seed()
//   .then(() => {
//     process.exit();
//   })
//   .catch((e) => {
//     console.error(e);
//     process.exit();
//   });
