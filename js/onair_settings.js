var cswu_spon_use = localStorage.getItem('cswu_spon_use') || 'false';
if(cswu_spon_use == 'true'){
	cswu_spon_use = true;
}else{
	cswu_spon_use = false;
}

if(!cswu_spon_use && aengji_settings['spon'].length < 1){	
	var element = document.getElementById('btn_insert');
	element.scrollIntoView();	
	showModal();
}

function showModal(){
	// var modal = document.querySelector('.modal');
	// modal.style.display = 'block';
	var modal = document.createElement('div');
	modal.innerHTML = `<div id="modal" class="modal" onclick="closeModal(this);">
	<article class="modal-container" style="min-width:400px;">
		<header class="modal-container-header" style="justify-content: center;">
			<h2 class="modal-container-title" style="color:#000;">게임 상대 등록</h2>
			<!-- <button id="btn_close" class="icon-button">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
					<path fill="none" d="M0 0h24v24H0z" />
					<path fill="currentColor" d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
				</svg>
			</button> -->
		</header>
		<div class="modal-container-body rtf">			
			<div style="display:flex;flex-direction: row;">
				<div style="width:50%;color:#000;">
					<h2 style="color:#000;">클릭 -> 삭제</h2>
					<div id="div_bj">						
					</div>
				</div>
				<div style="width:50%;color:#000;">
					<div style="color:#000;">
						<input type="checkbox" id="chk_use" name="chk_use" onclick="changeUse()">
						<label for="chk_use"> 게임 상대 사용 안함</label><br>
					</div>
					<h2 style="color:#000;">등록 상대 입력</h2>
					<input id="input_search" type="text" placeholder="BJ명 검색" size="10" onkeyup="searchBJ()"></input>
					<div id="div_search">
					</div>					
				</div>
			</div>
		</div>
		<footer class="modal-container-footer">
			<button id="btn_cancel" class="button is-ghost">닫기</button>
			<!-- <button id="btn_save" class="button is-primary">저장</button> -->
		</footer>
	</article>
</div>`;
		
	document.body.appendChild(modal);		
	displayBJ();
	modal.querySelector("#input_search").focus();
	
}

function closeModal(modal){
	if(event.target.matches("#btn_close") || event.target.matches("#btn_cancel") || (!event.target.closest(".modal-container") && !event.target.closest("a"))) {
		modal.remove();
		location.reload();
		//showMonthModal();
	}	
}

function searchBJ(){
	if (event.keyCode === 13) {
		event.preventDefault();
		var input_search = document.getElementById("input_search");
		var name = input_search.value;
		input_search.value = '';
		var div_search = document.getElementById('div_search');	
		div_search.innerHTML = '';
		var names = [];
		/* if(record_list.hasOwnProperty(name)){
			names.push(name);
		}else */{
			for(var bj of bj_list){
				if(bj[0].includes(name) && record_list.hasOwnProperty(bj[0]) && record_list[bj[0]][0][9] !== ''){
					if( ! names.includes(bj[0])){
						names.push(bj[0]);
					}
				}
			}
		}
		if(names.length == 1){
			insertBJ(names[0]);
		}else{
			
			var nav = ce(div_search, 'nav', {'class':'modal-menu'});
			var ul = ce(nav, 'ul');
			
			for(bj of names){
				var li = ce(ul, 'li');
				var a = cetn(li, 'a', bj, {'href':'#'});
				a.name = bj;
				a.onclick = function(){
					insertBJ(event.target.getAttribute('name'));
				};
			}
		}	
	}
}

function displayBJ(){
	var modal = document.getElementById('modal');
	
	var cswu_spon_use = localStorage.getItem('cswu_spon_use') || 'false';
	if(cswu_spon_use == 'true'){
		cswu_spon_use = true;
	}else{
		cswu_spon_use = false;
	}
	modal.querySelector('#chk_use').checked = cswu_spon_use;	
	
	var div_bj = modal.querySelector('#div_bj');
	div_bj.innerHTML = '';
	var nav = ce(div_bj, 'nav', {'class':'modal-menu'});
	var ul = ce(nav, 'ul');
	var i = 1;
	for(bj of aengji_settings['spon']){
		var li = ce(ul, 'li');
		var a = cetn(li, 'a', bj[1], {'href':'#'});
		a.name = bj[0];
		a.setAttribute('nickname', bj[1]);
		a.onclick = function(){
			var nickname = event.target.getAttribute('nickname');
			if (confirm( nickname + '\n선택한 BJ를 게임 상대에서 삭제합니다.')) {
				deleteBJ(event.target.getAttribute('name'));
			}
		};
	}
	
}

