using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace malltopic_wcf.Contracts
{
    public class StoresCategories
    {
        public System.Guid id { get; set; }
        public Nullable<System.Guid> fk_idCC { get; set; }
        public string nombre { get; set; }
        public string numLocal { get; set; }
        public string telefono { get; set; }
        public string nombreMall { get; set; }
    }
}