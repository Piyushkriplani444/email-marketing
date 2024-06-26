# email-marketing

email-overview is a revolutionary AI-driven platform transforming cold outreach. This project automates the process of reading and categorizing unread emails from your Gmail account. It uses the Google Gmail API to read emails and classify them as "Interested", "Not Interested", or "More information" based on their content. Depending on the classification, an appropriate response is sent back to the sender.

PreRequireemnt of this code

- Node.js installed on your machine
- Redis installed on your machine
- Google Cloud project with Gmail API enabled
- Installation

# To run the code

## Create env file and add following credential

```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
GENERATIVE_API_KEY=
```

#### Clone the project

#### You should have a redis server running

```bash
npm install
npm start
```

#### Go to URL http://localhost:300/auth/google to oauth and run the project

## Usage

#### After logging in with your Google account, the application will automatically check for unread emails, categorize them, and send appropriate responses based on the classification.
