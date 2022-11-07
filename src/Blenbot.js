let start_click = document.getElementById('start_bot');
let stop_click = document.getElementById('stop_bot');
var desableBot = false;
let interval;

function Bot() {
  let interval;
  let i = 1;
  let quantidade = 1;
  let largura = '45px';
  let altura = '30px';
  let bodyBot =
    "<div id='bot'><button id='close' value='0'>><div id ='chidBot'></button><input id='messageUser' value='Link para perguntas:'></input><button id='quantMessage'>+1</button><button id='onBot'>Start</button><button id='offBot'>Stop</button></div></div>";
  let element = document.querySelectorAll('.Tmb7Fd');

  element = element[0];
  escapeHTMLPolicy = trustedTypes.createPolicy('forceInner', { createHTML: (to_escape) => to_escape });
  element.innerHTML = escapeHTMLPolicy.createHTML(bodyBot + element.innerHTML);

  let buttonStart = document.getElementById('onBot');
  let buttonStop = document.getElementById('offBot');
  let buttonIncrement = document.getElementById('quantMessage');
  let textMessage = document.getElementById('messageUser');
  let buttonClose = document.getElementById('close');

  buttonClose.addEventListener('click', hide);
  buttonStart.addEventListener('click', startBot);
  buttonStop.addEventListener('click', stopBot);
  buttonIncrement.addEventListener('click', contMessage);
  buttonStop.disabled = true;
  //style
  buttonStop.style.backgroundColor = '#5553a8';
  buttonStart.style.backgroundColor = '#302f74';
  buttonIncrement.style.background = '#0a369d';
  buttonClose.style.background = '#0a369d';

  buttonStop.style.color = '#FFFFFF';
  buttonStart.style.color = '#FFFFFF';
  buttonIncrement.style.color = '#FFFFFF';
  buttonClose.style.color = '#FFFFFF';

  buttonClose.style.borderTopLeftRadius = '5px';
  buttonClose.style.borderBottomLeftRadius = '5px';
  buttonStop.style.borderTopRightRadius = '5px';
  buttonStop.style.borderBottomRightRadius = '5px';

  buttonStop.style.font = 'italic bold 18px';
  buttonStart.style.font = 'italic bold 18px';
  buttonIncrement.style.font = 'italic bold 18px';
  textMessage.style.font = 'italic bold 18px';
  buttonClose.style.font = 'negrito';

  textMessage.style.border = 'none';
  buttonStop.style.border = 'none';
  buttonStart.style.border = 'none';
  buttonIncrement.style.border = 'none';
  buttonClose.style.border = 'none';

  textMessage.style.height = altura;
  //textMessage.style.width=  largura;
  buttonClose.style.height = altura;
  buttonStop.style.height = altura;
  buttonStop.style.width = largura;
  buttonStart.style.height = altura;
  buttonStart.style.width = largura;
  buttonIncrement.style.height = altura;
  buttonIncrement.style.width = largura;
  buttonStop.style.marginRight = '10px';
  //
  //bot
  function blenBot(quantMessage, desableBot, userMessage) {
    window.dp6 = {
      chatMessages: document.querySelectorAll('div[style*="order:"]'),
      customMessage: userMessage,
      time: 5000,
      sendAfter: quantMessage,
    };
    function stateOneButton() {
      buttonStart.disabled = false;
      buttonStop.disabled = true;
      buttonIncrement.disabled = false;
      buttonStop.style.backgroundColor = '#5553a8';
      buttonStart.style.backgroundColor = '#302f74';
      buttonIncrement.style.background = '#0a369d';
    }
    function stateTwoButton() {
      buttonStop.disabled = false;
      buttonIncrement.disabled = true;
      buttonStart.style.backgroundColor = '#808080';
      buttonIncrement.style.backgroundColor = '#808080';
      buttonStop.style.backgroundColor = '#ff3333';
    }
    function blenMessage() {
      let tmpChatMessages = document.querySelectorAll('div[style*="order:"]');
      let sizeOfNewMessages = tmpChatMessages.length - window.dp6.chatMessages.length;
      if (sizeOfNewMessages >= window.dp6.sendAfter) {
        window.dp6.inputChat = document.querySelectorAll('#bfTqV')[0];
        window.dp6.btnSendMessage = document.querySelector(
          '#ow3 .T4LgNb .crqnQb .R3Gmyc.qwU8Me .WUFI9b .hWX4r span button'
        );
        window.dp6.chatMessages = tmpChatMessages;
        window.dp6.inputChat.value = window.dp6.customMessage;
        window.dp6.btnSendMessage.disabled = false;
        window.dp6.btnSendMessage.click();
        console.log('Blenbot: mensagem enviada');
      } else {
        console.log('Não é necessário enviar atualização: quantidade de novas mensagem: ' + sizeOfNewMessages);
        console.log('Quantidade de mensagens definidas: ', window.dp6.sendAfter);
        console.log('Mensagens definida: ', window.dp6.customMessage);
      }
    }
    if (!desableBot) {
      stateTwoButton();
      interval = setInterval(blenMessage, window.dp6.time);
      console.log('Blenbot rodando!');
      localStorage.setItem('isRunning', '1');
    }
    if (desableBot) {
      stateOneButton();
      clearInterval(interval);
      console.log('Blenbot parado!');
      desableBot = false;
    }
  }
  //
  function contMessage() {
    i = i + 1;
    buttonIncrement.innerText = '+' + i.toString();
    buttonIncrement.value = parseInt(buttonIncrement.innerText);
    quantidade = buttonIncrement.value;
    console.log('valor: ', quantidade);
  }
  function startBot() {
    let message = document.getElementById('messageUser').value;
    blenBot(quantidade, false, message);
    document.getElementById('messageUser').disabled = true;
    document.getElementById('messageUser').style.backgroundColor = '#FFFFFF';
  }

  function stopBot() {
    let message = document.getElementById('messageUser').value;
    blenBot(quantidade, true, message);
    document.getElementById('messageUser').disabled = false;
  }
  function hide() {
    if (buttonClose.value === '0') {
      buttonClose.innerHTML = '<';
      buttonClose.value = '1';
      textMessage.style.display = 'none';
      buttonStart.style.display = 'none';
      buttonIncrement.style.display = 'none';
    } else {
      buttonClose.value = '0';
      buttonClose.innerHTML = '>';
      textMessage.style.display = 'inline-block';
      buttonStart.style.display = 'inline-block';
      buttonIncrement.style.display = 'inline-block';
    }
  }
}
start_click.addEventListener('click', async () => {
  let [tabs] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tabs.id },
    function: Bot,
  });
});
function removeBot() {
  //var divBot = document.getElementById("bot");
  //divBot.parentNode.removeChild(divBot);
  document.getElementById('offBot').click();
  document.getElementById('bot').style.display = 'none';
}
stop_click.addEventListener('click', async () => {
  let [tabs] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tabs.id },
    function: removeBot,
  });
});
