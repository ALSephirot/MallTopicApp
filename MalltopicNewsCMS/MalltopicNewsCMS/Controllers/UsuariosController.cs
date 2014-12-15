using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MalltopicNewsCMS.Models;
using MalltopicNewsCMS.Clases;
using Newtonsoft.Json;

namespace MalltopicNewsCMS.Controllers
{
    public class UsuariosController : Controller
    {
        private MalltopicNewsCMSContext db = new MalltopicNewsCMSContext();
        public static string[,] Apermisos;

        // GET: /Usuarios/
        public ActionResult Index()
        {
            return View();
        }

        // GET: /Login/Details/5
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Index([Bind(Include = "nombreusuario,contrasena")] usuarios Usuario)
        {
            if (Usuario.nombreusuario != "" && Usuario.contrasena != "")
            {
                ConsumirWebApiSecurity cws = new ConsumirWebApiSecurity();

                encriptar en = new encriptar();

                var NombreUsuario = Usuario.nombreusuario;
                var Password = Usuario.contrasena;

                var Modelo = JsonConvert.DeserializeObject<MalltopicNewsCMS.Models.usuarios[]>(cws.Peticion("Usuarios"));
                var UserEncontrado = new List<MalltopicNewsCMS.Models.usuarios>();

                UserEncontrado = Modelo.Where(mm => mm.nombreusuario == NombreUsuario).ToList<MalltopicNewsCMS.Models.usuarios>();

                if (UserEncontrado.Count > 0)
                {
                    if (en.Desencripta(UserEncontrado[0].contrasena).Equals(Password))
                    {

                        var rolid = UserEncontrado[0].rol;

                        var roles = JsonConvert.DeserializeObject<MalltopicNewsCMS.Models.roles[]>(cws.Peticion("Roles"));
                        var nombrol = new List<MalltopicNewsCMS.Models.roles>();

                        nombrol = roles.Where(mm => mm.id == rolid).ToList<MalltopicNewsCMS.Models.roles>();

                        if (nombrol.Count > 0)
                        {
                            Session["Rol"] = nombrol[0].rol;
                            Session["User"] = UserEncontrado[0].id;
                            Session["Login"] = true;

                            var rolxpermisos = JsonConvert.DeserializeObject<MalltopicNewsCMS.Models.rolesxpermisos[]>(cws.Peticion("rolesxpermisos"));
                            var rolxpermiso = new List<MalltopicNewsCMS.Models.rolesxpermisos>();

                            rolxpermiso = rolxpermisos.Where(mm => mm.fk_idrol == rolid).ToList<MalltopicNewsCMS.Models.rolesxpermisos>();

                            Apermisos = new string[rolxpermiso.Count, 2];

                            for (int i = 0; i < rolxpermiso.Count; i++)
                            {

                                var permisos = JsonConvert.DeserializeObject<MalltopicNewsCMS.Models.permisos[]>(cws.Peticion("Permisos"));
                                var pemi = new List<MalltopicNewsCMS.Models.permisos>();

                                pemi = permisos.Where(mm => mm.id == rolxpermiso[i].fk_idpermisos).ToList<MalltopicNewsCMS.Models.permisos>();

                                Apermisos[i, 0] = pemi[0].permiso;
                                Apermisos[i, 1] = pemi[0].accion;

                            }


                        }

                        return View();
                    }
                    else
                    {

                        Session["Login"] = false;
                        Session["User"] = null;
                        Session["Rol"] = null;
                        ModelState.AddModelError("", "Usuario o contraseña inválido.");
                        ViewBag.message = "LoginFailed";
                        return View();
                    }
                }
                else
                {
                    Session["Login"] = false;
                    Session["User"] = null;
                    ModelState.AddModelError("", "Usuario o contraseña inválido.");
                    ViewBag.message = "LoginFailed";
                    return View();
                }
            }

            return View();
        }

        // GET: /Logout/
        public ActionResult Logout()
        {
            Login_Logout lg = new Login_Logout();
            lg.Logout();
            return View();
        }

        public string[,] retornarArreglo()
        {

            return Apermisos;

        }

        public void LimpiarArreglo()
        {
            Apermisos = null;

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
