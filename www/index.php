<html>
<head>
	<meta charset='utf-8' />
	<script type='text/javascript' src='script/respondent.js'></script>
	<link type='text/css' rel='stylesheet' href='css/respondent.css' />
</head>
<body>
	<button id='nextButton' disabled='disabled' onclick='clickButton(event, this)'>Продовжити</button>
	<table class='level' id='level2'>
		<?php
			$n = 7;
			echo "<tr>";
			for ($i = 0; $i < $n; $i++)
				echo "<th class='degreeHead' id='degreeHead2$i'>Погоджуюсь".(2*$i)."</th>";
			echo "</tr><tr>";
			for ($i = 0; $i < $n; $i++)
				echo "<td class='degree' id='degree2$i' title='".(4*($i+1))."' ondrop='drop(event, this)' ondragover='allowDrop(event)'></td>";
			echo "</tr>";
		?>
	</table>
	<table class='level' id='level1'>
		<?php
			$n = 3;
			echo "<tr>";
			for ($i = 0; $i < $n; $i++)
				echo "<th class='degreeHead' id='degreeHead1$i'>Погоджуюсь$i</th>";
			echo "</tr><tr>";
			for ($i = 0; $i < $n; $i++)
				echo "<td class='degree' id='degree1$i' title='".(4*($i+1))."' ondrop='drop(event, this)' ondragover='allowDrop(event)'></td>";
			echo "</tr>";
		?>
	</table>
	<table class='level' id='level0'>
		<tr><th class='degreeHead'>Твердження</th></tr>
		<?php
			$n = 6;
			echo "<tr><td class='degree' id='degree00' title='$n' ondrop='drop(event, this)' ondragover='allowDrop(event)'>";
			for ($i = 0; $i < $n; $i++)
				echo "<div class='assertion' id='assertion$i' draggable='true' ondragstart='drag(event, this)'>".($i+1).". Assertion</div>";
		?>
		</td></tr>
	</table>
</body>
</html>