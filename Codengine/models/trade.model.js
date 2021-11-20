module.exports = (sequelize, Sequelize) => {

    const Trade = sequelize.define("trade", {
        type: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        symbol: {
            type: Sequelize.STRING
        },
        shares: {
            type: Sequelize.INTEGER,
            validate: {
                max: 100,                 
                min: 1,
            }
        },
        price: {
            type: Sequelize.INTEGER
        }
    });
    return Trade;
};