<html>
<head>
	<script type='text/javascript' src='script/respondent.js'></script>
	<link type='text/css' rel='stylesheet' href='css/respondent.css' />
</head>
<body>
	<button id='nextButton' disabled='disabled' onclick='nextStep(event, this)'>Продовжити</button>
	<table class='level' id='level2'>
		<?php
			$n = 7;
			echo "<tr>";
			for ($i = 0; $i < $n; $i++)
				echo "<th class='gradeHead'>Погоджуюсь</th>";
			echo "</tr><tr>";
			for ($i = 0; $i < $n; $i++)
				echo "<td class='grade' id='grade2$i' title='".($i+1)."' ondrop='drop(event, this)' ondragover='allowDrop(event)'></td>";
			echo "</tr>";
		?>
	</table>
	<table class='level' id='level1'>
		<?php
			$n = 3;
			echo "<tr>";
			for ($i = 0; $i < $n; $i++)
				echo "<th class='gradeHead'>Погоджуюсь</th>";
			echo "</tr><tr>";
			for ($i = 0; $i < $n; $i++)
				echo "<td class='grade' id='grade1$i' title='".(2*($i+1))."' ondrop='drop(event, this)' ondragover='allowDrop(event)'></td>";
			echo "</tr>";
		?>
	</table>
	<table class='level' id='level0'>
		<tr><th class='gradeHead'>Твердження</th></tr>
		<tr><td class='grade' id='grade00' title='40' ondrop='drop(event, this)' ondragover='allowDrop(event)'>
		<?php
			for ($i = 0; $i < 12; $i++)
				echo "<div class='assertion' id='assertion$i' draggable='true' ondragstart='drag(event, this)'>assertion ".($i+1)."</div>";
		?>
		</td></tr>
	</table>
</body>
</html>