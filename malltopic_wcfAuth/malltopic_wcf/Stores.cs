//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class Stores
    {
        public Stores()
        {
            this.Colections = new HashSet<Colections>();
            this.Events = new HashSet<Events>();
            this.Favorites = new HashSet<Favorites>();
            this.Gallery = new HashSet<Gallery>();
            this.Products = new HashSet<Products>();
            this.Promos = new HashSet<Promos>();
            this.StoresXCategories = new HashSet<StoresXCategories>();
        }
    
        public System.Guid id { get; set; }
        public string nombre { get; set; }
        public string telefono { get; set; }
        public string numLocal { get; set; }
        public Nullable<System.Guid> fk_idCC { get; set; }
        public string ubicacion { get; set; }
        public string logo { get; set; }
        public string horario { get; set; }
        public string descripcion { get; set; }
        public Nullable<bool> publicar { get; set; }
        public Nullable<System.DateTime> creado { get; set; }
        public Nullable<System.DateTime> modificado { get; set; }
        public Nullable<System.Guid> user_created { get; set; }
        public Nullable<System.Guid> user_modified { get; set; }
        public string correo { get; set; }
        public string nombreMall { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string website { get; set; }
        public string H_lunes_a_viernes { get; set; }
        public string H_sabado { get; set; }
        public string H_domingos_y_festivos { get; set; }
        public string NombreCategoria { get; set; }
    
        public virtual ICollection<Colections> Colections { get; set; }
        public virtual ICollection<Events> Events { get; set; }
        public virtual ICollection<Favorites> Favorites { get; set; }
        public virtual ICollection<Gallery> Gallery { get; set; }
        public virtual Malls Malls { get; set; }
        public virtual ICollection<Products> Products { get; set; }
        public virtual ICollection<Promos> Promos { get; set; }
        public virtual ICollection<StoresXCategories> StoresXCategories { get; set; }
    }
}
