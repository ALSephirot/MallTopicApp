using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MalltopicNewsCMS.Models;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.MobileServices;

namespace MalltopicNewsCMS.Controllers
{
    public class CategoriasController : Controller
    {
        private MalltopicNewsCMSContext db = new MalltopicNewsCMSContext();
        public static MobileServiceClient MobileService = new MobileServiceClient("https://malltopicnews.azure-mobile.net/","CFlSZfUFMyGBgbxXNczFkgbnmXYGTS53");

        // GET: /Categorias/
        public async Task<ActionResult> Index()
        {
            return View("Index", await ConsumirWebApi.GetObject<Categorias>("Categorias"));
        }
        // GET: /Categories/Details/5
        public async Task<ActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            return View("Details", await ConsumirWebApi.GetObject<Categorias>("Categorias", id));
        }

        // GET: /Categorias/Create
        // GET: /Categories/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /Categorias/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "id,nombre,estilo,creado,modificado,usuario_creado,usuario_modificado")] Categorias categorias)
        {
            var idn = Guid.NewGuid();
            categorias.id = idn.ToString();
            categorias.creado = DateTime.Now;
            categorias.usuario_creado = (string)Session["User"];

            await MobileService.GetTable<Categorias>().InsertAsync(categorias);

            return View("index", await ConsumirWebApi.GetObject<Categorias>("Categorias"));
        }

        // GET: /Categorias/Edit/5
        public async Task<ActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            return View("Edit", await ConsumirWebApi.GetObject<Categorias>("Categorias", id));
        }

        // POST: /Categorias/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "id,nombre,estilo,creado,modificado,usuario_creado,usuario_modificado")] Categorias categorias)
        {
            categorias.modificado = DateTime.Now;
            categorias.usuario_modificado = (string)Session["User"];

            await MobileService.GetTable<Categorias>().UpdateAsync(categorias);
            return View("index", await ConsumirWebApi.GetObject<Categorias>("Categorias"));
        }

        // GET: /Categorias/Delete/5
        public async Task<ActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            return View("Delete", await ConsumirWebApi.GetObject<Categorias>("Categorias", id));
        }

        // POST: /Categorias/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(Guid? id)
        {

            Categorias categorias = await ConsumirWebApi.GetObject<Categorias>("Categorias", id);

            await MobileService.GetTable<Categorias>().DeleteAsync(categorias);

            return View("index", await ConsumirWebApi.GetObject<Categorias>("Categorias"));
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
