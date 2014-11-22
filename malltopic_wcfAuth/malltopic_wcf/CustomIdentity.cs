using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Principal;

namespace malltopic_wcf
{
    public class CustomIdentity: IIdentity
    {
        string _name; 

    public CustomIdentity(string name) 
    { 
        this._name = name; 
    }

    string IIdentity.AuthenticationType 
    { 
        get { return "Custom SCHEME"; } 
    }

    bool IIdentity.IsAuthenticated 
    { 
        get { return true; } 
    }

    string IIdentity.Name 
    { 
        get { return _name; } 
    } 
    }
}