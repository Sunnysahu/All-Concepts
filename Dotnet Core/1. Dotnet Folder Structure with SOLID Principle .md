
---

# 🏗️ Real .NET Project Structure (SOLID + DI)

Here’s how a **clean, production-style .NET Web API project** looks:

```md id="dotnet-structure"
# 📁 Project Structure (.NET Web API)

MyApp/
│
├── Controllers/
│   └── UserController.cs
│
├── Services/
│   ├── Interfaces/
│   │   └── IUserService.cs
│   └── UserService.cs
│
├── Repositories/
│   ├── Interfaces/
│   │   └── IUserRepository.cs
│   └── UserRepository.cs
│
├── Models/
│   └── User.cs
│
├── DTOs/
│   └── UserDto.cs
│
├── Data/
│   └── AppDbContext.cs
│
├── Middleware/
│   └── ExceptionMiddleware.cs
│
├── Program.cs
└── appsettings.json
```

---

# 🔥 Flow (How Everything Connects)

```
Controller → Service → Repository → Database
```

---

# 🧪 Example Implementation

## 1️⃣ Interface (Service)

```
public interface IUserService
{
    string GetUser();
}
```

---

## 2️⃣ Service Implementation

```
public class UserService : IUserService
{
    private readonly IUserRepository _repo;

    public UserService(IUserRepository repo)
    {
        _repo = repo;
    }

    public string GetUser()
    {
        return _repo.GetUser();
    }
}
```

---

## 3️⃣ Repository Interface

```
public interface IUserRepository
{
    string GetUser();
}
```

---

## 4️⃣ Repository Implementation

```
public class UserRepository : IUserRepository
{
    public string GetUser()
    {
        return "Sunny from DB";
    }
}
```

---

## 5️⃣ Controller

```
[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IUserService _service;

    public UserController(IUserService service)
    {
        _service = service;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_service.GetUser());
    }
}
```

---

## 6️⃣ DI Registration (Program.cs)

```
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

var app = builder.Build();
```

---

# 🔥 Where SOLID is Applied

* **SRP (Single Responsibility Principle)** → Service, Repository, Controller are separated
* **OCP (Open/Closed Principle)** → Add new services without modifying existing code
* **LSP (Liskov Substitution Principle)** → Interfaces ensure correct behavior
* **ISP (Interface Segregation Principle)** → Small, focused interfaces (`IUserService`, `IUserRepository`)
* **DIP (Dependency Inversion Principle)** → Dependencies injected via interfaces

---

# 💡 Pro Architecture Tips

* Keep **Controllers thin** (no business logic)
* Put business logic in **Services**
* Use **Repositories** for DB access
* Always use **interfaces**
* Default to **Scoped lifetime** for services

---