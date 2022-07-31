import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { createUseStyles } from "react-jss";
import ReactTextareaAutosize from "react-textarea-autosize";

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  textarea: {
    resize: 'none',
    fontFamily: 'Tahoma',
    fontSize: 14,
    padding: 5,
    borderRadius: '5px 5px 0 0',
    whiteSpace: 'pre-line',
  },
  sendBtn: {
    lineHeight: 1,
    borderRadius: '0 0 5px 5px',
  },
});

type MessageEditorProps = {
  initialValue?: string,
  onSend: (message: string) => void,
};

const MessageEditor = ({ initialValue = '', onSend }: MessageEditorProps) => {
  const classes = useStyles();
  const [message, setMessage] = useState(initialValue);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (event.ctrlKey) {
        setMessage(message + '\n'); // Treat CTRL+ENTER as newline.
      } else {
        event.preventDefault();
        handleSend();
      }
    }
  };

  const handleSend = () => {
    onSend(message);
    setMessage('');
  };

  return (
    <div className={classes.root}>
      <ReactTextareaAutosize
        className={classes.textarea}
        minRows={1}
        maxRows={6}
        value={message}
        ref={textAreaRef}
        onChange={event => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="primary"
        className={classes.sendBtn}
        disabled={!message.length}
        onClick={handleSend}
      >
        Send
      </Button>
    </div>
  )
};

export default MessageEditor;
