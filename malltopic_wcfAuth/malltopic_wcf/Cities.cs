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
    
    public partial class Cities
    {
        public Cities()
        {
            this.Malls = new HashSet<Malls>();
        }
    
        public System.Guid id { get; set; }
        public string nombre { get; set; }
        public Nullable<System.Guid> fk_idPais { get; set; }
        public Nullable<System.DateTime> creado { get; set; }
        public Nullable<System.DateTime> modificado { get; set; }
        public Nullable<System.Guid> user_created { get; set; }
        public Nullable<System.Guid> user_modified { get; set; }
        public Nullable<int> Indicativo { get; set; }
    
        public virtual Countries Countries { get; set; }
        public virtual ICollection<Malls> Malls { get; set; }
    }
}
