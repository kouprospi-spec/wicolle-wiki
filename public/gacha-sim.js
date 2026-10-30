// public/gacha-sim.js
// 左メニューの「開催中のガチャ一覧」にアクティブ色をつける
var navGacha = document.getElementById('nav-gacha');
if (navGacha) { navGacha.classList.add('active'); }

var pullBtn = document.getElementById('pull-11-btn');
var resultContainer = document.getElementById('gacha-result-container');
var gachaGrid = document.getElementById('gacha-grid');
var summaryText = document.getElementById('gacha-summary-text');

var star5Pool = ["ゾラ", "ミラー", "カカ", "ネドヴェド", "カンナヴァーロ", "マイルズ"];
var star4Pool = ["ドンナルンマ", "ヴァラン", "モドリッチ", "サラー", "レヴァンドフスキ"];
var star3Pool = ["一般選手A", "一般選手B", "一般選手C", "一般選手D", "一般選手E"];

if (pullBtn && gachaGrid && resultContainer && summaryText) {
  pullBtn.addEventListener('click', function() {
    pullBtn.style.transform = "scale(0.95)";
    setTimeout(function() { pullBtn.style.transform = "scale(1)"; }, 100);

    gachaGrid.innerHTML = '';
    var star5Count = 0;
    var pelePulled = false;

    for (var i = 1; i <= 11; i++) {
      var name = "";
      var rarity = "";
      var isPele = false;
      var gradeText = "";
      var targetUrl = "javascript:void(0)";

      var isLastFrame = (i === 11);
      var randomVal = Math.random() * 100;

      if (isLastFrame) {
        if (randomVal <= 15) {
          name = "【超目玉】ペレ"; rarity = "legend"; isPele = true; gradeText = "G126"; pelePulled = true; targetUrl = "/players/pele-legend-2026";
        } else {
          name = star5Pool[Math.floor(Math.random() * star5Pool.length)]; rarity = "r5"; gradeText = "G" + (Math.floor(Math.random() * 10) + 105); targetUrl = "/";
        }
        star5Count++;
      } else {
        if (randomVal <= 1.0) {
          name = "【超目玉】ペレ"; rarity = "legend"; isPele = true; gradeText = "G126"; star5Count++; pelePulled = true; targetUrl = "/players/pele-legend-2026";
        } else if (randomVal <= 5.0) {
          name = star5Pool[Math.floor(Math.random() * star5Pool.length)]; rarity = "r5"; gradeText = "G" + (Math.floor(Math.random() * 10) + 105); star5Count++; targetUrl = "/";
        } else if (randomVal <= 40.0) {
          name = star4Pool[Math.floor(Math.random() * star4Pool.length)]; rarity = "r4"; gradeText = "☆4選手";
        } else {
          name = star3Pool[Math.floor(Math.random() * star3Pool.length)]; rarity = "r3"; gradeText = "☆3選手";
        }
      }

      var cardLink = document.createElement('a');
      cardLink.className = 'gacha-card-link';
      cardLink.href = targetUrl;
      
      var card = document.createElement('div');
      card.className = "result-card";
      if (isPele) { card.classList.add("pele-card"); } 
      else if (rarity === "r5") { card.classList.add("star5"); }
      
      var countDiv = document.createElement('div');
      countDiv.style.fontSize = "0.7rem";
      countDiv.style.color = "#888";
      countDiv.style.marginBottom = "2px";
      countDiv.textContent = i + "回目" + (isLastFrame ? " (確定)" : "");
      
      var badge = document.createElement('span');
      badge.className = "rarity-badge " + rarity;
      badge.textContent = rarity === "legend" ? "LEGEND" : rarity === "r5" ? "☆5" : rarity === "r4" ? "☆4" : "☆3";
      
      var nameDiv = document.createElement('div');
      nameDiv.style.fontWeight = "bold";
      nameDiv.style.color = "#111";
      nameDiv.style.marginBottom = "4px";
      nameDiv.style.fontSize = "0.85rem";
      nameDiv.textContent = name;
      
      var gradeDiv = document.createElement('div');
      gradeDiv.style.fontSize = "0.75rem";
      gradeDiv.style.color = "#e67e22";
      gradeDiv.style.fontWeight = "bold";
      gradeDiv.style.marginBottom = "4px";
      gradeDiv.textContent = gradeText;
      
      card.appendChild(countDiv);
      card.appendChild(badge);
      card.appendChild(nameDiv);
      card.appendChild(gradeDiv);

      if (targetUrl !== "javascript:void(0)") {
        var linkNotice = document.createElement('div');
        linkNotice.style.fontSize = "0.7rem";
        linkNotice.style.color = "#00bfa5";
        linkNotice.style.fontWeight = "bold";
        linkNotice.style.marginTop = "4px";
        linkNotice.textContent = "データを見る ➔";
        card.appendChild(linkNotice);
      }

      cardLink.appendChild(card);
      gachaGrid.appendChild(cardLink);
    }

    summaryText.textContent = "☆5選手: " + star5Count + "体獲得！ " + (pelePulled ? "🎉【神引き】ペレ当選！！" : "");
    resultContainer.style.display = 'block';
  });
}
