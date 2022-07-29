// @ts-ignore
import randomColor from 'randomcolor';

import { User } from 'shared/types';


const colors = randomColor({
  count: 30,
  hue: 'random',
});

const hash = (text: string) => {
  var hash = 0;
    for (var i = 0; i < text.length; i++) {
        var code = text.charCodeAt(i);
        hash = ((hash<<5)-hash)+code;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

const getUserColor = (user: User) => {
  const index = hash(user.id) % colors.length;
  return colors[index];
};

export default getUserColor;
