using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MallTopic_News.Models;

namespace MallTopic_News.Controllers
{
    public class CategoriasController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Categorias
        public IQueryable<Categorias> GetCategorias()
        {
            return db.Categorias;
        }

        // GET: api/Categorias/5
        [ResponseType(typeof(Categorias))]
        public IHttpActionResult GetCategorias(string id)
        {
            Categorias categorias = db.Categorias.Find(id);
            if (categorias == null)
            {
                return NotFound();
            }

            return Ok(categorias);
        }

        // PUT: api/Categorias/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCategorias(string id, Categorias categorias)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != categorias.id)
            {
                return BadRequest();
            }

            db.Entry(categorias).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoriasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Categorias
        [ResponseType(typeof(Categorias))]
        public IHttpActionResult PostCategorias(Categorias categorias)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Categorias.Add(categorias);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CategoriasExists(categorias.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = categorias.id }, categorias);
        }

        // DELETE: api/Categorias/5
        [ResponseType(typeof(Categorias))]
        public IHttpActionResult DeleteCategorias(string id)
        {
            Categorias categorias = db.Categorias.Find(id);
            if (categorias == null)
            {
                return NotFound();
            }

            db.Categorias.Remove(categorias);
            db.SaveChanges();

            return Ok(categorias);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoriasExists(string id)
        {
            return db.Categorias.Count(e => e.id == id) > 0;
        }
    }
}