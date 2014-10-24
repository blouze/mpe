Meteor.methods({
	loopupUPC: function (upc) {
		this.unblock();
		console.log(JSON.stringify({
			"upc": upc
		}));
		return Meteor.http.call("GET", "https://api.semantics3.com/test/v1/products", {
			headers: {
				api_key: "SEM30D4D8BF89CC36AD8E2B0CF36BE998670",
				api_secret: "NDA2MDE3Y2M1MWQ4OTExZTcyMDQwMWQyMmYwZjE2NjM"
			},
			params: {
				q: JSON.stringify({
					"upc": upc
				})
			}
		});
		return Meteor.http.call("GET", "http://api.upcdatabase.org/json/" + "278b84547da72c04dd402befe6dd7ba4" + "/" + upc);
	}
});