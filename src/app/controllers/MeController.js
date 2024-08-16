const User = require("../models/User");
const Shoes = require("../models/Shoes");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../utils/mongoose");
const e = require("express");
const mongoose = require("mongoose");

// const { hashPassword, comparePassword } = require("../../utils/helper");

class MeController {
  // [GET] /me
  show(req, res, next) {
    Shoes.find({})
      .then((shoes) =>
        res.render("home", {
          user: req.session.user,
          shoes: multipleMongooseToObject(shoes),
          title: "Dashboard",
          styles: ["app.css", "header.css", "footer.css"],
        }),
      )
      .catch(next);
  }

  // [POST] /me/:id/add
  async add(req, res, next) {
    try {
      const currUser = await User.findOne({ _id: req.session.user.id });
      const existingItem = currUser.cart.find(
        (item) => item.imageId === req.params.id,
      );

      if (existingItem) {
        existingItem.quantity = existingItem.quantity + 1;
      } else {
        currUser.cart.push({
          imageId: req.params.id,
          quantity: 1,
        });
      }
      currUser.markModified("cart");

      await currUser
        .save()
        .then(() => res.redirect("/me#products"))
        .catch(next);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /me/cart
  async display(req, res, next) {
    const currUser = await User.findOne({ _id: req.session.user.id });
    const allShoes = multipleMongooseToObject(await Shoes.find({}));

    const cartItems = currUser.cart.map((cartItem) => {
      const matchedShoes = allShoes.find(
        (shoes) => String(shoes.imageId) === String(cartItem.imageId),
      );
      return {
        ...matchedShoes,
        quantity: cartItem.quantity,
      };
    });

    res.render("me/my-cart", {
      user: req.session.user,
      shoes: cartItems,
      title: "My Cart",
      styles: ["cart.css", "header.css", "footer.css"],
    });
  }

  // [POST] /me/cart/:id/delete
  async delete(req, res, next) {
    try {
      const currUser = await User.findOne({ _id: req.session.user.id });
      const allShoes = multipleMongooseToObject(await Shoes.find({}));

      currUser.cart = currUser.cart.filter(
        (item) => item.imageId !== req.params.id,
      );

      const cartItems = currUser.cart.map((cartItem) => {
        const matchedShoes = allShoes.find(
          (shoes) => String(shoes.imageId) === String(cartItem.imageId),
        );
        return {
          ...matchedShoes,
          quantity: cartItem.quantity,
        };
      });

      await currUser
        .save()
        .then(() => {
          res.render("me/my-cart", {
            user: req.session.user,
            shoes: cartItems,
            title: "My Cart",
            styles: ["cart.css", "header.css", "footer.css"],
          });
        })
        .catch(next);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new MeController();
