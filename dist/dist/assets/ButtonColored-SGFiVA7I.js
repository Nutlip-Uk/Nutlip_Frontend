import{C as e,g as l,c as o,s as n,j as a,B as s}from"./index-GxelU0FC.js";const t=e`
    :after {
        background-color: ${l("light",90)};
    }

    :hover {
        :after {
            background-color: ${l("light",70)};
        }
    }

    :active {
        :after {
            background-color: ${l("light",50)};
        }
    }
`,d=e`
    background-color: ${o.red40};
    border-color: ${o.red40};
    color: ${o.red40};

    :focus {
        box-shadow: 0px 0px 0px 2px ${o.navy30};
    }

    svg {
        fill: ${o.red40};
    }

    ${t}
`,$=e`
    background-color: ${o.mint40};
    border-color: ${o.mint40};
    color: ${o.mint40};

    :focus {
        box-shadow: 0px 0px 0px 2px ${o.navy30};
    }

    svg {
        fill: ${o.mint40};
    }

    ${t}
`,u=e`
    background-color: ${o.navy40};
    border-color: ${o.navy40};
    color: ${o.navy40};

    :focus {
        box-shadow: 0px 0px 0px 2px ${o.navy30};
    }

    svg {
        fill: ${o.navy40};
    }

    ${t}
`,i=e`
    background-color: ${o.yellow50};
    border-color: ${o.yellow50};
    color: ${o.yellow50};

    :focus {
        box-shadow: 0px 0px 0px 2px ${o.navy30};
    }

    svg {
        fill: ${o.yellow50};
    }

    ${t}
`,x=r=>{switch(r){case"red":return d;case"green":return $;case"blue":return u;case"yellow":return i;default:return}},p=n(s)`
    :after {
        background-color: ${l("dark",0)};
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
        border-radius: 10px;
    }

    ${({color:r})=>r&&x(r)}
`;var b={ButtonColoredStyled:p};const{ButtonColoredStyled:g}=b,f=({color:r,...c})=>a(g,{color:r,...c});export{f as default};
