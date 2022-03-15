displaySettings();
function displaySettings(){
	
	document.getElementById('aenggae_volume').value = aengji_settings['aenggae_volume'];
	
	var s = aengji_settings['spon'];

	el = document.getElementById('spon');
	str = '';
	for(var i=0;i<s.length;i++){
		str+=s[i][0] + ',' + s[i][1] + '\n';
	}
	str = str.replace(/\n+$/, "");
	el.value = str;
	
	s = aengji_settings['cswu'];

	el = document.getElementById('cswu');
	str = '';
	for(var i=0;i<s.length;i++){
		str+=s[i][0] + '\n';
	}
	str = str.replace(/\n+$/, "");
	el.value = str;
	
	
	el = document.getElementById('bj_id');
	el.value = aengji_settings["cswu_id"];
}

function saveSettings(){
	
	aengji_settings['aenggae_volume'] = document.getElementById('aenggae_volume').value;
	
	aengji_settings['spon'] = [];
	t = document.getElementById('spon').value.split('\n');
	for(var i=0;i<t.length;i++){
		if(t[i].trim()==''){
			continue;
		}
		var c = t[i].split(/,| /);
		for(var j=c.length-1;j>-1;j--){
			if(c[j].trim()==''){
				c.splice(j, 1);
			}
		}
		aengji_settings['spon'].push([c[0],c[1]==null?'':c[1]]);
	}
	aengji_settings['cswu'] = [];
	t = document.getElementById('cswu').value.split('\n');
	for(var i=0;i<t.length;i++){
		if(t[i].trim()==''){
			continue;
		}
		var c = t[i].split(/,| /);
		for(var j=c.length-1;j>-1;j--){
			if(c[j].trim()==''){
				c.splice(j, 1);
			}
		}
		aengji_settings['cswu'].push([c[0],c[1]==null?'':c[1]]);
	}
	
	aengji_settings["cswu_id"] = document.getElementById('bj_id').value;
	
	localStorage.setItem('cswu_settings', JSON.stringify(aengji_settings));
	
	localStorage.setItem('cswu_onair_date', '');
	
	popup2('저장 완료');
	location.reload();
	//location.href = 'index.html';
}


function aenggae_volume_onchange(target){
	setVolumn(target.value);
		playAudio();
}