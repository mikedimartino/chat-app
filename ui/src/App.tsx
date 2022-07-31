import { createUseStyles } from 'react-jss';

import Chat from 'components/Chat';
import ChatsList from 'components/ChatsList';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    fontFamily: 'Tahoma',
    height: '100vh',
  },
  leftSidebar: {
    border: '1px solid black',
  },
  chat: {
    border: '1px solid black',
    flexGrow: 1,
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.leftSidebar}>
        <ChatsList />
      </div>
      <div className={classes.chat}>
        <Chat />
      </div>
    </div>
  );
}

export default App;
