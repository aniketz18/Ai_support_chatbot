(function() {
  // Load configuration from script tag attributes
  const currentScript = document.currentScript || (function() {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  const userId = currentScript.getAttribute('data-user-id');
  const backendUrl = currentScript.getAttribute('data-backend-url') || 'http://localhost:5000/api/chat';

  if (!userId) {
    console.error('ChatWidget: Missing data-user-id attribute in the script tag.');
    return;
  }

  // Inject CSS directly to avoid external dependencies
  const style = document.createElement('style');
  style.innerHTML = `
    #chatbot-widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    #chatbot-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #4F46E5;
      color: white;
      border: none;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.2s;
    }
    #chatbot-button:hover {
      transform: scale(1.05);
    }
    #chatbot-button svg {
      width: 32px;
      height: 32px;
    }
    #chatbot-window {
      display: none;
      flex-direction: column;
      width: 350px;
      height: 500px;
      max-height: 80vh;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      border: 1px solid #e5e7eb;
      overflow: hidden;
      margin-bottom: 12px;
    }
    #chatbot-window.open {
      display: flex;
    }
    #chatbot-header {
      background-color: #4F46E5;
      color: white;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
    }
    #chatbot-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
    }
    #chatbot-close svg {
      width: 20px;
      height: 20px;
    }
    #chatbot-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      background-color: #f9fafb;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .chat-message {
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 14px;
      line-height: 1.4;
    }
    .chat-message.user {
      align-self: flex-end;
      background-color: #4F46E5;
      color: white;
      border-bottom-right-radius: 0;
    }
    .chat-message.bot {
      align-self: flex-start;
      background-color: #e5e7eb;
      color: #1f2937;
      border-bottom-left-radius: 0;
    }
    #chatbot-input-container {
      display: flex;
      padding: 12px;
      border-top: 1px solid #e5e7eb;
      background: white;
    }
    #chatbot-input {
      flex: 1;
      border: 1px solid #d1d5db;
      border-radius: 20px;
      padding: 8px 16px;
      outline: none;
      font-size: 14px;
    }
    #chatbot-input:focus {
      border-color: #4F46E5;
    }
    #chatbot-send {
      background-color: #4F46E5;
      color: white;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      margin-left: 8px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    #chatbot-send:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }
    #chatbot-send svg {
      width: 18px;
      height: 18px;
      margin-left: 2px;
    }
  `;
  document.head.appendChild(style);

  // Widget HTML structure
  const container = document.createElement('div');
  container.id = 'chatbot-widget-container';
  container.innerHTML = `
    <div id="chatbot-window">
      <div id="chatbot-header">
        <span>Chat Support</span>
        <button id="chatbot-close">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <div id="chatbot-messages">
        <div class="chat-message bot">Hi there! How can I help you today?</div>
      </div>
      <div id="chatbot-input-container">
        <input type="text" id="chatbot-input" placeholder="Type a message..." autocomplete="off" />
        <button id="chatbot-send">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        </button>
      </div>
    </div>
    <button id="chatbot-button">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
    </button>
  `;
  document.body.appendChild(container);

  // Elements
  const button = document.getElementById('chatbot-button');
  const chatWindow = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close');
  const messagesContainer = document.getElementById('chatbot-messages');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');

  // Toggle chat window
  const toggleChat = () => {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open')) {
      input.focus();
    }
  };

  button.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

  // Send message
  const appendMessage = (text, sender) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    msgDiv.innerText = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const sendMessage = async () => {
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    input.value = '';
    sendBtn.disabled = true;

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, message: text }),
      });

      const data = await response.json();

      if (response.ok) {
        appendMessage(data.reply, 'bot');
      } else {
        appendMessage('Error: ' + (data.message || 'Something went wrong.'), 'bot');
      }
    } catch (error) {
      appendMessage('Connection error. Please try again later.', 'bot');
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  };

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

})();
