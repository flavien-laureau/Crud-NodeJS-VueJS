const Item = require('../models/Item');
const fs = require('fs');


exports.getAllItems = (req, res, next) => {
	Item.find()
		.then(things => res.status(200).json(things))
		.catch(error => res.status(400).json({ error }));
};

exports.getOneItem = (req, res, next) => {
	Item.findOne({ _id: req.params.id })
		.then(thing => res.status(200).json(thing))
		.catch(error => res.status(400).json({ error }));
};

exports.createItem = (req, res, next) => {
	const item = new Item({
		...JSON.parse(req.body.item),
		image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	});
	item.save()
		.then(() => res.status(201).json({ message: 'Objet enregistré !'}))
		.catch(error => res.status(400).json({ error }));
};

exports.modifyItem = (req, res, next) => {
	const newItem = req.file ? {
		...JSON.parse(req.body.item),
		image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	} : { ...JSON.parse(req.body.item) };

	if(req.file) {
		Item.findOne({ _id: req.params.id })
			.then(item => {
				const filename = item.image.split('/images/')[1];
				fs.unlink(`images/${filename}`, () => {
					Item.updateOne({ _id: req.params.id}, { ...newItem, _id:req.params.id })
						.then(() => res.status(200).json({ message: 'Objet modifié !' }))
						.catch(error => res.status(400).json({ error }));
				});
			})
			.catch(error => res.status(400).json({ error }))
	}else {
		Item.updateOne({ _id: req.params.id}, { ...newItem, _id:req.params.id })
			.then(() => res.status(200).json({ message: 'Objet modifié !' }))
			.catch(error => res.status(400).json({ error }));
	}
};

exports.deleteItem = (req, res, next) => {
	Item.findOne({ _id: req.params.id })
		.then(item => {
			const filename = item.image.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {
				Item.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Objet supprimé !'}))
					.catch(error => res.status(400).json({ error }));
			});
		})
		.catch(error => res.status(500).json({ error }));
};