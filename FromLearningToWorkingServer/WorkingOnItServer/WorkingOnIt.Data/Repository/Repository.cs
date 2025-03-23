using FromLearningToWorking.Core.InterfaceRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace FromLearningToWorking.Data.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DbSet<T> _dbSet;

        public Repository(DataContext context)
        {
            _dbSet = context.Set<T>();
        }

        public async Task<T> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            return entity;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T> UpdateAsync(int id, T entity)
        {
            var myEntity = await _dbSet.FindAsync(id);
            if (myEntity != null)
            {
                Type entityType = typeof(T);
                PropertyInfo[] propertyInfos = entityType.GetProperties();
                foreach (PropertyInfo propertyInfo in propertyInfos)
                {
                    // Do not update Id and Password properties
                    if (propertyInfo.Name != "Id" && propertyInfo.Name != "Password")
                    {
                        object value = propertyInfo.GetValue(entity);
                        if (value != null)
                        {
                            propertyInfo.SetValue(myEntity, value);
                        }
                    }
                }

                _dbSet.Update(myEntity);
            }
            return myEntity; // Return the updated entity
        }
    }
}
