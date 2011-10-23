Ti.UI.backgroundColor = '#fff';

// add a "require" function to the global scope (global object) which is smarter
// http://en.wikipedia.org/wiki/Monkey_patch ;)
require('lib/require_patch').monkeypatch(this);

//add a single variable to the global scope to which we may choose to
//intentionally add items to
var globals = {};

//create a private scope to prevent further polluting the global object
(function() {
	var AppTabGroup = require('ui/AppTabGroup'),
		AppWindow = require('ui/AppWindow'),
		AppWindowDays = require('ui/AppWindowDays'),
		AppWindowTasks = require('ui/AppWindowTasks');
	
	//create our global tab group	
	globals.tabs = new AppTabGroup(
		{
			title: 'Home',
			icon: 'images/KS_nav_ui.png',
			window: new AppWindow({title:'Home',backgroundColor:'white'})
		},
		{
			title: 'Days',
			icon: 'images/KS_nav_ui.png',
			window: new AppWindowDays({title:'Days',backgroundColor:'white'})
		},
		{
			title: 'Tasks',
			icon: 'images/KS_nav_views.png',
			window: new AppWindowTasks({title:'Tasks',backgroundColor:'white'})
		}
	);

	globals.tabs.open();
})();	

var date = new Date(); // will always return date in English
 
Ti.API.info('stuff '+String.formatDate(date, 'medium'));

