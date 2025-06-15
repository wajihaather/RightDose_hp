// Chatbot Implementation
document.addEventListener('DOMContentLoaded', function() {
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotToggle = document.querySelector('.chatbot-toggle-btn');
    const chatbotClose = document.querySelector('.chatbot-close-btn');
    const messageInput = document.querySelector('.chatbot-message-input');
    const sendButton = document.querySelector('.chatbot-send-btn');
    const messagesContainer = document.querySelector('.chatbot-messages');
    const quickQuestions = document.querySelectorAll('.quick-question');
    
    // Sample responses for the chatbot
    const responses = {
        "order": "To place an order, go to the 'Orders' section in your dashboard and click 'New Order'. Select the medications you need, specify quantities, and submit.",
        "track": "You can track your shipment by going to the 'Shipments' section. Enter your order number or select from your recent orders.",
        "issue": "To report an issue, please provide details about your problem. You can also contact our support team at support@rightdose.com.",
        "default": "I'm sorry, I didn't understand that. Could you please rephrase your question? Here are some things I can help with: ordering medications, tracking shipments, or reporting issues."
    };
    
    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
    });
    
    // Close chatbot
    chatbotClose.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    // Send message function
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            // Add user message
            addMessage(messageText, 'user');
            messageInput.value = '';
            
            // Show typing indicator
            showTyping();
            
            // Bot response after delay
            setTimeout(function() {
                removeTyping();
                const botResponse = getBotResponse(messageText);
                addMessage(botResponse, 'bot');
                
                // Scroll to bottom
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000 + Math.random() * 2000);
        }
    }
    
    // Quick question buttons
    quickQuestions.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.textContent;
            addMessage(question, 'user');
            
            // Show typing indicator
            showTyping();
            
            setTimeout(function() {
                removeTyping();
                const botResponse = getBotResponse(question);
                addMessage(botResponse, 'bot');
                
                // Scroll to bottom
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
        });
    });
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender + '-message');
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Show typing indicator
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Remove typing indicator
    function removeTyping() {
        const typing = document.querySelector('.typing-indicator');
        if (typing) {
            typing.remove();
        }
    }
    
    // Get bot response based on user input
    function getBotResponse(input) {
        input = input.toLowerCase();
        
        if (input.includes('order') || input.includes('place') || input.includes('buy')) {
            return responses.order;
        } else if (input.includes('track') || input.includes('shipment') || input.includes('delivery')) {
            return responses.track;
        } else if (input.includes('issue') || input.includes('problem') || input.includes('help')) {
            return responses.issue;
        } else {
            return responses.default;
        }
    }
    
    // Event listeners for sending messages
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Show notification badge after 10 seconds if chat hasn't been opened
    setTimeout(function() {
        if (!chatbotContainer.classList.contains('active')) {
            document.querySelector('.notification-badge').style.display = 'flex';
            document.querySelector('.notification-badge').textContent = '1';
        }
    }, 10000);
});