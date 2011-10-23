var addTaskWindow = Ti.UI.createWindow({
	title: 'New Window',
	backgroundColor: 'white'
});
var AddTaskButton = Ti.UI.createButton({
	title: 'Add Task',
	height: 30,
	width: 100,
	borderColor: '#ddd',
	borderRadius: 3,
	backgroundColor: '#f1f1f1',
	color: '#333',
	top: 100,
	left: 10
});

var cancelButton = Ti.UI.createButton({
	title: 'Cancel',
	height: 60,
	width: 200,
	top: 100
});
var textArea = Ti.UI.createTextField({
	height: 30,
	top: 20,
	right: 10,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED	
});

addTaskWindow.add(cancelButton);
addTaskWindow.add(AddTaskButton);
addTaskWindow.add(textArea);
globals.tabs.currentTab.open(addTaskWindow);
