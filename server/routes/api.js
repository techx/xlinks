// dependencies
const express = require('express');

const router = express.Router();

// api endpoints
router.get('/verify_user', function(req, res) {
    if (req.query.password == "yamatos") {
        res.status(200);
        res.send({links: {a: "1", b: "2"}});
    } else {
        res.status(403);
        res.send({});
    }
});

module.exports = router;
