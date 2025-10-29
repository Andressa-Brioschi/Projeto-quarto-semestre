const nome = document.getElementById('nome');
const botao = document.getElementById('btn_cadastrar');
const cpf = document.getElementById('cpf');
const email = document.getElementById('email');
const nasc = document.getElementById('datanasc');
const tel = document.getElementById('tel');
const senha = document.getElementById('senha');
const validsenha = document.getElementById('validSenha');

async function enviarCad() {
  const dados = {
    tipous: 'paciente',
    nome: nome.value,
    cpf: cpf.value,
    email: email.value,
    nasc: nasc.value,
    tel: tel.value,
    senha: senha.value,
    senhaconf: validsenha.value
  };

  try {
    const resp = await fetch('/api_cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    const resultado = await resp.json();
    console.log(resultado);

    if (resp.ok) {
      if (resultado.redirect) {
        window.location.href = resultado.redirect;
      } else {
        alert("✅ Usuário cadastrado com sucesso!");
      }
    } else {
      alert("⚠️ Erro: " + resultado.erro);
      console.error("Erro:", resultado);
    }
  } catch (err) {
    console.error("Erro inesperado:", err);
    alert("⚠️ Erro inesperado ao tentar cadastrar. Verifique a conexão com o servidor.");
  }
}

botao.addEventListener('click', enviarCad);
