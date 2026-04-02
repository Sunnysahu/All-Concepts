# 🚀 Entity Framework Core (EF Core)

## 🧠 What is EF Core?

👉 ORM (Object Relational Mapper)

👉 Converts:

```text
C# Objects ⇄ Database Tables
```

---

## ❌ Without EF

```csharp
// Raw SQL everywhere ❌
SELECT * FROM Users WHERE Id = 1
```

## ✅ With EF

```csharp
_context.Users.Find(1);
```

👉 Cleaner + safer + faster development

---

# ⚙️ Step 1: Install Packages

```bash
dotnet add package Microsoft.EntityFrameworkCore
```

```
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

```
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

OR

```
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
```
---

# 📂 Step 2: Create Model

```csharp
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

---

# 📂 Step 3: Create DbContext

```csharp
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; }
}
```

---
# 🔐 Step 4: Add Connection String (IMPORTANT 🔥)

👉 Add this in appsettings.json

```
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=MyAppDb;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

💡 Notes

Server= → Local SQL Server

Database=MyAppDb → Your DB name

Use your actual SQL Server credentials if needed

---

# ⚙️ Step 5: Configure in Program.cs

```csharp
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer("Your_Connection_String"));
```

---

# 🔥 Step 6: Migration (Create DB)

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

👉 This creates DB + tables automatically

---

# 🚀 CRUD Operations (Core Part)

---

# ➕ Create

```csharp
public async Task<User> CreateUser(User user)
{
    _context.Users.Add(user);
    await _context.SaveChangesAsync();
    return user;
}
```

---

# 📖 Read

## Get All

```csharp
public async Task<List<User>> GetAll()
{
    return await _context.Users.ToListAsync();
}
```

## Get By Id

```csharp
public async Task<User?> GetById(int id)
{
    return await _context.Users.FindAsync(id);
}
```

---

# ✏️ Update

```csharp
public async Task UpdateUser(User user)
{
    _context.Users.Update(user);
    await _context.SaveChangesAsync();
}
```

---

# ❌ Delete

```csharp
public async Task DeleteUser(int id)
{
    var user = await _context.Users.FindAsync(id);
    if (user != null)
    {
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }
}
```

---

# 🔥 Full Flow (Important)

```text
Controller → Service → Repository → EF Core → SQL Server
```

---

# 🧪 Real Example (Service + Repository)

---

## Repository

```csharp
public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<User>> GetAll()
    {
        return await _context.Users.ToListAsync();
    }
}
```

---

## Service

```csharp
public class UserService : IUserService
{
    private readonly IUserRepository _repo;

    public UserService(IUserRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<User>> GetUsers()
    {
        return await _repo.GetAll();
    }
}
```

---

# ⚠️ Common Mistakes (VERY IMPORTANT)

---

## ❌ Not using async

```csharp
_context.Users.ToList(); // blocks thread ❌
```

## ✅ Use async

```csharp
await _context.Users.ToListAsync();
```

---

## ❌ Returning Entity directly

```csharp
return user; // exposes all fields ❌
```

## ✅ Use DTO

```csharp
return new UserDto { Name = user.Name };
```

---

## ❌ Forgetting SaveChanges

```csharp
_context.Users.Add(user); // not saved ❌
```

---

# 🔥 Performance Tips (2+ Year Dev)

---

## 1. No Tracking (Read Only)

```csharp
_context.Users.AsNoTracking().ToListAsync();
```

👉 Faster for read APIs

---

## 2. Select Only Needed Fields

```csharp
_context.Users.Select(u => new { u.Name });
```

👉 Avoid loading full object

---

## 3. Use Indexes (DB level)

---

## 4. Avoid N+1 Problem

👉 Use `.Include()`

```csharp
_context.Users.Include(u => u.Posts);
```

---

# 🧠 Interview Questions

👉 What is DbContext?
👉 Difference between Add vs Attach vs Update?
👉 What is migration?
👉 What is tracking vs no-tracking?
👉 Async vs sync in EF?

---

# 🧠 Summary

* EF Core = ORM
* DbContext = DB connection
* DbSet = Table
* Migration = Create/update DB
* CRUD = Add, Find, Update, Remove
* Use async + DTO + NoTracking

---
