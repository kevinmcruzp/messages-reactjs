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
        const messagesQueue: Message[] = [];

        messagesQueue.push({
          id: user!!.id,
          text: currentMessage,
          user: {
            name: user!!.name,
            avatar_url: user!!.avatar_url
          }
        });
  
        const timer = setInterval(() => {
          if (messagesQueue.length > 0) {
            setMessages((prevState: any) => [
              messagesQueue[0],
              prevState[0],
              prevState[1],
            ].filter(Boolean));
    
            messagesQueue.shift();
          }
        }, 2000)
      }

    },[currentMessage])

  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      <MessageList messages={messages} setMessages={setMessages} />
      {!!user ? <SendMessageForm setCurrentMessage={setCurrentMessage} /> : <LoginBox />}

    </main>
  )
}

