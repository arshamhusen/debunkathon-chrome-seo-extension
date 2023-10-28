const { Fact } = require("../models");
const { Op } = require("sequelize");

const factProvider = {
  getFacts: async () => {
    return await Fact.findAll();
  },
  getFact: async (id) => {
    return await Fact.findByPk(id);
  },
  getFactByTitle: async (title) => {
    return await Fact.findOne({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    });
  },
  createFact: async (fact) => {
    return await Fact.create(fact);
  },
  updateFact: async (id, fact) => {
    return await Fact.update(fact, {
      where: {
        id: id,
      },
    });
  },
  deleteFact: async (id) => {
    return await Fact.destroy({
      where: {
        id: id,
      },
    });
  },
};

module.exports = factProvider;
