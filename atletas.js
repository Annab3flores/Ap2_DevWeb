if (!sessionStorage.getItem('entrar')) {
    alert("Acesso não autorizado!");
    window.location = '/';
}

const urlApi = "https://botafogo-atletas.mange.li";

const corpoPagina = document.body;

const btnOpcoes = document.createElement('button');
btnOpcoes.innerHTML = "Escolher";
btnOpcoes.id = "btnOpcoes";

const conteudoOpcoes = document.createElement('div');
conteudoOpcoes.className = "conteudo-opcoes";

const opcoesSelecao = ["Masculino", "Feminino", "Todos"];

opcoesSelecao.forEach(opcao => {
    const btnOpcao = document.createElement('button');
    btnOpcao.innerHTML = opcao;
    btnOpcao.onclick = () => lidarComCliqueBotoes(opcao.toLowerCase());
    conteudoOpcoes.appendChild(btnOpcao);
});

btnOpcoes.onclick = function () {
    conteudoOpcoes.style.display = 'block';
};

const containerCabecalho = document.createElement('div');
containerCabecalho.className = 'container-cabecalho'
const textoCabecalho = document.createElement('h1');
textoCabecalho.innerText = 'Atletas do Botafogo 2023-2';

const btnSair = document.createElement('button');
btnSair.id = "btnSair"
btnSair.innerText = 'Sair';
btnSair.onclick = () => {
    sessionStorage.removeItem('entrar');
    window.location = '/';
};

containerCabecalho.appendChild(textoCabecalho);
containerCabecalho.appendChild(btnSair);
document.body.appendChild(containerCabecalho);

const secaoBotoes = document.createElement('div');
secaoBotoes.id = "secaoBotoes"

const btnMasculino = document.createElement('button');
btnMasculino.innerHTML = "Masculino";
btnMasculino.onclick = () => lidarComCliqueBotoes("masculino");

const btnFeminino = document.createElement('button');
btnFeminino.innerHTML = "Feminino";
btnFeminino.onclick = () => lidarComCliqueBotoes("feminino");

const btnTodos = document.createElement('button');
btnTodos.innerHTML = "Todos";
btnTodos.onclick = () => lidarComCliqueBotoes("todos");

secaoBotoes.appendChild(btnMasculino);
secaoBotoes.appendChild(btnFeminino);
secaoBotoes.appendChild(btnTodos);
document.body.appendChild(secaoBotoes);
document.body.appendChild(btnOpcoes);
document.body.appendChild(conteudoOpcoes);

const preencherDados = (atleta) => {
    const container = document.createElement('article');
    const titulo = document.createElement('h3');
    const imagem = document.createElement('img');
    const saibaMais = document.createElement('p');

    container.dataset.id = atleta.id;
    container.dataset.altura = atleta.altura;
    container.dataset.nome_completo = atleta.nome_completo;
    container.dataset.nascimento = atleta.nascimento;

    titulo.innerText = atleta.nome;
    imagem.src = atleta.imagem;
    imagem.alt = `Imagem de ${atleta.nome}`;
    saibaMais.innerHTML = "Saiba Mais";

    container.appendChild(titulo);
    container.appendChild(imagem);
    container.appendChild(saibaMais);

    container.onclick = () => lidarComCliqueContainer(atleta);

    document.body.appendChild(container);
};

const lidarComCliqueBotoes = (caminho) => {
    if (caminho == 'todos') {
        caminho = 'all';
    }
    document.body.innerHTML = '';
    document.body.appendChild(containerCabecalho);
    document.body.appendChild(secaoBotoes);
    document.body.appendChild(btnOpcoes);
    document.body.appendChild(conteudoOpcoes);
    conteudoOpcoes.style.display = 'none';
    buscarDados(`${urlApi}/${caminho}`).then(
        (dados) => {
            for (atleta of dados) {
                preencherDados(atleta);
            }
        }
    );
};

const lidarComCliqueContainer = (atleta) => {
    window.location = `https://annab3flores.github.io/ap2_devweb/outra.html?id=${atleta.id}`;
};

const buscarDados = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};
