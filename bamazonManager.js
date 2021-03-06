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

managerOptions();

function managerOptions() {
    inquirer.prompt([{
        type: "list",
        name: "selection",
        message: "what do you want to do",
        choices: ["View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Disconnect Manager View"
        ]
    }, ]).then(function (input) {
        switch (input.selection) {
            case "View Products for Sale":
                console.log("");
                printItems();
                break;
            case "View Low Inventory":
                console.log("");
                lowInventory();
                break;
            case "Add to Inventory":
                console.log("");
                addInventory();
                break;
            case "Add New Product":
                console.log("");
                addProduct();
                break;
            case "Disconnect Manager View":
                connection.end();
                break;
        }
    })
};



function printItems() {
    queryInventory = "SELECT * FROM products";

    connection.query(queryInventory, function (err, data) {
        if (err)
            return console.log(err);

        var inventory = " ";
        for (var i = 0; i < data.length; i++) {
            inventory = '';
            inventory += 'Item ID Number: ' + data[i].item_id + '\n';
            inventory += 'Product Name: ' + data[i].product_name + '\n';
            inventory += 'Price:  $' + data[i].price + '\n';
            inventory += 'Quantity: ' + data[i].stock_quantity + '\n';

            console.log(inventory);
        }
        console.log("");
        managerOptions();

    })
}

function lowInventory() {
    queryInventory = "SELECT * FROM products WHERE stock_quantity<?";

    connection.query(queryInventory, 100, function (err, data) {
        if (err)
            return console.log(err);

        var inventory = " ";
        for (var i = 0; i < data.length; i++) {
            inventory = '';
            inventory += 'Item ID Number: ' + data[i].item_id + '\n';
            inventory += 'Product Name: ' + data[i].product_name + '\n';
            inventory += 'Price:  $' + data[i].price + '\n';
            inventory += 'Quantity: ' + data[i].stock_quantity + '\n';

            console.log(inventory);
        }
        console.log("");
        managerOptions();

    })
}

function addInventory() {
    validateNum = function (input) {
        if (isNaN(parseFloat(input)) ||
            input > 100)
            return "Input a valid number";
        return true;
    }

    inquirer.prompt([{
            type: "input",
            name: "id",
            message: "please enter the id of the product you would like to add"
        },
        {
            type: "input",
            name: "quantityadded",
            message: "how many units of the product would you like to add?",
            validate: validateNum
        }
    ]).then(function (input) {
        var inventory = "SELECT * FROM products WHERE ?";
        var updateInventory = "UPDATE products SET ? where ?"
        var itemID = input.id;
        var quantity = input.quantityadded;

        let query = connection.query(inventory, {
            item_id: itemID
        }, function (err, data) {
            if (err) throw err;

            if (!data.length) {
                console.log("\nPlease enter a valid item ID\n");
                addInventory();
            } else {

                var itemInfo = data[0];
                var newSum = parseInt(quantity) + parseInt(itemInfo.stock_quantity);

                connection.query(updateInventory, [{
                        stock_quantity: newSum
                    },
                    {
                        item_id: itemID
                    }
                ], function (err, data) {
                    connection.query(inventory, [{
                        item_id: itemID
                    }], function (err, data) {
                        console.log("");
                        console.log("The product: " + data[0].product_name + " now has " + data[0].stock_quantity + " units in inventory.");
                        console.log("");
                        managerOptions();
                    })
                })
            }
        });
    });

};

function addProduct() {

    validateNum = function (input) {
        if (isNaN(parseFloat(input)) ||
            input > 100)
            return "Input a valid number";
        return true;
    }

    inquirer.prompt([{
            name: "itemid",
            message: "please enter the item id of the new product you would like to add to inventory"
        },
        {
            name: "productname",
            message: "please enter the name of the product you would like to add to inventory"
        },
        {
            name: "department",
            message: "please enter the department related to the product"
        },
        {
            name: "price",
            message: "please enter the price including cents (do not add dollar sign)",
            validate: validateNum
        },
        {
            name: "quantity",
            message: "how many units of the product are you adding?",
            validate: validateNum
        }
    ]).then(function (input) {
        let query = connection.query(
            "INSERT INTO products SET ?", {
                item_id: input.itemid,
                product_name: input.productname,
                department_name: input.department,
                price: input.price,
                stock_quantity: input.quantity
            },
        )
        console.log("you've successfully added: " + input.productname + " to inventory");
        console.log("");
        managerOptions();

    })
}