function insertBJ(name){	
	var aid = record_list[name][0][9];
	if(!aid || aid==''){
		return;
	}	
	var match = false;
	for(var s of aengji_settings['spon']){
		if(s[0] == aid){
			match = true;
			break;
		}
	}
	if(!match){
		aengji_settings['spon'].push([aid, name]);
		localStorage.setItem('cswu_settings', JSON.stringify(aengji_settings));
		
		displayBJ();
	}	
}

function deleteBJ(aid){
	for(var i = 0; i < aengji_settings['spon'].length; i++){
		if(aengji_settings['spon'][i][0] == aid){
			aengji_settings['spon'].splice(i, 1);			
			localStorage.setItem('cswu_settings', JSON.stringify(aengji_settings));			
			break;
		}
	}
	
	displayBJ();
}

function changeUse(){
	localStorage.setItem('cswu_spon_use', event.target.checked);
}




/* function showMonthModal(){
	// var modal = document.querySelector('.modal');
	// modal.style.display = 'block';
	var modal = document.createElement('div');
	modal.innerHTML = `<div id="modal" class="modal" onclick="closeMonthModal(this);">
	<article class="modal-container" style="min-width:400px;">
		<header class="modal-container-header" style="justify-content: center;">
			<div style="display:flex;flex-direction:column;text-align:center;justify-content:center;
	align-items: center;">
				<h2 class="modal-container-title" style="color:#000;">캄성 멤버 선택</h2>
				<p>최근 한달 3번 이상 게임 CCTV용</p>
			</div>
			<!-- <button id="btn_close" class="icon-button">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
					<path fill="none" d="M0 0h24v24H0z" />
					<path fill="currentColor" d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
				</svg>
			</button> -->
		</header>
		<div class="modal-container-body rtf">			
			<div style="display:flex;flex-direction: row;">
				<div style="width:50%;color:#000;">
					<h2 style="color:#000;">클릭 -> 선택</h2>
					<div id="div_cswu">						
					</div>
				</div>
				<div style="width:50%;color:#000;">
					<!-- <div style="color:#000;">
						<input type="checkbox" id="chk_use" name="chk_use" onclick="changeUse()">
						<label for="chk_use"> 게임 상대 사용 안함</label><br>
					</div>
					<h2 style="color:#000;">등록 상대 입력</h2>
					<input id="input_search" type="text" placeholder="BJ명 검색" size="10" onkeyup="searchBJ()"></input>
					<div id="div_search">
					</div> -->					
				</div>
			</div>
		</div>
		<footer class="modal-container-footer">
			<button id="btn_cancel" class="button is-ghost">닫기</button>
			<!-- <button id="btn_save" class="button is-primary">저장</button> -->
		</footer>
	</article>
</div>`;
		
	document.body.appendChild(modal);		
	displayCSWU();
	
} */


function displayCSWU(){
	var modal = document.getElementById('modal');
		
	var div_cswu = modal.querySelector('#div_cswu');
	div_cswu.innerHTML = '';
	var nav = ce(div_cswu, 'nav', {'class':'modal-menu'});
	var ul = ce(nav, 'ul');
	var i = 1;
	
	var list = ["사용 안함", "혜로로","오세블리","나무늘봉순","이유란","러아","늑대채린","구루미","란란"];	
	
	for(bj of list){
		var li = ce(ul, 'li');
		var a = cetn(li, 'a', bj, {'href':'#'});
		a.name = bj;
		a.onclick = function(){
			selectCSWU(event.target.getAttribute('name'), modal);			
		};
	}
}

function selectCSWU(name, modal){	
	aengji_settings["cswu_id"] = (name=='사용 안함'?'':name);
	localStorage.setItem('cswu_onair_date', '');	
	localStorage.setItem('cswu_settings', JSON.stringify(aengji_settings));
	modal.remove();
	location.reload();
}

/* function closeMonthModal(modal){
	if(event.target.matches("#btn_close") || event.target.matches("#btn_cancel") || (!event.target.closest(".modal-container") && !event.target.closest("a"))) {
		modal.remove();
		location.reload();
	}	
} */
