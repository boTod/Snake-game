(function(){
	var newTable = document.createElement('table');
	for(var i=0;i<50;i++){
		var newRow = newTable.insertRow(i);
		for(var j=0;j<50;j++){
			var newCell = newRow.insertCell(j);
		}
	}
	document.getElementById('game').appendChild(newTable);
})()

var table = document.getElementsByTagName('table')[0].rows,
	result = document.getElementById('result'),
	way = 'up',
	up = 'up',
	down = 'down',
	left = 'left',
	right = 'right',
	start = 24,
	start2 = 24,
	clear = true,
	snakeLength = 0,
	black1 = 24,
	black2 = 24,
	speedSnake = 0,
	lvl = '';

function randomInteger(min,max){
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

document.getElementById('ez').addEventListener('click',function(){
	speedSnake = 300;
	lvl = 'easy'
});

document.getElementById('nor').addEventListener('click',function(){
	speedSnake = 150;
	lvl = 'normal'
});

document.getElementById('str').addEventListener('click',function(){
	speedSnake = 80;
	lvl = 'strong'
});

document.getElementById('har').addEventListener('click',function(){
	speedSnake = 40;
	lvl = 'hard'
});

document.getElementById('unr').addEventListener('click',function(){
	speedSnake = 15;
	lvl = 'unreal'
});

document.getElementById('start').addEventListener('click',inner)

table[start].childNodes[start2].style.backgroundColor = 'red'

function inner(){
	if(speedSnake !== 0){
		document.getElementById('start').setAttribute('disabled', 'true');
		var count = 4;
		if(!document.getElementById('h1')){
			var h1 = document.createElement('h1');
			h1.id = 'h1'
			document.getElementById('game').appendChild(h1);
		}
		var stop = setInterval(function(){
			count--
			h1.innerHTML = 'Гра починається - ' + count
			if(count<1){
				clearInterval(stop);
				h1.parentNode.removeChild(h1);
				if(localStorage[lvl] != undefined){
					result.innerHTML = 'Найкращий результат: ' + localStorage[lvl];
				}
			go();
			}
		},1000)	
	}else{
		alert('Будь ласка, оберіть складність')
	}		
}

function go(){
	var stop1 = setInterval(function(){
		var tick = 1;
		document.onkeydown = keyPressed;
		function keyPressed(e){
			var keyCode;
			keyCode = window.event.keyCode; 
			if(keyCode === 38  && way !== down && tick === 1){
				way = up;
				tick = 0;
			}else if(keyCode === 39 && way !== left && tick === 1){
				way = right;
				tick = 0;
			}else if(keyCode === 40 && way !== up && tick === 1){
				way = down;
				tick = 0;
			}else if(keyCode === 37 && way !== right && tick === 1){
				way = left;
				tick = 0;
			}
		}
		var data = new Date();
		data = data.getTime();
		if(start === black1 && start2 === black2){
			snakeLength++;
			if(way == 'up'){
				table[start].childNodes[start2].style.backgroundColor = 'red'
				clear = false;					
				black()
			}else if(way == 'left'){
				table[start].childNodes[start2].style.backgroundColor = 'red'
				clear = false;				
				black()
			}else if(way == 'down'){
				table[start].childNodes[start2].style.backgroundColor = 'red'
				clear = false;
				black()
			}else if(way == 'right'){
				table[start].childNodes[start2].style.backgroundColor = 'red'
				clear = false;
				black()
			}
		}
		if(way === 'up'){
			if(start < 1){
				alert('Ви вилетіли за поле... Гра почнеться з початку')
			if(localStorage[lvl] === undefined){
				localStorage[lvl] = snakeLength;
			}else if(localStorage[lvl] < snakeLength){
				localStorage[lvl] = snakeLength;	
			}			
				clearInterval(stop1);
				location.reload();
			}else{
				if(table[start-1].childNodes[start2].style.backgroundColor === 'red'){
					alert('Ви себе з*їли')
					if(localStorage[lvl] === undefined){
						localStorage[lvl] = snakeLength;
					}else if(localStorage[lvl] < snakeLength){
						localStorage[lvl] = snakeLength;	
					}	
				clearInterval(stop1)
				location.reload();	
				}else{
					if(clear === true){
						var min = new Date();
						min = min.getTime();
						for(var i=0;i<50;i++){
							for(var j=0;j<50;j++){
								if(table[i].childNodes[j].style.backgroundColor === 'red'){
									if(table[i].childNodes[j].getAttribute('date') < min){
										min = table[i].childNodes[j].getAttribute('date')
									}	
								}
							}
						}
						for(var i=0;i<50;i++){
							for(var j=0;j<50;j++){
								if(table[i].childNodes[j].getAttribute('date') === min && table[i].childNodes[j].style.backgroundColor !== 'black'){
									table[i].childNodes[j].style.backgroundColor = 'white'
								}
							}
						}	
					}
					clear = true;
					start--;
					table[start].childNodes[start2].style.backgroundColor = 'red'
					table[start].childNodes[start2].setAttribute('date', data);
				}				
			}

		}
		else if(way === 'left'){
			if(start2 < 1){
				alert('Ви вилетіли за поле... Гра почнеться з початку')
				if(localStorage[lvl] === undefined){
					localStorage[lvl] = snakeLength;
				}else if(localStorage[lvl] < snakeLength){
					localStorage[lvl] = snakeLength;	
				}	
				clearInterval(stop1)
				location.reload();
			}else{
				if(table[start].childNodes[start2-1].style.backgroundColor === 'red'){
					alert('Ви себе з*їли')
					if(localStorage[lvl] === undefined){
						localStorage[lvl] = snakeLength;
					}else if(localStorage[lvl] < snakeLength){
						localStorage[lvl] = snakeLength;	
					}	
				clearInterval(stop1)
				location.reload();
				}else{
					if(clear === true){
						var min = new Date();
						min = min.getTime();
						for(var i=0;i<50;i++){
							for(var j=0;j<50;j++){
								if(table[i].childNodes[j].style.backgroundColor === 'red'){
									if(table[i].childNodes[j].getAttribute('date') < min){
										min = table[i].childNodes[j].getAttribute('date')
									}
								}
							}
						}
						for(var i=0;i<50;i++){
							for(var j=0;j<50;j++){
								if(table[i].childNodes[j].getAttribute('date') === min && table[i].childNodes[j].style.backgroundColor !== 'black'){
									table[i].childNodes[j].style.backgroundColor = 'white'
								}
							}
						}
					}
					clear = true;
					start2--;
					table[start].childNodes[start2].style.backgroundColor = 'red'
					table[start].childNodes[start2].setAttribute('date', data);
				}			
			}
		}
		else if(way === 'right'){
			if(start2 > 48){
				alert('Ви вилетіли за поле... Гра почнеться з початку')
				if(localStorage[lvl] === undefined){
					localStorage[lvl] = snakeLength;
				}else if(localStorage[lvl] < snakeLength){
					localStorage[lvl] = snakeLength;	
				}	
				clearInterval(stop1)
				location.reload();
			}else{
				if(table[start].childNodes[start2+1].style.backgroundColor === 'red'){
					alert('Ви себе з*їли')
					if(localStorage[lvl] === undefined){
						localStorage[lvl] = snakeLength;
					}else if(localStorage[lvl] < snakeLength){
						localStorage[lvl] = snakeLength;	
					}	
				clearInterval(stop1)
				location.reload();	
				}else{
					if(clear === true){
						var min = new Date();
						min = min.getTime();
						for(var i=0;i<50;i++){
							for(var j=0;j<50;j++){
								if(table[i].childNodes[j].style.backgroundColor === 'red'){
									if(table[i].childNodes[j].getAttribute('date') < min){
										min = table[i].childNodes[j].getAttribute('date')
									}
								}
							}
						}
						for(var i=0;i<50;i++){
							for(var j=0;j<50;j++){
								if(table[i].childNodes[j].getAttribute('date') === min && table[i].childNodes[j].style.backgroundColor !== 'black'){
									table[i].childNodes[j].style.backgroundColor = 'white'
								}
							}
						}
					}
					clear = true;
					start2++;
					table[start].childNodes[start2].style.backgroundColor = 'red'
					table[start].childNodes[start2].setAttribute('date', data);	
				}				
			}
		}
		else if(way === 'down'){
			if(start > 48){
				alert('Ви вилетіли за поле... Гра почнеться з початку')
				if(localStorage[lvl] === undefined){
					localStorage[lvl] = snakeLength;
				}else if(localStorage[lvl] < snakeLength){
					localStorage[lvl] = snakeLength;	
				}	
				clearInterval(stop1)
				location.reload();
			}else{
				if(table[start+1].childNodes[start2].style.backgroundColor === 'red'){
					alert('Ви себе з*їли')
					if(localStorage[lvl] === undefined){
						localStorage[lvl] = snakeLength;
					}else if(localStorage[lvl] < snakeLength){
						localStorage[lvl] = snakeLength;	
					}	
				clearInterval(stop1)
				location.reload();	
				}else{
					if(clear === true){
						var min = new Date();
						min = min.getTime();
						for(var i=0;i<50;i++){
							for(var j=0;j<50;j++){
								if(table[i].childNodes[j].style.backgroundColor === 'red'){
									if(table[i].childNodes[j].getAttribute('date') < min){
									min = table[i].childNodes[j].getAttribute('date')
									}	
								}
							}
						}
						for(var i=0;i<50;i++){
							for(var j=0;j<50;j++){
								if(table[i].childNodes[j].getAttribute('date') === min && table[i].childNodes[j].style.backgroundColor !== 'black'){
									table[i].childNodes[j].style.backgroundColor = 'white'
								}
							}
						}
					}
					clear = true;
					start++;
					table[start].childNodes[start2].style.backgroundColor = 'red'
					table[start].childNodes[start2].setAttribute('date', data);	
				}			
			}	
		}
	},speedSnake)
	function black(){
		black1 = randomInteger(0, 49);
		black2 = randomInteger(0, 49);
		table[black1].childNodes[black2].style.backgroundColor = 'black';
	}
}





