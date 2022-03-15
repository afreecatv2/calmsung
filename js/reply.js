//const url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDpxlrwZANab3SPdzQ0q7PxaVrf41xD-9g&channelId=UCF36--WmJBcN369BsGC142A&part=snippet,id&order=date&maxResults=50';

const loading = document.getElementById('loading');
var youtube_list = JSON.parse(localStorage.getItem('youtube_list'));
if(! youtube_list){		
	getYoutube();
}else{
	const date = localStorage.getItem('youtube_list_date') || '';
	if(date !== new Date().toISOString().split('T')[0]){
		getYoutube();		
	}else{
		displayYoutube(youtube_list);
	}
}

function getYoutube(){
	jQuery.post('http://u0000.dothome.co.kr/afreecatv/select_afreecatv.php', {
           name: 'youtube_list'
       },
       function (data, status) {
           if (status !== 'success') {
               alert("데이터 로딩 실패.");
				console.log("Data: " + data + "\nStatus: " + status);
           } else {			   		   
			   data = JSON.parse(data);
			   youtube_list = JSON.parse(data[0].json);
			   			   
			   localStorage.setItem('youtube_list_date', new Date().toISOString().split('T')[0]);
			   localStorage.setItem('youtube_list', JSON.stringify(youtube_list));
			   
			   displayYoutube(youtube_list);
		}
	});
}

function displayYoutube(youtube_list){
	log(JSON.stringify(youtube_list[0]));
	
	const spon_wrapper = document.getElementById('spon_wrapper');
	for(var i=0;i<youtube_list.length;i++){
		var item = youtube_list[i];
		
		var el = document.createDocumentFragment();
		
		var div_item = ce(el, 'div',{'class':'youtube-item'});
		var alink = ce(div_item,'a',{'href':'https://www.youtube.com/watch?v=' + item[0],'target':'_blank'});
		var polaroid = ce(alink, 'div',{'class':'youtube-polaroid'});
		var img = ce(polaroid, 'img',{'class':'lazy', 'data-src':'https://img.youtube.com/vi/'+ item[0] + '/mqdefault.jpg'});
		var caption = cetn(polaroid, 'div',item[1],{'class':'youtube-caption'});
		
		spon_wrapper.appendChild(el);		
	}
	
	loading.style.display = 'none';	
}
