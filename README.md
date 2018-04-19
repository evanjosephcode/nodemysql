# Node.JS + MySQL
## Creating an Amazon-like storefront with MySQL
Using *Node.JS* to access Amazon-like inventory and buy if the customer, and check on inventory if the manager. 

**... but what specifically can you do?**<br><br>
**if the customer**:<br>
*pull up inventory, purchase the product desired, and specify quantity<br>
*it will also give you the total of your order after checkout<br><br>
**if the manager**:<br>
*view inventory, low inventory (queries qty less than 100), add qty of existing product, add new product

**instructions:**<br>
'node bamazonCustomer.js'<br>
-OR-<br>
'node bamazonManager.js'<br>
are the key commands to initate the app<br>

**Note:**<br> 
requires use of inquirer and mysql npm packages to work.<br>
(so dont forget 'npm init' and 'npm install' to grab needed packages)<br><br>
also requires MySQL to be run locally so you can access the database<br>
(if using Sequel Pro on Mac: 'mysql.server start' in Terminal to ensure the process has started)

**if you would like a visual cue of the functionality in action:**<br>
check out *bamazonCustomer_in_use.png* and *bamazonManager_in_use.png* in /screenshots<br>
