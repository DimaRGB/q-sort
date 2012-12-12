///// Document load
$(document).ready(function() {
///// Global variable
	var srcDegree, lowerLevel = 'level0';
	var countTd = $('#level2 td').length;
	var divWidth = parseInt(0.97 * $(window).width() / countTd / 2);
	var divHeight = parseInt(1.4 * divWidth);
	var isDrag = false, big = 2;
///// Original settings
	//$('#nameSet, table').wrap('<div style="text-align:center;"></div>');
	$('table td').height(big * divWidth);
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
		el.title = el.innerText;
	});
	$('*').disableSelection();
	$('#level2').hide();
	$('#level0, #level1').css('opacity', '0');
	$('#level1').animate({opacity: 0.3}, 300, function() {
		$('#level1').animate({opacity: 1}, 600);
		$('#level0').animate({opacity: 1}, 1200);
	});
///// setBounds
	function setBounds(selector, l, t, w, h) {
		$(selector).css({'left': l, 'top': t}).outerWidth(w).outerHeight(h);
	}
///// Resize
	function resizeWindow() {
		setBounds('table div', 0, 0, divWidth, divHeight);
		$('table').each(function(i, el) {
			var td = $('#' + el.id + ' td');
			td.width(divWidth * (parseInt($(window).width() / divWidth / td.length)));
		});
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
		};
		if ($(degree).children('.assertion').length >= parseInt(degree.title))
			$(degree).droppable({hoverClass: 'hoverNotDrop'});
		else
			$(degree).droppable({hoverClass: 'hoverDrop'});
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
			isDrag = true;
		},
		stop: function(e) {
			isDrag = false;
			cancelBigAssertion(this);
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
		hoverClass: 'hoverDrop',
		drop: function(e, ui) {
			var degree = e.target;
			if (degree.id == srcDegree.id || $(degree).children('.assertion').length >= parseInt(degree.title))
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
	}).each(function(i, degree) {
		$(degree).droppable({accept: 'table div:not(#' + degree.id + ' div)'});
	});
///// cancelBigAssertion
	function cancelBigAssertion(assertion) {
		$(assertion).attr('class', 'assertion');
		setBounds(assertion, 0, 0, divWidth, divHeight);
	}
///// Assertion click
	$('table div.assertion').click(function(e) {
		if ($(this).attr('class') == 'assertion') {
			$(this).attr('class', 'bigAssertion');
			var w = big * divHeight, h = big * divWidth;
			var l = e.clientX - w / 2, t = e.clientY - h / 2;
			if (l < 0)
				l = 0;
			else if(l > window.innerWidth - w)
				l = window.innerWidth - w;
			if (t < 0)
				t = 0;
			else if(t > window.innerHeight - h)
				t = window.innerHeight - h;
			setBounds(this, l, t, w, h);
		} else
			cancelBigAssertion(this);
	}).mouseleave(function() {
		if (!isDrag)
			cancelBigAssertion(this);
	});
});