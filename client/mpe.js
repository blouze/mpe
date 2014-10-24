Template.main.helpers({
	"product": function () {
		console.log(Session.get("productLookup"));
		return Session.get("productLookup");
	}
});

Template.main.events({
	"click button#codeBarBtn": function () {
		if (Meteor.isCordova)
			cordova.plugins.barcodeScanner.scan(
				function (result) {
					alert("We got a barcode\n" +
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
			Meteor.call('loopupUPC', "3344428000622", function (err, res) {
				if (err)
					console.log(err);
				else if (res && res.data) {
					if (res.data.results_count > 0)
						Session.set("productLookup", res.data.results[0]);
				}
			});
	}
});