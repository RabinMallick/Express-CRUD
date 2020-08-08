const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../model/db');
const validateCustomerInput = require('../../validation/add-customer');

// Get add customer page
router.get('/add_customer', (req, res) => {
    if (!req.session.user)
        res.redirect('/users/login');
    const errors = {};
    res.render('add_customer', { errors });
});

// Add new customer
router.post('/add_customer', (req, res) => {
    if (!req.session.user)
        res.redirect('/users/login');

    const { errors, isValid } = validateCustomerInput(req.body);

    if (!isValid) {
        // return res.status(400).json(errors);
        return res.render('add_customer', { errors });
    }

    let user = req.body;
    let sql = "Select * from customers where email = ?;";
    mysqlConnection.query(sql, [user.email], (err, rows, fields) => {
        if (rows.length > 0) {
            errors.email = "Email already exists";
            return res.render('add_customer', { errors });
        }
        else {
            let customer = req.body;
            customer.admin_id = req.session.user.user_id;
            let sql = "INSERT INTO `customers` (`customer_id`, `name`, `email`, `address`, `admin_id`) VALUES (NULL, ?, ?, ?, ?);";
            mysqlConnection.query(sql, [customer.name, customer.email, customer.address, customer.admin_id], (err, rows, fields) => {
                if (!err) {
                    console.log("Customer " + rows.insertId + " inserted successfully !");
                    return res.redirect('/customers/get_all');
                }
                else {
                    console.log(err);
                    return res.status(400).json("ERROR!");
                }

            })

        }

    })
});

// Get all customers
router.get('/get_all', (req, res) => {
    if (req.session.user) {
        mysqlConnection.query('SELECT * FROM customers where admin_id = ?', [req.session.user.user_id], (err, rows, fields) => {
            if (!err) {
                const customers = rows;
                return res.render('customers', { customers });
            }
            else
                console.log(err);
            return res.status(400).json("ERROR!");
        })
    }
    else {
        res.redirect('/users/login');
    }
});

// Delete a customer
router.post('/delete', (req, res) => {
    if (req.session.user) {
        mysqlConnection.query('DELETE FROM customers WHERE customer_id = ? and admin_id = ?', [req.body.customer_id, req.session.user.user_id], (err, rows, fields) => {
            if (!err)
                return res.status(200).json("Deleted successfully.");
            else {
                console.log(err);
                return res.status(400).json("ERROR!");
            }
        })
    }
    else {
        return res.status(400).json("ERROR!");
    }
});

// Get Edit Customer Page
router.get('/edit_customer/:customer_id', (req, res) => {
    if (!req.session.user)
        return res.redirect('/users/login');

    let user = req.session.user;

    let sql = "Select * from customers where customer_id = ? and admin_id = ?";
    mysqlConnection.query(sql, [req.params.customer_id, user.user_id], (err, result, fields) => {
        if (!err) {
            if (result.length > 0) {
                const errors = {};
                let customer = result[0];
                req.session.customer = customer;
                return res.render('edit_customer', { errors, customer });
            }
            else {
                res.redirect('/customers/get_all');
            }
        }
        else {
            console.log(err);
            return res.status(400).json("DB ERROR");
        }
    });

});

router.post('/edit_customer', (req, res) => {
    if (!req.session.user)
        return res.redirect('/users/login');

    let customer = req.session.customer;
    const { errors, isValid } = validateCustomerInput(req.body);
    if (!isValid) {
        return res.render('edit_customer', { errors, customer });
    }

    customer = req.body;
    let sql = "Update customers set name = ?, email = ?, address = ? where customer_id = ? and admin_id = ?";
    mysqlConnection.query(sql, [customer.name, customer.email, customer.address, req.session.customer.customer_id, req.session.user.user_id], (err, results, fields) => {
        if (!err) {
            req.session.customer = null;
            return res.redirect('/customers/get_all');
        }
        else {
            console.log(err);
            req.session.customer = null;
            return res.status(400).json("ERROR!");
        }

    });

});

module.exports = router;