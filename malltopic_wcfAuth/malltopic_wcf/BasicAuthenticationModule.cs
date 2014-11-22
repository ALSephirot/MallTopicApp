using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace malltopic_wcf
{
    public class BasicAuthenticationModule : IHttpModule 
    {
        public void Init(HttpApplication context)
        {
            context.AuthenticateRequest
               += new EventHandler(context_AuthenticateRequest);
        }
        void context_AuthenticateRequest(object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication)sender;
            if (!BasicAuthenticationProvider.Authenticate(application.Context))
            {
                application.Context.Response.Status = "401 Unauthorized";
                application.Context.Response.StatusCode = 401;
                application.Context.Response.AddHeader("WWW-Authenticate", "Basic");
                application.CompleteRequest();
            }
        }
        public void Dispose() { }
    }
}