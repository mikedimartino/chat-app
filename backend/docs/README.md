# Overview
Run `docker-compose up` to start up the backend.

# pgAdmin
- Run docker-compose up and go to localhost:5050 to view the pgAdmin console.
  - Refer to the values in the docker-compose file to see the email and password values to log in.
- On initial start up, you'll need to connect to the database. [This article](https://belowthemalt.com/2021/06/09/run-postgresql-and-pgadmin-in-docker-for-local-development-using-docker-compose/) has more details. In case that web page no longer exists, see the steps below:
  - Right click on "Servers" to open the context menu and go to "Register > Server".
  - On the "General" tab, enter a name for the server.
  - On the "Connection" tab, set the following:
    - Hostname/address: pg_container
    - Username: root
    - Password: root
