import styles from './styles.module.scss'

export type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

type MessageListProps = {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className={styles.messageListWrapper}>
      <div className={styles.messageListHeader}>
        <p className={styles.messageListTitle}>
          <span>💬</span> Mensagens da comunidade
        </p>
      </div>

      <ul className={styles.messageList}>
        {
          messages.map((message) => {
            return (
              <li key={message.id} className={styles.message}>
                <p className={styles.messageContent}>
                  {message.text}
                </p>
                <div className={styles.messageUser}>
                  <div className={styles.userImage}>
                    <img src={message.user.avatar_url} />
                  </div>
                  <span>{message.user.name}</span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}