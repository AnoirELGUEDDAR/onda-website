import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Chatbot.css';

const Chatbot = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]); 
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [connectionError, setConnectionError] = useState(false);

    // Initialize welcome message after translations are ready
    useEffect(() => {
        setMessages([{ text: t('chatbot.welcome'), sender: 'bot' }]);
    }, [t]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        const messagesContainer = document.querySelector('.chat-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setConnectionError(false);
    };

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);
        setConnectionError(false);

        try {
            const response = await fetch(`/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': i18n.language
                },
                credentials: 'include',
                body: JSON.stringify({ message: input })
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setMessages(prev => [...prev, {
                text: data.reply || t('chatbot.default_response'),
                sender: 'bot',
                isError: false
            }]);
        } catch (error) {
            console.error('Chatbot error:', error);
            setMessages(prev => [...prev, {
                text: t('chatbot.error'),
                sender: 'bot',
                isError: true
            }]);
            setConnectionError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className={`chatbot-container ${i18n.language === 'ar' ? 'rtl' : ''}`}>
            {isOpen ? (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>{t('chatbot.title')}</h3>
                        <button
                            onClick={toggleChat}
                            aria-label={t('chatbot.close')}
                            className="close-btn"
                        >
                            &times;
                        </button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`message ${msg.sender} ${msg.isError ? 'error' : ''}`}
                            >
                                {msg.text}
                                {msg.isError && (
                                    <div className="error-hint">
                                        {t('chatbot.try_again')}
                                    </div>
                                )}
                            </div>
                        ))}
                        {loading && (
                            <div className="message bot loading">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        {connectionError && (
                            <div className="connection-warning">
                                {t('chatbot.connection_issue')}
                            </div>
                        )}
                    </div>

                    <div className="chat-input">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder={t('chatbot.placeholder')}
                            onKeyDown={handleKeyDown}
                            disabled={loading}
                            aria-label={t('chatbot.input_label')}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                            aria-label={t('chatbot.send')}
                        >
                            {loading ? (
                                <div className="spinner"></div>
                            ) : (
                                <i className="fas fa-paper-plane"></i>
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    className={`chat-toggle ${connectionError ? 'error' : ''}`}
                    onClick={toggleChat}
                    aria-label={t('chatbot.open')}
                >
                    {connectionError ? (
                        <i className="fas fa-exclamation-circle"></i>
                    ) : (
                        <img
                            src={"/images/chatbotlogo.png"}
                            alt="Chatbot"
                            id={"logo"}
                            style={{ width: 100, height: 100, borderRadius: '50%' }}
                        />
                    )}
                </button>
            )}
        </div>
    );
};

export default Chatbot;
