///// Document load
$(document).ready(function() {
///// Global variable
	var srcDegree, lowerLevel = 'level0';
	var countTd = $('#level2 td').length;
	var divWidth = parseInt(0.98 * $(window).width() / countTd / 2);
	var divHeight = parseInt(1.4 * divWidth);
///// Original settings
	$('table').wrap('<center />');
	$('table td').height(2 * divHeight);
	for (var k = 0; k < 3; k++) {
		var levelDegree = $('#level' + k + ' td');
		levelDegree.each(function(i, degree) {
			degree.id = 'degree' + k + i;
			if (k == 2)
				$(degree).prepend($('<div class="empty"></div>').hide());
		});
		var n = levelDegree.length;
		$(levelDegree.selector + ':lt(' + parseInt(n / 2) + ') div').css('float', 'left');
		$(levelDegree.selector + ':eq(' + parseInt(n / 2) + ') div').css('float', 'left');
		$(levelDegree.selector + ':gt(' + parseInt(n / 2) + ') div').css('float', 'right');
	}
	$('#level0 div').addClass('assertion');
	$('#level0 div').each(function(i, el) {
		el.id = 'assertion' + i;
	});
	$('*').disableSelection();
	$('#level2').hide();
	$('#level0, #level1').css('opacity', '0');
	$('#level1').animate({opacity: 0.3}, 300, function() {
		$('#level1').animate({opacity: 1}, 600);
		$('#level0').animate({opacity: 1}, 1200);
	});
///// Resize
	function resizeWindow() {
		$('div').outerWidth(divWidth);
		$('div').outerHeight(divHeight);
		$('table').each(function(i, el) {
			var td = $('#' + el.id + ' td');
			td.width(divWidth * (parseInt($(window).width() / divWidth / td.length)));
			//var w = parseInt(td.css('width'));
			//alert(w);
		});
		//$('#level1').css('width', 1134);
	}
	resizeWindow();
	$(window).resize(resizeWindow);
///// Button click
	$('button').click(function(e) {
		var but = e.target;
		if (but.id == 'next') {
			but.disabled = 'disabled';
			$('#level0').animate({opacity: 0}, 600, function() {
				$(this).hide();
				$('#level2').show().css('opacity', '0');
				lowerLevel = 'level1';
				but.id = 'finish';
				$(but).text('Завершити');
				$('#level2').animate({opacity: 1}, 1500);
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
///// Correction degree
function correctionDegree(degree) {
	var level = degree.parentNode.parentNode.parentNode;
	if (level.id == 'level2') {
		var empty = $('#' + degree.id + ' div.empty');
		if (empty.css('display') == 'none')
			empty.show();
		else
			empty.hide();
	}
}
///// Draggable
	$('table div.assertion').draggable({
		addClasses: false,
		containment: 'window',
		cursor: 'move',
		distance: 8,
		zIndex: 4000,
		start: function(e) {
			srcDegree = e.target.parentNode;
		},
		stop: function(e) {
			var currentFloat = 'left';
			var nextLength = $(e.target.parentNode).nextAll().length;
			var prevLength = $(e.target.parentNode).prevAll().length;
			if (prevLength > nextLength)
				currentFloat = 'right';
			$(this).css({left: '', top: 0, zIndex: '', float: currentFloat});
			$(this).animate({opacity: 0.7, left: -8, top: 2},
				70).animate({opacity: 0.8, left: 8, top: 4},
				70).animate({opacity: 0.9, left: -8, top: 2},
				70).animate({opacity: 1, left: 0, top: 0},
				70);
		}
	});
///// Dropabble
	$('table td').droppable({
		addClasses: false,
		//hoverClass: 'hoverClass',
		drop: function(e, ui) {
			var degree = e.target;
			var max = parseInt(degree.title);
			if (degree.id == srcDegree.id || $(degree).children('.assertion').length >= max)
				return;
			$(degree).append(ui.draggable);
			correctionDegree(degree);
			correctionDegree(srcDegree);
		///// Determine whether an lower level empty
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
///// Assertion click
	$('table div.assertion').click(function() {
		$(this).addClass('bigAssertion');
	}).mouseleave(function() {
		$(this).removeClass('bigAssertion');
	});
});