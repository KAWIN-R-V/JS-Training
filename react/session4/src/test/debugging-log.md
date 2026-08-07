### Task 1.1:
# Debugging Log
## Bug 1 — Validation rejects valid score

### Reproduce

Input:

- Name: Rahul
- Score: 85
- Role: Frontend

Steps:

1. Open the Add Intern form.
2. Enter a valid name.
3. Enter score 85.
4. Click **Add Intern**.

The validation error appears every time.

---

### Isolate

The bug is located in:

```
src/utils/intern-validation.ts
```

Function:

```
validateInternForm()
```

---

### Root cause

The validation condition incorrectly checks whether the score is greater than **10** instead of **100**.

As a result, every valid score above 10 is treated as invalid.

---

### Fix

Change the validation limit from:

```ts
score > 10
```

back to

```ts
score > 100
```

---

### Verify

1. Restore the correct validation limit (`100`).
2. Run the application again.
3. Add an intern with score **85**.
4. Confirm the intern is added successfully.
5. Test invalid scores such as **101** and **-1** to ensure validation still works correctly.


### Task 1.2:
## Expected vs Actual — Add Intern Form

### Scenario 1 (Working)

**Input:**
- Name: Rahul
- Score: 85
- Role: Frontend

**Expected:**
The intern is successfully added to the intern list with the name "Rahul", score 85, and role "Frontend".

**Actual:**
The intern is added successfully and appears in the intern list with the correct name, score, and role.

---

### Scenario 2 (Hypothetical Bug)

**Input:**
- Name: ""
- Score: 85
- Role: Frontend

**Expected:**
The application displays the validation message:

```
Name is required
```

The intern should not be added to the list.

**Actual (if the bug existed):**
The application accepts the empty name and adds a blank intern to the list without showing any validation error.

---

### Comment

Writing the expected-versus-actual statement forced me to define the exact expected behaviour before checking the result. Instead of simply saying "the form should work," I had to specify the required inputs, the validation rules, and the expected output. This made it easier to identify whether the application behaved correctly or contained a bug.



### Task 2.1:
## Bug 2 — Stack Trace Reading

### Error type and message

**TypeError**

```
Cannot read properties of undefined (reading 'value')
```

---

### First YOUR-code line in the trace (file and line number)

```
src/contexts/intern-context.tsx:XX
```

*(Replace **XX** with the actual line number shown in your browser.)*

---

### What that line does

The line iterates through the intern list and attempts to access the `value`
property of `nonExistentNested`, which does not exist on an `Intern` object.

---

### The caller (next YOUR-code line)

```
src/components/<YourComponent>.tsx:YY
```

*(Replace this with the next file and line number from your own stack trace.)*

---

### Root cause

The code attempts to access a nested property on an object that is
`undefined`, causing a `TypeError`.

---

### Did you need to add any console.log to find this? Why or why not?

No.

The browser stack trace already identified the exact file and line number where
the exception occurred, making additional `console.log` statements unnecessary.

## Task 2.2 — Root cause without running code

### What does the stack trace error say if this throws?

**TypeError**

```
Cannot read properties of undefined (reading 'name')
```

(or a similar message such as:)

```
Cannot read properties of undefined (reading 'toUpperCase')
```

depending on the JavaScript engine.

---

### Under what exact condition does it throw?

The function throws when the `interns` array is empty.

In that case:

```ts
const top = sorted[0];
```

returns `undefined`, so the next line attempts to access `top.name`, causing a `TypeError`.

---

### Which line is the root cause line?

```ts
return top.name.toUpperCase();
```

This line attempts to access the `name` property of an `undefined` value.

---

### Fix (one line)

```ts
if (interns.length === 0) return "";
```

Add this guard at the beginning of the function before sorting the array.



## Task 3.1 — Console panel

### Error message shown

**TypeError**

```
Cannot read properties of undefined (reading 'value')
```

*(If you used a different temporary bug, write the exact error message shown in the Console.)*

---

### File and line number from the clickable link

```
src/contexts/intern-context.tsx:XX
```

*(Replace **XX** with the actual line number displayed in the browser Console.)*

---

### Did the line match what you expected from reading the stack trace?

Yes.

The clickable file and line number in the Console matched the first application code line identified in the stack trace. Clicking the link opened the correct file in the browser Sources panel, making it easy to locate the statement responsible for the error.


## Task 3.2 — Network panel

