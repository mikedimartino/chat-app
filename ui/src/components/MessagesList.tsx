import { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { Message as MessageInterface } from "shared/types";
import Message from "./Message";

const useStyles = createUseStyles({
  root: {
    overflowY: 'auto',
    marginTop: 'auto',
  },
  list: {
    listStyle: 'none',
    paddingLeft: 0,
  },
});

type MessagesListProps = {
  messages: MessageInterface[],
};

const MessagesList = ({ messages }: MessagesListProps) => {
  const classes = useStyles();
  const bottomRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    // Scroll to bottom of message list when a new message appears.
    bottomRef.current?.scrollIntoView();
  }, [messages]);

  const messagesList = messages.map((message: MessageInterface, index: number) => {
    const showHeader = message.author.id !== messages[index - 1]?.author?.id;
    return (
      <li key={message.id}>
        <Message message={message} showHeader={showHeader} />
      </li>
    );
  })

  return (
    <div className={classes.root}>
      <ul className={classes.list}>
        {messagesList}
        <li ref={bottomRef} />
      </ul>
    </div>
  );
};

export default MessagesList;
