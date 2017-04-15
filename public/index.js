$(document).ready(function(){
	// alert("hello!");
	$.get("/posts/", function(data) {
		var rows = data["rows"];
		for(var i = 0 ; i < rows.length;i++){
			console.log(row[i]["doc"]["title"]);
			console.log(rows[i]["doc"]["post"]);
			var title = row[i]["doc"]["title"];
			var post = rows[i]["doc"]["post"];
			var '<div class="card"><h3 class="card--header">' +
			title + '</h3>' +
			'<p class="card--content">' + post + '</p>' + 
			'</div>';
		$('#content').append(card);	
		}

	});
});