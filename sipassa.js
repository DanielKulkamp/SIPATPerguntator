var listaPerguntas = [];
var listaRespostas = [];
var perguntaAtual = "";
var respostaAtual = "";
var listaPaineis = ["divregras", "divjogo", "divVencedores", "divperguntas"];
var timer = 20;
var timerSegundo = setTimeout("",1);
var vencedor = "";
var p1 = "Participante 1";
var p2 = "Participante 2";
	
function decTimer() {
	if(timer >0){
		document.getElementById("h2Timer").innerHTML = "Tempo Restante: "+timer+" segundos...";
		timer--;
		setTimeout(decTimer, 1000);
	} else {
		document.getElementById("h2Timer").innerHTML = "Tempo esgotado!";
		//exibe a parte de confirmação de vencedor:
		document.getElementById("divConfirma").style.display = "Block";
	}
}

function painel(arg) {
	for (i =0; i<listaPaineis.length; i++) {
		pan = document.getElementById(listaPaineis[i]);
		if (arg == listaPaineis[i]) {
			pan.style.display = "Block";
		} else {
			pan.style.display = "None";
		}
	}
}


function cadastrar() {
	listaPerguntas = document.getElementById("areaPerguntas").value.split("\n");
	listaRespostas = document.getElementById("areaRespostas").value.split("\n");
}

function decTimer() {
	if(timer >0){
		document.getElementById("h2Timer").innerHTML = "Tempo Restante: "+timer+" segundos...";
		timer--;
		timerSegundo = setTimeout(decTimer, 1000);
	} else {
		document.getElementById("h2Timer").innerHTML = "Tempo esgotado!";
		
	}
}

function resetaTimer() {
	document.getElementById("h2Timer").innerHTML = "Tempo Restante: 20 segundos...";
	clearTimeout(timerSegundo);	
}

function perguntar() {
	if(listaPerguntas.length != listaRespostas.length) { 
		alert("Erro no cadastro de perguntas e respostas!");
		return;
	}
	if(listaPerguntas.length < 1) {
		alert("Não há mais perguntas disponíveis no banco de perguntas");
		return;
	}
	index = Math.floor(Math.random()*listaPerguntas.length);
	perguntaAtual = listaPerguntas[index];
	respostaAtual = listaRespostas[index];
	listaPerguntas.splice(index,1);
	listaRespostas.splice(index,1);	
	document.getElementById("h2pergunta").innerHTML = perguntaAtual;
	document.getElementById("h2resposta").style.display = "None";
	document.getElementById("h2resposta").innerHTML = "Resposta: "+respostaAtual;
	timer = 20;
	timerSegundo = setTimeout(decTimer, 1000);
	document.getElementById("h2Timer").style.display = "Block";
	
}


function responder(){
	document.getElementById("h2resposta").style.display = "Block";
	document.getElementById("h2Timer").style.display = "None";
	resetaTimer();
}

function alteraN(target, def){
	document.getElementById(target).innerHTML = " "+window.prompt("Digite o nome do participante:", def);
}

function alteraP(ev,target){
	placarAtual = 1.0 * document.getElementById(target).innerHTML;
	if(ev.ctrlKey) {
		placarAtual = placarAtual-1;
	} else {
		placarAtual = placarAtual+1;
	}
	document.getElementById(target).innerHTML = placarAtual;
}


function sortear(especial) {
	//limpa nome do vencedor vencedor anterior:
	document.getElementById("h1Vencedor").innerHTML = "Vencedor: ";
	vencedor = "";
	if(especial == 1){
		vencedor = listaEspecial[Math.floor(Math.random() * listaInscritos.length)];
		document.getElementById("h1Vencedor").innerHTML = "Vencedor: "+vencedor+"!";
		oldText = ""+document.getElementById("divVencedores").innerHTML;
		document.getElementById("divVencedores").innerHTML = "<h2>"+oldText + vencedor +" ganhou o prêmio especial"+"</h2><br>";
	} else {
			if (listaInscritos.length <1) {
			alert("Não há mais participantes inscritos")
		}else {
			//mostra nome do vencedor:
			vencedor = listaInscritos[Math.floor(Math.random() * listaInscritos.length)];
			document.getElementById("h1Vencedor").innerHTML = "Vencedor: "+vencedor+"!";
			//inicia o timer:
			timer = 10;
			setTimeout(decTimer, 1000);
		} 
	}
		
	
}

function confirmaVencedor(vence) {
		oldText = ""+document.getElementById("divVencedores").innerHTML;
	if (vence == "sim") {
		listaInscritos.splice(listaInscritos.indexOf(vencedor),1);
		document.getElementById("divVencedores").innerHTML = "<h2>"+oldText + vencedor +" ganhou "+ document.getElementById("selPremio").value +"</h2><br>";
	} else if (vence == "não") {
		document.getElementById("divVencedores").innerHTML = "<h2>"+document.getElementById("divVencedores").innerHTML + vencedor +"deixou de ganhar "+ document.getElementById("selPremio").value +" por estar ausente da SIPAT, mas segue concorrendo para os próximos sorteios</h2><br>";
	} else if (vence == "elimina") {
		listaInscritos.splice(listaInscritos.indexOf(vencedor),1);
		document.getElementById("divVencedores").innerHTML = "<h2>"+document.getElementById("divVencedores").innerHTML + vencedor +"deixou de ganhar "+ document.getElementById("selPremio").value +" por estar ausente da SIPAT, e está fora dos próximos sorteios</h2><br>";
	}
}
