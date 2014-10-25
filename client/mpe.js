Template.home.helpers({
	"product": function () {
		return Session.get("productLookup");
	},
	"productCoef": function () {
		return Session.get("productCoef");
	},
	"productUPC": function () {
		var p = Session.get("productLookup");
		if (p)
			return p.ean || p.upc;
	}
});

Template.home.events({
	"click button#barCodeBtn": function () {
		if (Meteor.isCordova)
			cordova.plugins.barcodeScanner.scan(
				function (result) {
					console.log("We got a barcode\n" +
						"Result: " + result.text + "\n" +
						"Format: " + result.format + "\n" +
						"Cancelled: " + result.cancelled);
					Meteor.call('loopupUPC', result.text, function (err, res) {
						if (err)
							console.log(err);
						else if (res && res.data)
							if (res.data.results_count > 0)
								Session.set("productLookup", res.data.results[0]);
						});
				}, function (error) {
					alert("Scanning failed: " + error);
				});
		else
			Meteor.call('loopupUPC', "883974958450", function (err, res) {
				if (err)
					console.log(err);
				else if (res && res.data) {
					if (res.data.results_count > 0)
						Session.set("productLookup", res.data.results[0]);
				}
			});
	},
	"blur input#price_out": function (e, t) {
		console.log(t.find("#price_out"));
		var p_in = t.find("#price_in").value;
		var p_out = t.find("#price_out").value;
		if (p_in > 0)
			Session.set("productCoef", numeral(p_out / p_in).format("0.00"));
	}
});
//3344428000622

Template.home.rendered = function () {
	Session.set("productLookup", null);
	Session.set("productCoef", 1);
};
