const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Trade = db.trades;

exports.create = (req, res) => {
    const shares = req.body.shares;
    var condition = shares ? { shares: { [Op.in]: [1, 100] } } : null;
    const trade = {
        type: req.body.type,
        user_id: req.body.user_id,
        symbol: req.body.symbol,
        shares: shares,
        price: req.body.price
    };
    Trade.create(trade, condition)

        .then(data => {
            res.status(201).json({
                message: "Trade Created Successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(400).json({
                message:
                    err.message || "Some error occurred while creating the Trade."
            });
        });
};

exports.findAll = (req, res) => {
    const type = req.query.type;
    const user_id = req.query.user_id;
    var condition = type ? { type: { [Op.like]: `%${type}%` } } : null;
    var condition = user_id ? { user_id: { [Op.like]: `%${user_id}%` } } : null;

    Trade.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).json({
                message:
                    err.message || "Some error occurred in getting Trades."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Trade.findByPk(id)
        .then(data => {
            if (data == 1) {
                res.status(200).json({
                    message: "Trade found",
                    trade: data
                });
            }
            else {
                res.status(404).json({
                    message: "Invalid trade Entered"
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: "Error occured for Trade with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Trade.update(req.body, {
        where: { id: id }
    })
        .then(result => {
            if (result == 1) {
                res.status(200).json({
                    message: "Trade was updated successfully for id:" + id
                });
            } else {
                res.status(405).json({
                    message: `Cannot update Trade with id=${id}. Maybe Trade was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(405).json({
                message: "Error updating Trade with id=" + id,
                error: err
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Trade.destroy({
        where: { id: id }
    })
        .then(result => {
            if (result == 1) {
                res.status(200).json({
                    message: "Trade was deleted successfully!"
                });
            } else {
                res.status(405).json({
                    message: `Cannot delete trade with id=${id}. Maybe trade was not found!`
                });
            }
        })
        .catch(err => {
            res.status(405).json({
                message: "Could not delete trade with id=" + id
            });
        });
};