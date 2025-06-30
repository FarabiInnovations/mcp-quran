import { quran, Language } from "@quranjs/api";
import z from "zod";
import { formatMcpResponse } from "../helper/index.js";

// Define the search options type based on the SDK
type SearchOptions = Partial<{
  language: Language;
  size: number;
  page: number;
}>;

const searchQuranTool = {
  name: "search_quran",
  description: "Search the Quran for specific text",
  inputSchema: {
    query: z.string().describe("The search query"),
    options: z.object({
      language: z.nativeEnum(Language).optional().describe("Language for the response"),
      size: z.number().optional().describe("Number of results per page"),
      page: z.number().optional().describe("Page number for pagination"),
    }).optional().describe("Additional options for the search"),
  },
  execute: async (args: { query: string; options?: SearchOptions }, extra: any) => {
    const result = await quran.v4.search.search(args.query, args.options);
    return formatMcpResponse(result);
  }
};

export { searchQuranTool }; 