// routes/index.js
const express = require('express');
const router = express.Router();
const fileManager = require('../utils/fileManager');

// Home page
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        session: req.session
    });
});

// Find a pet
router.get('/find-pet', (req, res) => {
    res.render('find-pet', {
        title: 'Find a Pet',
        session: req.session
    });
});

router.post('/find-pet', (req, res) => {
    const criteria = {
        type: req.body['pet-type'],
        breed: req.body.breed,
        age: req.body.age,
        gender: req.body.gender
    };

    const matchingPets = fileManager.findPets(criteria);

    res.render('pet-results', {
        title: 'Matching Pets',
        pets: matchingPets,
        session: req.session
    });
});

// Dog care
router.get('/dog-care', (req, res) => {
    res.render('dog-care', {
        title: 'Dog Care',
        session: req.session
    });
});

// Cat care
router.get('/cat-care', (req, res) => {
    res.render('cat-care', {
        title: 'Cat Care',
        session: req.session
    });
});

// Create account
router.get('/create-account', (req, res) => {
    res.render('create-account', {
        title: 'Create Account',
        message: '',
        session: req.session
    });
});

router.post('/create-account', (req, res) => {
    const { username, password } = req.body;

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
        return res.render('create-account', {
            title: 'Create Account',
            message: 'Username can only contain letters and digits',
            session: req.session
        });
    }

    // Validate password format
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (!passwordRegex.test(password)) {
        return res.render('create-account', {
            title: 'Create Account',
            message: 'Password must be at least 4 characters with at least one letter and one digit',
            session: req.session
        });
    }

    // Add the user
    const added = fileManager.addUser(username, password);

    if (added) {
        res.render('create-account', {
            title: 'Create Account',
            message: 'Account created successfully! You can now log in.',
            session: req.session
        });
    } else {
        res.render('create-account', {
            title: 'Create Account',
            message: 'Username already exists. Please choose another one.',
            session: req.session
        });
    }
});

// Login for give-away
router.get('/give-away', (req, res) => {
    if (req.session.loggedIn) {
        res.render('give-away-form', {
            title: 'Give Away a Pet',
            session: req.session
        });
    } else {
        res.render('login', {
            title: 'Login',
            redirectTo: '/give-away',
            message: '',
            session: req.session
        });
    }
});

router.post('/login', (req, res) => {
    const { username, password, redirectTo } = req.body;

    // Validate login
    const valid = fileManager.validateLogin(username, password);

    if (valid) {
        req.session.loggedIn = true;
        req.session.username = username;
        res.redirect(redirectTo || '/give-away');
    } else {
        res.render('login', {
            title: 'Login',
            redirectTo: redirectTo || '/give-away',
            message: 'Invalid username or password',
            session: req.session
        });
    }
});

// Submit pet for give-away
router.post('/give-away', (req, res) => {
    if (!req.session.loggedIn) {
        return res.redirect('/give-away');
    }

    const petData = {
        type: req.body['animal-type'],
        breed: req.body.breed,
        age: req.body.age,
        gender: req.body.gender || 'unknown',
        friendlyWith: req.body.friendlyWith || '',
        comments: req.body.comments || ''
    };

    fileManager.addPet(req.session.username, petData);

    res.render('give-away-success', {
        title: 'Pet Registered',
        session: req.session
    });
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('logout', {
        title: 'Logged Out',
        session: {}
    });
});

// Contact
router.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Us',
        session: req.session
    });
});

// Privacy/Disclaimer
router.get('/privacy', (req, res) => {
    res.render('privacy', {
        title: 'Privacy Policy',
        session: req.session
    });
});

module.exports = router;