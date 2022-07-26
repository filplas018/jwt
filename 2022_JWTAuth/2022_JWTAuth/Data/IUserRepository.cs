using _2022_JWTAuth.Model;

namespace _2022_JWTAuth.Data
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByEmail(string email);
        User GetById(int id);
    }
}
