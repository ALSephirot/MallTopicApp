using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace MallTopic_News.Controllers
{
    public class Existente
    {
        public static bool RemoteFileExists(string url, int timeout)
        {
            try
            {
                HttpWebRequest request = WebRequest.Create(url) as HttpWebRequest;

                // El timeout es en milisegundos
                request.Timeout = timeout;
                // ************

                //Configurando el Request method HEAD, puede ser GET tambien.
                request.Method = "HEAD";
                //Obteniendo la respuesta
                HttpWebResponse response = request.GetResponse() as HttpWebResponse;
                //Regresa TRUE si el codigo de esdado es == 200
                return (response.StatusCode == HttpStatusCode.OK);
            }
            catch
            {
                //Si ocurre una excepcion devuelve false
                return false;
            }
        }
    }
}