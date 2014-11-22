using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Principal;
using System.Text;

namespace malltopic_wcf
{
    public class BasicAuthenticationProvider
    {
        public static bool Authenticate(HttpContext context)
        {
            if (!context.Request.Headers.AllKeys.Contains("Authorization"))
                return false;

            // Remember claims based security should be only be 
            // used over HTTPS  
            //if (!context.Request.IsSecureConnection)
            //    return false;

            string authHeader = context.Request.Headers["Authorization"];

            IPrincipal principal = null;
            if (TryGetPrincipal(authHeader, out principal))
            {
                context.User = principal;
                return true;
            }
            return false;
        }
        private static bool TryGetPrincipal(string authHeader, out IPrincipal principal)
        {
            var creds = ParseAuthHeader(authHeader);
            if (creds != null && TryGetPrincipal(creds, out principal))
                return true;

            principal = null;
            return false;
        }

        private static bool TryGetPrincipal(string[] creds, out IPrincipal principal)
        {
            if (creds[0] == "Administrator" && creds[1] == "malltopic2014!")
            {
                principal = new GenericPrincipal(
                   new GenericIdentity("Administrator"),
                   new string[] { "Administrator", "User" }
                );
                return true;
            }
            else if (creds[0] == "Default" && creds[1] == "1234")
            {
                principal = new GenericPrincipal(
                   new GenericIdentity("JoeBlogs"),
                   new string[] { "User" }
                );
                return true;
            }
            else
            {
                principal = null;
                return false;
            }
        }

        private static string[] ParseAuthHeader(string authHeader)
        {
            // Check this is a Basic Auth header 
            if (
                authHeader == null ||
                authHeader.Length == 0 ||
                !authHeader.StartsWith("Basic")
            ) return null;

            // Pull out the Credentials with are seperated by ':' and Base64 encoded 
            string base64Credentials = authHeader.Substring(6);
            string[] credentials = Encoding.ASCII.GetString(
                  Convert.FromBase64String(base64Credentials)
            ).Split(new char[] { ':' });

            if (credentials.Length != 2 ||
                string.IsNullOrEmpty(credentials[0]) ||
                string.IsNullOrEmpty(credentials[0])
            ) return null;

            // Okay this is the credentials 
            return credentials;
        }
    }
}