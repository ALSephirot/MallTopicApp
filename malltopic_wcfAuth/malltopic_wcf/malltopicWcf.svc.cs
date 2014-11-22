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

namespace malltopic_wcf
{

    public class malltopicWcf : EntityFrameworkDataService<MallTopicFinalEntities>
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
        public List<Categories> GetCategories(bool todos, bool especial, string idcate, string idmall)
        {
            MallTopicFinalEntities entities = new MallTopicFinalEntities();
            return entities.GetCategories(todos, idcate, especial, idmall).ToList();
        }

        [WebGet]
        public List<GetStoresxCategories> GetStoresxCategories(string IdMall, string IdCategory, string PNombre)
        {
            MallTopicFinalEntities entities = new MallTopicFinalEntities();
            return entities.GetStoresxCategories(IdMall, IdCategory, PNombre).ToList();
        }

        [WebGet]
        public List<SP_Promos_Result> GetPromos(string IdPromo, string IdMall)
        {
            MallTopicFinalEntities entities = new MallTopicFinalEntities();
            return entities.SP_Promos(IdPromo, IdMall).ToList();
        }
    }
}
