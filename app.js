const CONTACT="image@idylla-a.org";
const g=document.getElementById("gallery"),dlg=document.getElementById("dlg");
let filter="tout";
function draw(){
  g.innerHTML=WORKS.filter(w=>filter==="tout"||w.type===filter).map(w=>`
  <button class="work" data-id="${w.id}">
    <div class="ph" style="--c1:${w.c1};--c2:${w.c2}">${w.img?`<img src="${w.img}" alt="${w.title}" loading="lazy">`:t("photo")}</div>
    <h3>${w.title}</h3><small>${t(w.type==="peinture"?"peinture":"sculpture")} · ${w.year} · <span class="badge">${t(w.status==="dispo"?"dispo":w.status==="vendu"?"vendu":"demande")}</span></small><br><span class="cta">${t("view")} →</span></button>`).join("");
}
document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{
  filter=b.dataset.f;document.querySelectorAll(".filters button").forEach(x=>x.classList.toggle("on",x===b));draw();});
g.onclick=e=>{const b=e.target.closest(".work");if(!b)return;
  const w=WORKS.find(x=>x.id===b.dataset.id),sold=w.status==="vendu";
  dlg.innerHTML=`<button class="close" onclick="dlg.close()" aria-label="${t("close")}">×</button><div class="modal">
   <div class="ph" style="--c1:${w.c1};--c2:${w.c2}">${w.img?`<img src="${w.img}" alt="${w.title}">`:t("photo")}</div>
   <div class="info"><p class="kicker">${t(w.type)} · ${w.year}</p><h3>${w.title}</h3>
   <p>${w.materials}<br>${w.size}</p>
   ${sold?`<p class="note">${t("sold_note")}</p>`:""}
   <form id="f"><input name="nom" placeholder="${t("name")}" required><input name="email" type="email" placeholder="${t("email")}" required>
   <input name="pays" placeholder="${t("ship")}"><textarea name="msg" rows="3" placeholder="${t("msg")}"></textarea>
   <button class="btn">${t(sold?"similar_btn":"order_btn")}</button><p class="note">${t("mail_note")}</p></form></div></div>`;
  dlg.showModal();
  document.getElementById("f").onsubmit=ev=>{ev.preventDefault();const d=new FormData(ev.target);
   const body=`${t("ref")}: ${w.title} (#${w.id})\n${t("name")}: ${d.get("nom")}\n${t("email")}: ${d.get("email")}\n${t("deliv")}: ${d.get("pays")}\n\n${d.get("msg")}`;
   location.href=`mailto:${CONTACT}?subject=${encodeURIComponent(t("subj")+" — "+w.title)}&body=${encodeURIComponent(body)}`;};
};
