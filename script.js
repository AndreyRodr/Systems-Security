const modules={
otp:{number:"01",title:"One-Time Pad",description:"Demonstra a operação XOR entre uma mensagem numérica e uma chave, reproduzindo a lógica do exercício original.",tags:["Binário","XOR"],source:"impCripto/Ex1_OTP.py"},
caesar:{number:"02",title:"Cifra de César",description:"Desloca cada letra do alfabeto por uma chave K. Espaços, números e pontuação são preservados.",tags:["Substituição","Deslocamento"],source:"impCripto/ex 2.py"},
vigenere:{number:"03",title:"Cifra de Vigenère",description:"Aplica deslocamentos diferentes usando uma palavra-chave repetida ao longo da mensagem.",tags:["Polialfabética","Chave"],source:"impCripto/ex3.py"},
hill:{number:"04",title:"Cifra de Hill",description:"Processa blocos de duas letras usando multiplicação matricial módulo 26 e a matriz-chave.",tags:["Matriz","Módulo 26"],source:"impCripto/ex 4.py"},
attack:{number:"05",title:"Ataque à César",description:"Testa as 25 chaves possíveis da cifra de César e pontua cada resultado com heurísticas simples de português.",tags:["Criptoanálise","Força bruta"],source:"impCripto/ex 5.py"}
};
const $=id=>document.getElementById(id);
document.querySelectorAll(".tab").forEach(tab=>tab.addEventListener("click",()=>{
 document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active")); tab.classList.add("active");
 document.querySelectorAll(".tool").forEach(t=>t.classList.remove("active")); $("tool-"+tab.dataset.tab).classList.add("active");
 const m=modules[tab.dataset.tab]; $("module-number").textContent=m.number; $("module-title").textContent=m.title; $("module-description").textContent=m.description;
 $("module-tags").innerHTML=m.tags.map(x=>"<span>"+x+"</span>").join(""); $("source-link").href=m.source;
}));
function bin(n,size=0){let s=(Number(n)>>>0).toString(2);return s.padStart(size,"0")}
function dec(s){return parseInt(s,2)||0}
function xor(a,b){return [...a].map((x,i)=>x===b[i]?"0":"1").join("")}
$("run-otp").onclick=()=>{
 const msg=Number($("otp-message").value),key=Number($("otp-key").value);
 if(!Number.isInteger(msg)||!Number.isInteger(key)||msg<0||key<0)return $("otp-output").innerHTML='<span class="error">Informe números decimais não negativos.</span>';
 const size=Math.max(bin(msg).length,bin(key).length),mb=bin(msg,size),kb=bin(key,size),cb=xor(mb,kb),cipher=dec(cb),recovered=dec(xor(bin(cipher,size),kb));
 $("otp-output").innerHTML='<div><span class="label">Mensagem:</span> '+msg+' → <span class="value">'+mb+'</span></div><div><span class="label">Chave:</span> '+key+' → <span class="value">'+kb+'</span></div><div><span class="label">XOR:</span> <span class="value">'+cb+'</span> → '+cipher+'</div><div><span class="label">Descriptografia:</span> '+recovered+' <span class="value">✓ recuperada</span></div>';
};
function caesar(text,key){return text.toUpperCase().split("").map(c=>{if(c<"A"||c>"Z")return c;return String.fromCharCode((c.charCodeAt(0)-65+key+260)%26+65)}).join("")}
$("run-caesar").onclick=()=>{
 const text=$("caesar-message").value,key=Number($("caesar-key").value)||0,mode=$("caesar-mode").value;
 const result=caesar(text,mode==="encrypt"?key:-key);
 $("caesar-output").innerHTML='<div><span class="label">'+(mode==="encrypt"?"Cifrada":"Original")+' →</span> <span class="value">'+escapeHtml(result)+'</span></div>';
};
function vig(text,key,sign=1){key=key.toUpperCase().replace(/[^A-Z]/g,"");let j=0;return text.toUpperCase().split("").map(c=>{if(c<"A"||c>"Z")return c;const k=key.charCodeAt(j++%key.length)-65;return String.fromCharCode((c.charCodeAt(0)-65+sign*k+260)%26+65)}).join("")}
$("run-vig").onclick=()=>{
 const text=$("vig-message").value,key=$("vig-key").value;if(!key.trim())return $("vig-output").innerHTML='<span class="error">Informe uma chave.</span>';
 const result=vig(text,key,$("vig-mode").value==="encrypt"?1:-1);$("vig-output").innerHTML='<div><span class="label">Resultado →</span> <span class="value">'+escapeHtml(result)+'</span></div>';
};
function detInv(a){for(let x=1;x<26;x++)if((a*x)%26===1)return x;return null}
function matInv(m){const d=((m[0][0]*m[1][1]-m[0][1]*m[1][0])%26+26)%26,di=detInv(d);if(di===null)throw new Error("A matriz não possui inversa módulo 26.");return [[m[1][1]*di%26,(-m[0][1]*di%26+26)%26],[(-m[1][0]*di%26+26)%26,m[0][0]*di%26]]}
function hill(text,m){text=text.toUpperCase().replace(/ /g,"").replace(/[^A-Z]/g,"");if(text.length%2)text+="X";let out="";for(let i=0;i<text.length;i+=2){let x=text.charCodeAt(i)-65,y=text.charCodeAt(i+1)-65;out+=String.fromCharCode(((m[0][0]*x+m[0][1]*y)%26)+65);out+=String.fromCharCode(((m[1][0]*x+m[1][1]*y)%26)+65)}return out}
$("run-hill").onclick=()=>{
 const m=[[+$("h00").value,+$("h01").value],[+$("h10").value,+$("h11").value]];try{const result=$("hill-mode").value==="encrypt"?hill($("hill-message").value,m):hill($("hill-message").value,matInv(m));$("hill-output").innerHTML='<div><span class="label">Resultado →</span> <span class="value">'+result+'</span></div>'}catch(e){$("hill-output").innerHTML='<span class="error">'+e.message+'</span>'}
};
const weights={A:2,O:2,E:2,DE:3,DO:3,DA:3,EM:3,UM:3,UMA:3,AO:3,QUE:5,PARA:5,COM:4,NA:3,NO:3};
function score(text){let p=0;for(const w of text.split(/\s+/))p+=weights[w]||0;for(const c of text)if("AEOSRIN".includes(c))p++;return p}
$("run-attack").onclick=()=>{
 const text=$("attack-message").value.toUpperCase();if(!text.trim())return;
 const rows=[];for(let k=1;k<26;k++){const plain=caesar(text,-k);rows.push({k,plain,p:score(plain)})}rows.sort((a,b)=>b.p-a.p);
 $("attack-output").innerHTML='<table><thead><tr><th>Chave</th><th>Texto decifrado</th><th>Pontos</th></tr></thead><tbody>'+rows.map((r,i)=>'<tr class="'+(i===0?"best":"")+'"><td>'+r.k+'</td><td>'+escapeHtml(r.plain)+'</td><td>'+r.p+(i===0?" ✓":"")+'</td></tr>').join("")+'</tbody></table>';
};
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
