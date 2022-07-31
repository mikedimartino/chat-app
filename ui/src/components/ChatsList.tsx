import { createUseStyles } from 'react-jss';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectActiveChat, selectAllChats, setActiveChat } from 'redux/slices/chatsSlice';
import { Chat } from 'shared/types';

const useStyles = createUseStyles({
  chatsListRoot: {
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  list: {
    listStyle: 'none',
    marginBottom: 0,
    padding: '5px 0px',
    width: '200px',
    overflowY: 'auto',
  },
  listItem: {
    height: '100%',
    listStyle: 'none',
    padding: '1px 10px',
    cursor: 'pointer',
    width: '100%',
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
  },
  activeChat: {
    background: 'blue',
    color: 'white',
  },
});

const ChatsList = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const chats = useAppSelector(selectAllChats);
  const { id: activeChatId } = useAppSelector(selectActiveChat) || {};

  const chatListItems = chats.map((chat) => {
    const classNames = [classes.listItem];
    if (activeChatId === chat.id) {
      classNames.push(classes.activeChat);
    }
    return (
      <li
        key={chat.id}
        className={classNames.join(' ')}
        onClick={() => dispatch(setActiveChat(chat.id))}
      >
        {chat.title}
      </li>
    );
  });

  return (
    <div className={classes.chatsListRoot}>
      <ul className={classes.list}>
        {chatListItems}
      </ul>
    </div>
    
  );
};

export default ChatsList;
