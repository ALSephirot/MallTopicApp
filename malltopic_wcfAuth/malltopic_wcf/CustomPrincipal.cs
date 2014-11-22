using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Principal;

namespace malltopic_wcf
{
    public class CustomPrincipal: IPrincipal
    {
        string[] _roles;
        IIdentity _identity;

        public CustomPrincipal(string name, params string[] roles)
        {
            this._roles = roles;
            this._identity = new CustomIdentity(name);
        }

        public IIdentity Identity
        {
            get { return _identity; }
        }

        public bool IsInRole(string role)
        {
            return _roles.Contains(role);
        } 
    }
}