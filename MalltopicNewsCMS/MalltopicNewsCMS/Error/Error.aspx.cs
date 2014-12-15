using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace malltopicCMS.Error
{
    public partial class Error : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
            CargarError();

        }

        protected override void OnInit(EventArgs e)
        {
            
        }

        public void CargarError() {

            var noLogin = Convert.ToBoolean(Request.QueryString["noLogin"]);
            var noPermiso = Convert.ToBoolean(Request.QueryString["noPermiso"]);

            if(noLogin)
            {
                btnVolver.Text = "Iniciar Sesión";
                lblDetError.Text = "Debes iniciar sesión para acceder a esta página";
            }
            else if(noPermiso)
            {
                btnVolver.Text = "Volver al home";
                lblDetError.Text = "No tienes permisos para acceder a esta página";
            }
        
        
        }

        protected void btnVolver_Click(object sender, EventArgs e)
        {
            var noLogin = Convert.ToBoolean(Request.QueryString["noLogin"]);
            var noPermiso = Convert.ToBoolean(Request.QueryString["noPermiso"]);

            if (noLogin)
            {
                Response.Redirect("~/Usuarios/Index");
            }
            else if (noPermiso)
            {
                Response.Redirect("~/Home/Index");
            }
        }
    }
}