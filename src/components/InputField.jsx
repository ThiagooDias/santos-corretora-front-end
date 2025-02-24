import React from 'react'

function InputField({ label, name, register, errors, type = "text", placeholder, className, onBlur }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium">{label}</label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded p-2 mt-1 appearance-none"
        onBlur={onBlur}
      />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
    </div>
  );
}

export default InputField