$(document).ready(function() {
///// Global variable
	var srcId, lowerLevel = 'level0';
/////
	$('*').disableSelection();
/////
	$('button').click(function(e) {
		var but = e.target;
		if (but.id == 'next') {
			but.id = 'finish';
			but.disabled = 'disabled';
			$('#level0').animate({opacity: 0, height: 0}, 1000, function() {
				$(this).hide();
				$('#level2').show();
				$('#level2').animate({opacity: 1, height: 250}, 1000);
				$(but).text('Завершити');
			});
		} else if (ui.id == 'finish') {
			var json = {"degree":[]};
			count = parseInt($('#degree00').title);
			for (var i = 0; i < count; i++) {
				var degree = $('#assertion' + i).parentNode;
				json.degree[i] = parseInt(degree.id.substring('degree2'.length)) + 1;
			}
			alert(JSON.stringify(json));
		}
	});
/////
	$('.level div').draggable({
		addClasses: false,
		containment: 'body',
		cursor: 'move',
		cursorAt: {
			left: $('.level div').width(),
			top: $('.level div').height()
		},
		distance: 8,
		zIndex: 4000,
		start: function(e) {
			srcId = e.target.parentNode.id;
		},
		stop: function() {
			$(this).removeAttr('class').removeAttr('style');
		}
	});
	
	$('.level td').droppable({
		addClasses: false,
		//hoverClass: 'dropHere',
		drop: function(e, ui) {
			var degree = e.target;
			if (degree.id == srcId || $(degree).children().length >= parseInt(degree.title))
				return;
			$(ui.draggable).appendTo(degree);
		/////
			var isLevelEmpty = true;
			$('#' + lowerLevel + ' td').each(function(i, el) {
				isLevelEmpty = $(el).children().length == 0;
				if (!isLevelEmpty)
					return;
			});
			if (isLevelEmpty)
				$('button').removeAttr('disabled');
			else if (!$('button').attr('disabled'))
				$('button').attr('disabled', 'disabled');
		}
	});
});