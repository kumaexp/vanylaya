$(function(){
	$.get('https://api.instagram.com/v1/users/self/?access_token=258724317.1677ed0.f9b9b5c1d0324569a2b2c1c4864c4206',
		function(data) {
			$("#button-count").html((kFormatter(data.data.counts.followed_by)));
		}
		)
	function kFormatter(num) {
		return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
	}

});