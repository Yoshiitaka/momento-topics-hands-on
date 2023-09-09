import {
  ExpiresIn,
  type TokenScope,
  AllTopics,
  AllCaches,
  TokenScopes,
} from "@gomomento/sdk";

export const tokenPermissions: TokenScope = TokenScopes.topicPublishSubscribe(
  AllCaches,
  AllTopics,
);

export const tokenExpiresIn: ExpiresIn = ExpiresIn.minutes(30);

export enum AuthenticationMethod {
  Open,
  Credentials,
}
export const authenticationMethod: AuthenticationMethod =
  AuthenticationMethod.Open;
