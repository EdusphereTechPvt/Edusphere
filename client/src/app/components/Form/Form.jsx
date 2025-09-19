"use client"
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { QrCode } from "@mui/icons-material";
import { Box, Button, Divider } from "@mui/material";
import {
  AccountCircle,
  Cancel,
  CloudUpload,
  Group,
  Person,
  Person4,
  PersonOff,
  PersonOutline,
} from "@mui/icons-material";
import formConfig from "../../config/FormConfig";

export default function Form({ type }) {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(formData);

  const handleButtonAction = (action) => {
    if (action === "cancel") {
      setFormData({});
    } else if (action === "save") {
      console.log("Saving form data:", formData);
      setFormData({});
    }
  };

  const config = formConfig[type];
  if (!config) return <p className="text-red-600">Invalid form type</p>;
  const { sections, info } = config;

  // ---------- HELPERS ----------
  const photoUploader = ({ name, label, placeholder }, i) => (
    <div key={i} className="col-span-1 sm:col-span-2">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center gap-4">
        {/* Avatar Preview */}
        <div className="flex flex-col items-center">
          <div className="lg:w-40 lg:h-40 w-28 h-28 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {formData[name] ? (
              <img
                src={URL.createObjectURL(formData[name])}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            ) : (
              <Person
                sx={{
                  fontSize: { xs: 95, lg: 140 },
                  color: "gray",
                }}
                className="lg:w-40 lg:h-40 w-28 h-28 text-gray-400"
              />
            )}
          </div>
          {formData[name] && (
            <span className="text-xs mt-1 flex items-center text-gray-700">
              {formData[name].name}
              <Cancel
                onClick={() => handleChange(name, null)}
                className="ml-1 cursor-pointer text-red-500"
              />
            </span>
          )}
        </div>
        {/* Upload Button */}
        <label className="cursor-pointer px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium">
          {placeholder || "Upload"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleChange(name, e.target.files[0])}
          />
        </label>
      </div>
    </div>
  );

  const fileUploader = ({ name, label }, i) => (
    <div key={i} className="col-span-1 sm:col-span-2">
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) handleChange(name, file);
        }}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400"
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          id={`file-upload-${i}`}
          className="hidden"
          onChange={(e) => handleChange(name, e.target.files[0])}
        />
        <label
          htmlFor={`file-upload-${i}`}
          className="flex flex-col items-center"
        >
          <CloudUpload className="text-gray-500" fontSize="large" />
          <span className="text-gray-600 mt-2">
            Upload a file or drag and drop
          </span>
          <span className="text-xs text-gray-500">
            PDF, DOCX, PNG, JPG (max 10MB)
          </span>
        </label>
      </div>
      {formData[name] && (
        <p className="mt-2 text-sm flex items-center text-gray-700">
          Selected: <strong>{formData[name].name}</strong>
          <Cancel
            onClick={() => handleChange(name, null)}
            className="ml-1 cursor-pointer text-red-500"
          />
        </p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto px-2 lg:px-0">
      {info && (
        <div className="mb-2">
          {info?.map((item, idx) => (
            <item.tag
              key={idx}
              className={item.styles?.className}
              style={item.styles?.inlineStyle}
            >
              {item.value}
              {console.log(item)}
            </item.tag>
          ))}
        </div>
      )}

      <form className="p-6 rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.25)]">
        {sections.map((section, idx) => (
          <div key={idx} className="mb-8">
            {section.title && section.title !== "Actions" && (
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-gray-800 text-left">
                {section.title}
              </h1>
            )}
            <div
              className={
                section.title === "Actions"
                  ? "flex justify-end flex-wrap gap-4"
                  : "grid grid-cols-1 sm:grid-cols-2 gap-4"
              }
            >
              {section.title === "Actions" && (
                <Divider sx={{ width: "100%" }} />
              )}
              {section.fields.map((field, i) => {
                const {
                  type,
                  name,
                  label,
                  placeholder,
                  variant,
                  text,
                  data,
                  values,
                  required,
                } = field;

                switch (type) {
                  case "text":
                  case "email":
                  case "date":
                    return (
                      <div
                        key={i}
                        className={`flex flex-col flex-wrap w-full ${
                          i === section.fields.length - 1 && i % 2 === 0
                            ? "sm:col-span-2"
                            : ""
                        }`}
                      >
                        <label className="mb-1 text-sm font-medium text-gray-700">
                          {label}
                        </label>
                        <input
                          type={type}
                          name={name}
                          placeholder={placeholder}
                          value={formData[name] || ""}
                          onChange={(e) => handleChange(name, e.target.value)}
                          className="w-full border border-gray-300 rounded-[5px] px-4 py-2 focus:ring-1 focus:ring-blue-600 focus:outline-none hover:border-black"
                        />
                      </div>
                    );

                  case "dropdown":
                    return (
                      <div
                        key={i}
                        className={`flex w-full flex-col ${
                          i === section.fields.length - 1 && i % 2 === 0
                            ? "sm:col-span-2"
                            : ""
                        }`}
                      >
                        <Dropdown
                          data={data || {}}
                          onSelect={(value) => handleChange(data.name, value)}
                          required={required}
                        />
                      </div>
                    );

                  case "file":
                    if (name === "photo") {
                      return photoUploader(field, i);
                    } else if (name === "file") {
                      return fileUploader(field, i);
                    }
                    return null;

                  case "textArea":
                    return (
                      <div key={i} className="col-span-1 sm:col-span-2">
                        <label className="block mb-1 font-medium text-gray-700">
                          {label}
                        </label>
                        <textarea
                          name={name}
                          placeholder={placeholder}
                          value={formData[name] || ""}
                          onChange={(e) => handleChange(name, e.target.value)}
                          rows={5}
                          className="lg:min-h-[100px] min-h-[50px] border border-gray-300 rounded-lg p-2 w-full hover:border-black focus:border-blue-600 outline-none"
                        />
                      </div>
                    );

                  case "qr":
                    return (
                      <div key={i} className="col-span-1 sm:col-span-2">
                        <div className="flex w-40 items-center gap-2 bg-gray-100 px-4 py-3 rounded-lg flex-nowrap cursor-pointer hover:bg-gray-200">
                          <QrCode size={20} className="text-gray-600" />
                          <span className="text-gray-700 text-sm w-full font-medium">
                            {label || "Generate QR ID"}
                          </span>
                        </div>
                      </div>
                    );

                  case "button":
                    return (
                      <Button
                        key={i}
                        type="button"
                        onClick={() => handleButtonAction(field.action)}
                        variant={
                          variant === "contained" ? "contained" : "outlined"
                        }
                        color={variant === "contained" ? "primary" : "inherit"}
                        sx={{
                          px: { xs: 3, sm: 6, lg: 3 },
                          py: 1,
                          borderRadius: "9999px",
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                          fontWeight: 500,
                          textTransform: "none",
                          boxShadow: "none",
                          minWidth: { xs: "auto", sm: "120px", lg: "140px" },
                        }}
                      >
                        {text}
                      </Button>
                    );

                  case "checkBox":
                    return (
                      <Box key={i}>
                        <label className="font-medium text-gray-700">{label}</label>
                        <div className="mt-1.5">
                          {values.map((value, idx) => (
                            <div key={idx} className="flex gap-3">
                              <input
                                type="checkbox"
                                id={`${name}-${idx}`}
                                checked={
                                  formData[name]?.includes(value.name) || false
                                }
                                onChange={(e) => {
                                  let newArr = formData[name] || [];
                                  if (e.target.checked) {
                                    newArr = [...newArr, value.name];
                                  } else {
                                    newArr = newArr.filter(
                                      (v) => v !== value.name
                                    );
                                  }
                                  handleChange(name, newArr);
                                }}
                              />
                              <label
                                htmlFor={`${name}-${idx}`}
                                className="text-[#7f8690]"
                              >
                                {value.text}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Box>
                    );

                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
}
