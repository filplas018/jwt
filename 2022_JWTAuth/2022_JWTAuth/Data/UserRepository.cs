using _2022_JWTAuth.Model;
using System.Linq;

namespace _2022_JWTAuth.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context)
        {
            _context = context;
        }
        public User Create(User user)
        {
            var newUser = user;
            _context.Users.Add(newUser);
            _context.SaveChanges();
            return user;
        }
        public User GetByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }
        public User GetById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }
    }
}
