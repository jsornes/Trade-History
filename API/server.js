/**
 * @license
 * Copyright Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// [START gmail_quickstart]
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const base64url = require("base64url");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

// Load client secrets from a local file.
fs.readFile("credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), listMessages);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  gmail.users.labels.list(
    {
      userId: "me",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const labels = res.data.labels;
      if (labels.length) {
        console.log("Labels:");
        labels.forEach((label) => {
          console.log(`- ${label.name}`);
        });
      } else {
        console.log("No labels found.");
      }
    }
  );
}
/**
 * Lists the messages in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listMessages(auth) {
  console.log("fuck you");

  let messageIds = [];

  const gmail = google.gmail({ version: "v1", auth });
  messagesObj = "gmail.users.messages;";
  gmail.users.messages.list(
    {
      userId: "me",
      maxResults: 10,
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const messages = res.data.messages;
      console.log("messages", messages);

      if (messages.length) {
        //console.log("Messages:");
        messages.forEach((message) => {
          messageIds.push(message.id);
          //console.log("ids: ", messageIds);
          console.log(`id- ${message.id}`);
          getOneMessageContent(message.id);
        });
      } else {
        console.log("No messages found.");
      }
    }
  );

  function getMethods(obj) {
    var res = [];
    for (var m in obj) {
      if (typeof obj[m] == "function") {
        res.push(m);
      }
    }
    return res;
  }
  let listi = ["17444cc9a39354d0", "1744074e6d3bb2e8"];

  /*
      "17443f41a7bf93bf",
    "174434b8d0a12fff",
    "17442c4a27e68572",
  */

  //console.log(messageIds);

  function getOneMessageContent(messageId) {
    console.log(messageId);
    params = { userId: "me", id: messageId };
    messageToRead = gmail.users.messages.get(params, (err, res) => {
      console.log("hello there");
      if (err) {
        return console.log("The API returned an error: " + err);
      }
      //console.log(res);
      if (res) {
        const messagePayload = res.data.payload;
        //console.log("message: ", messagePayload.parts[0].body.size);
        //console.log("res.payload: ", res);
        if (
          messagePayload.body.size > 0 &&
          res.data.payload.mimeType === "text/plain"
        ) {
          console.log("message: ");
          //console.log(base64url.decode(messagePayload.body.data));
          console.log("payload.size: ", messagePayload.size);
        } else if (
          messagePayload.parts[0].body.size > 0 &&
          res.data.payload.mimeType === "multipart/alternative"
        ) {
          messagePayload.parts.forEach((part) => {
            console.log(base64url.decode(part.body.data));
          });
        }
      } /*
      console.log("res: ", res);
      console.log("res.config", res.config.params);
      console.log(
        "payload",
        base64url.decode(res.data.payload.parts[1].body.data)
      );*/
    });
  }

  function getMessageContent(messageIds) {
    messageIds.forEach((messageId) => {
      params = { userId: "me", id: messageId };
      messageToRead = gmail.users.messages.get(params, (err, res) => {
        console.log("hello there");
        if (err) {
          return console.log("The API returned an error: " + err);
        }
        console.log(res);
        if (res) {
          const message = res.data.payload.body.body;
          console.log("message: ", base64url.decode(message));
        }
      });
    });
  }

  //console.log(listi);
  /*let i = 0;
  listi.forEach((messageID) => {
    params = { userId: "me", id: messageID };
    messageToRead = gmail.users.messages.get(params, (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const message = res.data.payload.body;
      let arr = [];
      arr[i] = res.data;
      const raw = res.data;
      //console.log("raw.raw" + base64url.decode(arr[0].raw));
      console.log("jina");*/
  /*
      const message = res.data.payload.body.data;

      for (method in massage) {
        console.log(method);
      }
      console.log("massage: " + base64url.decode(message.data));
      console.log("yane");*/
  /*
      const massage = arr[0].payload.body;

      for (method in massage) {
        console.log(method);
      }
      console.log("massage: " + base64url.decode(message.data));
      console.log("yane");
      //"arr[0]".getOwnPropertyNames;
      i++;
      //console.log(res.data);
      //console.log("hola");
      //message.forEach((header) => {
      // if (header.name == "Subject") {
      //  console.log(header.value);
      //}
      //});
      //if (message[0].body) {
      // console.log(message[0].body);
      //console.log(JSON.parse(message[0].body));
      //}
      //console.log(message);
    });
  });*/

  console.log("fuck me");
}
// [END gmail_quickstart]

module.exports = {
  SCOPES,
  listLabels,
  listMessages,
};
