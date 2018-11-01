import { isAlt, popNextArg } from "../util";

export default {
    "\\qc": ",\\quad",
    "\\qq": ctx => (isAlt(ctx) ? "" : "\\quad") + "\\text{" + popNextArg() + "}\\quad",
    "\\qcc": ctx => (isAlt(ctx) ? "" : "\\quad") + "\\text{c.c.}\\quad",
    "\\qif": ctx => (isAlt(ctx) ? "" : "\\quad") + "\\text{if}\\quad",
};
