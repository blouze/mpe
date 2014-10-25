Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading'
});

Router.onBeforeAction('loading');

Router.map(function () {
	this.route('home', {
		path: '/',
		data: function () {
			return Products.find();
		}
	});
});