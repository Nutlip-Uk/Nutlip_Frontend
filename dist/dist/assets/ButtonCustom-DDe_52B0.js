import{k as e,h as t,e as n,l as a}from"./index-GxelU0FC.js";const u=e(a)`
    background-color: ${r=>{var o;return(o=r.customize)==null?void 0:o.backgroundColor}};
    border-radius: ${r=>{var o;return(o=r.customize)==null?void 0:o.borderRadius}};
    border: ${r=>{var o;return(o=r.customize)==null?void 0:o.border}};
    font-size: ${r=>{var o;return(o=r.customize)==null?void 0:o.fontSize}};
    font-weight: ${r=>{var o;return(o=r.customize)==null?void 0:o.fontWeight}};
    padding: ${r=>{var o;return(o=r.customize)==null?void 0:o.padding}};
    margin: ${r=>{var o;return(o=r.customize)==null?void 0:o.margin}};

    span {
        color: ${r=>{var o;return(o=r.customize)==null?void 0:o.color}};
        font-size: ${r=>{var o;return(o=r.customize)==null?void 0:o.fontSize}};
    }

    svg {
        fill: ${r=>{var o;return(o=r.customize)==null?void 0:o.color}};
    }

    :after {
        background-color: transparent;
        content: '';
        display: block;
        height: 100%;
        left: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        transition: all 0.3s ease;
        width: 100%;
        z-index: 0;
    }

    :hover {
        background-color: ${r=>{var o;return(o=r.customize)==null?void 0:o.backgroundColor}};

        :after {
            background-color: ${r=>{var o;return((o=r.customize)==null?void 0:o.onHover)==="lighten"?t("light",20):t("dark",20)}};
        }
    }

    :active {
        :after {
            background-color: ${r=>{var o;return((o=r.customize)==null?void 0:o.onHover)==="lighten"?t("light",40):t("dark",40)}};
        }
    }
`;var l={ButtonCustomStyled:u};const{ButtonCustomStyled:i}=l,d=({customize:r,...o})=>n(i,{customize:r,...o});export{d as default};
