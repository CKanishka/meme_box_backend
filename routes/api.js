const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

// Importing the item model
const Item = require("../models/Item");

// 'Get' request to show latest 100 items
router.get("/memes", (req, res) => {
  Item.aggregate([
    { $sort: { date: -1 } }, // sort on the basis of date field
    { $project: { id: "$_id", name: 1, caption: 1, url: 1, _id: 0 } }, // Creat an alias for _id field and exclude the original id field from result
  ])
    .limit(100)
    .then((items) => res.json(items)); // responding back with the items
});

// 'Post' request to add a new item
router.post("/memes", (req, res) => {
  const newItem = new Item(req.body);
  newItem
    .save() // save new item and respond with the id
    .then((item) => res.json({ id: item._id }))
    .catch(() => res.status(500).send(`Failed to add item`));
});

// 'Get' request to get a particular item
router.get("/memes/:id", (req, res) => {
  Item.aggregate([
    { $match: { _id: ObjectId(req.params.id) } }, // match an item having the id in params
    { $project: { id: "$_id", name: 1, caption: 1, url: 1, _id: 0 } }, // Creat an alias for _id field and exclude the original id field from result
  ])
    .then((item) => {
      if (!item.length) {
        res.status(404).send(`Item with id ${req.params.id} not found`);
      } else {
        res.json(item); // responding back with the item
      }
    })
    .catch(
      () => res.status(500).send(`Item with id ${req.params.id} could not be fetched`) // Item not found
    );
});

// 'Patch' request to edit an item
router.patch("/memes/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) =>
      item
        .updateOne({
          // If the requested item is found update it
          caption: req.body.caption,
          url: req.body.url,
        })
        .then(() => res.status(204).send()) // Update successful
        .catch(() => res.status(500).send(`Update Failed`))
    )
    .catch(
      () => res.status(404).send(`Item with id ${req.params.id} not found`) // Item not found
    );
});

// Delete an item
router.delete("/memes/:id", (req, res) => {
  Item.findById(req.params.id) // extracting id from the request url
    .then((item) => {
      item
        .remove()
        .then(() => res.status(204).send()) // Delete successful
        .catch(() => res.status(500).send(`Delete Failed`));
    })
    .catch(() =>
      res.status(404).send(`Item with id ${req.params.id} not found`)
    );
});

module.exports = router;
