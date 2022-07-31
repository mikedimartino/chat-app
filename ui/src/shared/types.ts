export interface User {
  id: string;
  name: string;
};

export interface Message {
  id: string;
  content: string;
  author: User;
}

export interface Chat {
  id: string;
  title: string;
  // type: ChatType // Direct or Room
  messages?: Message[];
}
