# 🚀 Middleware in .NET (Core Concept)

## 🧠 What is Middleware?

👉 Middleware = **a pipeline of components** that handle every HTTP request/response.

Think like:

```
Request → Middleware 1 → Middleware 2 → Middleware 3 → Controller → Response back
```

---

## 🔥 Real-Life Analogy

* Security check (Auth)
* Logging
* Error handling

👉 Every request passes through these layers.

---

# ⚙️ Where Middleware is defined?

👉 In `Program.cs`

```csharp
var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
```

👉 Order matters ⚠️ (VERY IMPORTANT)

---

# 💣 Problem Without Middleware

## ❌ Without Middleware

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
        // handle error
    }
}
```

### Problem:

* Same try-catch in every controller ❌
* Logging repeated ❌
* Hard to maintain ❌

---

# ✅ With Middleware (Centralized Handling)

```csharp
public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = 500;
            await context.Response.WriteAsync("Something went wrong");
        }
    }
}
```

---

## 🔌 Register Middleware

```csharp
app.UseMiddleware<ExceptionMiddleware>();
```

---

# 🧠 How Middleware Works Internally

```csharp
app.Use(async (context, next) =>
{
    Console.WriteLine("Before Request");

    await next(); // go to next middleware

    Console.WriteLine("After Response");
});
```

---

## 🧾 Flow

```
Request →
    Middleware A (Before)
        Middleware B (Before)
            Controller
        Middleware B (After)
    Middleware A (After)
→ Response
```

---

# 🔥 Important Built-in Middlewares

```csharp
app.UseRouting();          // Route matching
app.UseAuthentication();   // Auth check
app.UseAuthorization();    // Permission check
app.UseEndpoints();        // Endpoint execution
```

---

# ⚠️ Order Matters (Interview Question)

## ❌ Wrong

```csharp
app.UseAuthorization();
app.UseAuthentication();
```

👉 Auth runs after authorization → FAIL ❌

---

## ✅ Correct

```csharp
app.UseAuthentication();
app.UseAuthorization();
```

---

# 🔥 Custom Middleware Use Cases

You will create middleware for:

* Global Exception Handling ✅
* Logging requests/responses
* JWT validation
* Rate limiting
* Request timing (performance)

---

# 🧪 Real Example (Logging Middleware)

```csharp
public class LoggingMiddleware
{
    private readonly RequestDelegate _next;

    public LoggingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        Console.WriteLine($"Request: {context.Request.Path}");

        await _next(context);

        Console.WriteLine($"Response Status: {context.Response.StatusCode}");
    }
}
```

---

## Register

```csharp
app.UseMiddleware<LoggingMiddleware>();
```

---

# 🧠 Middleware vs Filters (Quick idea)

| Feature  | Middleware    | Filters                  |
| -------- | ------------- | ------------------------ |
| Runs on  | All requests  | Only MVC                 |
| Level    | Global        | Controller/Action        |
| Use case | Logging, Auth | Validation, Action logic |

👉 We’ll cover Filters later in depth.

---

# 🧠 Interview Summary

* Middleware = Request pipeline
* Order matters ⚠️
* `await next()` → passes control
* Used for cross-cutting concerns
* Custom middleware = production skill

---