Template.home.helpers({
	"product": function () {
		return Session.get("productLookup");
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
	}
});
//3344428000622