import { getSqureParameter, popNextArg } from "../util";

const isDigit = /^\d+$/;
const dd = (n, f) => "\\dd[" + n + "]{" + f + "}";
const pd = (n, f) => "\\pd[" + n + "]{" + f + "}";

export default {
    "\\dd"(ctx) {
        const n = getSqureParameter(ctx);

        let op = "\\mathrm{d}";
        if (n && !isDigit.test(n) || n > 1) {
            op += "^{" + n + "}";
        }

        if (ctx.future().text !== "{") {
            return op;
        }

        try {
            const ch = popNextArg(ctx);
            return "\\mathop{}\\!" + op + "{" + ch + "}";
        } catch (e) {
            return op;
        }
    },
    "\\pd"(ctx) {
        const n = getSqureParameter(ctx);

        let op = "\\partial";
        if (n && !isDigit.test(n) || n > 1) {
            op += "^{" + n + "}";
        }

        if (ctx.future().text !== "{") {
            return op;
        }

        try {
            const ch = popNextArg(ctx);
            return "\\mathop{}\\!" + op + "{" + ch + "}";
        } catch (e) {
            return op;
        }
    },
    "\\dv"(ctx) {
        const n = getSqureParameter(ctx);
        const fn = popNextArg(ctx);

        while (ctx.future().text === " ") {
            ctx.popToken();
        }
        if (ctx.future().text !== "{") {
            return "\\frac{\\dd^{" + n + "}}{" + dd(1, fn) + "^{" + n + "}}";
        }

        let variable;
        try {
            variable = popNextArg(ctx);
        } catch (e) {}

        return "\\frac{" + dd(n, fn) + "}{" + dd(1, variable) + "^{" + n + "}}";
    },
    "\\pdv"(ctx) {
        const n = getSqureParameter(ctx);
        const fn = popNextArg(ctx);

        if (n) {
            while (ctx.future().text === " ") {
                ctx.popToken();
            }
            if (ctx.future().text !== "{") {
                return "\\frac{\\pd^{" + n + "}}{" + pd(1, fn) + "^{" + n + "}}";
            }

            let variable;
            try {
                variable = popNextArg(ctx);
            } catch (e) {}

            return "\\frac{" + pd(n, fn) + "}{" + pd(1, variable) + "^{" + n + "}}";
        }

        const args = [];
        while (true) {
            while (ctx.future().text === " ") {
                ctx.popToken();
            }
            if (ctx.future().text !== "{") {
                break;
            }

            try {
                args.push(popNextArg(ctx));
            } catch (e) {
                break;
            }
        }

        if (args.length === 0) {
            return "\\frac{\\partial}{" + pd(args.length, fn) + "}"
        }

        return "\\frac{" + pd(args.length, fn) + "}{" +
            args.map(arg => pd(1, arg)).join("") + "}"
    },
};
