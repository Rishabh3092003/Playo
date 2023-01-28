using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using ASPNETCoreApplication.Models;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Linq;

namespace ASPNETCoreApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        public readonly IConfiguration configuration;
        public LocationController(IConfiguration _configuration)
        {
            configuration = _configuration;
        }
        [HttpGet]
        [Route("GetCities")]
        public string GetCity(string key) 
        {
            SqlConnection sqlConnection = new SqlConnection(configuration.GetConnectionString("PlayoOnline").ToString());
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter($"SELECT * FROM M_CITY WHERE CITY LIKE '{key}%' ", sqlConnection);
            DataTable table = new DataTable();
            sqlDataAdapter.Fill(table);
            List<Cities> cities = new List<Cities>();
            Response httpResponse = new Response();
            if (table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    Cities city = new Cities();
                    city.TblRefID = Convert.ToInt32(table.Rows[i]["TblRefID"]);
                    city.City = table.Rows[i]["City"].ToString();
                    city.State = table.Rows[i]["State"].ToString();
                    cities.Add(city);
                }
            }
            if(cities.Count > 0)
            {
               return JsonConvert.SerializeObject(cities).ToString();
            }
            else
            {
                httpResponse.StatusCode = 100;
                httpResponse.ErrorMsg = "Data not Found";
                return JsonConvert.SerializeObject(httpResponse);
            }
        }
    }
}
