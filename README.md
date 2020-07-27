# I-Collector-PWA

## Steps to deploy project in development

### Clone project here
git clone https://ravuthz@bitbucket.org/local-projects/i-collector-pwa.git

### Go to project root directory and install dependencies via npm or yarn
```bash
npm install
# or
yarn install
```

### Create .env.local at root of project directory
```bash
touch .env.local
# or
echo '' > .env.local
```

### Configure environtment before deploy project in .env.local file
```bash
# API Configurations
REACT_APP_API_BASE_URL=http://localhost:8283/api
REACT_APP_API_GRANT_TYPE=password
REACT_APP_API_CLIENT_ID=client-web
REACT_APP_API_CLIENT_SECRET=123

# FireBase API Configurations
REACT_APP_FB_API_KEY=AIzaSyDiSbBJCASs3PoGriXzfODlWe66NORshlU
REACT_APP_FB_AUTH_DOMAIN=react-js-note.firebaseapp.com
REACT_APP_FB_DB_DATABASE_URL=https://react-js-note.firebaseio.com
REACT_APP_FB_PROJECT_ID=react-js-note
REACT_APP_FB_STORAGE_BUCKET=react-js-note.appspot.com
REACT_APP_FB_MESSAGING_SENDER_ID=345354458517
REACT_APP_FB_APP_ID=1:345354458517:web:234ba6efef9cce98b8129c
REACT_APP_FB_MEASUREMENT_ID=G-GYGXEMX4W5
```

### Finally we can deploy local project
```
npm start
# or
yarn start
```