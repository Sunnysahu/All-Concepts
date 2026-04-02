# 🚀 Global Exception Handling + Logging

## 🧠 Problem (Real Life)

### ❌ Without Global Handling

```csharp
[HttpGet]
public IActionResult Get()
{
    try
    {
        // logic
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message);
    }
}
```

## 💣 Problems:

* Repeated `try-catch` everywhere ❌
* Hard to maintain ❌
* Inconsistent error responses ❌
* Logging missing ❌

---

# ✅ Solution → Global Exception Middleware

👉 Handle all errors **in one place**

---

# 🧱 Step 1: Create Middleware

```csharp
public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled Exception Occurred");

            context.Response.StatusCode = 500;
            context.Response.ContentType = "application/json";

            var response = new
            {
                message = "Something went wrong",
                detail = ex.Message // ⚠️ hide in production
            };

            await context.Response.WriteAsJsonAsync(response);
        }
    }
}
```

---

# 🔌 Step 2: Register Middleware

```csharp
app.UseMiddleware<ExceptionMiddleware>();
```

👉 Place it **at top** ⚠️

```csharp
app.UseMiddleware<ExceptionMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
```

---

# 🔥 Final Flow

```text
Request
 → ExceptionMiddleware
 → Other Middleware
 → Controller
 → Exception? → handled globally
 → Response
```

---

# 🧠 Logging in .NET

## 👉 Built-in ILogger

👉 .NET already provides logging system

---

# 🧪 Example

```csharp
public class UserService
{
    private readonly ILogger<UserService> _logger;

    public UserService(ILogger<UserService> logger)
    {
        _logger = logger;
    }

    public void DoWork()
    {
        _logger.LogInformation("Work started");
        _logger.LogWarning("Something suspicious");
        _logger.LogError("Error occurred");
    }
}
```

---

# 🔥 Log Levels

```text
Trace → Debug → Information → Warning → Error → Critical
```

---

# ⚙️ Configure Logging (appsettings.json)

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning"
    }
  }
}
```

---

# 💣 Without Logging

* No idea what failed ❌
* Hard to debug ❌
* No production visibility ❌

---

# ✅ With Logging

* Track requests ✅
* Debug easily ✅
* Monitor system health ✅

---

# 🔥 Pro-Level Improvements

---

## 1. Structured Logging

```csharp
_logger.LogInformation("User {UserId} logged in", userId);
```

👉 Better for searching logs

---

## 2. Correlation ID (Advanced)

👉 Track one request across system

---

## 3. Use Serilog (Industry Standard)

👉 Replace default logger

```bash
dotnet add package Serilog.AspNetCore
```

---

# 🧠 Best Practices

* Never expose full exception in production ❌
* Log errors always ✅
* Use global middleware for exceptions ✅
* Use structured logs ✅

---

# 🧠 Interview Summary

* Global exception handling → Middleware
* ILogger → built-in logging
* Log levels → Info, Warning, Error
* Why needed → debugging + monitoring

---
