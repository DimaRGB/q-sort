<html>
<head>
	<script type='text/javascript' src='script/respondent.js'></script>
	<link type='text/css' rel='stylesheet' href='css/respondent.css' />
</head>
<body>
	<div id='block_dest1' class='block' title='4' ondrop='drop(event, this)' ondragover='allowDrop(event)'>
	</div>
	<div id='block_dest2' class='block' title='6' ondrop='drop(event, this)' ondragover='allowDrop(event)'>
	</div>
	<div id='block_source' class='block' title='40' ondrop='drop(event, this)' ondragover='allowDrop(event)'>
		<?php
			for ($i = 0; $i < 40; $i++)
				echo "<div id='assertion$i' class='assertion' draggable='true' ondragstart='drag(event, this)'>source ".($i+1)."</div>";
		?>
	</div>
</body>
</html>