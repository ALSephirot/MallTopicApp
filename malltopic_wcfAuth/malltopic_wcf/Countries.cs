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
    
    public partial class Countries
    {
        public Countries()
        {
            this.Cities = new HashSet<Cities>();
        }
    
        public System.Guid id { get; set; }
        public string nombre { get; set; }
        public Nullable<System.DateTime> creado { get; set; }
        public Nullable<System.DateTime> modificado { get; set; }
        public Nullable<System.Guid> user_created { get; set; }
        public Nullable<System.Guid> user_modified { get; set; }
        public string text { get; set; }
        public Nullable<bool> complete { get; set; }
    
        public ICollection<Cities> Cities { get; set; }
    }
}
