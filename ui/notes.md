How should chats be named?
- Direct chats will have the name be based on the members of the chat.
- Chat rooms must have a name.

What's the difference between a chat room and a DM between 2 or more people?
- Direct Chat (DM) is a private chat that doesn't have a name.
- The title is a list of names: John Simpson, Eric Sanders, and 3 more.
- Title of the chat is returned by the API.
- You can't add people to an existing direct chat. A new direct chat will be created.


=== USE CASES ===
- Create room.
- Join room.
- Leave room.
- View all / Search for rooms.
- Delete room (only admin / creator can do this).
- Get data by room ID (messages, members, other metadata).
- Send message to room.
- Edit message (only creator can do this).
- Delete message (only creator or admin can do this).
- Log in / log out / create account.
- Receive messages in real time (web sockets).

How can I run all this locally?
- I think to start I could set up a SQL database and GraphQL.
  - How can I persist SQL database when it is running locally?



docker login
docker run --name chatapp-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
