[![SVG Banners](https://svg-banners.vercel.app/api?type=origin&text1=Twitch&nbsp;|&nbsp;T1gu1Sensei&text2=💖%20Open%20Source&width=800&height=400)](https://www.twitch.tv/t1gu1sensei)

# React for streamElements

- Hi, I want to be a leader to help people with streaming and nice UI integrations.
- **Follow me on twitch**: <https://www.twitch.tv/t1gu1sensei> (Im a **French QC** Canadian, but I understand english well if you have some questions)

- You can ask for some feature in the issue section with the enhancement label.
- If you want contribute to the project, go for it!

## Install

- Make sure you know how to use [React.js](https://reactjs.org/)
- `npm install` to install packages
- `npm run start` to run the project locally
- `npm run build` to build project and get final files

## How to import to streamElements

- HTML: Copy `build/static/index.html` for the HTML section
- JS: Copy only `build/static/js/bundle.min.js` for the javascript section
- CSS: Copy `build/static/css/bundle.min.css` for the css section
- Image: Don't worry buddy, images are inline into base64. (Nothing to do)

## Listen EVENTS (follow, subs, etc)

I already integrated that part: <https://docs.streamelements.com/docs/connecting-via-websocket>.
So you just have to create your .env file and put your token on `REACT_APP_STREAMELEMENTS_TOKEN`.

### env

Create the `.env` file at the root of the project and add your token to the `REACT_APP_STREAMELEMENTS_TOKEN` env variable.
At the root of the project and add channel name to the `REACT_APP_CHANNEL_NAME` env variable to use BOT that will send you chat message.

- You can get you token from: https://streamelements.com/dashboard/account/channels
- Show secrets
- copy you JWT token
- paste it in your `.env` file

Example:

```.env
REACT_APP_STREAMELEMENTS_TOKEN=my_stream_element_token
REACT_APP_CHANNEL_NAME=channelName
```

## Nice packages integrated

### Animate.css

- Make simple and nice animation with: [react-animated-css](https://github.com/digital-flowers/react-animated-css#readme)

### StreamElements API Documentation (Events)

https://github.com/StreamElements/widgets/blob/master/CustomCode.md

Currently I add everything of that in providers/AlertsProviders.js

TODO: Add other events like **Host**, **Raid**, **Merch**

### Twitch chat events (tmi.js)

https://github.com/tmijs/tmi.js

Currently I add everything of that in providers/ChatProvider.js
