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
    
    public partial class transport
    {
        public transport()
        {
            this.Malls = new HashSet<Malls>();
        }
    
        public System.Guid ID { get; set; }
        public string transporte { get; set; }
    
        public virtual ICollection<Malls> Malls { get; set; }
    }
}
