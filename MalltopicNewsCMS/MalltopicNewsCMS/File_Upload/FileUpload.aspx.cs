using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MalltopicNewsCMS.File_Upload
{
    
    public partial class FileUpload : System.Web.UI.Page
    {
        public bool coleccion { get; set; }
        public bool update { get; set; }

        public static ArrayList idimgenes = new ArrayList();
        public  Guid idd { get; set; }
        private  Guid newid = Guid.NewGuid();
        protected void Page_Load(object sender, EventArgs e)
        {
            coleccion = Convert.ToBoolean(Request.QueryString["coleccion"]);
            update = Convert.ToBoolean(Request.QueryString["update"]);
        }

        public void llenararray()
        {
            if(coleccion)
            {
                idimgenes.Add(newid.ToString());
            }else
            {
                if (update)
                {
                    idd = (Guid)Session["EditGuid"];
                }else
                {
                    idd = (Guid)Session["newGuid"];
                }
            }
        }

        public ArrayList traer ()
        {
            return idimgenes;
        }
        protected void Button2_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(TextBox1.Text))
            {
                ShowNotification("Error, debe seleccionar una imagen");
            }
            else
            {
                subir_imagen();
            }
        }
        private void ShowNotification(string msg)
        {
            Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorAlert", "alert('" + msg + "');", true);
        }

        public static byte[] ConvertImageToByteArray(System.Drawing.Image _image, ImageFormat _formatImage)
        {
            byte[] ImageByte;
            try
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    _image.Save(ms, _formatImage);
                    ImageByte = ms.ToArray();
                }
            }
            catch (Exception) { throw; }
            return ImageByte;
        }
        private void subir_imagen()
        {
            if (coleccion)
            {
                
                idd = newid;
            }
            else
            {
                if (update)
                {
                    idd = (Guid)Session["EditGuid"];
                }
                else
                {
                    idd = (Guid)Session["newGuid"];
                }
                
            }
            string nombreArchivo = TextBox1.Text;
            string ext = System.IO.Path.GetExtension(nombreArchivo);


            StreamReader sourceStream = new StreamReader(Session["URL"] + "\\" + nombreArchivo);
            string extText = System.IO.Path.GetExtension(TextBox1.Text);
            if (ext == ".png")
            {
                string ne = TextBox1.Text;

                if (System.IO.File.Exists(Session["URL"] + "\\" + nombreArchivo))
                {

                    System.Drawing.Image img = new System.Drawing.Bitmap(sourceStream.BaseStream);

                    byte[] fileContents;
                    if (ext == ".jpg")
                    {
                        fileContents = ConvertImageToByteArray(img, ImageFormat.Jpeg);
                    }
                    else
                    {
                        fileContents = ConvertImageToByteArray(img, ImageFormat.Png);
                    }

                    int anchoo = img.Width;
                    int altoo = img.Height;


                    FtpWebRequest request = (FtpWebRequest)WebRequest.Create("ftp://waws-prod-blu-007.ftp.azurewebsites.windows.net/site/wwwroot/Images/Uploads/MallTopicNews/" + idd + ext);
                    request.Method = WebRequestMethods.Ftp.UploadFile;
                    request.Credentials = new NetworkCredential("malltopic\\malltopic", "topic2014!");

                    sourceStream.Close();
                    request.ContentLength = fileContents.Length;
                    Stream requestStream = request.GetRequestStream();
                    requestStream.Write(fileContents, 0, fileContents.Length);
                    requestStream.Close();
                    FtpWebResponse response = (FtpWebResponse)request.GetResponse();
                    ShowNotification("Subir archivo completado");
                    llenararray();
                    var imgen = "http://malltopic.azurewebsites.net/Images/Uploads/MallTopicNews/" + idd + ext;

                    string script = "";
                    if (coleccion)
                    {
                        script = "IMG('" + imgen + "','" + idd + "');window.close();";
                    }else
                    {
                        script = "IMG2('" + imgen + "','" + idd + "');window.close();";
                    }
                    
                    Page.ClientScript.RegisterStartupScript(typeof(Page), "closewindow", script, true);
                }
                else
                {
                    ShowNotification("Error, no se encuentra la ruta");
                }

            }
            else
            {
                ShowNotification("Solamente se pueden subir imagenes con extensión .png");
            }
        }
    }
}