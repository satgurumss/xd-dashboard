 exports.creds = {
 	returnURL: 'http://localhost:9000/loginAd/return',
 	realm:"netorgft998123.onmicrosoft.com",
 	issuer: "https://login.microsoftonline.com/262bfb42-b44c-4b5d-93ff-fccddae42eeb/saml2",
 	identityMetadata: 'https://login.microsoftonline.com/common/.well-known/openid-configuration', // For using Microsoft you should never need to change this.
 	clientID: 'd33c5908-2401-4f5a-a3dd-8514023a914e',
 	clientSecret: 'tNV9OMTGAVMtWYxyBacLtuBfjCFgDc2dePwn/Kz7UsQ=', // if you are doing code or id_token code
 	skipUserProfile: true, // for AzureAD should be set to true.
 	responseType: 'id_token', // for login only flows use id_token. For accessing resources use `id_token code`
 	responseMode: 'form_post', // For login only flows we should have token passed back to us in a POST
 	scope: ['email', 'profile'] // additional scopes you may wish to pass
 };
//xdensityad - tNV9OMTGAVMtWYxyBacLtuBfjCFgDc2dePwn/Kz7UsQ=