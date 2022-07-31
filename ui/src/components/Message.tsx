import { createUseStyles } from 'react-jss';

import { Message as MessageInterface } from 'shared/types';
import getUserColor from 'util/getUserColor';

type MessageProps = {
  message: MessageInterface;
  showHeader: boolean;
};

const useStyles = createUseStyles({
  root: {
    textAlign: 'left',
  },
  header: {
    paddingTop: '8px',
  },
  authorName: {
    fontWeight: 'bold',
    // TODO: Pass color in here dynamically with useStyles
  },
  content: {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
  }, 
});

const Message = ({ message, showHeader }: MessageProps) => {
  const classes = useStyles();
  const authorColor = getUserColor(message.author);

  const header = (
    <div className={classes.header}>
      <div
        className={classes.authorName}
        style={{ color: authorColor }} // Need to do this because useStyles is not working as expected...
      >
        {message.author.name}
      </div>
      {/* TODO: Show message timestamp */}
    </div>
  );

  return (
    <div className={classes.root}>
      {showHeader && header}
      <div className={classes.content}>
        {message.content}
      </div>
    </div>
  );
};

export default Message;
