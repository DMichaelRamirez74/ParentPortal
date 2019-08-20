using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationalProgram.Models
{
    public class CaptchaResponse
    {
        [JsonProperty("success")]
        public bool Success { get; set; }

        [JsonProperty("challenge_ts")]
        public bool challenge_ts { get; set; }

        [JsonProperty("hostname")]
        public bool hostname { get; set; }

        [JsonProperty("error-codes")]
        public string[] ErrorMessage { get; set; }
    }
}
