````md
# 🧠 Dependency Injection (DI) in .NET

---

## 👉 Simple Meaning

> Instead of creating objects manually,  
> **.NET creates and provides them for you**

---

## ❌ Without DI (Bad)

```
class OrderService
{
    private EmailService _email = new EmailService();
}
````

### 🚨 Problems

* Tight coupling ❌
* Hard to test ❌
* Cannot replace `EmailService` ❌

---

## ✅ With DI (Good)

```
class OrderService
{
    private readonly IEmailService _email;

    public OrderService(IEmailService email)
    {
        _email = email;
    }
}
```

### 💡 Benefit

* .NET injects dependencies automatically
* Loose coupling ✅
* Easy to test and replace

---

## ⚙️ Where DI is Configured?

> In **Program.cs** (Builder Pattern 🔥)

```
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IEmailService, EmailService>();

var app = builder.Build();
```

### 💡 Meaning

* When someone asks for `IEmailService`
* .NET provides `EmailService`

---

# 🔥 Types of DI Lifetimes (VERY IMPORTANT)

## 1️⃣ Transient

> New object every time
```
builder.Services.AddTransient<IService, Service>();
```

### Example

```
public class MyService
{
    public Guid Id = Guid.NewGuid();
}
```

### 💡 Behavior

* Every injection → new `Id`

---

## 2️⃣ Scoped (Most Used ✅)

> One object per request

```
builder.Services.AddScoped<IService, Service>();
```

### 💡 Behavior

* Same request → same object
* New request → new object

---

## 3️⃣ Singleton

> One object for entire application

```
builder.Services.AddSingleton<IService, Service>();
```

### 💡 Behavior

* Created once → reused forever

---

# 🧠 Real-Life Analogy

* **Transient** → New pen every time ✏️
* **Scoped** → One pen per exam 📝
* **Singleton** → One pen for whole life 😂

---

# ⚠️ Important Interview Question

## 👉 Can Singleton depend on Scoped?

> ❌ **NO — causes runtime issues**

### 💡 Why?

* Singleton lives forever
* Scoped lives per request

---

# 🔥 How DI Works Internally (Simple Flow)

1. Register services
2. .NET builds a DI container
3. When a controller/service is requested:

   * Checks constructor
   * Creates required dependencies
   * Injects automatically

---

# 🧪 Real Example (Controller + Service)

## 1️⃣ Interface

```
public interface IUserService
{
    string GetUser();
}
```

---

## 2️⃣ Implementation

```
public class UserService : IUserService
{
    public string GetUser()
    {
        return "Sunny";
    }
}
```

---

## 3️⃣ Register Service

```
builder.Services.AddScoped<IUserService, UserService>();
```

---

## 4️⃣ Use in Controller

```
[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_userService.GetUser());
    }
}
```

---

# 🔥 Advanced (Real Project Usage)

You will use DI in:

* Services
* Repositories
* Middleware
* Logging
* Caching

---

# 💡 Pro Tips (2+ Year Dev Level)

* Always use **interface + implementation**
* Keep services **Scoped by default**
* Use **Singleton** for:

  * Logging
  * Configuration
  * Caching

### ❌ Avoid

```
new Service()
```

---

# 🧠 Interview Summary

* **DI** = Loose coupling
* Configured in `Program.cs`

## Lifetimes:

* **Transient** → Always new
* **Scoped** → Per request ✅
* **Singleton** → One instance
