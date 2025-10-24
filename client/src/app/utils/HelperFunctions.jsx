import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "../services/MiddlewareService";
import { formatTable } from "./Format";

export const getBackgroundColor = (status, colors) => {
  const legend = colors.find((item) => item.label === status);
  return legend ? legend.color : "transparent";
};

export const useHandleAction = () => {
  const router = useRouter();
  const [modalProps, setModalProps] = useState(null);

  const handleAction = async (action, actionValue, actionUse, data = {}) => {
    switch (action) {
      case "navigate":
        if (actionUse === "edit") router.push(`/${actionValue}?id=${data.id}`);
        if (actionUse === "add") router.push(`/${actionValue}`);
        break;

      case "modal":
        if (actionUse === "delete") {
          setModalProps({ type: "warning", action, actionValue, data });
        }
        break;

      case "table":
        switch (actionUse) {
          case "edit": {
            if (data?.setEditable && data?.isEditable !== undefined) {
              data.setEditable(!data.isEditable);
              return;
            }

            if (!data.isEditable && data.selected) {
              try {
                const payload = data.selected;
                const response = await api.post(actionValue, payload);
                console.log("Saved edited data:", response.data);
              } catch (error) {
                console.error("Error saving data:", error);
              }
            }
            break;
          }
          case "filter": {
            const { tableData, setTableData, field, value } = data;
            if (!setTableData || !tableData) return;

            try {
              const response = await api.post(actionValue, { field, value });
              const formatted = formatTable(response.data, response); //config for table
              if (formatted) setTableData(formatted.data);
            } catch (error) {
              console.error("Error filtering table:", error);
            }
            break;
          }

          default:
            break;
        }
        break;

      default:
        console.warn("Unknown action type:", action);
        break;
    }
  };

  const closeModal = () => setModalProps(null);

  return { handleAction, modalProps, closeModal };
};
