let chave = "e6dc8ea14ad6c7bc7f8b77bab2cfb256"

function colocarNaTela(dados) {
  if (dados.cod === 200) {
    document.querySelector(".cidade").innerHTML = "" + dados.name
    document.querySelector(".temp").innerHTML =
      Math.floor(dados.main.temp) + "°C"
    document.querySelector(".descricao").innerHTML =
      dados.weather[0].description
    document.querySelector(".icone").src =
      "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png"
  } else {
    alert(
      "Cidade não encontrada. Por favor, verifique o nome e tente novamente."
    )
  }
}

async function buscarCidadePorCoordenadas(lat, lon) {
  try {
    let resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${chave}&lang=pt_br&units=metric`
    )
    let dados = await resposta.json()
    colocarNaTela(dados)
  } catch (erro) {
    console.error("Ocorreu um erro ao buscar a cidade:", erro)
    alert(
      "Ocorreu um erro ao buscar a cidade. Por favor, tente novamente mais tarde."
    )
  }
}

async function obterLocalizacaoUsuario() {
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        await buscarCidadePorCoordenadas(latitude, longitude)
      })
    } else {
      console.error("Geolocalização não é suportada pelo navegador.")
      alert("Geolocalização não é suportada pelo navegador.")
    }
  } catch (erro) {
    console.error("Ocorreu um erro ao obter a localização do usuário:", erro)
    alert(
      "Ocorreu um erro ao obter a localização do usuário. Por favor, tente novamente mais tarde."
    )
  }
}

document.addEventListener("DOMContentLoaded", obterLocalizacaoUsuario)
