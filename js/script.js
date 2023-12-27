const apiKey = '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'; // قم بتعويض 'YOUR_OPENAI_API_KEY' بمفتاح API الخاص بك

async function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var messageText = messageInput.value.trim();

    if (messageText !== '') {
        var chatMessages = document.getElementById('chat-messages');
        var userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.textContent = messageText;
        chatMessages.appendChild(userMessage);

        // Clear the input field
        messageInput.value = '';

        // Scroll to the bottom of the chat messages
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Send user message to OpenAI GPT API
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: messageText,
                max_tokens: 550
            })
        });

        const data = await response.json();
        const chatReply = data.choices[0].text;

        // Display AI's reply
        var aiMessage = document.createElement('div');
        aiMessage.className = 'message ai-message';
        aiMessage.textContent = chatReply;
        chatMessages.appendChild(aiMessage);

        // Scroll to the bottom of the chat messages after AI's reply
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}
