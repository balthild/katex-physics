import { getSqureParameter, isAlt, popNextArg } from "../util";

const matrixBraces = {
    "(": ")",
    "[": "]",
    "{": "}",
    "\\{": "\\}",
    "|": "|"
};

export default {
    "\\mqty"(ctx) {
        const start = ctx.popToken().text;
        const end = matrixBraces[start];
        if (typeof end === "undefined") {
            throw new Error("Expecting opening delimeters after \\qty");
        }

        let expr = ["\\left"];
        expr.push(start === "{" ? "\\{" : start);
        expr.push("\\begin{matrix}");

        let opened = 0;
        while (true) {
            const next = ctx.popToken().text;
            if (next === "EOF") {
                throw new Error("Expecting closing delimeters " + end + " after \\mqty");
            } else if (next !== end) {
                expr.push(next);
                if (next === start) {
                    ++opened;
                }
            } else if (opened > 0) {
                expr.push(next);
                --opened;
            } else {
                // end
                expr.push("\\end{matrix}\\right");
                expr.push(end === "}" ? "\\}" : next);
                break;
            }
        }

        return expr.join(" ");
    },
    "\\mdet": "\\left|\\begin{matrix}{#1}\\end{matrix}\\right|",
    "\\dmat"(ctx) {
        const fill = getSqureParameter(ctx);
        const elements = popNextArg(ctx).split(",");
        const lines = [];

        for (let i = 0; i < elements.length; ++i) {
            let line = new Array(elements.length).fill(fill);
            line[i] = elements[i];
            lines.push(line.map(el => "{" + el + "}").join("&"));
        }

        return lines.join("\\\\");
    },
    "\\admat"(ctx) {
        const fill = getSqureParameter(ctx);
        const elements = popNextArg(ctx).split(",");
        const lines = [];

        for (let i = 0; i < elements.length; ++i) {
            let line = new Array(elements.length).fill(fill);
            line[elements.length - i - 1] = elements[i];
            lines.push(line.map(el => "{" + el + "}").join("&"));
        }

        return lines.join("\\\\");
    },
    "\\imat"(ctx) {
        const n = parseInt(popNextArg(ctx));
        if (isNaN(n)) {
            throw new Error("Expecting integers as the parameter of \\imat");
        }
        return "\\dmat[0]{" + new Array(n).fill(1).join(",") + "}";
    },
    "\\xmat"(ctx) {
        const labeled = isAlt(ctx);
        const [x, n, m] = [
            popNextArg(ctx),
            parseInt(popNextArg(ctx)),
            parseInt(popNextArg(ctx)),
        ];

        if (isNaN(n) || isNaN(m)) {
            throw new Error("Expecting integers as the second and third parameter of \\xmat");
        }

        if (!labeled || (n === 1 && m === 1)) {
            return new Array(n).fill(new Array(m).fill(x).join("&")).join("\\\\");
        }

        const matrix = [];
        for (let i = 1; i <= n; ++i) {
            const row = [];
            for (let j = 1; j <= m; ++j) {
                let label = "" + (n > 1 ? i : "") + (m > 1 ? j : "");
                row.push(x + "_{" + label + "}")
            }
            matrix.push(row);
        }

        return matrix.map(row => row.join(",")).join("\\\\")
    },
}
