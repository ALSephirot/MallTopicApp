/*-----------------------------------------------------------------
 Function       : Clase de metodos que consumen servicios REST
                  con Entity Framework
 Lenguage       : .NET C# 
 Autor          : Luis Eduardo Oquendo Perez
 Factory        : La Chica Mall Colombia S.A.S
 Create Date    : 04/04/2014
 Modify Date    : 07/04/2014
 Proyect        : MallTopic CMS MVC4
 REST Service   : Web Api MVC4
 -----------------------------------------------------------------*/



using System;
using System.IO;
using Newtonsoft.Json;
using System.Runtime.Serialization.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Data;
using System.Web;
using System.Web.WebPages;
using MalltopicNewsCMS.General;
using MalltopicNewsCMS.Models;
using System.Net;
using System.Text;

namespace MalltopicNewsCMS.Controllers
{
    public class ConsumirWebApi
    {

        #region MetodosConsumirWebApiTaskAsync

        public static async Task<T> GetObject<T>(string Controller, Guid? id)
        {
            // TO-DO: Check your API url.
            var grl = new GlobalVar();
            var url = string.Format("{0}/{1}", Controller, id.ToString());

            using (var client = new HttpClient())
            {
                Uri uri = new Uri(grl.WebApi);
                client.BaseAddress = uri;
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var result = await client.GetStringAsync(url);
                return JsonConvert.DeserializeObject<T>(result);
            }
        }

        public static async Task<List<T>> GetObject<T>(string Controller)
        {
            try
            {
                // TO-DO: Check your API url.
                var grl = new GlobalVar();
                var url = string.Format("{0}", Controller);

                using (var client = new HttpClient())
                {
                    Uri uri = new Uri(grl.WebApi);
                    client.BaseAddress = uri;
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    var result = await client.GetStringAsync(url);
                    return JsonConvert.DeserializeObject<List<T>>(result);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public static void PostPutData<T>(string Controller, T Model)
        {
            try
            {
                var result = string.Empty;
                var grl = new GlobalVar();


                using (var http = new HttpClient())
                using (var ms = new MemoryStream())
                {
                    Uri uri = new Uri(grl.WebApi + Controller);
                    var djs = new DataContractJsonSerializer(typeof(T));
                    djs.WriteObject(ms, Model);
                    ms.Position = 0;
                    var sc = new StreamContent(ms);
                    sc.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");


                    var response = http.PostAsync(uri, sc).Result;

                    response.EnsureSuccessStatusCode();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public static void PostPutData<T>(string Controller, T Model, string Id)
        {
            try
            {
                var result = string.Empty;
                var grl = new GlobalVar();


                using (var http = new HttpClient())
                using (var ms = new MemoryStream())
                {
                    Uri uri = new Uri(grl.WebApi + Controller + "/" + Id);
                    var djs = new DataContractJsonSerializer(typeof(T));
                    djs.WriteObject(ms, Model);
                    ms.Position = 0;
                    var sc = new StreamContent(ms);
                    sc.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");


                    var response = http.PutAsync(uri, sc).Result;

                    response.EnsureSuccessStatusCode();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public static void DeleteData(string Controller, Guid? Id)
        {
            try
            {
                var result = string.Empty;
                var grl = new GlobalVar();


                using (var http = new HttpClient())
                {
                    Uri uri = new Uri(grl.WebApi + Controller + "/" + Id);
                    var response = http.DeleteAsync(uri).Result;
                    response.EnsureSuccessStatusCode();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        public string Peticion(string clase)
        {
            var grl = new GlobalVar();
            var url = string.Format(@"{0}{1}", grl.WebApi, clase);
            WebRequest req = WebRequest.Create(url);

            req.Method = "GET";

            HttpWebResponse resp = req.GetResponse() as HttpWebResponse;
            if (resp.StatusCode == HttpStatusCode.OK)
            {
                using (Stream respStream = resp.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(respStream, Encoding.UTF8);
                    return reader.ReadToEnd();
                }
            }
            else
            {
                return string.Format("Status Code: {0}, Status Description: {1}", resp.StatusCode, resp.StatusDescription);
            }
        }

    }
}