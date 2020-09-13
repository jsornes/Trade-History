# Trade-History

Trade-History is a small React & Node.js project, that will use the Google Gmail API to read the messages of one particular broker and display some useful information after doing some simple calculations.

As component framework it will use MaterialUI. For the backend it will use Express.js.

This project is mainly for me to learn React, MaterialUI and deepen my knowledge about backends.

The goal is to simply show some data in a pretty way, which gets updated either daily/weekly/monthly (but probably monthly) so I'll probably never deploy the site (not really needed.)

### To use it:

##### `clone github.com/jsornes/Trade-History`

You will need a `credentials.json` file with the project's information, according to Google's API (still need to search if you commit that file or not.) Having that file you can just start the API, follow the link in the terminal and allow access to your E-Mail (readOnly access.)

##### TODOs:

-API needs to search for the broker's mails.
-API needs to take the info and pack it into a JSON file.
-Frontend needs to be built.
-Pack project into a docker container -> should've started here.
-Script that starts the project daily/weekly/monthly.
