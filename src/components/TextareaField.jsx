import React from "react";

function TextareaField({ label, name, register, errors, placeholder, rows = 4, className }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium">{label}</label>
      <textarea
        {...register(name)}
        placeholder={placeholder}
        rows={rows}
        className="w-full border border-gray-300 rounded p-2 mt-1"
      />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
    </div>
  );
}

export default TextareaField;
