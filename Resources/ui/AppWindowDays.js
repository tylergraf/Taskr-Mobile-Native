//A window object which will be associated with the stack of windows
exports.AppWindowDays = function(args) {
	
var url = "http://tyler.local:3000/tasks.native";
var urlDays = "http://tyler.local:3000/users/show.native";

var win = Ti.UI.createWindow(args);
var table = Ti.UI.createTableView({
	height: 240,
	zindex: 1,
	top: 30
});
var dayTitle = Ti.UI.createView({
	height: 30,
	width: 320,
	backgroundColor: '#333',
	top: 0
});
var scrollView = Ti.UI.createScrollView({
	height:100,
	width:320,
	contentWidth: 500,
	layout:'horizontal',
	bottom: 0,
	zindex: 2,
	backgroundColor: '#333'
});
var tableData = [];
var json, tasks, task, i, row, nameLabel, nickLabel;

var xhr = Ti.Network.createHTTPClient({
    onload: function() {
	Ti.API.debug(this.responseText);

	json = JSON.parse(this.responseText);
	for (i = 0; i < json.tasks.length; i++) {
	    task = json.tasks[i];
	    row = Ti.UI.createTableViewRow({
	        height:'60dp'
	    });
	    nameLabel = Ti.UI.createLabel({
	        text:task.task,
	        font:{
	            fontSize:'24dp',
		    fontWeight:'bold'
		},
		height:'auto',
		left:'10dp',
		top:'5dp',
		color:'#000',
		touchEnabled:false
	    });
	    nickLabel = Ti.UI.createLabel({
		text:'"' + task.task_frequency + '"',
		font:{
		    fontSize:'16dp'
		},
		height:'auto',
		left:'15dp',
		bottom:'5dp',
		color:'#000',
		touchEnabled:false
	    });

	    row.add(nameLabel);
	    row.add(nickLabel);
	    tableData.push(row);
    }

	table.setData(tableData);
    },
    onerror: function(e) {
	Ti.API.debug("STATUS: " + this.status);
	Ti.API.debug("TEXT:   " + this.responseText);
	Ti.API.debug("ERROR:  " + e.error);
	alert('There was an error retrieving the remote data. Try again.');
    },
    timeout:5000
});
var jsonDays, days, day, e, dayView, dayDone, tempDate, dump;
var xhrDays = Ti.Network.createHTTPClient({
    onload: function() {
	Ti.API.debug(this.responseText);

	jsonDays = JSON.parse(this.responseText);
	for (i = 0; i < jsonDays.days.length; i++) {
	    day = jsonDays.days[i];
	    tempDate = Date.parse(day.date);
	    // dump = tempDate.format("m/dd/yy");
	    // Ti.API.debug(tempDate);
	    dayView = Ti.UI.createView({
			height: 100,
			backgroundColor: '#333',
			width: 100
		});
	    date = Ti.UI.createLabel({
	        text:Ti,
	        font:{
	            fontSize:'18dp',
		    fontWeight:'bold'
		},
		height:'auto',
		left:'10dp',
		top:'5dp',
		color:'#fff',
		touchEnabled:false
	    });
	    
	    dayDone = Ti.UI.createLabel({
		text: day.done,
		font:{
		    fontSize:'13dp'
		},
		height:'auto',
		left:'15dp',
		bottom:'5dp',
		color:'#fff',
		touchEnabled:false
	    });

	    dayView.add(date);
	    dayView.add(dayDone);
  		scrollView.add(dayView);
  }
    },
    onerror: function(e) {
	Ti.API.debug("STATUS: " + this.status);
	Ti.API.debug("TEXT:   " + this.responseText);
	Ti.API.debug("ERROR:  " + e.error);
	alert('There was an error retrieving the remote data. Try again.');
    },
    timeout:5000
});

// view = Ti.UI.createView({
	// height: 100,
	// backgroundColor: 'red',
	// width: 100
// });
xhr.open("GET", url);
xhr.send();
xhrDays.open("GET", urlDays);
xhrDays.send();



win.add(table);
win.add(scrollView);
win.add(dayTitle);
return win;
};
