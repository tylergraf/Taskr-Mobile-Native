
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
