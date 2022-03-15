const matchtype = { 30: "리그 친선", 40: "클래식 1on1", 50: "공식경기", 52: "감독모드", 60: "공식 친선", 204: "볼타 친선", 214: "볼타 공식", 224: "볼타 AI대전", 234: "볼타 커스텀"};
const spposition = { 0: "GK", 1: "SW", 2: "RWB", 3: "RB", 4: "RCB", 5: "CB", 6: "LCB", 7: "LB", 8: "LWB", 9: "RDM", 10: "CDM", 11: "LDM", 12: "RM", 13: "RCM", 14: "CM", 15: "LCM", 16: "LM", 17: "RAM", 18: "CAM", 19: "LAM", 20: "RF", 21: "CF", 22: "LF", 23: "RW", 24: "RS", 25: "ST", 26: "LS", 27: "LW", 28: "SUB"};
const division = { 800: "슈퍼챔피언스", 900: "챔피언스", 1000: "슈퍼챌린지", 1100: "챌린지1", 1200: "챌린지2", 1300: "챌린지3", 2000: "월드클래스1", 2100: "월드클래스2", 2200: "월드클래스3", 2300: "프로1", 2400: "프로2", 2500: "프로3", 2600: "세미프로1", 2700: "세미프로2", 2800: "세미프로3", 2900: "유망주1", 3000: "유망주2", 3100: "유망주3"};
const division_volta = { 1100: "월드 스타", 2000: "내셔널 스타1부", 2100: "내셔널 스타2부", 2200: "내셔널 스타3부", 2300: "라이징 스타1부", 2400: "라이징 스타2부", 2500: "라이징 스타3부", 2600: "슈퍼 루키 1부", 2700: "슈퍼 루키 2부", 2800: "슈퍼 루키 3부", 2900: "루키 1부", 3000: "루키 2부", 3100: "루키 3부"};


function log(msg){
	//console.log(msg);
}










//61ed609e423e2a106b514a66

var hexagonal = [];
var sortHex;

const fifa_bj = {'c4a200c686e69f1bfce23b2e':'앵지','a5e6386077ddfd553ad77678':'오세블리','c4f75bc3d97ec922e05ed634':'나무늘봉순','6445612821fa8c3991b1bc0f':'란란','18b9d3c22c851156afd84b86':'구루미','0516d8ed60d829d6ed852417':'늑대채린','6c2707fc3a24912a11b31fef':'김성대'};
const mtype={30:'리그 친선',40:'클래식 1on1',50:'공식경기',52:'감독모드',60:'공식 친선',204:'볼타 친선',224:'볼타 공식',234:'볼타 AI대전'};



//var lastMonth = addMonths(new Date(),-1).toISOString().split('T')[0]

// var fifa_list = JSON.parse(localStorage.getItem('fifa_list'));
// if(! fifa_list){
	// getDataAsync('http://u0000.dothome.co.kr/afreecatv/select_fifa_get.php').then(data => {
		// localStorage.setItem('fifa_list_date', new Date().toISOString().split('T')[0]);
		// localStorage.setItem('fifa_list', JSON.stringify(data));
		// displayData(data);
	// });
// }else{
	// const date = localStorage.getItem('fifa_list_date') || '';
	// if(date !== new Date().toISOString().split('T')[0]){
		// getDataAsync('http://u0000.dothome.co.kr/afreecatv/select_fifa_get.php').then(data => {	
			// localStorage.setItem('fifa_list_date', new Date().toISOString().split('T')[0]);
			// localStorage.setItem('fifa_list', JSON.stringify(data));
			// displayData(data);
		// });
	// }else{
		// displayData(fifa_list);
	// }
// }

getDataAsync('http://u0000.dothome.co.kr/afreecatv/select_fifa_match_get.php?matchid=61ed609e423e2a106b514a66').then(data => {
	displayData(data);
});



function displayData(data){
	log(data);
		
}






function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}



async function postDataAsync(url, data) {
	if(!url){
		return;
	}
	var response = await fetch(url, {
        method: 'post',
		mode: 'no-cors',
		headers: {'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNDcwNjE3NzgyIiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTY0MjU0MzU3NSwiZXhwIjoxNjU4MDk1NTc1LCJpYXQiOjE2NDI1NDM1NzV9.65RTOFeabq64VS8EeBBtB_jqOVEYsT-mtYgqUi5qCEs',
		'Content-Type': 'application/x-www-form-urlencoded',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Content-Type'},
		redirect: 'follow',
		body: ''
	});
	var data = await response;
	return data;
}

async function getDataAsync(url) {
	if(!url){
		return;
	}
	var response = await fetch(url);
	var data = await response.json();
	return data;
}

function getData(url = '') {
	return fetch(url)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		return data;
	})
	.catch(function (error) {
		console.log(error);
	});
}


function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
}
