"use client";

import { Button } from "@mui/material";
import { HomePageConfig } from "../../config/HomePageConfig";
import CardComponent from "@/app/components/CardComponent/Index";
import { useRouter } from "next/navigation";
import { TableComponent } from "@/app/components/Table/TableComponent";

const page = () => {
  const router = useRouter();
  function DynamicRenderer({ config }) {
    switch (config.type) {
      case "text":
        const Tag = config.tag;
        return (
          <Tag
            className={config.styles.className}
            style={config.styles.inlineStyle}
          >
            {config.value}
          </Tag>
        );

      case "buttonGroup":
        return (
          <div
            className={config.styles.className}
            style={config.styles.inlineStyle}
          >
            {config.buttons.map((btn, idx) => (
              <Button
                key={idx}
                className={btn.styles.className}
                variant={btn.variant || "contained"}
                sx={btn.styles.inlineStyle}
                onClick={() => router.push(btn.action)}
              >
                {btn.text}
              </Button>
            ))}
          </div>
        );

      case "overlayImage":
        return (
          <div
            className={config.styles.className}
            style={{ position: "relative", ...config.styles.inlineStyle }}
          >
            <img
              src={config.value.imageUrl}
              className={config.styles.imgStyle.className}
              style={config.styles.imgStyle.inlineStyle}
            />

            {(config.value.text || config.value.desc) && (
              <div
                style={config.styles.containerStyle.inlineStyle}
                className={config.styles.containerStyle.className}
              >
                {config.value.text && (
                  <h1
                    className={config.styles.containerStyle.textStyle.className}
                    style={config.styles.containerStyle.textStyle.inlineStyle}
                  >
                    {config.value.text}
                  </h1>
                )}
                {config.value.desc && (
                  <p
                    className={config.styles.containerStyle.descStyle.className}
                    style={config.styles.containerStyle.descStyle.inlineStyle}
                  >
                    {config.value.desc}
                  </p>
                )}
                {config.value.buttons && (
                  <div
                    className={
                      config.styles.containerStyle.btnCotainerStyle.className
                    }
                    style={
                      config.styles.containerStyle.btnCotainerStyle.inlineStyle
                    }
                  >
                    {config.value.buttons.map((btn, idx) => (
                      <Button
                        key={idx}
                        className={btn.styles.className}
                        variant={btn.variant || "contained"}
                        sx={btn.styles.inlineStyle}
                        onClick={() => router.push(btn.action)}
                      >
                        {btn.text}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "card":
        return <CardComponent data={config.data} />;

      default:
        null;
    }
  }

  const dbTopHeader = [
    {
      _id: "68d6fbb3c791281c97de0230",
      page: "list/teacher",
      type: "button",
      id: "addteacher",
      label: "Add Teacher",
      action: "navigate",
      actionValue: "form/teacher/add",
      enableFor: ["admin"],
      order: 1,
      actionUse: "add",
    },
    {
      _id: "68d6fbb3c791281c97de0230",
      page: "list/teacher",
      type: "button",
      id: "addteacher",
      label: "edit",
      action: "table",
      actionUse: "edit",
      actionValue: "form/teacher/add",
      disabled: true,
    },
    {
      _id: "68d6fbf4c791281c97de0231",
      page: "list/teacher",
      type: "dropdown",
      id: "filterClass",
      label: "Filter Class",
      options: ["All", "10A", "10B", "10C"],
      action: "filter",
      actionValue: "Class",
      enableFor: ["admin", "teacher"],
      order: 2,
      actionUse: "filter",
    },
  ];

  const data = [
    { id: 1, Name: "Alice Johnson", Class: "10A", Status: "Active", Score: 88 },
    { id: 2, Name: "Bob Smith", Class: "10B", Status: "Inactive", Score: 72 },
    { id: 3, Name: "Charlie Lee", Class: "10A", Status: "Active", Score: 95 },
    { id: 4, Name: "Diana Patel", Class: "10C", Status: "Active", Score: 65 },
    { id: 5, Name: "Ethan Kumar", Class: "10B", Status: "Inactive", Score: 78 },
    { id: 6, Name: "Fiona Wang", Class: "10C", Status: "Active", Score: 90 },
  ];

  return (
    <div>
      {/* {HomePageConfig.sections.map((section, idx) => (
        <section key={idx} className={section.styles?.className} style={section.styles?.inlineStyle}>
          {section.title && <h2 className={section.styles?.title?.className} style={section.styles?.title?.inlineStyle}>{section.title}</h2>}
          {section.desc && <p className={section.styles?.desc?.className} style={section.styles?.desc?.inlineStyle}>{section.desc}</p>}

          <div className="flex lg:gap-3 md:gap-2 items-center justify-center flex-wrap md:flex-nowrap lg:flex-nowrap">
            {section.items?.map((config, idx2) => (
              <DynamicRenderer key={idx2} config={config} />
            ))}
          </div>
        </section>
      ))} */}

      <TableComponent
        headers={["Id", "Name", "Class", "Status", "Score"]}
        topHeader={dbTopHeader}
        data={data}
        pagination={true}
        editableFields={[
          { name: "score", type: "inputfield", fieldType: "number" },
        ]}
      />
    </div>
  );
};

export default page;
