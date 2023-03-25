"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products =  [
      {
        name: "Mochila Saco Uzumaki - NARUTO",
        price: 40.99,
        description: "Mochila Saco. Naruto Uzumaki Amarela, impermeável e leve.",
        category: "bolsa",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_F3MGyshocRvZYRq8nDvTnb9mVaoZviRzTQ&usqp=CAU",
        valid: true,
      },
      {
        name: "Almofada Iron Man - MARVEL",
        price: 39.90,
        description: "Almofada Iron Man branca. Tecido de algodão e preenchimento de plumas.",
        category: "almofada",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ54KTrMRxaXLH-7s5oZNHcHBTBkeohvePwhA&usqp=CAU",
        valid: true,
      },
      {
        name: "Funko Pop Mulher Maravilha e Pegasus - DC",
        price: 99.90,
        description: "Funko Pop Mulher Maravilha no Pegasus 280 Super Luxo.",
        category: "funko pop",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSO6t4LxghpFHJ0Mh3FSlCb9uPsks8QYafyg&usqp=CAU",
        valid: true,
      },
      {
        name: "Funko Pop Mulher Maravilha, escudo e espada - DC",
        price: 99.90,
        description: "Funko Pop Mulher Maravilha com escudo e espada.",
        category: "funko pop",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3kq7KKW3meJLHUV2vHdCjnsS0MKVTWhQ6kYSLMUeQeaOU9mJIzjB3nn75NBrOtKgF_E4&usqp=CAU",
        valid: true,
      },
      {
        name: "Funko Pop Yuji Itadori - Jujutsu Kaisen",
        price: 99.90,
        description: "Funko Pop Yuji Itadori com Slaughter prata.",
        category: "funko pop",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREUU3-0QNzuGIXbOCFtBFekXKzrnyaxlRC_w&usqp=CAU",
        valid: true,
      },
    ];
    await queryInterface.bulkInsert(
      "products",
      products,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
