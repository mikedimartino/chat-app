import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import keyBy from 'lodash/keyBy';

import { Message } from 'shared/types';
import { generateChats } from 'mockData/generateMockChats';

const mockChats = generateChats(35);
const chatsById = keyBy(mockChats, 'id');

// #region Types
type AddMessagePayload = {
  chatId: string,
  message: Message,
};
// #endregion

export const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    chatsById,
    activeChatId: mockChats[0].id,
  },
  reducers: {
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload;
    },
    addMessageToChat: (state, action: PayloadAction<AddMessagePayload>) => {
      const { chatId, message } = action.payload || {};
      state.chatsById[chatId].messages?.push(message);
    },
  },
});

// #region Actions
export const { setActiveChat, addMessageToChat } = chatsSlice.actions;
// #endregion

// #region Selectors
export const selectAllChats = (state: RootState) => Object.values(state.chats.chatsById || {});

export const selectChatById = (id: string) => (state: RootState) => state.chats.chatsById[id];

export const selectActiveChat = (state: RootState) => selectChatById(state.chats.activeChatId)(state);
// #endregion


export default chatsSlice.reducer;
