let participantes = [
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0),
  },
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0),
  },
  {
    nome: "Fulano de Tal",
    email: "fulano@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 15),
    dataCheckIn: null,
  },
  {
    nome: "Beltrano da Silva",
    email: "beltrano@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 8, 45),
    dataCheckIn: new Date(2024, 2, 25, 20, 45),
  },
  {
    nome: "Ciclano Souza",
    email: "ciclano@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 15, 10),
    dataCheckIn: null,
  },
  {
    nome: "Ana Lima",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 11, 30),
    dataCheckIn: new Date(2024, 2, 25, 18, 20),
  },
  {
    nome: "José Santos",
    email: "jose@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 14, 20),
    dataCheckIn: null,
  },
  {
    nome: "Carla Oliveira",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 17, 0),
    dataCheckIn: new Date(2024, 2, 25, 16, 10),
  },
  {
    nome: "Rafael Alves",
    email: "rafael@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 19, 50),
    dataCheckIn: null,
  },
  {
    nome: "Juliana Costa",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 20, 15),
    dataCheckIn: null,
  },
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
       Confirmar check-in
      </button>
    `;
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `;
};

const atualizarLista = (participantes) => {
  let output = "";
  for (let participante of participantes)
    document.querySelector("tbody").innerHTML = output =
      output + criarNovoParticipante(participante);
};

atualizarLista(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault();

  const dadosDoFormulario = new FormData(event.target);

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null,
  };

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  );

  if (participanteExiste) {
    alert("Email já cadastrado!");
    return;
  }

  participantes = [participante, ...participantes];
  atualizarLista(participantes);

  event.target.querySelector('[name="nome"]').value = "";
  event.target.querySelector('[name="email"]').value = "";
};

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?";

  if(confirm(mensagemConfirmacao) == false){
    return
  }

  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  );

  participante.dataCheckIn = new Date();

  atualizarLista(participantes);
};
