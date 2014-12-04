﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace malltopic_wcf
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class MallTopicFinalEntities1 : DbContext
    {
        public MallTopicFinalEntities1()
            : base("name=MallTopicFinalEntities1")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Aprovaciones> Aprovaciones { get; set; }
        public virtual DbSet<Categories> Categories { get; set; }
        public virtual DbSet<Cinema> Cinema { get; set; }
        public virtual DbSet<Cities> Cities { get; set; }
        public virtual DbSet<Colections> Colections { get; set; }
        public virtual DbSet<Colections_detail> Colections_detail { get; set; }
        public virtual DbSet<Countries> Countries { get; set; }
        public virtual DbSet<Events> Events { get; set; }
        public virtual DbSet<Favorites> Favorites { get; set; }
        public virtual DbSet<Gallery> Gallery { get; set; }
        public virtual DbSet<Gallery_detail> Gallery_detail { get; set; }
        public virtual DbSet<Malls> Malls { get; set; }
        public virtual DbSet<Movies> Movies { get; set; }
        public virtual DbSet<PilasPs> PilasPs { get; set; }
        public virtual DbSet<Products> Products { get; set; }
        public virtual DbSet<Promos> Promos { get; set; }
        public virtual DbSet<Room_movie> Room_movie { get; set; }
        public virtual DbSet<Schedule_movie> Schedule_movie { get; set; }
        public virtual DbSet<Services> Services { get; set; }
        public virtual DbSet<services_detail> services_detail { get; set; }
        public virtual DbSet<Stores> Stores { get; set; }
        public virtual DbSet<StoresXCategories> StoresXCategories { get; set; }
        public virtual DbSet<transport> transport { get; set; }
    
        public virtual ObjectResult<SP_Colecciones_Result> SP_Colecciones(string idmall)
        {
            var idmallParameter = idmall != null ?
                new ObjectParameter("idmall", idmall) :
                new ObjectParameter("idmall", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<SP_Colecciones_Result>("SP_Colecciones", idmallParameter);
        }
    
        public virtual ObjectResult<SP_Consulta_Categorias_Result> SP_Consulta_Categorias(Nullable<bool> todas, string idCategoria, Nullable<bool> especiales, string idMall)
        {
            var todasParameter = todas.HasValue ?
                new ObjectParameter("Todas", todas) :
                new ObjectParameter("Todas", typeof(bool));
    
            var idCategoriaParameter = idCategoria != null ?
                new ObjectParameter("IdCategoria", idCategoria) :
                new ObjectParameter("IdCategoria", typeof(string));
    
            var especialesParameter = especiales.HasValue ?
                new ObjectParameter("Especiales", especiales) :
                new ObjectParameter("Especiales", typeof(bool));
    
            var idMallParameter = idMall != null ?
                new ObjectParameter("IdMall", idMall) :
                new ObjectParameter("IdMall", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<SP_Consulta_Categorias_Result>("SP_Consulta_Categorias", todasParameter, idCategoriaParameter, especialesParameter, idMallParameter);
        }
    
        public virtual int SP_Delete_Stores(string idCC, Nullable<bool> filtrofecha, Nullable<System.DateTime> fecha)
        {
            var idCCParameter = idCC != null ?
                new ObjectParameter("IdCC", idCC) :
                new ObjectParameter("IdCC", typeof(string));
    
            var filtrofechaParameter = filtrofecha.HasValue ?
                new ObjectParameter("filtrofecha", filtrofecha) :
                new ObjectParameter("filtrofecha", typeof(bool));
    
            var fechaParameter = fecha.HasValue ?
                new ObjectParameter("fecha", fecha) :
                new ObjectParameter("fecha", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("SP_Delete_Stores", idCCParameter, filtrofechaParameter, fechaParameter);
        }
    
        public virtual ObjectResult<SP_Eventos_Result> SP_Eventos(string idEvento, string idMall)
        {
            var idEventoParameter = idEvento != null ?
                new ObjectParameter("IdEvento", idEvento) :
                new ObjectParameter("IdEvento", typeof(string));
    
            var idMallParameter = idMall != null ?
                new ObjectParameter("IdMall", idMall) :
                new ObjectParameter("IdMall", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<SP_Eventos_Result>("SP_Eventos", idEventoParameter, idMallParameter);
        }
    
        public virtual int SP_Guardar_MoviesMalls(Nullable<System.Guid> fk_idCC, Nullable<System.Guid> fk_idMovie)
        {
            var fk_idCCParameter = fk_idCC.HasValue ?
                new ObjectParameter("fk_idCC", fk_idCC) :
                new ObjectParameter("fk_idCC", typeof(System.Guid));
    
            var fk_idMovieParameter = fk_idMovie.HasValue ?
                new ObjectParameter("fk_idMovie", fk_idMovie) :
                new ObjectParameter("fk_idMovie", typeof(System.Guid));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("SP_Guardar_MoviesMalls", fk_idCCParameter, fk_idMovieParameter);
        }
    
        public virtual ObjectResult<SP_Promos_Result> SP_Promos(string idPromo, string idMall)
        {
            var idPromoParameter = idPromo != null ?
                new ObjectParameter("IdPromo", idPromo) :
                new ObjectParameter("IdPromo", typeof(string));
    
            var idMallParameter = idMall != null ?
                new ObjectParameter("IdMall", idMall) :
                new ObjectParameter("IdMall", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<SP_Promos_Result>("SP_Promos", idPromoParameter, idMallParameter);
        }
    
        public virtual ObjectResult<SP_Servicios_Result> SP_Servicios(string fk_idcc)
        {
            var fk_idccParameter = fk_idcc != null ?
                new ObjectParameter("fk_idcc", fk_idcc) :
                new ObjectParameter("fk_idcc", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<SP_Servicios_Result>("SP_Servicios", fk_idccParameter);
        }
    
        public virtual ObjectResult<SP_Tiendas_x_Categorias_Result> SP_Tiendas_x_Categorias(string idCC, string idCategoria, string pNombre)
        {
            var idCCParameter = idCC != null ?
                new ObjectParameter("IdCC", idCC) :
                new ObjectParameter("IdCC", typeof(string));
    
            var idCategoriaParameter = idCategoria != null ?
                new ObjectParameter("IdCategoria", idCategoria) :
                new ObjectParameter("IdCategoria", typeof(string));
    
            var pNombreParameter = pNombre != null ?
                new ObjectParameter("PNombre", pNombre) :
                new ObjectParameter("PNombre", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<SP_Tiendas_x_Categorias_Result>("SP_Tiendas_x_Categorias", idCCParameter, idCategoriaParameter, pNombreParameter);
        }
    }
}
