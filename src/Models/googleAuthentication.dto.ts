export interface IGoogleAuthenticationResponse {
   authentication: {
      accessToken: string;
      expiresIn: number;
      idToken: string;
      issuedAt: number;
      refreshToken: string;
      scope: string;
      tokenType: string;
   };
   error: string | null;
   errorCode: string | null;
   params: {
      access_token: string;
      authuser: string;
      code: string;
      hd: string;
      id_token: string;
      scope: string;
      state: string;
   };
   type: string;
   url: string;
}
