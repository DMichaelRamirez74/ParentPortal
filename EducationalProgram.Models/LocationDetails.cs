using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationalProgram.Models
{
   public class LocationDetails
    {
        public string Country { get; set; }
        public State StateDetails {get;set;}
        

    }

    public class State
    {
        public string StateName { get; set; }
        public List<County> Counties { get; set; }
    }
    
    
    public class County
    {
        public string CountyName { get; set; }
        public List<City> Cities { get; set; }

    } 


    public class City
    {
        public string CityName { get; set; }
        public List<string> ZipCodes { get; set; }
    }
   

  
}
