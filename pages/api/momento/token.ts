import {
  AuthClient,
  CredentialProvider,
  GenerateAuthToken,
} from "@gomomento/sdk";
import {
  tokenPermissions,
  tokenExpiresIn,
  authenticationMethod,
  AuthenticationMethod,
} from "./config";

const authClient = new AuthClient({
  credentialProvider: CredentialProvider.fromString({
    authToken: process.env.MOMENTO_AUTH_TOKEN,
  }),
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  try {
    let generateAuthTokenResponse;
    switch (authenticationMethod) {
      case AuthenticationMethod.Open:
        generateAuthTokenResponse = await fetchTokenWithOpenAuth();
        break;
      default:
        res.status(500).json({ error: "Unimplemented authentication method" });
        return;
    }

    if (generateAuthTokenResponse instanceof GenerateAuthToken.Success) {
      res.status(200).json({ authToken: generateAuthTokenResponse.authToken });
      return;
    } else if (generateAuthTokenResponse instanceof GenerateAuthToken.Error) {
      res.status(500).json({ error: generateAuthTokenResponse.message() });
      return;
    }

    res.status(500).json({ error: "Unable to get token from momento" });
    return;

  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function fetchTokenWithOpenAuth() {
  return await authClient.generateAuthToken(tokenPermissions, tokenExpiresIn);
}
