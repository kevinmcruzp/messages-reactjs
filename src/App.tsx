import { useContext, useEffect, useState } from 'react';
import styles from './App.module.scss';
import { LoginBox } from './components/LoginBox';
import { Message, MessageList } from './components/MessageList';
import { SendMessageForm } from './components/SendMessageForm';
import { AuthContext } from './contexts/auth';

export function App() {
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState<string>('');

  useEffect(() => {
    if (user && currentMessage !== '') {
      const newMessage: Message = {
        id: user.id,
        text: currentMessage,
        user: {
          name: user.name,
          avatar_url: user.avatar_url
        }
      };

      setMessages((prevState) => [
        newMessage,
        ...prevState.slice(0, 2)
      ]);
    }
  }, [currentMessage, user])

  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/last3`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
      }
    };

    fetchMessages();

    const interval = setInterval(fetchMessages, 5000);

    return () => clearInterval(interval);
  }, [user])

  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      <MessageList messages={messages} />
      {!!user ? <SendMessageForm setCurrentMessage={setCurrentMessage} /> : <LoginBox />}

    </main>
  )
}

