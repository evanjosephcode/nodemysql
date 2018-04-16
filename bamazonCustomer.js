var mysql = require("mysql");
// need npm inquirer for prompts 
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  printItems();
  createOrder();
});

function printItems() {
  queryInventory = "SELECT * FROM products";

  connection.query(queryInventory, function (err, res) {
    if (err)
      return console.log(err);

    var inventory = " ";
    for (var i = 0; i < data.length; i++) {
      inventory = ' ';
      inventory += 'Item ID Number: ' + data[i].item_id + ' ** ';
      inventory += 'Product Name: ' + data[i].product_name + ' ** ';
      inventory += 'Price:  ' + data[i].price + ' ** \n';

      console.log(inventory);
    }
  })
}

function createOrder() {
  inquirer.prompt([{
      type = "input",
      name: "id",
      message: "please enter the id of the product you would like to buy"
    },
    {
      type: "input",
      name: "quantity",
      message: "how many units of the product would you like to buy?"
    }
  ]).then(function (input) {

    var inventory = "SELECT * FROM products";
    var itemID = input.id;
    var quantity = input.quantity;


    connection.query(inventory, {
        item_id: itemID
      }),
      function (err, data) {
        if (err) throw err;

        if (data.length === 0) {
          console.log("please input a valid Item ID");
          printItems();
        } else {
          var itemInfo = data[0];

          if (quantity <= itemInfo.stock_quantity) {
            console.log("thanks for shopping");

            var updateInventory = "UPDATE products SET stock_quantity= " + (itemInfo.stock_quantity - quantity) + " WHERE item_id = " + item;

            connection.query(updateInventory, function (err, data) {
              if (err) throw err;
              console.log("Enjoy your purchase.  Your total is $" + (itemInfo.price * quantity) + "."); //calculates total

              connection.end();
            })

          } else {
            console.log("Sorry we cannot fullfill your order we only have " + itemInfo.stock_quantity + "units of that left");
            printItems();
          }
        };
      }
  });
}