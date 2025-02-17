const db = require('../config/db')
const crypto = require('crypto')

exports.getItems = async (req, res) => {
    try {
        const [items] = await db.query('select * from store_item');
        res.json(items);
    } catch(err) {
        res.status(500).json({message: 'Error fetching items'});
    }
}
exports.addItem = async (req, res) => {
    try {
        var title = req.body.title
        console.log(title);
        var description = req.body.description
        var price = req.body.price
        var icon = req.body.icon
        var category = req.body.category
        var videoUrl = req.body.videoUrl
        var tebexUrl = req.body.tebexUrl
        var duration = req.body.duration
        await db.query('insert into store_item VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', [crypto.randomUUID(), title, description, price, icon, category, videoUrl, tebexUrl, duration])
        res.json({message: "Succesfully created new item"})
    } catch (err) {
        console.log(err);
    }
}



