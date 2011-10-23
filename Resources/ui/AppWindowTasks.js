//A window object which will be associated with the stack of windows
exports.AppWindowTasks = function(args) {
	
var url = "http://tyler.local:3000/tasks.native";
var win = Ti.UI.createWindow(args);
var table = Ti.UI.createTableView({editable: true});
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


/*****nav buttons******/
var addTask = Ti.UI.createButton({
	systemButton:Ti.UI.iPhone.SystemButton.ADD
});

addTask.addEventListener('click', function()
{
	//Ti.UI.createAlertDialog({title:'System Button', message:'ADD'}).show();
	Ti.include('/ui/AppWindowCreateTask.js');
});

var editTasks = Ti.UI.createButton({
	systemButton:Ti.UI.iPhone.SystemButton.EDIT
});
editTasks.addEventListener('click', function()
{
	Ti.UI.createAlertDialog({title:'System Button', message:'Edit'}).show();
});

/*******This is called when a user deletes a row*******/
table.addEventListener('delete',function(e){
	Ti.UI.createAlertDialog({title:'Delete', message:e.row}).show();
	Ti.API.info('Row Data: '+JSON.stringify(e.rowData));
	Ti.API.info('Row: '+JSON.stringify(e.row));

});

xhr.open("GET", url);
xhr.send();

win.rightNavButton = addTask;
win.leftNavButton = editTasks;
win.add(table);
	
return win;
};
