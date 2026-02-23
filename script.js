function calc() {
    const f = document.getElementById('fr').value, 
          s = document.getElementById('sat').value, 
          p = document.getElementById('pas').value, 
          c = document.getElementById('fc').value, 
          t = document.getElementById('temp').value, 
          a = document.getElementById('acvpu').value;

    const container = document.getElementById('res-container');

    if (!f && !s && !p && !c && !t && a === "") {
        container.style.display = 'none';
        return;
    }

    let score = 0;
    const o2 = +document.getElementById('o2').value;
    const escSat = document.getElementById('escala_sat').value;
    
    score += o2 + (+a || 0);

    if (f) { let n = +f; if (n <= 8 || n >= 25) score += 3; else if (n >= 21) score += 2; else if (n <= 11) score += 1; }
    if (s) {
        let n = +s;
        if (escSat === "1") {
            if (n <= 91) score += 3; else if (n <= 93) score += 2; else if (n <= 95) score += 1;
        } else {
            if (n <= 83) score += 3; else if (n <= 85) score += 2; else if (n <= 87) score += 1;
            else if (n >= 93 && o2 === 2) {
                if (n >= 97) score += 3; else if (n >= 95) score += 2; else if (n >= 93) score += 1;
            }
        }
    }
    if (p) { let n = +p; if (n <= 90 || n >= 220) score += 3; else if (n <= 100) score += 2; else if (n <= 110) score += 1; }
    if (c) { let n = +c; if (n <= 40 || n >= 131) score += 3; else if (n >= 111) score += 2; else if (n <= 50 || n >= 91) score += 1; }
    if (t) { let n = +t; if (n <= 35.0) score += 3; else if (n >= 39.1) score += 2; else if (n <= 36.0 || n >= 38.1) score += 1; }

    exibir(score);
}
function exibir(s) {
    const container = document.getElementById('res-container'),
          colorBox = document.getElementById('res-color'),
          scoreDisp = document.getElementById('res-score'),
          riskDisp = document.getElementById('res-risk'),
          conduta = document.getElementById('res-conduta');

    container.style.display = 'block';
    scoreDisp.innerText = s;

    if (s >= 7) {
        colorBox.className = 'res-header vermelho';
        riskDisp.innerText = 'RISCO ALTO';
        conduta.innerHTML = `
            <span class="acao-principal">Avaliação médica imediata.<br>Monitorização contínua.</span>
            <div class="sepse-alerta">⚠️ ATENÇÃO: SUGESTÃO DE PROTOCOLO DE SEPSE</div>
        `;
    } else if (s >= 5) {
        colorBox.className = 'res-header amarelo';
        riskDisp.innerText = 'RISCO MÉDIO';
        conduta.innerHTML = `
            <span class="acao-principal">Avaliação médica urgente (até 1h).<br>Vigilância aumentada.</span>
            <div class="sepse-alerta">⚠️ ATENÇÃO: SUGESTÃO DE PROTOCOLO DE SEPSE</div>
        `;
    } else {
        colorBox.className = 'res-header verde';
        riskDisp.innerText = 'RISCO BAIXO';
        conduta.innerHTML = `
            <span class="acao-principal">Manter monitoração rotineira conforme o protocolo da unidade.</span>
        `;
    }
}