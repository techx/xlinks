// dependencies
const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

// api endpoints
router.get('/verify_user', function(req, res) {
    if (req.query.password == "yamatos") {
        fetch("https://x.techx.io/admin/api", {
            headers: {
                'Accept': 'application/json',
                'x-access-token': process.env.auth_key,
            }
        })
        .then(links => links.json())
        .then(links => {
            res.status(200);
            res.send({links: links});
        });
    } else {
        res.status(403);
        res.send({});
    }
});

module.exports = router;
