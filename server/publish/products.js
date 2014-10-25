Meteor.publish(null, function () {
	return Products.find();
});