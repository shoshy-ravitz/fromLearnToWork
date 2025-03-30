using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.InterfaceRepository;
using FromLearningToWorking.Data.Repository;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Data
{
    public  class DatabaseInitializer
    {
        private readonly IRepositoryManager repositoryManager;

        public DatabaseInitializer(IRepositoryManager irepositoryManager)
        {
            repositoryManager = irepositoryManager;
        }

        public  async Task SeedData()
        {
            var roles = await repositoryManager._roleRepository.GetAllAsync();
            if (roles == null || !roles.Any())
            {
                // Create Admin role
                var adminRole = new Role
                {
                    Id = 1,
                    RoleName = "Admin",
                    Description = "Full access to the system.",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    Permissions = new List<Permission>() // Initialize Permissions list
                };

                // Create User role
                var userRole = new Role
                {
                    Id=2,
                    RoleName = "User",
                    Description = "Limited access.",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    Permissions = new List<Permission>() // Initialize Permissions list
                };

                // Create permissions
                var createPermission = new Permission
                {
                    PermissionName = "Files.Create",
                    Description = "Permission to create files."
                };

                var deletePermission = new Permission
                {
                    PermissionName = "Users.Delete",
                    Description = "Permission to delete users."
                };

                var editPermission = new Permission
                {
                    PermissionName = "Content.Edit",
                    Description = "Permission to edit content."
                };

                // Add permissions to the roles
                adminRole.Permissions.Add(createPermission);
                adminRole.Permissions.Add(deletePermission);
                adminRole.Permissions.Add(editPermission);

                userRole.Permissions.Add(createPermission);
                userRole.Permissions.Add(editPermission);

                // Add roles and permissions to the system
                await repositoryManager._roleRepository.AddAsync(adminRole);
               var v= await repositoryManager._roleRepository.AddAsync(userRole);
                Console.WriteLine(v.CreatedAt+"========================");
                await repositoryManager.SaveAsync();
                //Console.WriteLine("============================");
                //Console.WriteLine(repositoryManager._roleRepository.GetAllAsync());

                //Console.WriteLine(c.First());
                //return;
            }
        }
    }
}