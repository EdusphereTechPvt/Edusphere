"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Cancel, CloudUpload, Person, QrCode } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Dropdown from "../Dropdown/Dropdown";
import MultiSelectDropdown from "../Dropdown/MultiSelectDropdown";
import formConfig from "../../config/FormConfig";
import { getFormData, handleFormAction } from "@/app/services/FormService";
import { fetchDistinctValues } from "@/app/services/UtilityService";
import { validateField } from "@/app/utils/Validator";
import { showToast } from "@/app/utils/Toast";
import { formatLabel } from "@/app/utils/Format";
import { dynamicUpdateConfig } from "@/app/utils/FormatConfig";
import DateComponent from "../Date/date";

export default function Form({ type, mode, id }) {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [resetFlag, setResetFlag] = useState(false);
  const [error, setError] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [config, setConfig] = useState(formConfig[type]);

  const { sections, info } = config || {};

  const requiredFieldNames = useMemo(
    () =>
      sections?.flatMap((section) =>
        section.fields.filter((f) => f.required).map((f) => f.name)
      ) || [],
    [sections]
  );

  useEffect(() => {
    const hasErrors = Object.values(error).some((e) => e);
    const allRequiredFilled = requiredFieldNames.every((name) => {
      const val = formData[name];
      if (val == null) return false;
      if (typeof val === "string") return val.trim() !== "";
      if (Array.isArray(val)) return val.length > 0;
      if (val instanceof File) return true;
      if (typeof val === "boolean") return true;
      if (
        typeof val === "object" &&
        val?.startsWith &&
        val.startsWith("data:image")
      )
        return true;
      return true;
    });
    setDisabled(hasErrors || !allRequiredFilled);
  }, [error, formData, requiredFieldNames]);

  const dependentFields = useMemo(() => {
    return (
      sections
        ?.flatMap((s) =>
          s.fields.filter((f) => f.dependancy).flatMap((f) => f.dependancy)
        )
        .filter(Boolean) || []
    );
  }, [sections]);

  useEffect(
    () => {
      const fetchDistinct = async () => {
        for (const section of sections || []) {
          for (const field of section.fields) {
            if (field.isDistinct) {
              const depsSatisfied =
                !field.dependancy ||
                field.dependancy.every((dep) => formData[dep]?.length > 0);
              if (depsSatisfied) {
                const options = await fetchDistinctValues(
                  field,
                  formData,
                  config?.api?.page?.mode?.[mode],
                  mode
                );
                dynamicUpdateConfig(config, {
                  fieldName: "items",
                  matchKey: "name",
                  matchValue: field.name,
                  newData: options.distinctValues || [],
                });
                setConfig({ ...config });
              }
            }
          }
        }
      };
      fetchDistinct();
    },
    dependentFields.map((d) => formData[d])
  );

  useEffect(() => {
    const getInitialData = async () => {
      if (mode === "edit") {
        const data = await getFormData(
          config.api.fetch,
          config?.api?.page?.mode?.[mode],
          id
        );
        setFormData(data.data);
      }
    };
    getInitialData();
  }, []);

  const handleChange = useCallback((name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleButtonAction = useCallback(
    async (action) => {
      if (action === "cancel") {
        setFormData({});
        setResetFlag((f) => !f);
        setDisabled(true);
      } else if (action === "submit") {
        const result = await handleFormAction(
          formData,
          config.api[action],
          config?.api?.page?.mode?.[mode]
        );
        if (result.status) {
          setFormData({});
          setResetFlag((f) => !f);
          setDisabled(true);
          if (mode === "edit") router.back();
        }
      }
    },
    [formData, config, mode, router]
  );

  const getInputValue = (name, type) => {
    const val = formData[name];
    if (!val) return "";
    const [firstVal, secondVal] = String(val).toLowerCase().split(" ");
    if (type === "number" && firstVal === "class") return +secondVal || "";
    if (type === "text" && name === "name" && firstVal === "section")
      return formatLabel(secondVal) || "";
    return val;
  };

  const handleBlur = useCallback(
    (field) => () => {
      const validate = validateField(field, formData[field.name]);
      setError((prev) => ({ ...prev, [field.name]: !validate }));
    },
    [formData]
  );

  const photoUploader = ({ name, label, placeholder }, i) => (
    <div key={i} className="flex flex-col w-full">
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-wrap gap-4 justify-between sm:justify-center">
          <div className="text-center">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {label}
            </label>
            <div className="lg:w-40 lg:h-40 w-28 h-28 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {formData[name] ? (
                <img
                  src={formData[name]}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Person sx={{ fontSize: { xs: 95, lg: 140 }, color: "gray" }} />
              )}
            </div>
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
        <label className="cursor-pointer px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium">
          {placeholder || "Upload"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onloadend = () => {
                handleChange(name, reader.result);
              };
              reader.readAsDataURL(file);
            }}
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

  if (!config) return <p className="text-red-600">Invalid form type</p>;

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto my-6 px-2 lg:px-0">
      {info && (
        <div className="mb-2">
          {info.map((item, idx) => (
            <item.tag
              key={idx}
              className={item.styles?.className}
              style={item.styles?.inlineStyle}
            >
              {item.mode?.[mode]?.value || item.value}
            </item.tag>
          ))}
        </div>
      )}
      <FormGroup className="p-6 rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.25)]">
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
                  values,
                  required,
                } = field;
                switch (type) {
                  case "text":
                  case "email":
                  case "number":
                    return (
                      <div
                        key={i}
                        className={`flex flex-col w-full ${
                          i === section.fields.length - 1 && i % 2 === 0
                            ? "sm:col-span-2"
                            : ""
                        }`}
                      >
                        <label className="mb-1 text-sm font-medium text-gray-700">
                          {label} {required && "*"}
                        </label>
                        <>
                          <style jsx>{`
                            input::-webkit-inner-spin-button,
                            input::-webkit-outer-spin-button {
                              -webkit-appearance: none;
                            }
                            input[type="number"] {
                              -moz-appearance: textfield;
                            }
                          `}</style>

                          <input
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            value={getInputValue(name, type)}
                            onChange={(e) => {
                              let value = e.target.value;

                              // type TExt
                              if (type === "text") {
                                const pattern =
                                  field?.pattern &&
                                  new RegExp(field.pattern.value);

                                if (pattern && value && !pattern.test(value)) {
                                  showToast(
                                    field?.pattern.message ||
                                      `${label} format is invalid`,
                                    "warning"
                                  );
                                  return;
                                }
                                if (field?.maxLength) {
                                  value = value
                                    .slice(0, field.maxLength)
                                    .trim();
                                }
                                value = value.replace(/^\s+/, "");
                              }

                              // type number
                              if (type === "number") {
                                if (
                                  field?.maxLength &&
                                  value.length > field.maxLength
                                )
                                  return;
                                if (value !== "") value = Number(value);
                              }
                              if (
                                field?.max !== undefined &&
                                value > field.max
                              ) {
                                value = field.max;
                                showToast(
                                  `${label} shouldn't be more than ${field.max}`,
                                  "warning"
                                );
                              }

                              handleChange(name, value);
                            }}
                            onBlur={() => handleBlur(field)}
                            className="w-full border border-gray-300 rounded-[5px] px-4 py-2 focus:ring-1 focus:ring-blue-600 focus:outline-none hover:border-black"
                          />
                        </>
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
                          value={formData[name]}
                          data={field || {}}
                          resetFlag={resetFlag}
                          onSelect={(value) => handleChange(field.name, value)}
                          onBlur={handleBlur(field)}
                        />
                      </div>
                    );
                  case "file":
                    if (name.toLowerCase().includes("photo"))
                      return photoUploader(field, i);
                    if (name.toLowerCase().includes("file"))
                      return fileUploader(field, i);
                    return null;
                  case "textArea":
                    return (
                      <div key={i} className="col-span-1 sm:col-span-2">
                        <label className="block mb-1 font-medium text-gray-700">
                          {label} {required && "*"}
                        </label>
                        <textarea
                          name={name}
                          placeholder={placeholder}
                          value={formData[name] || ""}
                          onChange={(e) => handleChange(name, e.target.value)}
                          onBlur={handleBlur(field)}
                          rows={5}
                          className="lg:min-h-[100px] min-h-[50px] border border-gray-300 rounded-lg p-2 w-full hover:border-black focus:border-blue-600 outline-none"
                        />
                      </div>
                    );
                  case "qr":
                    return (
                      <div key={i} className="col-span-1 sm:col-span-2">
                        <div className="flex w-40 items-center gap-2 bg-gray-100 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-200">
                          <QrCode size={20} className="text-gray-600" />
                          <span className="text-gray-700 text-sm font-medium">
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
                        disabled={
                          disabled &&
                          (field.action === "submit" || field.action === "save")
                        }
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
                        {field?.mode?.[mode]?.text || text}
                      </Button>
                    );
                  case "checkBox":
                    return (
                      <Box key={i}>
                        <label className="font-medium text-gray-700">
                          {label}
                        </label>
                        <div className="mt-1.5">
                          {values.map((value, idx) => (
                            <div key={idx} className="flex gap-3">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={formData[value.name] || false}
                                    onChange={(e) =>
                                      handleChange(value.name, e.target.checked)
                                    }
                                    onBlur={handleBlur(field)}
                                  />
                                }
                                label={value.text}
                              />
                            </div>
                          ))}
                        </div>
                      </Box>
                    );
                  case "multiselect":
                    return (
                      <div
                        key={i}
                        className={`flex w-full flex-col ${
                          i === section.fields.length - 1 && i % 2 === 0
                            ? "sm:col-span-2"
                            : ""
                        }`}
                      >
                        <MultiSelectDropdown
                          value={formData[name]}
                          data={field || {}}
                          resetFlag={resetFlag}
                          onSelect={(value) => handleChange(field.name, value)}
                          style={field.styles}
                          onBlur={handleBlur(field)}
                        />
                      </div>
                    );
                  case "date":
                    return (
                      <div
                        key={i}
                        className={`flex w-full flex-col ${
                          i === section.fields.length - 1 && i % 2 === 0
                            ? "sm:col-span-2"
                            : ""
                        }`}
                      >
                        <label className="mb-1 text-sm font-medium text-gray-700">
                          {label} {required && "*"}
                        </label>
                        <DateComponent
                          value={formData[name] || ""}
                          onChange={(value) => handleChange(name, value)}
                          placeholder={placeholder || "Select date"}
                          format={field?.format}
                          minDate={field?.min}
                          maxDate={field?.max}
                        />
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}
      </FormGroup>
    </div>
  );
}
