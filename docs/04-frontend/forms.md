---
title:        Form Handling & Validation
section:      04-frontend
last-updated: 2025-03-13
maintained-by:Frontend Lead
status:       Approved
---

# 📝 Form Handling & Validation

Duo Designs uses **React Hook Form (RHF)** for all form logic. It provides excellent performance by minimizing re-renders and offers an easy-to-use API for validation.

## 🛠️ Main Libraries
- **React Hook Form:** The Core logic engine.
- **Yup / Zod:** Schema-based validation (depending on project phase).

---

## 🏗️ Basic Form Structure
Always wrap your controls in a `Controller` if using custom UI components like our `Input.jsx`.

```javascript
import { useForm, Controller } from 'react-hook-form';

const AddressForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="pincode"
        control={control}
        rules={{ required: "Pincode is required", pattern: /^[0-9]{6}$/ }}
        render={({ field }) => (
          <Input 
            {...field} 
            label="Pincode" 
            error={errors.pincode?.message} 
          />
        )}
      />
      <button type="submit">SAVE ADDRESS</button>
    </form>
  );
};
```

---

## 📋 Common Validation Rules
- **Email:** Required, must match email regex.
- **Phone:** Required, exactly 10 digits.
- **Pincode:** Required, exactly 6 digits.
- **Name:** Required, minimum 3 characters.

---

## 🚀 Specialized Form: Design Upload
The Design Upload is an "Invisible Form" triggered by the file input on the Product Detail page. It validates the file extension and size before submitting to the Backend.

```javascript
const onFileSelect = (file) => {
  if (!['image/png', 'image/jpeg'].includes(file.type)) {
     return toast.error("Only PNG and JPG allowed");
  }
  if (file.size > 10 * 1024 * 1024) {
     return toast.error("File is too large (Max 10MB)");
  }
  // Proceed to upload...
};
```

---

## 🛡️ Admin Forms
Admin forms are complex and often handle multi-level arrays (e.g., adding variants with nested size stocks). We use `useFieldArray` from RHF for these dynamic sections.

---
[Related: 03-design/component-library.md](../03-design/component-library.md) | [Home](../README.md)
