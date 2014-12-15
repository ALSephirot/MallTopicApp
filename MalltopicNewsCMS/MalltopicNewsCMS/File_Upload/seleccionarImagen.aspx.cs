using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MalltopicNewsCMS.File_Upload
{
    public partial class seleccionarImagen : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        private void ShowNotification(string msg)
        {
            Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorAlert", "alert('" + msg + "');", true);
        }
        protected void Button1_Click(object sender, EventArgs e)
        {
            if (FileUpload1.HasFile)
            {
                string nombre = FileUpload1.FileName;
                string temppath = System.IO.Path.GetTempPath();
                string nombretemp = FileUpload1.PostedFile.FileName;
                FileUpload1.SaveAs(temppath + "\\" + nombretemp);
                Session["URL"] = temppath;


                Session["nombre"] = nombretemp;
                ArrayList productos;
                if (Session["s_producto"] != null)
                    productos = (ArrayList)Session["s_producto"];
                else
                    productos = new ArrayList();
                productos.Add(nombre.ToString());
                Session["s_producto"] = productos;


                HttpCookie myCookie = new HttpCookie("s_producto");
                // Set the cookie value.
                myCookie.Value = nombre.ToString();
                // Add the cookie.
                Response.Cookies.Add(myCookie);

                string script = string.Format("window.opener.document.getElementById('TextBox1').value ='{0}'; window.close();", nombre.ToString());

                Page.ClientScript.RegisterStartupScript(typeof(Page), "closewindow", script, true);
                
            }
            else
            {
                ShowNotification("Errro, seleccione una imagen");
            }
        }
    }
}