const BoxSDK = require('box-node-sdk');

// Initialize the SDK with your app credentials
const sdk = new BoxSDK({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Create a basic API client, which does not automatically refresh the access token
export const client = sdk.getBasicClient(process.env.DEVELOPER_TOKEN);
