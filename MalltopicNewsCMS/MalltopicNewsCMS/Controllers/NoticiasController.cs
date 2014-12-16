using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using MalltopicNewsCMS.Models;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.MobileServices;
using Newtonsoft.Json;

namespace MalltopicNewsCMS.Controllers
{
    public class NoticiasController : Controller
    {
        private MalltopicNewsCMSContext db = new MalltopicNewsCMSContext();
        public static MobileServiceClient MobileService = new MobileServiceClient("https://malltopicnews.azure-mobile.net/", "CFlSZfUFMyGBgbxXNczFkgbnmXYGTS53");
        int cont = 0;

        ConsumirWebApi cw = new ConsumirWebApi();

        // GET: /Noticias/
        public async Task<ActionResult> Index()
        {
            return View("Index", await ConsumirWebApi.GetObject<Noticias>("Noticias"));
        }

        // GET: /Noticias/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Noticias noticias = db.Noticias.Find(id);
            if (noticias == null)
            {
                return HttpNotFound();
            }
            return View(noticias);
        }

        // GET: /Noticias/Create
        public ActionResult Create()
        {
            var id = Guid.NewGuid();
            Session["newGuid"] = id;
            return View();
        }

        // POST: /Noticias/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "id,titulo,descripcion,pie_de_imagen,link,fk_idcategoria,usuario_creado,usuario_modificado,publicar,destacado,fecha_publicado,creado,modificado,idimgs,nombimgs,autor")] Noticias noticias)
        {
            HttpCookie myCookie = new HttpCookie("Imagen");
            myCookie = Request.Cookies["Imagen"];
            
            if (myCookie!=null)
            {
                var c = myCookie.Value;
                c = c.Replace('"', '\'');
                var CookieArray = JsonConvert.DeserializeObject<Cookie2>(c);

                var ACookie = concatenar(CookieArray);
                var JCookie = new MalltopicNewsCMS.Models.Cookie();
                var StringJson = "";

                if (ACookie.Count == 1)
                {
                    JCookie = new MalltopicNewsCMS.Models.Cookie();
                    JCookie = concatenar(ACookie);
                    StringJson = JsonConvert.SerializeObject(JCookie);
                }
                else
                {
                    StringJson = JsonConvert.SerializeObject(ACookie);
                }
                noticias.imagenes = StringJson;
            }
            
            noticias.id=Convert.ToString(Session["newGuid"]);
            MalltopicNewsCMS.File_Upload.FileUpload obj = new File_Upload.FileUpload();
            var ids = obj.traer();

            noticias.creado = DateTime.Now;
            noticias.usuario_creado = (string)Session["User"];

            var Modelocat = JsonConvert.DeserializeObject<MalltopicNewsCMS.Models.Noticias[]>(cw.Peticion("Noticias"));

            var modelof = new List<MalltopicNewsCMS.Models.Noticias>();

            modelof = Modelocat.Where(mm => mm.fecha_publicado == noticias.fecha_publicado && mm.publicar == true && mm.destacado == true && mm.fk_idcategoria==noticias.fk_idcategoria).ToList<MalltopicNewsCMS.Models.Noticias>();


            if (modelof.Count > 0 && noticias.publicar == true && noticias.destacado == true)
            {
                ViewData["Message"] = "Ya existe una noticia destacada para este dia.";
               
            }
            else {

                await MobileService.GetTable<Noticias>().InsertAsync(noticias);
                if (myCookie != null)
                {
                    var Hoy = DateTime.Today;
                    var ayer = Hoy.AddDays(-1);
                    myCookie.Expires = ayer;
                    Response.Cookies.Add(myCookie);
                }
                obj.traer().Clear();
                return View("index", await ConsumirWebApi.GetObject<Noticias>("Noticias"));
            
            }
            obj.traer().Clear();
            return View();
            
        }

