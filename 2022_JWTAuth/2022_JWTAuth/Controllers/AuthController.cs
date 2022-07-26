using _2022_JWTAuth.Data;
using _2022_JWTAuth.Dtos;
using _2022_JWTAuth.Helpers;
using _2022_JWTAuth.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace _2022_JWTAuth.Controllers
{

    [Route(template: "api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;
        public AuthController(IUserRepository repository, JwtService jwtservice)
        {
            _repository = repository;
            _jwtService = jwtservice;
        }

        [HttpPost(template:"register")]
        public IActionResult Register(RegisterDto dto)
        {
            User user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            };
            
            return Created(uri:"success", value: _repository.Create(user));
        }
        [HttpPost(template:"login")]
        public IActionResult Login(LoginDto dto)
        {
            User user = _repository.GetByEmail(dto.Email);

            if(user == null)
            {
                return BadRequest(error: "Invalid Credentials");
            }
            if(!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(error: "Invalid Credentials");
            }
            
            var jwt = _jwtService.Generate(user.Id);
            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true
            });
            var message = "success";
            return Ok(new
            {
                message
            });
        }
        [HttpGet(template:"user")]
        public IActionResult UserInfo()
        {
            try
            {

                string jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);

                var user = _repository.GetById(userId);
                return Ok(user);
            }
            catch (Exception e)
            {
                return Unauthorized();
            }
        }
        [HttpPost(template:"logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete(key: "jwt");
            return
                Ok("success");
        }
    }
}
