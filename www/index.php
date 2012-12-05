<!Doctype html>
<html>
<head>
	<meta charset='utf-8' />
<!-- jquery -->
	<script type='text/javascript' src='script/jquery-1.8.3.min.js'></script>
	<script type='text/javascript' src='script/jquery-ui-1.9.2.min.js'></script>
<!-- respondent -->
	<link type='text/css' rel='stylesheet' href='css/respondent.css' />
	<script type='text/javascript' src='script/respondent.js'></script>
</head>
<body>
	<button id='next' disabled='disabled'>Продовжити</button>
	<?php
	//read set from file
		$set = json_decode(file_get_contents('set1 (40)test.json'), true);
		echo "<center><h2>".$set['name']."</h2></center>";
		$level = $set['level'];
	//level2, level1
		for ($k = 2; $k > 0; $k--) {
			echo "<table class='level' id='level$k'><tr>";
			foreach ($level[$k] as $value => $count)
				echo "<th>$value ($count)</th>";
			echo "</tr><tr>";
			$i = 0;
			foreach ($level[$k] as $value => $count)
				echo "<td id='degree$k".($i++)."' title='$count'></td>";
			echo "</tr></table>";
		}
	//level0
		echo "<table class='level' id='level0'>";
		echo "<tr><th>Твердження (".count($level[0]).")</th></tr>";
		echo "<tr><td id='degree00' title='".count($level[0])."'>";
		foreach ($level[0] as $i => $assertion)
			echo "<div id='assertion$i'>$assertion.</div>";
		echo "</td></tr></table>";
	?>
</body>
</html>