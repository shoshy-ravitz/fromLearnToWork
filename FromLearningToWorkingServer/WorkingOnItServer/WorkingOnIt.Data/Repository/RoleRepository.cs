using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.InterfaceRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Data.Repository
{
    public class RoleRepository:Repository<Role>,IRoleRepository
    {
        public RoleRepository(DataContext context) : base(context)
        {
        }
        public async Task<Role?> GetByNameAsync(string roleName)
        {
            return await _dbSet
                .Where(r => r.RoleName.ToLower() == roleName.ToLower()) // המרה לאותיות קטנות
                .FirstOrDefaultAsync();
        }
    }
}
