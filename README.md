# ![Image](https://i.imgur.com/cqeNt5W.png)

**UnpackIt** is a simple frontend-only web application designed to let users send digital gifts to others. Built as part of a project for **HighSeas**, the app allows users to create personalized gift messages and send them in a fun and interactive way, with a unique URL generated for each gift.

## Features
- **Create Personalized Gifts**: Send digital gifts with a personalized message, recipient name, and sender name.
- **URL Generation**: The app generates a custom URL for each gift that can be shared with recipients.
- **Frontend-Only Application**: Everything is handled in the frontend — no backend required!

## How it Works
- When the sender fills out the recipient's name, message, and their own name, a special URL is generated.
- The URL contains the recipient's name, the message, and the sender's name (encoded in a Base64 string) which is used for viewing the gift on another page.
- The recipient receives the link and his gift.

## URL Shortening
TinyURL is used to shorten the links, so they are easy to share.

## API Key Disclaimer
- This project **exposes an API key** for TinyURL in the frontend to shorten URLs. I understand the security implications of exposing an API key and, after considering the options, I decided that the convenience of a frontend-only solution outweighed the complexity of setting up a backend for authentication.
- If you are concerned about the security of the API key, please be cautious and consider creating your own TinyURL account and replacing the exposed token in the code.

## Tech Used
- Frontend: React, Tailwind
- Animations: Framer Motion
- URL Shortening: TinyURL API

## License
Under MIT license. 

Made with ❤️ by [rocristoi](https://cristoi.ro)