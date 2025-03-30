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
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(DataContext context) : base(context)
        {
        }
        public async Task<User?> GetByEmailAsync(string email)
        {
            //var user = await _dbSet.AnyAsync(u => u.Email == email);

            var user = await _dbSet.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == email);
            //Console.WriteLine(user);
            //var u = new User();
           return user;
        }
    }
}
