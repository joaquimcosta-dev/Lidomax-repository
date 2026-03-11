/* ============================================================
   REFERÊNCIAS AOS ELEMENTOS DO HTML
   ============================================================ */

//Menu Lateral
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const openMenu = document.getElementById("openMenu");

// Abrir menu
openMenu.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.add("show");
});

// Fechar ao clicar no fundo
overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
});

// Select do anestésico
const selectAnest = document.getElementById("anestesico");

// Botões
const btnConfirmar = document.getElementById("btn-confirmar");
const btnCalcular = document.getElementById("btn-calcular");

// Seções
const calcArea = document.getElementById("calc-area");
const resultadoArea = document.getElementById("resultado-area");

// Inputs
const peso = document.getElementById("peso");
const percent = document.getElementById("percent");
const dosekg = document.getElementById("dosekg");
const doseabs = document.getElementById("doseabs");
const volume = document.getElementById("volume");
const doseplaneada = document.getElementById("doseplaneada");

// Resultados
const rDoseTotal = document.getElementById("res-dose-total");
const rMgTubete = document.getElementById("res-mg-tubete");
const rNumTubetes = document.getElementById("res-tubetes");
const rNumInt = document.getElementById("res-tubetes-int");

// Alerta
const alerta = document.getElementById("alerta");
const alertaMsg = document.getElementById("alerta-msg");



/* ============================================================
   FUNÇÃO: CARREGAR PRESET DO ANESTÉSICO
   ============================================================ */

function carregarPreset() {

    // Pega o option selecionado
    let opt = selectAnest.selectedOptions[0];

    // Caso não tenha selecionado nada
    if (!opt || selectAnest.value === "") return;

    // Se for personalizado → limpa campos
    if (selectAnest.value === "personalizado") {
        percent.value = "";
        dosekg.value = "";
        doseabs.value = "";
        volume.value = "";
        return;
    }

    // Caso seja preset, preenche automaticamente
    percent.value = opt.dataset.percent;
    dosekg.value = opt.dataset.dosekg;
    doseabs.value = opt.dataset.doseabs;
    volume.value = opt.dataset.volume;
}



/* ============================================================
   BOTÃO CONFIRMAR: mostra área de cálculo
   ============================================================ */

btnConfirmar.addEventListener("click", () => {

    if (selectAnest.value === "") {
        alert("Selecione o anestésico primeiro.");
        return;
    }

    carregarPreset();

    // Mostra a seção de cálculos
    calcArea.classList.remove("hidden");
});



/* ============================================================
   BOTÃO CALCULAR: faz todos os cálculos
   ============================================================ */

btnCalcular.addEventListener("click", () => {

    const pacienteInput = document.getElementById("paciente");
    const pacienteResultado = document.getElementById("res-paciente");

    if (pacienteInput && pacienteResultado) {
        let nomePaciente = pacienteInput.value.trim();

        if (nomePaciente === "") {
        nomePaciente = "Não informado";
    }

    pacienteResultado.textContent = nomePaciente;
    }

    // Lê e converte valores numéricos
    let p = parseFloat(peso.value);
    let pct = parseFloat(percent.value);
    let dkg = parseFloat(dosekg.value);
    let dabs = parseFloat(doseabs.value);
    let vol = parseFloat(volume.value);
    let dplan = parseFloat(doseplaneada.value);

    // Validação básica
    if (isNaN(p) || isNaN(pct) || isNaN(dkg) || isNaN(dabs) || isNaN(vol)) {
        alert("Preencha todos os campos obrigatórios com valores válidos!");
        return;
    }

    /* ============================================================
       CÁLCULOS (de acordo com o PDF do projeto)
       ============================================================ */

    // 1) Dose máxima total (mg)
    let doseMaxTotal = p * dkg;

    // 2) mg por tubete = (percentagem × 10) × volume (mL)
    let mgPorTubete = (pct * 10) * vol;

    // 3) Número de tubetes permitidos
    let numTubetes = doseMaxTotal / mgPorTubete;

    // Número inteiro de tubetes (seguro)
    let numInt = Math.floor(numTubetes);

    // Define a dose usada para comparação
    let comparacao = isNaN(dplan) ? doseMaxTotal : dplan;


    /* ============================================================
       SISTEMA DE ALERTAS (verde / amarelo / vermelho)
       ============================================================ */

    alerta.classList.remove("verde", "amarelo", "vermelho");
    let mensagem = "";

    if (comparacao > dabs) {
        alerta.classList.add("vermelho");
        mensagem = "⚠️ Dose excede o limite seguro!";
    } 
    else if (comparacao > 0.9 * dabs) {
        alerta.classList.add("amarelo");
        mensagem = "⚠️ Atenção: dose próxima ao limite!";
    } 
    else {
        alerta.classList.add("verde");
        mensagem = "✔ Dose dentro da faixa segura.";
    }


    /* ============================================================
       MOSTRAR OS RESULTADOS NA TELA
       ============================================================ */

    resultadoArea.classList.remove("hidden");

    rDoseTotal.textContent = doseMaxTotal.toFixed(2);
    rMgTubete.textContent = mgPorTubete.toFixed(2);
    rNumTubetes.textContent = numTubetes.toFixed(2);
    rNumInt.textContent = numInt;

    alertaMsg.textContent = mensagem;
});


/**/
// ===== MENU INFERIOR SIMPLES =====
const navItems = document.querySelectorAll(".simple-bottom-nav li");

navItems.forEach(item => {
  item.addEventListener("click", () => {
    // remover active dos outros
    navItems.forEach(i => i.classList.remove("active"));

    // ativar este
    item.classList.add("active");

    // navegar para a seção correspondente (se quiser)
    const target = item.dataset.target;
    if (target) {
      showSection(target);
    }
  });
});

// Função de navegação entre telas (opcional)
function showSection(name) {
  document.querySelectorAll(".section").forEach(section => {
    section.style.display = "none";
  });

  const activeSection = document.getElementById("sec-" + name);
  if (activeSection) activeSection.style.display = "block";
}

// MENU INFERIOR - ABRIR OUTRO ARQUIVO HTML
const navitems = document.querySelectorAll(".simple-bottom-nav li");

navItems.forEach(item => {
    item.addEventListener("click", () => {
        const file = item.getAttribute("data-file");
        if (file) {
            window.location.href = file;  // ABRE OUTRO ARQUIVO HTML
        }
    });
});