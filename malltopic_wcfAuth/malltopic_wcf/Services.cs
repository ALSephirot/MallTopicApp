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
    
    public partial class Services
    {
        public Services()
        {
            this.services_detail = new HashSet<services_detail>();
        }
    
        public System.Guid ID { get; set; }
        public string servicio { get; set; }
    
        public ICollection<services_detail> services_detail { get; set; }
    }
}
