var mysql = require("mysql");
// need npm inquirer for prompts 
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  printItems();
  createOrder();
});

function printItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err)
      return console.log(err);

    console.log(res);
  })
}

function createOrder() {
  inquirer.prompt([{
      name: "id",
      message: "please enter the id of the product you would like to buy"
    },
    {
      name: "quantity",
      message: "how many units of the product would you like to buy?"
    }
  ]).then(function(newInput) {
            var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        // stock_quantity: subtract newInput.quantity from INITIAL AMOUNT
            
                    },
                    {
                        id: newInput.id
                    }
                ],

  // be sure move this to LAST function intiated in connection.connect
  connection.end();
}