const pets=[
{name:"Cosmic Dragon",rarity:"Secret",value:2500000000,demand:5,trend:14,icon:"🐉"},
{name:"Galaxy Dominus",rarity:"Secret",value:1800000000,demand:5,trend:9,icon:"👑"},
{name:"Void Overlord",rarity:"Secret",value:1250000000,demand:4,trend:-3,icon:"🌑"},
{name:"Nebula Serpent",rarity:"Mythic",value:620000000,demand:4,trend:12,icon:"🐍"},
{name:"Stellar Kitsune",rarity:"Mythic",value:450000000,demand:4,trend:6,icon:"🦊"},
{name:"Quantum Cat",rarity:"Mythic",value:275000000,demand:3,trend:-5,icon:"🐈"},
{name:"Astral Phoenix",rarity:"Legendary",value:90000000,demand:3,trend:8,icon:"🔥"},
{name:"Moonlight Wolf",rarity:"Legendary",value:65000000,demand:3,trend:2,icon:"🐺"},
{name:"Cosmic Bunny",rarity:"Exclusive",value:25000000,demand:2,trend:-2,icon:"🐰"}
];
let rarity="all";
const fmt=n=>n>=1e9?(n/1e9).toFixed(1)+"B":n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e3?(n/1e3).toFixed(1)+"K":n;
function renderPets(){
 const q=document.querySelector("#search").value.toLowerCase(), s=document.querySelector("#sort").value;
 let a=pets.filter(p=>(rarity==="all"||p.rarity===rarity)&&p.name.toLowerCase().includes(q));
 a.sort((x,y)=>s==="name"?x.name.localeCompare(y.name):s==="demand"?y.demand-x.demand:y.value-x.value);
 document.querySelector("#petGrid").innerHTML=a.length?a.map(p=>`<article class="pet"><div class="pet-icon">${p.icon}</div><div><div class="rarity">${p.rarity}</div><h3>${p.name}</h3><div class="meta">Demand ${"★".repeat(p.demand)}${"☆".repeat(5-p.demand)}</div></div><div class="value"><b>${fmt(p.value)}</b><small>${p.trend>=0?"↗":"↘"} ${Math.abs(p.trend)}%</small></div></article>`).join(""):'<div class="empty">No pets found.</div>';
}
function renderTrends(){
 document.querySelector("#trendGrid").innerHTML=pets.slice().sort((a,b)=>b.trend-a.trend).slice(0,6).map(p=>`<div class="trend"><div class="trend-top"><b>${p.icon} ${p.name}</b><b class="${p.trend>=0?'up':'down'}">${p.trend>=0?'+':''}${p.trend}%</b></div><div class="meta">${fmt(p.value)} value · ${p.rarity}</div><div class="bar"><i style="width:${Math.min(100,Math.abs(p.trend)*5+20)}%"></i></div></div>`).join("");
}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");rarity=b.dataset.rarity;renderPets()});
function addTrade(side){
 const wrap=document.querySelector(side==="you"?"#yourItems":"#theirItems"), row=document.createElement("div"); row.className="trade-row";
 row.innerHTML=`<select>${pets.map(p=>`<option value="${p.value}">${p.name} — ${fmt(p.value)}</option>`).join("")}</select><input type="number" min="1" value="1"><button class="remove">×</button>`;
 row.querySelector(".remove").onclick=()=>{row.remove();calcTrade()}; row.querySelectorAll("select,input").forEach(x=>x.oninput=calcTrade);wrap.appendChild(row);calcTrade();
}
function calcTrade(){
 let sum=side=>[...document.querySelector(side).children].reduce((t,r)=>t+(+r.querySelector("select").value)*(+r.querySelector("input").value),0);
 let y=sum("#yourItems"),t=sum("#theirItems");document.querySelector("#yourTotal").textContent=fmt(y);document.querySelector("#theirTotal").textContent=fmt(t);
 let out=document.querySelector("#tradeResult");
 if(!y&&!t){out.textContent="Add pets to check the trade.";out.className="result";return}
 if(y===t){out.textContent="⚖️ Fair Trade";out.className="result"}
 else if(t>y){out.innerHTML=`<span class="good">🟢 Win</span> · They are offering ${fmt(t-y)} more value.`;out.className="result"}
 else {out.innerHTML=`<span class="bad">🔴 Loss</span> · You are giving ${fmt(y-t)} more value.`;out.className="result"}
}
function toggleMenu(){const n=document.querySelector("nav");n.style.display=n.style.display==="flex"?"none":"flex";n.style.position="absolute";n.style.right="20px";n.style.top="62px";n.style.flexDirection="column";n.style.background="#0d1020";n.style.padding="15px";n.style.border="1px solid #202744";n.style.borderRadius="10px"}
renderPets();renderTrends();