using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Data;
using System.Data.Entity;
using System.Web.Mvc;
using System.Web.SessionState;

namespace MalltopicNewsCMS.Controllers
{
    public class Login_Logout
    {
        UsuariosController uc = new UsuariosController();

        public bool VerificarSesion()
        {
            var sesstring = HttpContext.Current.Session["Login"];
            var session = sesstring == null ? false : Convert.ToBoolean(sesstring);

            return session;
        }

        public bool BuscarPermiso(string permiso,string accion)
        {
            var res = false;

            var a = uc.retornarArreglo();
            var max = a.Length / 2;


            for (int i = 0; i <  max; i++)
            {
                if (a[i,0].Equals(permiso) && a[i,1].Equals(accion))
                {
                    res = true;
                    break;
                } 
            }

            return res;
        }

        public void Logout() {

            HttpContext.Current.Session["Login"] = false;
            HttpContext.Current.Session["User"] = null;
            HttpContext.Current.Session["Rol"] = null;
            uc.LimpiarArreglo();
            
        
        }



    }
        



    

}