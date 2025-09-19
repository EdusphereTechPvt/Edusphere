"use client"

import { Button } from "@mui/material";
import { HomePageConfig } from "../../config/HomePageConfig";
import CardComponent from "@/app/components/CardComponent/Index";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  function DynamicRenderer({ config }) {
    switch (config.type) {
      case "text":
        const Tag = config.tag;
        return <Tag className={config.styles.className} style={config.styles.inlineStyle}>{config.value}</Tag>;

      case "buttonGroup":
        return (
          <div className={config.styles.className} style={config.styles.inlineStyle}>
            {config.buttons.map((btn, idx) => (
              <Button key={idx} className={btn.styles.className} variant={btn.variant || 'contained'} sx={btn.styles.inlineStyle} onClick={()=>router.push(btn.action)}>{btn.text}</Button>
            ))}
          </div>
        );

      case "overlayImage":
        return (
          <div className={config.styles.className} style={{ position: "relative", ...config.styles.inlineStyle }}>
            <img src={config.value.imageUrl} className={config.styles.imgStyle.className} style={config.styles.imgStyle.inlineStyle} />

            {(config.value.text || config.value.desc) && (
              <div style={config.styles.containerStyle.inlineStyle} className={config.styles.containerStyle.className}>
                {config.value.text && <h1 className={config.styles.containerStyle.textStyle.className} style={config.styles.containerStyle.textStyle.inlineStyle}>{config.value.text}</h1>}
                {config.value.desc && <p className={config.styles.containerStyle.descStyle.className} style={config.styles.containerStyle.descStyle.inlineStyle}>{config.value.desc}</p>}
                {config.value.buttons && (
                  <div className={config.styles.containerStyle.btnCotainerStyle.className} style={config.styles.containerStyle.btnCotainerStyle.inlineStyle}>
                    {config.value.buttons.map((btn, idx) => (
                      <Button key={idx} className={btn.styles.className} variant={btn.variant || 'contained'} sx={btn.styles.inlineStyle}>{btn.text}</Button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "card":
        return <CardComponent data={config.data} />

      default: null
    }
  }

  return (
    <div>
      {HomePageConfig.sections.map((section, idx) => (
        <section key={idx} className={section.styles?.className} style={section.styles?.inlineStyle}>
          {section.title && <h2 className={section.styles?.title?.className} style={section.styles?.title?.inlineStyle}>{section.title}</h2>}
          {section.desc && <p className={section.styles?.desc?.className} style={section.styles?.desc?.inlineStyle}>{section.desc}</p>}

          <div className="flex lg:gap-3 md:gap-2 items-center justify-center flex-wrap md:flex-nowrap lg:flex-nowrap">
            {section.items?.map((config, idx2) => (
              <DynamicRenderer key={idx2} config={config} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default page