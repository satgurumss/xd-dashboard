 exports.creds = {
 	returnURL: 'http://localhost:9000/login/return',
 	realm:"xdensityad.onmicrosoft.com",
 	issuer: "https://login.microsoftonline.com/e52eaeeb-eb44-4e1c-864e-4489624c737e/saml2",
 	identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration', // For using Microsoft you should never need to change this.
 	clientID: 'd33c5908-2401-4f5a-a3dd-8514023a914e',
 	clientSecret: '7euoO1GgH7/IhJMgtatvoNH36HWqcd2YK9PwEE07X9c=', // if you are doing code or id_token code
 	skipUserProfile: true, // for AzureAD should be set to true.
 	responseType: 'id_token', // for login only flows use id_token. For accessing resources use `id_token code`
 	responseMode: 'form_post', // For login only flows we should have token passed back to us in a POST
 	scope: ['email', 'profile'] // additional scopes you may wish to pass
 };