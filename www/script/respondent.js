function allowDrop(e, ui) {
	e.preventDefault();
}

function drag(e, ui) {
	e.dataTransfer.setData('Text', '{"blockId": "' + ui.parentNode.id + '", "assertionId": "' + ui.id + '"}');
}

function drop(e, ui) {
	e.preventDefault();
	if (ui.className != 'block' || getAssertionCount(ui) >= ui.title)
		return;
	var data = e.dataTransfer.getData('Text');
	var json;
	if (typeof JSON != "undefined")
		json = JSON.parse(data);
	else
		json = eval('(' + data + ')');
	if (json.blockId != ui.id)
		ui.appendChild(document.getElementById(json.assertionId));
}

function getAssertionCount(block) {
	return block.childElementCount;
}