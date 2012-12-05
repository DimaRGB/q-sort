$(document).ready(function() {
///// Global variable
	var srcId, lowerLevel = 'level0';
/////
	$('*').disableSelection();
/////
	$('button').click(function(e) {
		var but = e.target;
		if (but.id == 'next') {
			but.disabled = 'disabled';
			$('#level0').animate({opacity: 0}, 1000, function() {
				$(this).hide();
				$('#level2').show().css('opacity', '0');
				lowerLevel = 'level1';
				but.id = 'finish';
				$(but).text('Завершити');
				$('#level2').animate({opacity: 1}, 1000);
			});
		} else if (but.id == 'finish') {
			var json = [];
			count = parseInt($('#degree00').attr('title'));
			for (var i = 0; i < count; i++) {
				var degree = $('#assertion' + i)[0].parentNode;
				json[i] = parseInt(degree.id.substring('degree2'.length)) + 1;
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
			$(this).removeAttr('style').removeAttr('class');
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
				isLevelEmpty &= $(el).children().length == 0;
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