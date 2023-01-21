// Find your API key at https://beta.openai.com/account/api-keys
// Paste your API key below
var api_key = "sk-000000000000000000000";

chrome.contextMenus.create({
    title: "Flirtify",
    contexts: ["selection"],
    onclick: summarizeText
});
  
let open_ai_response;

async function summarizeText(info) {
  var prompt_text = "Write 3 replies in a flirty way to the following Whatsapp conversation, adding a '•' before every option. I'm André: "
  var prompt_text2 = encodeURIComponent(info.selectionText);
  
  var url = "https://api.openai.com/v1/engines/text-davinci-003/completions";

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer " + api_key);

  xhr.onload = function() {
    if (xhr.status === 200) {
      // Request succeeded. Display the response.
      open_ai_response = JSON.parse(xhr.responseText);
      let summarized_text = open_ai_response['choices'][0]['text'];
      openModal(summarized_text);
    } else {
      // Request failed. Display an error message.
      openModal("Sorry, there was an error processing your request. Please try again later.");
    }
  };

  var data = `{
    "prompt": "${prompt_text + prompt_text2}",
    "temperature": 0.7,
    "max_tokens": 256,
    "top_p": 1,
    "frequency_penalty": 0.75,
    "presence_penalty": 0
  }`;

  xhr.send(data);
}

function openModal(message) {
  var modalWindow = window.open("", "", "height=500,width=500");
  modalWindow.document.write("<title>Flirtify</title>");
  modalWindow.document.write("<style>h1 { font-size: 18px; }</style>");
  modalWindow.document.write("<h1>" + "Here are 3 possible flirty replies: <br>" + message.replace(/•/g, '<br><br>') + "</h1>");
}