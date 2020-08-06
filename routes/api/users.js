const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

// Get login page 
router.get('/users/login', (req, res) => {
    const errors = {};
    return res.render('login', { errors });
});

// Login
router.post('/users/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.render('login', { errors });
    }

    let user = req.body;

    mysqlConnection.query('SELECT * FROM users WHERE email = ? and password = ?', [user.email, user.password], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                let user = rows[0];
                req.session.user = user;
                return res.redirect('/users/profile');
            }
            else {
                let errors = {};
                errors.user = "Email or Password is incorrect!";
                return res.render('login', { errors });
            }
        }
        else {
            console.log(err);
            return res.status(400).json("ERROR!");
        }
    })

});


// Get all users
router.get('/users', (req, res) => {
    if (req.session.user) {
        mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
            if (!err) {
                const users = rows;
                return res.render('users', { users });
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

// Get an user
// router.get('/users/get/:id', (req, res) => {
//     mysqlConnection.query('SELECT * FROM users WHERE user_id = ?', [req.params.id], (err, rows, fields) => {
//         if (!err)
//             return res.send(rows);
//         else
//             console.log(err);
//             return res.status(400).json("ERROR!");
//     })
// });

//Delete an user
router.post('/users/delete', (req, res) => {
    console.log(req.body.user_id);
    if (req.session.user) {
        mysqlConnection.query('DELETE FROM users WHERE user_id = ?', [req.body.user_id], (err, rows, fields) => {
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

// Get Register Page
router.get('/users/register', (req, res) => {
    const errors = {};
    res.render('register', { errors });
});

//Register an user
router.post('/users/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        // return res.status(400).json(errors);
        return res.render('register', { errors });
    }

    let user = req.body;
    let sql = "Select * from users where email = ?;";
    mysqlConnection.query(sql, [user.email], (err, rows, fields) => {
        if (rows.length > 0) {
            errors.email = "Email already exists";
            return res.render('register', { errors });
        }
        else {
            let user = req.body;
            let sql = "INSERT INTO `users` (`user_id`, `name`, `email`, `password`) VALUES (NULL, ?, ?, ?);";
            mysqlConnection.query(sql, [user.name, user.email, user.password], (err, rows, fields) => {
                if (!err) {
                    console.log("ID " + rows.insertId + " inserted successfully !");
                    const newUser = {
                        user_id: rows.insertId,
                        name: user.name,
                        email: user.email,
                        password: user.password
                    }

                    req.session.user = newUser;

                    return res.redirect('/users/profile');
                }
                else {
                    console.log(err);
                    return res.status(400).json("ERROR!");
                }

            })
        }

    })

});

// Get Profile
router.get('/users/profile', (req, res) => {
    if (req.session.user) {
        const user = req.session.user;
        res.render('profile', { user });
    }
    else
        res.redirect('/users/login');
});

// Get Edit Profile Page
router.get('/users/edit_profile', (req, res) => {
    const errors = {};
    if (req.session.user) {
        const user = req.session.user;
        res.render('edit_profile', { errors, user });
    }
    else
        res.redirect('/users/login');
});

// Update an user
router.post('/users/edit_profile', (req, res) => {
    if (req.session.user) {
        const { errors, isValid } = validateRegisterInput(req.body);

        if (!isValid) {
            let user = req.session.user;
            return res.render('edit_profile', { errors, user });
        }

        let user = req.body;
        user.user_id = req.session.user.user_id;

        let sql = "Update users set name = ?, email = ?, password = ? where user_id = ?";
        mysqlConnection.query(sql, [user.name, user.email, user.password, user.user_id], (err, results, fields) => {
            if (!err) {
                console.log("ID " + results.insertId + " updated successfully !");
                req.session.user = user;
                return res.redirect('/users/profile');
            }
            else {
                console.log(err);
                return res.status(400).json("ERROR!");
            }

        })
    }
    else
        res.redirect('/users/login');
});

router.get('/logout', (req, res) => {
    req.session.user = null;
    res.redirect('/users/login');
});



module.exports = router;