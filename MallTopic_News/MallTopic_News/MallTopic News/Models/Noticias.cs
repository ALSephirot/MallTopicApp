//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MallTopic_News.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Noticias
    {
        public string id { get; set; }
        public System.DateTimeOffset C__createdAt { get; set; }
        public Nullable<System.DateTimeOffset> C__updatedAt { get; set; }
        public byte[] C__version { get; set; }
        public bool C__deleted { get; set; }
        public string titulo { get; set; }
        public string descripcion { get; set; }
        public string pie_de_imagen { get; set; }
        public string link { get; set; }
        public string fk_idcategoria { get; set; }
        public string usuario_creado { get; set; }
        public string usuario_modificado { get; set; }
        public string imagenes { get; set; }
        public string autor { get; set; }
        public string idportada { get; set; }
        public DateTime creado { get; set; }
        public Nullable<bool> publicar { get; set; }
        public Nullable<bool> destacado { get; set; }
        public Nullable<System.DateTimeOffset> fecha_publicado { get; set; }
    }
}
