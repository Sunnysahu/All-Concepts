# SOLID Principles

**SOLID** = 5 design principles for writing **maintainable** and **scalable** code.

---

## ❌ Without SOLID

- Code becomes messy
- Hard to change
- Bugs increase

## ✅ With SOLID

- Easy to extend
- Easy to test
- Used in real-world projects

---

# 1️⃣ S — Single Responsibility Principle (SRP)

> **"One class = One responsibility"**

### ❌ Bad

```csharp
class UserService
{
    public void CreateUser() { }
    public void SendEmail() { }
}
```

### 🚨 Problem

- User logic + Email logic are mixed

### ✅ Good

```csharp
class UserService
{
    public void CreateUser() { }
}

class EmailServicef
{
    public void SendEmail() { }
}
```

### 💡 Why?

- You can change email logic without affecting user logic

---

# 2️⃣ O — Open/Closed Principle (OCP)

> **"Open for extension, closed for modification"**

### ❌ Bad

```csharp
class Discount
{
    public double GetDiscount(string type)
    {
        if (type == "VIP") return 20;
        else return 5;
    }
}
```

### 🚨 Problem

- Every new type requires modifying existing code

### ✅ Good

```csharp
interface IDiscount
{
    double GetDiscount();
}

class VipDiscount : IDiscount
{
    public double GetDiscount() => 20;
}

class RegularDiscount : IDiscount
{
    public double GetDiscount() => 5;
}
```

### 💡 Benefit

- Add new discount types without changing existing code

---

# 3️⃣ L — Liskov Substitution Principle (LSP)

> **"Child class should replace parent without breaking behavior"**

### ❌ Bad

```csharp
class Bird
{
    public virtual void Fly() { }
}

class Ostrich : Bird
{
    public override void Fly()
    {
        throw new Exception("Can't fly");
    }
}
```

### 🚨 Problem

- `Ostrich` breaks expectations of `Bird`

### ✅ Good

```csharp
interface IFlyingBird
{
    void Fly();
}
```

### 💡 Idea

- Only birds that can fly should implement `IFlyingBird`

---

# 4️⃣ I — Interface Segregation Principle (ISP)

> **"Don’t force classes to implement unused methods"**

### ❌ Bad

```csharp
interface IWorker
{
    void Work();
    void Eat();
}
```

### 🚨 Problem

- A robot doesn't need `Eat()`

### ✅ Good

```csharp
interface IWork
{
    void Work();
}

interface IEat
{
    void Eat();
}
```

### 💡 Benefit

- Classes implement only what they need

---

# 5️⃣ D — Dependency Inversion Principle (DIP)

> **"Depend on abstractions, not concrete classes"**

### ❌ Bad

```csharp
class OrderService
{
    private EmailService _email = new EmailService();
}
```

### 🚨 Problem

- Tight coupling

### ✅ Good (Important in .NET)

```csharp
class OrderService
{
    private readonly IEmailService _email;

    public OrderService(IEmailService email)
    {
        _email = email;
    }
}
```

### 💡 Concept

- This is called **Dependency Injection (DI)**

---

# 🔥 Why SOLID Matters in Real Projects

Used in:

- Services layer
- Controllers
- Repositories
- Middleware

---

## ❌ Without SOLID

- You rewrite code again and again

## ✅ With SOLID

- You extend features easily

---

# 🧠 Interview Summary

- **SRP** → One job per class
- **OCP** → Add new without changing old
- **LSP** → Child behaves like parent
- **ISP** → Small, specific interfaces
- **DIP** → Use abstractions + Dependency Injection
