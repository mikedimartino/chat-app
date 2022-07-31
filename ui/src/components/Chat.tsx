import { createUseStyles } from 'react-jss';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addMessageToChat, selectActiveChat } from 'redux/slices/chatsSlice';

import { Chat as ChatInterface, Message as MessageInterface, User } from 'shared/types';

import MessageEditor from './MessageEditor';
import MessagesList from './MessagesList';

const USER: User = {
  id: '277',
  name: 'Gustav',
};

const useStyles = createUseStyles({
  root: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '10px',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '18px',
    borderBottom: '1px solid black',
  },
});

const Chat = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const chat = useAppSelector(selectActiveChat);

  const handleSendMessage = (content: string) => {
    const message: MessageInterface = {
      id: String(Date.now()),
      content,
      author: USER,
    };
    dispatch(addMessageToChat({ chatId: chat.id, message }));
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>{chat.title}</h1>
      <MessagesList messages={chat.messages || []} />
      <MessageEditor onSend={handleSendMessage} />
    </div>
  );
};

export default Chat;
