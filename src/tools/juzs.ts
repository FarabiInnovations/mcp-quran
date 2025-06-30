import { quran } from "@quranjs/api";
import z from "zod";
import { formatMcpResponse } from "../helper/index.js";

const juzsAllTool = {
  name: "all_juzs",
  description: "Get all juzs (parts) of the Quran",
  inputSchema: {},
  execute: async (args: {}, extra: any) => {
    const result = await quran.v4.juzs.findAll();
    return formatMcpResponse(result);
  }
};

export { juzsAllTool }; 