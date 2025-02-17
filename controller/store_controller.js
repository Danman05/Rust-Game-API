const db = require('../config/db')


exports.getItems = async (req, res) => {
    try {
        const [items] = await db.query('select * from store_item');
        res.json(items);
    } catch(err) {
        res.status(500).json({message: 'Error fetching items'});
    }
}

