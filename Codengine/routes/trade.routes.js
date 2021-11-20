module.exports = app => {
    const trades = require("../controllers/trade.controller");

    var router = require("express").Router();

    // Create a new Trade
    router.post("/", trades.create);
    // Get all Trade with search of type and userid(optional)
    router.get("/all", trades.findAll);

    // Get Trade by id
    router.get("/:id", trades.findOne);

    //Update Trade by id
    router.put("/:id", trades.update);

    // Delete Trade By id
    router.delete("/:id", trades.delete);

    //default endpoint to hit Trades api
    app.use('/api/trades', router);

}