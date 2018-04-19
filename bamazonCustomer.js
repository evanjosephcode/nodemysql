var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "",
  database: "bamazon"
});

function reinitiate() {
  inquirer.prompt([{
    type: "list",
    name: "selection",
    message: "what do you want to do",
    choices: ["shop again",
      "sign out of Amazon / end connection",
    ]
  }, ]).then(function (input) {
    switch (input.selection) {
      case "shop again":
        console.log("");
        printItems();
        break;
      case "sign out of Amazon / end connection":
        console.log("");
        connection.end();
        break;
    }
  })
}

connection.connect(function (err) {
  if (err) throw err;
  printItems();
});

function printItems() {
  queryInventory = "SELECT * FROM products";

  connection.query(queryInventory, function (err, data) {
    if (err)
      return console.log(err);

    var inventory = " ";
    for (var i = 0; i < data.length; i++) {
      inventory = ' ';
      inventory += 'Item ID Number: ' + data[i].item_id + ' ** ';
      inventory += 'Product Name: ' + data[i].product_name + ' ** ';
      inventory += 'Price:  $' + data[i].price + ' ** \n';

      console.log(inventory);
    }

    createOrder();
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
  ]).then(function (input) {
    var inventory = "SELECT * FROM products WHERE ?";
    var itemID = input.id;
    var quantity = input.quantity;


    let query = connection.query(inventory, {
      item_id: itemID
    }, function (err, data) {
      if (err) throw err;

      if (data.length === 0) {

        console.log(`
        
        
        please input a valid Item ID
        
        
        `);
        printItems();
      } else {
        var itemInfo = data[0];

        if (quantity <= itemInfo.stock_quantity) {
          console.log("thanks for shopping");

          var updateInventory = "UPDATE products SET ? where ?"

          connection.query(updateInventory, [{
              stock_quantity: itemInfo.stock_quantity - quantity
            },
            {
              item_id: itemID
            }
          ], function (err, data) {
            if (err) throw err;
            console.log("Enjoy your purchase.  Your total is $" + (itemInfo.price * quantity).toFixed(2) + ".\n");
            reinitiate();
          })

        } else {
          console.log(`
          
          
          `);
          console.log("Sorry we cannot fullfill your order we only have " + itemInfo.stock_quantity + " units of " + itemInfo.product_name + " left");
          console.log(`
            
            
            `);
          printItems();
        }
      };
    });
  });
}