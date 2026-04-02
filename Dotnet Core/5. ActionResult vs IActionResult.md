Perfect 👍 now this is **very important for interviews + real API design**

---

# 🚀 IActionResult vs ActionResult in .NET

## 🧠 Why this matters?

👉 When your API returns data, you must decide:

* Status code (200, 400, 404)
* Data format (JSON, text, etc.)

---

# 🔥 1. IActionResult

## 👉 What is it?

👉 An **interface** that represents any HTTP response

---

## ✅ Example

```csharp
[HttpGet]
public IActionResult Get()
{
    return Ok("Hello");
}
```

---

## 🔍 What can it return?

* `Ok()` → 200
* `BadRequest()` → 400
* `NotFound()` → 404
* `Content()` → plain text
* `Json()` → JSON

---

## 💣 Problem

👉 No strong typing ❌

```csharp
public IActionResult Get()
{
    return Ok("Sunny"); // string
    // or
    return Ok(123); // int
}
```

👉 Anything can go → not predictable

---

# 🔥 2. ActionResult`<T>`

## 👉 What is it?

👉 Combines:

* **IActionResult**
* **Strong typing**

---

## ✅ Example

```csharp
[HttpGet]
public ActionResult<string> Get()
{
    return "Sunny";
}
```

---

## ✅ With status codes

```csharp
[HttpGet]
public ActionResult<string> Get()
{
    if (true)
        return Ok("Sunny");

    return NotFound();
}
```

---

## 🎯 Benefit

* Strong typing ✅
* Cleaner code ✅
* Better API documentation (Swagger) ✅

---

# 🔥 IActionResult vs ActionResult`<T>`

## Key Difference

```text
IActionResult      → flexible but not type-safe
ActionResult<T>    → flexible + type-safe ✅
```

---

# 🧠 Real Interview Answer (short)

👉

* `IActionResult` → used when response type can vary
* `ActionResult<T>` → used when returning a specific type + status codes

---

# 🔥 Content vs Json

---

# 🧾 Content()

## 👉 Returns plain text

```csharp
return Content("Hello World");
```

### Response:

```text
Hello World
```

---

# 🧾 Json()

## 👉 Returns JSON explicitly

```csharp
return Json(new { name = "Sunny" });
```

### Response:

```json
{
  "name": "Sunny"
}
```

---

# ⚠️ Important (Modern .NET)

👉 You usually don’t need `Json()` ❌

```csharp
return Ok(new { name = "Sunny" });
```

👉 Automatically converts to JSON ✅

---

# 🔥 Common Return Methods

```csharp
return Ok(data);           // 200
return Created();          // 201
return NoContent();        // 204
return BadRequest();       // 400
return Unauthorized();     // 401
return NotFound();         // 404
return StatusCode(500);    // 500
```

---

# 🧪 Real API Example (Production Style)

```csharp
[HttpGet("{id}")]
public ActionResult<User> GetUser(int id)
{
    var user = _userService.GetById(id);

    if (user == null)
        return NotFound();

    return Ok(user);
}
```

---

# 🧠 Best Practices (2+ Year Dev)

👉 Prefer:

```csharp
ActionResult<T>
```

👉 Avoid:

```csharp
IActionResult (when type is known)
```

👉 Always return proper status codes

---

# 💣 Common Mistakes

❌ Returning raw object:

```csharp
public User Get() { } // ❌
```

❌ No status codes:

```csharp
return user; // unclear response
```

---

# 🧠 Summary

* IActionResult → flexible but no type safety
* ActionResult `<T>` → best practice ✅
* Content() → plain text
* Json() → rarely used
* Ok() auto converts to JSON

---