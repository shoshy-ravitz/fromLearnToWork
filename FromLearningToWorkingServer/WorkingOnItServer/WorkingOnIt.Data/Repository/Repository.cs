using FromLearningToWorking.Core.InterfaceRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Data.Repository
{
    public class Repository<T>(DataContext context): IRepository<T> where T : class
    {
        private readonly DbSet<T> _dbSet= context.Set<T>();

        public T Add(T entity)
        {
            _dbSet.Add(entity);
            return entity;
        }

        public bool Delete(int id)
        {
            if (_dbSet.Find(id) != null)
            {
                _dbSet.Remove(_dbSet.Find(id));
                return true;
            }
            return false;
        }
        public IEnumerable<T> GetAll()
        {
            return _dbSet.ToList();
        }
        public T? GetById(int id)
        {
            return _dbSet.Find(id);
        }
        public T Update(int id, T entity)
        {
            T myentity = _dbSet.Find(id);
            if (myentity != null)
            {
                Type entityType = typeof(T);
                PropertyInfo[] propertyInfos = entityType.GetProperties();
                foreach (PropertyInfo propertyInfo in propertyInfos)
                {
                    // לא מעדכנים את המאפיינים Id ו-Password
                    if (propertyInfo.Name != "Id" && propertyInfo.Name != "Password")
                    {
                        object value = propertyInfo.GetValue(entity);
                        if (value != null)
                        {
                            propertyInfo.SetValue(myentity, value);
                        }
                    }
                }

                // שמירה של השינויים במסד הנתונים
                _dbSet.Update(myentity);
               // _context.SaveChanges(); // הנחה שיש לך גישה ל-DbContext
            }
            return myentity; // החזרת הישות המעודכנת
        }

        //var existingEntity = _dbSet.Find(id);
        //if (existingEntity != null)
        //{
        //    _dbSet.Entry(existingEntity).CurrentValues.SetValues(entity);       
        //}
        //return existingEntity;
    }
}

