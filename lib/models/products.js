var Schema = {};

Products = new Mongo.Collection("products");

Schema.Products = new SimpleSchema({
	upc: {
		type: String,
		label: "UPC/EAN"
	},
	name: {
		type: String,
		label: "Nom"
	},
	manufacturer: {
		type: String,
		label: "Fabriquant",
		optional: true
	},
	category: {
		type: String,
		label: "Catégorie",
		optional: true
	},
	description: {
		type: String,
		label: "Description",
		optional: true,
		autoform: {
			rows: 3
		}
	},
	price_in: {
		type: Number,
		label: "Prix d'achat",
		decimal: true,
		min: 0,
		autoform: {
			step: 10
		}
	},
	price_out: {
		type: Number,
		label: "Prix de revente",
		decimal: true,
		min: 0,
		autoform: {
			step: 10
		}
	},
	coef: {
		type: Number,
		label: "Coef.",
		optional: true
	},
	stock: {
		type: Number,
		label: "Stock"
	},
	created_at: {
		type: Date,
		label: "Date de création",
		optional: true
	}
});

Products.attachSchema(Schema.Products);

Products.allow({
	insert: function () {
		return true;
	},
	remove: function () {
		return true;
	}
});