/******************************************************************
* Class Description: malltopicWcf.svc.cs
* Author:  Nicolas Alcaraz Martinez
* Date: 04/07/2013
******************************************************************/

/******************************************************************
* History
* -----------------------------------------------------------------
*Tag    Date        | Author               | Description
*---------------------------------------------------------------------
*       17/06/2014    Luis Eduardo Oquendo.   Creation

* -----------------------------------------------------------------
******************************************************************/
//------------------------------------------------------------------------------
// <copyright file="WebDataService.svc.cs" company="Microsoft">
//     Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Data.Services;
using System.Data.Services.Common;
using System.Data.Services.Providers;
using System.Linq;
using System.ServiceModel.Web;
using System.Web;
using Newtonsoft.Json;

namespace malltopic_wcf
{

    public class malltopicWcf : EntityFrameworkDataService<MallTopicFinalEntities1>
    {
        // This method is called only once to initialize service-wide policies.
        public static void InitializeService(DataServiceConfiguration config)
        {
            config.SetEntitySetAccessRule("*", EntitySetRights.AllRead);
            config.SetServiceOperationAccessRule("*", ServiceOperationRights.All);

            // config.SetServiceOperationAccessRule("MyServiceOperation", ServiceOperationRights.All);
            config.DataServiceBehavior.MaxProtocolVersion = DataServiceProtocolVersion.V3;
            config.UseVerboseErrors = true;
        }

        [WebGet]
        public List<SP_Consulta_Categorias_Result> GetCategories(bool todos, bool especial, string idcate, string idmall)
        {
            MallTopicFinalEntities1 entities = new MallTopicFinalEntities1();
            return entities.SP_Consulta_Categorias(todos, idcate, especial, idmall).ToList();
        }

        [WebGet]
        public List<SP_Tiendas_x_Categorias_Result> GetStoresxCategories(string IdMall, string IdCategory, string PNombre)
        {
            MallTopicFinalEntities1 entities = new MallTopicFinalEntities1();
            return entities.SP_Tiendas_x_Categorias(IdMall, IdCategory, PNombre).ToList();
        }

        [WebGet]
        public List<SP_Promos_Result> GetPromos(string IdPromo, string IdMall)
        {
            MallTopicFinalEntities1 entities = new MallTopicFinalEntities1();
            return entities.SP_Promos(IdPromo, IdMall).ToList();
        }

        [WebGet]
        public List<SP_Eventos_Result> GetEventos(string IdEvento, string IdMall)
        {
            MallTopicFinalEntities1 entities = new MallTopicFinalEntities1();
            return entities.SP_Eventos(IdEvento, IdMall).ToList();
        }

        [WebGet]
        public List<SP_Servicios_Result> GetServicios(string IdMall)
        {
            MallTopicFinalEntities1 entities = new MallTopicFinalEntities1();
            return entities.SP_Servicios(IdMall).ToList();
        }

        [WebGet]
        public List<SP_Colecciones_Result> GetColecciones(string idmall)
        {
            MallTopicFinalEntities1 entities = new MallTopicFinalEntities1();
            return entities.SP_Colecciones(idmall).ToList();
        }

        [WebGet]
        public string getinfoComercio(string idComercio)
        {
            var id = Guid.Parse(idComercio);
            MallTopicFinalEntities1 entities = new MallTopicFinalEntities1();
            var modeloPromos = entities.Promos.Where(mm => mm.fk_idLocal == id).ToList<Promos>();
            var modeloEventos = entities.Events.Where(mm=> mm.fk_idStore == id).ToList<Events>();
            var modeloProductos = entities.Products.Where(mm=>mm.fk_idLocal == id).ToList<Products>();
            var modeloColecciones= entities.Colections.Where(mm=> mm.fk_IdStore==id).ToList<Colections>();
            var modeloStores = entities.Stores.Where(mm=> mm.id==id).ToList<Stores>();
            var modeloCategorias = entities.StoresXCategories.Where(mm=>mm.fk_idstore == id).ToList<StoresXCategories>();

            modeloStores[0].Events = modeloEventos;
            modeloStores[0].Colections = modeloColecciones;
            modeloStores[0].Products = modeloProductos;
            modeloStores[0].Promos = modeloPromos;
            modeloStores[0].StoresXCategories = modeloCategorias;

            var JsonString = JsonConvert.SerializeObject(modeloStores[0], Formatting.None,
                        new JsonSerializerSettings()
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                        });

            return JsonString;
        }     
    }
}
