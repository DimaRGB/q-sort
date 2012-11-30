function clickButton(e, ui) {
	if (ui.id == 'nextButton') {
		ui.id = 'okButton';
		ui.disabled = 'disabled';
		ui.innerHTML = 'Завершити';
		var level2 = document.getElementById('level2');
		var level0 = document.getElementById('level0');
		level2.style.display = 'table';
		level0.style.display = 'none';
	} else if (ui.id == 'okButton') {
		var json = {"degree":[]};
		count = parseInt(document.getElementById('degree00').title);
		for (var i = 0; i < count; i++) {
			var degree = document.getElementById('assertion' + i).parentNode;
			json.degree[i] = parseInt(degree.id.substring('degree2'.length)) + 1;
		}
		alert(JSON.stringify(json));
	}
}

function allowDrop(e, ui) {
	e.preventDefault();
}

function drag(e, ui) {
	var json = {"degreeId":"","assertionId":""};
	json.degreeId = ui.parentNode.id;
	json.assertionId = ui.id;
	e.dataTransfer.setData('Text', JSON.stringify(json));
}

function drop(e, ui) {
	e.preventDefault();
	if (ui.className != 'degree' || ui.childElementCount >= ui.title)
		return;
	var data = e.dataTransfer.getData('Text');
	var json = JSON.parse(data);
	if (json.degreeId != ui.id)
		ui.appendChild(document.getElementById(json.assertionId));

	var button, level;
	if ((button = document.getElementById('nextButton')) != null)
		level = document.getElementById('level0');
	else if ((button = document.getElementById('okButton')) != null)
		level = document.getElementById('level1');

	if (isLevelEmpty(level))
		button.disabled = ''; else
	if (button.disabled == '')
		button.disabled = 'disabled';
}

function isLevelEmpty(level) {
	greats = level.rows[1].cells;
	for (var i = 0; i < greats.length; i++) {
		if (greats[i].childElementCount > 0)
			return false;
	}
	return true;
}