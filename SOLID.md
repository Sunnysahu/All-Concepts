# 🔥 SOLID Principles — Real-World Problems & Solutions

---

# 1️⃣ SRP — Single Responsibility Principle

> **"One class = One responsibility"**

## ❌ Without SRP

```csharp
class UserService
{
    public void CreateUser() 
    {
        // save to DB
    }

    public void SendEmail() 
    {
        // email logic
    }

    public void Log() 
    {
        // logging logic
    }
}
````

### 💣 Real Problems

* Change email provider → modify same class
* Change logging → modify same class
* Multiple devs editing → merge conflicts

👉 One class = **3 responsibilities → messy**

---

## ✅ With SRP

```csharp id="srp-good"
class UserService
{
    public void CreateUser() { }
}

class EmailService
{
    public void SendEmail() { }
}

class LoggerService
{
    public void Log() { }
}
```

### 🎯 Benefits

* Change email → only `EmailService`
* Change logging → only `LoggerService`
* Easy to test & debug

---

# 2️⃣ OCP — Open/Closed Principle

> **"Open for extension, closed for modification"**

## ❌ Without OCP

```csharp id="ocp-bad"
class PaymentService
{
    public void Pay(string type)
    {
        if (type == "UPI")
        {
            // UPI logic
        }
        else if (type == "Card")
        {
            // Card logic
        }
    }
}
```

### 💣 Problems

* Add Wallet → modify existing code ❌
* Risk of breaking working code ❌
* Becomes **if-else jungle**

---

## ✅ With OCP

```csharp id="ocp-good"
interface IPayment
{
    void Pay();
}

class UpiPayment : IPayment
{
    public void Pay() { }
}

class CardPayment : IPayment
{
    public void Pay() { }
}
```

### 🎯 Benefits

* Add new payment → just create new class
* No change in existing code → safer

---

# 3️⃣ LSP — Liskov Substitution Principle

> **"Child class should not break parent behavior"**

## ❌ Without LSP

```csharp id="lsp-bad"
class Bird
{
    public virtual void Fly() { }
}

class Penguin : Bird
{
    public override void Fly()
    {
        throw new Exception("Can't fly");
    }
}
```

### 💣 Problem

```csharp
Bird bird = new Penguin();
bird.Fly(); // 💥 runtime crash
```

👉 System breaks unexpectedly

---

## ✅ With LSP

```csharp id="lsp-good"
interface IBird { }

interface IFlyingBird
{
    void Fly();
}

class Sparrow : IFlyingBird
{
    public void Fly() { }
}
```

### 🎯 Benefits

* No unexpected runtime failures
* Better domain modeling

---

# 4️⃣ ISP — Interface Segregation Principle

> **"Don't force classes to implement unused methods"**

## ❌ Without ISP

```csharp id="isp-bad"
interface IWorker
{
    void Work();
    void Eat();
}

class Robot : IWorker
{
    public void Work() { }

    public void Eat()
    {
        throw new Exception("Robot doesn't eat");
    }
}
```

### 💣 Problems

* Forced to implement unnecessary methods
* Leads to runtime bugs

---

## ✅ With ISP

```csharp id="isp-good"
interface IWork
{
    void Work();
}

interface IEat
{
    void Eat();
}
```

### 🎯 Benefits

* Clean and focused interfaces
* No unnecessary implementations

---

# 5️⃣ DIP — Dependency Inversion Principle (MOST IMPORTANT)

> **"Depend on abstractions, not concrete classes"**

## ❌ Without DIP

```csharp id="dip-bad"
class OrderService
{
    private EmailService _email = new EmailService();

    public void PlaceOrder()
    {
        _email.SendEmail();
    }
}
```

### 💣 Problems

* Cannot replace `EmailService`
* Hard to test (no mocking)
* Tight coupling

---

## ✅ With DIP (.NET Style)

```csharp id="dip-good"
interface IEmailService
{
    void SendEmail();
}

class EmailService : IEmailService
{
    public void SendEmail() { }
}

class OrderService
{
    private readonly IEmailService _email;

    public OrderService(IEmailService email)
    {
        _email = email;
    }
}
```

### 🎯 Benefits

* Easy to replace implementations
* Supports testing (mocking)
* Loose coupling

---

# 🧠 REAL WORLD IMPACT

## ❌ Without SOLID

* Hard to change
* Hard to test
* Bug-prone
* Not scalable

## ✅ With SOLID

* Modular
* Replaceable
* Testable
* Production-ready

---

# 🔥 Real Project Scenario

👉 Today → `EmailService`
👉 Tomorrow → `WhatsAppService`

## ❌ Without SOLID

* Modify `OrderService` ❌

## ✅ With SOLID

* Just add new class ✅
* No changes to existing code

---

# 🧠 Final Memory Trick

* **SRP** → One job
* **OCP** → Extend, don’t modify
* **LSP** → Don’t break behavior
* **ISP** → Small interfaces
* **DIP** → Use interfaces + DI