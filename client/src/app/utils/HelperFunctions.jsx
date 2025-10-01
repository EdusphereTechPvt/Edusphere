import { useRouter } from "next/navigation";
import { useState } from "react";

export const getBackgroundColor = (status, colors) => {
  const legend = colors.find((item) => item.label === status);
  return legend ? legend.color : "transparent";
};

export const useHandleAction = () => {
  const router = useRouter();
  const [modalProps, setModalProps] = useState(null);

  const handleAction = (action, actionValue, actionUse, data) => {
    switch (action) {
      case "navigate":
        if (actionUse === "edit")
          router.push(`/${actionValue}?id=${data.id}`);
        if (actionUse === "add")
          router.push(`/${actionValue}`);

        break;
      case "modal":
        if (actionUse === "delete") {
          setModalProps({ type: "warning", action, actionValue, data });
        }
        break;
      default:
        break;
    }
  };

  const closeModal = () => setModalProps(null);

  return { handleAction, modalProps, closeModal };
};
