function allowDrop(e, ui) {
	e.preventDefault();
}

function drag(e, ui) {
	var json = {"gradeId":"","assertionId":""};
	json.gradeId = ui.parentNode.id;
	json.assertionId = ui.id;
	e.dataTransfer.setData('Text', JSON.stringify(json));
}

function drop(e, ui) {
	e.preventDefault();
	if (ui.className != 'grade' || ui.childElementCount >= ui.title) {
		return;
	}
	var data = e.dataTransfer.getData('Text');
	var json = JSON.parse(data);
	/*if (typeof JSON != "undefined")
		json = JSON.parse(data);
	else
		json = eval('(' + data + ')');*/
	if (json.gradeId != ui.id)
		ui.appendChild(document.getElementById(json.assertionId));
	var nextButton = document.getElementById('nextButton');
	if (nextButton.innerHTML == 'Продовжити') {
		if (isLevelEmpty('level0'))
			nextButton.disabled = ''; else
		if (nextButton.disabled == '')
			nextButton.disabled = 'disabled';
	} else if (nextButton.innerHTML == 'Завершити') {
		if (isLevelEmpty('level1'))
			nextButton.disabled = ''; else
		if (nextButton.disabled == '')
			nextButton.disabled = 'disabled';
	}
}

function isLevelEmpty(levelId) {
	greats = document.getElementById(levelId).rows[1].cells;
	for (var i = 0; i < greats.length; i++) {
		if (greats[i].childElementCount > 0)
			return false;
	}
	return true;
}

function nextStep(e, ui) {
	if (ui.innerHTML == 'Продовжити') {
		var level2 = document.getElementById('level2');
		var level0 = document.getElementById('level0');
		level2.style.display = 'block';
		level0.style.display = 'none';
		ui.disabled = 'disabled';
		ui.innerHTML = 'Завершити';
	} else if (ui.innerHTML == 'Завершити'){
		alert('Тут сформувати Excel');
	}
}