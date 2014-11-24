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
    
    public partial class Events
    {
        public Events()
        {
            this.Aprovaciones = new HashSet<Aprovaciones>();
        }
    
        public System.Guid id { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public Nullable<System.Guid> fk_idCC { get; set; }
        public Nullable<System.Guid> fk_idStore { get; set; }
        public string imagen { get; set; }
        public string lugar { get; set; }
        public Nullable<System.DateTime> fechaInicio { get; set; }
        public Nullable<System.DateTime> fechaFinal { get; set; }
        public string organizador { get; set; }
        public Nullable<decimal> telefono { get; set; }
        public string correo { get; set; }
        public string web { get; set; }
        public Nullable<bool> publicar { get; set; }
        public Nullable<System.DateTime> creado { get; set; }
        public Nullable<System.DateTime> modificado { get; set; }
        public Nullable<System.Guid> user_created { get; set; }
        public Nullable<System.Guid> user_modified { get; set; }
        public Nullable<bool> favorito { get; set; }
    
        public virtual ICollection<Aprovaciones> Aprovaciones { get; set; }
        public virtual Malls Malls { get; set; }
        public virtual Stores Stores { get; set; }
    }
}