const db = require('../config/db');
const crypto = require('crypto');

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
        const item = extractItemFields(req);
        const newItemId = crypto.randomUUID()
        await db.query('insert into store_item VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [newItemId, item.title, item.description, item.price, item.icon,  item.category, item.videoUrl, item.tebexUrl, item.duration]);

        res.json({message: "Succesfully created new item", id: newItemId});
    } catch (err) {
        res.status(500).json({message: err});
    }
}

exports.updateItem = async (req, res) => {
    try {
        const id = req.body.id;
        await itemExists(id);
        const item  = extractItemFields(req);

        const fields = Object.keys(item).filter(key => item[key] !== undefined);
        const values = fields.map(key => item[key]);

        if (fields.length === 0) {
            return res.status(400).json({ message: "No valid fields to update" });
        }
        
        const setClause = fields.map(field => `${field} = ?`).join(', ');
        values.push(id);
        
        await db.query(`update store_item
            set ${setClause}
            where id = ? `, values);

        res.json({message: "Updated succesfully"});
    } catch (err) {
        res.status(500).json({message: err});
    }
}

exports.deleteItem = async (req, res) => {
    try {

        const id = req.body.id;
        await itemExists(id);
        await db.query('delete from store_item where id = ?', id)
        res.json({message: 'Deleted succesfully'})
    } catch (err) {
        res.status(500).json({error: err})
    }
}

const extractItemFields = (req) => ({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    icon: req.body.icon,
    category: req.body.category,
    videoUrl: req.body.videoUrl,
    tebexUrl: req.body.tebexUrl,
    duration: req.body.duration
});

const itemExists = async (id) => {
    const [i] = await db.query('select * from store_item where id = ?', id);
    if (!i || i.length === 0) {
        throw 'Item does not exist'
    }
}