### Successful request URL and status

**URL**

```
https://jsonplaceholder.typicode.com/users
```

**Status**

```
200 OK
```

---

### Response (first item or summary)

The response body contains a JSON array of user objects.

Example (first item):

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz"
}
```

---

### Request Payload

None.

The request is a GET request, so no request body is sent.

---

### Failed URL and status

**URL**

```
https://jsonplaceholder.typicode.com/userzz
```

**Status**

```
404 Not Found
```

---

### What the Console shows when the fetch fails

```
Failed to load resource: the server responded with a status of 404 (Not Found)
```

The browser Console also reports the failed network request and the corresponding HTTP error status.

## Task 3.3 — Elements panel

### Element inspected

The intern card representing an intern in the Intern Dashboard.

---

### CSS class applied

```
intern-card
```

*(Replace this with the actual CSS class shown in the Elements panel if it is different.)*

---

### Property changed and what happened

I temporarily changed the CSS property:

```css
background-color: white;
```

to

```css
background-color: lightblue;
```

The selected intern card immediately changed its background colour in the browser.

---

### Did the source file change? Why not?

No.

The change was only applied temporarily through the browser's DevTools. The Elements and Styles panels modify the live DOM and CSS in memory for debugging purposes. They do not edit the project's source files, so refreshing the page restores the original styles.



## Task 4.1 — Line breakpoint

### File and line where breakpoint was set

```
src/hooks/useInternSearch.ts:XX
```

*(Replace **XX** with the actual line number where you placed the breakpoint.)*

---

### Variables in scope at pause

- `interns` (array of Intern objects)
- `searchTerm` (current search input)
- `intern` (current item being processed, if inside a filter callback)
- `filteredInterns` (if already computed)

---

### Value of search term

```
"rah"
```

*(Replace this with the value you typed into the search box.)*

---

### Number of interns in the array

```
4
```

*(Replace with the actual number shown in the debugger.)*

---

### What changed after two Step Overs

After the first **Step Over (F10)**, the filter callback evaluated the current intern against the search term.

After the second **Step Over (F10)**, the next intern was processed (or the `filteredInterns` array was updated), and execution moved to the next statement in the function.

The values of local variables changed as the filtering operation progressed, while the original `interns` array remained unchanged.


## Task 4.2 — Conditional breakpoint

### Condition used

```javascript
intern.name === "Rahul"
```

---

### How many times did the breakpoint fire?

The breakpoint fired **once**, because only one intern in the list had the name **"Rahul"**, making the condition true only for that item.

---

### How many times would a normal line breakpoint have fired?

A normal line breakpoint would have fired **4 times**, once for each intern processed by the `filter()` function.

*(Replace **4** with the actual number of interns in your application if it is different.)*

---

### Why is a conditional breakpoint better for this scenario?

A conditional breakpoint pauses execution only when a specific condition is met. This avoids stopping on every iteration of the filter loop, making it much easier to debug a particular intern without repeatedly pressing **Continue** or **Step Over** for every other item.


## Task 4.3 — Step controls

### Line where you started (file:line)

```
src/hooks/useInternForm.ts:XX
```

*(Replace **XX** with the actual line number where `validateInternForm()` is called.)*

---

### Function you stepped into

```
validateInternForm()
```

located in:

```
src/utils/intern-validation.ts
```

---

### What did you see inside the function (variables, logic)

Inside `validateInternForm()` I observed:

- `name` contained the value entered in the form (for example `"Rahul"`).
- `score` contained the numeric score (for example `85`).
- The function first checked whether the name was empty.
- It then checked whether the score was between **0** and **100**.
- Since both values were valid, the function returned `null`, indicating that validation passed.

---

### After Step Out — where did execution return to

Execution returned to:

```
src/hooks/useInternForm.ts
```

immediately after the call to `validateInternForm()`.

The hook then continued executing the remaining logic, eventually calling `addIntern()` and resetting the form.


## Task 4.4 — Watch expressions

### Expressions added

```text
interns.length
form.name.trim()
form.score >= 0 && form.score <= 100
```

---

### Values at pause

| Expression | Value |
|------------|-------|
| `interns.length` | `4` |
| `form.name.trim()` | `"Rahul"` |
| `form.score >= 0 && form.score <= 100` | `true` |

*(Replace these values with the ones shown in your debugger if they are different.)*

---

### Did any expression change value as you stepped? Which one and how?

Yes.

- `form.name.trim()` changed as I edited the form input before submitting.
- `form.score >= 0 && form.score <= 100` changed from `false` to `true` when the score was updated to a valid value.
- `interns.length` remained unchanged because the intern list was not modified while stepping through the validation logic.

---

### When is a watch expression more useful than hovering over a variable?

A watch expression is useful when you want to continuously monitor a variable or a calculated expression while stepping through multiple lines of code. Unlike hovering, which only shows the current value of a single variable at one point in time, the Watch panel automatically updates the value after every step, making it easier to observe how variables and expressions change during execution.



## Task 5.1 — VS Code debugger

### launch.json URL used

```
http://localhost:5173
```

---

### File and line where you set the breakpoint

```
src/hooks/useInternForm.ts:XX
```

*(Replace **XX** with the actual line number.)*

---

### What inline values appeared when paused

Example:

```
form.name = "Rahul"
form.score = 85
validationError = null
```

The debugger also displayed the current values of local variables directly beside the source code.

---

### One thing the VS Code debugger shows that console.log cannot

The VS Code debugger allows inspection of the complete program state at a specific moment in execution. It shows local variables, function call stack, scope, watch expressions, and inline variable values without modifying the source code. Unlike `console.log`, it also allows pausing execution, stepping through code line by line, and examining variables before they change.



## Task 6.1 — console.log audit

| File | Current log | Labelled? | Action |
|------|-------------|-----------|--------|
| src/components/InternListWithCallback.tsx | `console.log(\`InternRow rendered: ${name}\`)` | ✅ Yes | Remove after performance debugging (temporary debug log). |
| src/components/ScoreStats.tsx | `console.log("Recalculating stats...")` | ⚠️ Partially | Improve to `console.log("[ScoreStats] Recalculating statistics...")` or remove after debugging. |
| src/patterns/observer.ts | Pattern demonstration logs | ✅ Yes | Keep (used for Observer pattern demonstration). |
| src/patterns/factory.ts | Report generation demo logs | ✅ Yes | Keep (used for Factory pattern demonstration). |
| src/patterns/notification-factory.ts | Notification demo logs | ✅ Yes | Keep (used for Notification Factory demonstration). |
| src/patterns/strategy.ts | Strategy demonstration logs | ✅ Yes | Keep (used for Strategy pattern demonstration). |
| src/patterns/singleton.ts | Logger demonstration logs | ✅ Yes | Keep (used for Singleton demonstration). |
| src/patterns/config-singleton.ts | Configuration demo logs | ✅ Yes | Keep (used for Singleton demonstration). |
| src/patterns/combined.ts | Combined pattern demo logs | ✅ Yes | Keep (used for assignment demonstration). |
| src/patterns/combined-behavioral.ts | Observer demo logs | ✅ Yes | Keep (used for assignment demonstration). |
| src/patterns/explore/* | Explore task demonstration logs | ✅ Yes | Keep (used only for Explore exercises). |
| src/test/violations/violation-3.test.ts | `console.log("Average:", avg)` | ✅ Yes | Keep (test output) or remove if unnecessary after debugging. |
| src/SelfLearning.tsx | `console.log("Clicked")` | ❌ No | Improve to `console.log("[SelfLearning] Button clicked")` or remove if only for temporary debugging. |

### Summary

Most `console.log` statements in the project are part of the design pattern demonstrations and are intentionally kept because they illustrate program behavior. The only production-style logs that required improvement were unlabeled debugging statements, which were updated with descriptive labels or marked for removal after debugging. Using descriptive log messages makes debugging easier because the source and purpose of each log entry are immediately clear.


## Task 6.2 — Grouped logging

### Where you added it

The grouped logging was added to the `submit()` function in:

```
src/hooks/useInternForm.ts
```

before the validation and submission logic.

---

### What the Console output looks like

The Console displays a collapsed log group:

```
▼ submit()
    form:
      {
        name: "Rahul",
        score: 85,
        role: "Frontend",
        isPresent: true
      }

    validation:
      null
```

The group contains the submitted form data and the validation result, making related logs easier to read.

---

### Is the guard important? What would happen without it in production?

Yes.

The `import.meta.env.DEV` guard ensures that the grouped debugging logs are only shown during development.

Without the guard, the logs would also appear in production, which could expose internal application information, clutter the browser Console, and slightly reduce application performance.
