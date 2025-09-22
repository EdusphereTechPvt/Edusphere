
export const includeRoutes = ['/','/demo', '/contact', '/privacy', '/pricing', '/help'];

const generalConfig = {
  header: {
    styles: {
      inlineStyle: {
        display: "flex",
        justifyContent: {lg:"space-between"},
        alignItems: "center",
        py: {xs:"0.4rem", sm:"0.6rem", md:"0.8rem", lg:"1rem"},
        px: {xs:"0.7rem", sm:"0.8rem", md:"1.4rem", lg:"2rem"},
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1100,
      },
      drawerStyle:{
        inlineStyle:{
            width: "17rem",
            alignItems: "center"
        }
      },
    },
    sections: [
      {
        position: "start",
        type: "logo",
        logoUrl: "https://placehold.co/600x400",
        name: "Edushpere",
        styles: {
          inlineStyle: {
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          },
          imgStyle: {
            inlineStyle: {
              // width: {lg:"1rem"}
            },
            className: "w-[3.5rem]",
          },
          nameStyle: {
            inlineStyle: {
              fontSize: { lg: "1.1rem" },
              fontWeight: "bold",
              color: "black",
            },
            className: "",
          },
        },
      },
      {
        position: "center",
        type: "navigate",
        navItems: [],
        styles: {
          inlineStyle: {
            flexDirection: {xs:"column", lg:"row"},
            gap: {xs:"1.5rem", lg:"2em"},
            px: {xs:"1.5rem", md:"0rem"}
          },
            navStyle:{inlineStyle: { color: "black" , fontWeight:'500', fontSize:'1.2rem'}, className: "" }
        },
      },
      {
        position: "end",
        type: "action",
        buttons: [
          {
            variant: "contained",
            text: "Request a Demo",
            onclick: () => window.location.href = "http://localhost:3000/demo",
            styles: {
                inlineStyle:{
                   textTransform: 'none',
                   fontSize: {xs:"0.7rem", lg:'0.9rem'},
                   fontWeight: "bold"
                }
            },
          },
          {
            variant: "contained",
            text: "Sign Up Now",
            onclick: () => window.location.href = "http://localhost:3000/signup",
           styles: {
                inlineStyle:{
                   textTransform: 'none',
                     fontSize: {xs:"0.7rem",  lg:'0.9rem'},
                   backgroundColor: "#e8eef3",
                   color:"black",
                   fontWeight: "bold",         
                }
            },
          },
        ],
        styles:{
          inlineStyle:{
            justifyContent:"center",
            mt:{xs:"2rem", md: "0rem"}
          }
        }
      },
    ],
  },

  footer: {},
};


export default generalConfig;