const express = require('express');
const router = express.Router();
const Url = require('../model/urlModel');

router.get('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;
    const record = await Url.findOne({ shortCode });

    if (record) {
        console.log(`Redirecting to: ${record.url}`);
        return res.redirect(record.url); // Redirect to original URL
    }

    res.status(404).send('Short URL not found.');
});

module.exports = router;

    
