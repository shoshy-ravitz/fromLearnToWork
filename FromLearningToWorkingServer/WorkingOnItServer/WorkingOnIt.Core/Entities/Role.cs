using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.Entities
{
    public class Role
    {
        [Key]
        public int Id { get; set; } 
        public string RoleName { get; set; }
        public string Description { get; set; } 
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; }

        public List<Permission> Permissions { get; set; }
        public List<User> Users { get; set; }
    }
}