        // GET: /Noticias/Edit/5
        public async Task<ActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Session["EditGuid"] = id;
            return View("Edit", await ConsumirWebApi.GetObject<Noticias>("Noticias/", id));
        }

        // POST: /Noticias/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "id,titulo,descripcion,pie_de_imagen,link,fk_idcategoria,usuario_creado,usuario_modificado,publicar,destacado,fecha_publicado,creado,modificado,autor")] Noticias noticias)
        {

            HttpCookie myCookie = new HttpCookie("Imagen");
            myCookie = Request.Cookies["Imagen"];
            var cont = 0;
            var totalcomas = 0; 
            if (myCookie != null)
            {
                var c = myCookie.Value;
                c = c.Replace('"', '\'');
                c=c.Replace("[{","{'Foto"+cont+"':{");
                for (int i = 0; i < c.Length-3; i++)
                {
                    var b = c.Substring(i, 3);
                    if (b == "},{")
                    {
                        totalcomas++;
                        c = c.Replace("},{", "},'Foto0" +totalcomas+ "':{");
                    }
                }
                c = c.Replace("}]", "}}");
                
                
                var CookieArray = JsonConvert.DeserializeObject<Cookie2>(c);

                var ACookie = concatenar(CookieArray);
                var JCookie = new MalltopicNewsCMS.Models.Cookie();
                var StringJson = "";

                if (ACookie.Count == 1)
                {
                    JCookie = new MalltopicNewsCMS.Models.Cookie();
                    JCookie = concatenar(ACookie);
                    StringJson = JsonConvert.SerializeObject(JCookie);
                }
                else
                {
                    StringJson = JsonConvert.SerializeObject(ACookie);
                }
                noticias.imagenes = StringJson;
            }

            noticias.modificado = DateTime.Now;
            noticias.usuario_modificado = (string)Session["User"];

            var Modelocat = JsonConvert.DeserializeObject<MalltopicNewsCMS.Models.Noticias[]>(cw.Peticion("Noticias"));

            var modelof = new List<Noticias>();

            var modelonoticiadestacada = new List<Noticias>();

            modelof = Modelocat.Where(mm => mm.fecha_publicado == noticias.fecha_publicado && mm.publicar == true && mm.destacado == true && mm.fk_idcategoria == noticias.fk_idcategoria).ToList<MalltopicNewsCMS.Models.Noticias>();

            modelonoticiadestacada = modelof.Where(mm => mm.id == noticias.id).ToList<Noticias>();
          

            
            if (modelonoticiadestacada.Count > 0)
            {
                await MobileService.GetTable<Noticias>().UpdateAsync(noticias);
            }
            else
            {
                if(modelof.Count > 0)
                {
                    if(noticias.destacado == false)
                    {
                        await MobileService.GetTable<Noticias>().UpdateAsync(noticias);
                    }
                    else
                    {
                        if(noticias.publicar == false)
                        {
                            await MobileService.GetTable<Noticias>().UpdateAsync(noticias);
                        }
                        else
                        {
                            ViewData["Message"] = "Ya existe una noticia destacada para este dia.";
                        }
                        
                    }
                }
                else 
                {
                    await MobileService.GetTable<Noticias>().UpdateAsync(noticias);
                }
            }
           
            return View("index", await ConsumirWebApi.GetObject<Noticias>("Noticias"));
            
        }

        // GET: /Noticias/Delete/5
        public async Task<ActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            return View("Delete", await ConsumirWebApi.GetObject<Noticias>("Noticias", id));
        }

        // POST: /Noticias/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(Guid? id)
        {
            Noticias noticias = await ConsumirWebApi.GetObject<Noticias>("Noticias", id);

            await MobileService.GetTable<Noticias>().DeleteAsync(noticias);

            return View("index", await ConsumirWebApi.GetObject<Noticias>("Noticias"));
        }

        public List<MalltopicNewsCMS.Models.Cookie> concatenar(MalltopicNewsCMS.Models.Cookie2 CookieArray)
        {
            var Resultado = new List<MalltopicNewsCMS.Models.Cookie>();
            
            if (CookieArray.Foto0 != null)
            {
                cont++;
            }
             if (CookieArray.Foto01 != null)
            {
                cont++;
            }
             if (CookieArray.Foto02 != null)
            {
                cont++;
            }
             if (CookieArray.Foto03 != null)
            {
                cont++;
            }
             if (CookieArray.Foto04 != null)
            {
                cont++;
            }
             if (CookieArray.Foto05 != null)
            {
                cont++;
            }

            var ACookie = new List<MalltopicNewsCMS.Models.Cookie>();
            if (CookieArray.Foto0 != null)
            {
                ACookie.Add(CookieArray.Foto0);
            }
             if (CookieArray.Foto01 != null)
            {
                ACookie.Add(CookieArray.Foto01);
            }
             if (CookieArray.Foto02 != null)
            {
                ACookie.Add(CookieArray.Foto02);
            }
             if (CookieArray.Foto03 != null)
            {
                ACookie.Add(CookieArray.Foto03);
            }
             if (CookieArray.Foto04 != null)
            {
                ACookie.Add(CookieArray.Foto04);
            }
             if (CookieArray.Foto05 != null)
            {
                ACookie.Add(CookieArray.Foto05);
            }

            return ACookie;
        }

        public MalltopicNewsCMS.Models.Cookie concatenar(List<MalltopicNewsCMS.Models.Cookie> Objeto)
        {
            var Resultado = new MalltopicNewsCMS.Models.Cookie();
            foreach (var item in Objeto)
            {
                Resultado.id = item.id;
                Resultado.pie = item.pie;
            }
            return Resultado;
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
