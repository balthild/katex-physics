import { popNextArg } from "../util";

export default {
    "\\bra"(ctx) {
        let expr = ["\\left<{" + popNextArg(ctx)];

        while (ctx.future().text === " ") {
            ctx.popToken();
        }

        if (ctx.future().text !== "\\ket") {
            expr.push("}\\right|");
            return expr.join(" ");
        }

        // \bra{a}\ket{b} => \left<{a}\middle|{b}\right>
        ctx.popToken();
        expr.push("}\\middle|{");
        expr.push(popNextArg(ctx));
        expr.push("}\\right>");

        return expr.join(" ");
    },
    "\\ket": "\\left|{#1}\\right>",
    "\\braket"(ctx) {
        const a = popNextArg(ctx);

        let expr = ["\\left<{" + a + "}\\middle|{"];

        try {
            expr.push(popNextArg(ctx));
        } catch (e) {
            expr.push(a);
        }

        expr.push("}\\right>");
        return expr.join(" ");
    },
    "\\ketbra"(ctx) {
        const a = popNextArg(ctx);

        let expr = ["\\left|{" + a + "}\\middle>\\middle<{"];

        try {
            expr.push(popNextArg(ctx));
        } catch (e) {
            expr.push(a);
        }

        expr.push("}\\right|");
        return expr.join(" ");
    },
    "\\expval"(ctx) {
        const a = popNextArg(ctx);

        while (ctx.future().text === " ") {
            ctx.popToken();
        }
        if (ctx.future().text !== "{") {
            return "\\left<{" + a + "}\\right>";
        }

        const b = popNextArg(ctx);
        return "\\left<{" + b + "}\\middle|{" + a + "}\\middle|{" + b + "}\\right>";
    },
    "\\matrixel"(ctx) {
        const [a, b, c] = ctx.consumeArgs(3).map(arg => arg.reverse().map(t => t.text).join(""));

        return "\\left<{" + a + "}\\middle|{" + b + "}\\middle|{" + c + "}\\right>";
    },
};
