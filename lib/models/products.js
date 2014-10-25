var Schema = {};

Products = new Meteor.Collection("products");
Schema.Products = new SimpleSchema({
	upc: {
		type: String,
		label: "UPC/EAN"
	},
	name: {
		type: String,
		label: "Nom"
	},
	category: {
		type: String,
		label: "Catégorie",
		optional: true
	},
	description: {
		type: String,
		label: "Description",
		optional: true
	},
	stock_quantity: {
		type: Number,
		label: "Quantité en stock"
	},
	created_at: {
		type: Date,
		label: "Date de création"
	}
});
Products.attachSchema(Schema.Products);