//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MalltopicNewsCMS.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    
    public partial class usuarios
    {
        public string id { get; set; }
        public System.DateTimeOffset C__createdAt { get; set; }
        public Nullable<System.DateTimeOffset> C__updatedAt { get; set; }
        public byte[] C__version { get; set; }
        public bool C__deleted { get; set; }

        [Required(ErrorMessage = "Debe ingresar un nombre de usuario")]
        [Display(Name = "Nombre de usuario")]
        public string nombreusuario { get; set; }

        [Required(ErrorMessage = "Debe ingresar una contrase�a")]
        [Display(Name = "Contrase�a")]
        [DataType(DataType.Password)]
        public string contrasena { get; set; }
        public string rol { get; set; }
        public string usuario_creado { get; set; }
        public string usuario_modificado { get; set; }
        public string email { get; set; }
    }
}