using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; } 
        public string Password { get; set; }


        // קשרים

        public Resume Resume { get; set; } 
        public List<Interview> Interviews { get; set; }


        public Role Role { get; set; } 
    }
}
