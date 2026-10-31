const skills = [
  { title: "Video Shotcraft", repo: "Vincentwei1021/video-shotcraft", category: "motion", label: "motion design", description: "Receitas de planos e prévias para transformar uma ideia em um promo editável." },
  { title: "Herk Edit Kit", repo: "nateherkai/herk-edit-kit", category: "edicao", label: "edição", description: "Cortes orientados por transcrição, motion graphics e templates para vídeos curtos." },
  { title: "Claude Remotion Skill", repo: "haidrrrry/claude-remotion-skill", category: "motion", label: "remotion", description: "Crie motion graphics, B-roll, legendas e sound design a partir de um prompt." },
  { title: "OpenStoryline", repo: "FireRedTeam/FireRed-OpenStoryline", category: "ia", label: "direção com IA", description: "Um agente de edição que transforma intenção em planejamento e execução transparente." },
  { title: "Higgsfield Prompt Skill", repo: "OSideMedia/higgsfield-ai-prompt-skill", category: "ia", label: "cinema generativo", description: "Sistema para prompts cinematográficos, consistência de personagem e controle de movimento." },
  { title: "FFmpeg Skill", repo: "kajisho5/ffmpeg-skill", category: "workflow", label: "automação", description: "Operações de mídia repetíveis para converter, cortar e preparar arquivos em lote." },
  { title: "OpenMontage", repo: "calesthio/OpenMontage", category: "edicao", label: "montagem", description: "Ferramenta focada em montagem: organize material bruto e encontre a sequência certa." },
  { title: "Anything2Explainer", repo: "Vincentwei1021/anything2explainer", category: "ia", label: "explainer", description: "Do conceito ao vídeo explicativo, com roteiro, cenas e composição em um só fluxo." },
  { title: "Video Talkcraft", repo: "Vincentwei1021/video-talkcraft", category: "ia", label: "talking head", description: "Estrutura para vídeos falados com ritmo, cortes, B-roll e embalagem de conteúdo." },
  { title: "Motion Skills", repo: "iart-ai/motion-skills", category: "motion", label: "motion design", description: "Biblioteca de práticas para criar movimento consistente em interfaces e vídeos." },
  { title: "ComfyUI MCP", repo: "artokun/comfyui-mcp", category: "workflow", label: "comfyui", description: "Controle workflows de imagem, vídeo e áudio por linguagem natural, localmente." },
  { title: "ChatGPT Video Editing", repo: "Jaycheng1103/chatgpt-video-editing-skills", category: "edicao", label: "edição assistida", description: "Um processo guiado para sair do material bruto até a entrega de shorts publicáveis." },
  { title: "Digital Human Koubo", repo: "andyhuo520/digital-human-koubo", category: "ia", label: "digital human", description: "Crie vídeos de apresentador com estilos de edição e componentes de embalagem." },
  { title: "Yutu", repo: "eat-pray-ai/yutu", category: "workflow", label: "youtube", description: "Automatize etapas do workflow de YouTube com CLI, MCP e agente." },
  { title: "Video Editor Skills", repo: "appariciojunior/video-editor-skills", category: "edicao", label: "edição", description: "Skills práticas para estruturar, revisar e acelerar o trabalho de quem edita vídeo." }
];

const grid = document.querySelector("#skill-grid");
const search = document.querySelector("#search");
const count = document.querySelector("#result-count");
const empty = document.querySelector("#empty-state");
const accessGate = document.querySelector("#access-gate");
const continueButton = document.querySelector("#continue-button");
let activeFilter = "all";

if (sessionStorage.getItem("framework-access") === "granted") {
  accessGate.classList.add("is-hidden");
} else {
  document.body.classList.add("is-locked");
}

continueButton.addEventListener("click", () => {
  sessionStorage.setItem("framework-access", "granted");
  accessGate.classList.add("is-hidden");
  document.body.classList.remove("is-locked");
});

function render() {
  const query = search.value.toLowerCase().trim();
  const visible = skills.filter((skill) => {
    const matchesFilter = activeFilter === "all" || skill.category === activeFilter;
    const matchesSearch = `${skill.title} ${skill.repo} ${skill.label} ${skill.description}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });
  grid.innerHTML = visible.map((skill) => {
    const index = String(skills.indexOf(skill) + 1).padStart(2, "0");
    return `<article class="skill-card">
      <div class="card-top"><span class="tag">${skill.label}</span><span class="card-index">${index}</span></div>
      <div><h3>${skill.title}</h3><p>${skill.description}</p></div>
      <div class="card-bottom"><span class="repo">${skill.repo}</span><a class="open-link" href="https://github.com/${skill.repo}" target="_blank" rel="noreferrer" aria-label="Abrir ${skill.title} no GitHub">↗</a></div>
    </article>`;
  }).join("");
  count.textContent = `${visible.length} ${visible.length === 1 ? "resultado" : "resultados"}`;
  empty.hidden = visible.length > 0;
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    render();
  });
});
search.addEventListener("input", render);
render();
