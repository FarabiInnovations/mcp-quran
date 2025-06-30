import { quran, VerseKey, ChapterId, PageNumber, JuzNumber, HizbNumber, RubNumber, Language } from "@quranjs/api";
import z from "zod";
import { formatMcpResponse } from "../helper/index.js";

// Define the verse options type based on the SDK
type VerseOptions = Partial<{
  language: Language;
  reciter: string | number;
  words: boolean;
  translations: number[] | string[];
  tafsirs: number[] | string[];
  page: number;
  perPage: number;
}>;

const verseByKeyTool = {
  name: "verse_by_key",
  description: "Get a verse by chapter:verse key (e.g., 1:1)",
  inputSchema: {
    key: z.string().describe("The verse key in format 'chapter:verse' (e.g., '1:1')"),
    options: z.object({
      language: z.nativeEnum(Language).optional().describe("Language for the response"),
      reciter: z.union([z.string(), z.number()]).optional().describe("Reciter ID or name"),
      words: z.boolean().optional().describe("Include word-by-word breakdown"),
      translations: z.array(z.union([z.string(), z.number()])).optional().describe("Translation IDs to include"),
      tafsirs: z.array(z.union([z.string(), z.number()])).optional().describe("Tafsir IDs to include"),
      page: z.number().optional().describe("Page number for pagination"),
      perPage: z.number().optional().describe("Number of results per page"),
    }).describe("Additional options for the verse"),
  },
  execute: async (args: { key: string; options?: VerseOptions }, extra: any) => {
    const result = await quran.v4.verses.findByKey(args.key as VerseKey, args.options);
    return formatMcpResponse(result);
  }
};

const versesByChapterTool = {
  name: "verses_by_chapter",
  description: "Get verses by chapter ID",
  inputSchema: {
    chapterId: z.number().describe("The chapter ID (1-114)"),
    options: z.object({
      language: z.nativeEnum(Language).optional().describe("Language for the response"),
      reciter: z.union([z.string(), z.number()]).optional().describe("Reciter ID or name"),
      words: z.boolean().optional().describe("Include word-by-word breakdown"),
      translations: z.array(z.union([z.string(), z.number()])).optional().describe("Translation IDs to include"),
      tafsirs: z.array(z.union([z.string(), z.number()])).optional().describe("Tafsir IDs to include"),
      page: z.number().optional().describe("Page number for pagination"),
      perPage: z.number().optional().describe("Number of results per page"),
    }).optional().describe("Additional options for the verses"),
  },
  execute: async (args: { chapterId: number; options?: VerseOptions }, extra: any) => {
    const result = await quran.v4.verses.findByChapter(args.chapterId as ChapterId, args.options);
    return formatMcpResponse(result);
  }
};

const versesByPageTool = {
  name: "verses_by_page",
  description: "Get verses by page number",
  inputSchema: {
    page: z.number().describe("The page number"),
    options: z.object({
      language: z.nativeEnum(Language).optional().describe("Language for the response"),
      reciter: z.union([z.string(), z.number()]).optional().describe("Reciter ID or name"),
      words: z.boolean().optional().describe("Include word-by-word breakdown"),
      translations: z.array(z.union([z.string(), z.number()])).optional().describe("Translation IDs to include"),
      tafsirs: z.array(z.union([z.string(), z.number()])).optional().describe("Tafsir IDs to include"),
      page: z.number().optional().describe("Page number for pagination"),
      perPage: z.number().optional().describe("Number of results per page"),
    }).optional().describe("Additional options for the verses"),
  },
  execute: async (args: { page: number; options?: VerseOptions }, extra: any) => {
    const result = await quran.v4.verses.findByPage(args.page as PageNumber, args.options);
    return formatMcpResponse(result);
  }
};

const versesByJuzTool = {
  name: "verses_by_juz",
  description: "Get verses by juz number",
  inputSchema: {
    juz: z.number().describe("The juz number (1-30)"),
    options: z.object({
      language: z.nativeEnum(Language).optional().describe("Language for the response"),
      reciter: z.union([z.string(), z.number()]).optional().describe("Reciter ID or name"),
      words: z.boolean().optional().describe("Include word-by-word breakdown"),
      translations: z.array(z.union([z.string(), z.number()])).optional().describe("Translation IDs to include"),
      tafsirs: z.array(z.union([z.string(), z.number()])).optional().describe("Tafsir IDs to include"),
      page: z.number().optional().describe("Page number for pagination"),
      perPage: z.number().optional().describe("Number of results per page"),
    }).optional().describe("Additional options for the verses"),
  },
  execute: async (args: { juz: number; options?: VerseOptions }, extra: any) => {
    const result = await quran.v4.verses.findByJuz(args.juz as JuzNumber, args.options);
    return formatMcpResponse(result);
  }
};

const versesByHizbTool = {
  name: "verses_by_hizb",
  description: "Get verses by hizb number",
  inputSchema: {
    hizb: z.number().describe("The hizb number"),
    options: z.object({
      language: z.nativeEnum(Language).optional().describe("Language for the response"),
      reciter: z.union([z.string(), z.number()]).optional().describe("Reciter ID or name"),
      words: z.boolean().optional().describe("Include word-by-word breakdown"),
      translations: z.array(z.union([z.string(), z.number()])).optional().describe("Translation IDs to include"),
      tafsirs: z.array(z.union([z.string(), z.number()])).optional().describe("Tafsir IDs to include"),
      page: z.number().optional().describe("Page number for pagination"),
      perPage: z.number().optional().describe("Number of results per page"),
    }).optional().describe("Additional options for the verses"),
  },
  execute: async (args: { hizb: number; options?: VerseOptions }, extra: any) => {
    const result = await quran.v4.verses.findByHizb(args.hizb as HizbNumber, args.options);
    return formatMcpResponse(result);
  }
};

const versesByRubTool = {
  name: "verses_by_rub",
  description: "Get verses by rub number",
  inputSchema: {
    rub: z.number().describe("The rub number"),
    options: z.object({
      language: z.nativeEnum(Language).optional().describe("Language for the response"),
      reciter: z.union([z.string(), z.number()]).optional().describe("Reciter ID or name"),
      words: z.boolean().optional().describe("Include word-by-word breakdown"),
      translations: z.array(z.union([z.string(), z.number()])).optional().describe("Translation IDs to include"),
      tafsirs: z.array(z.union([z.string(), z.number()])).optional().describe("Tafsir IDs to include"),
      page: z.number().optional().describe("Page number for pagination"),
      perPage: z.number().optional().describe("Number of results per page"),
    }).optional().describe("Additional options for the verses"),
  },
  execute: async (args: { rub: number; options?: VerseOptions }, extra: any) => {
    const result = await quran.v4.verses.findByRub(args.rub as RubNumber, args.options);
    return formatMcpResponse(result);
  }
};

const randomVerseTool = {
  name: "random_verse",
  description: "Get a random verse from the Quran",
  inputSchema: {
    options: z.object({
      language: z.nativeEnum(Language).optional().describe("Language for the response"),
      reciter: z.union([z.string(), z.number()]).optional().describe("Reciter ID or name"),
      words: z.boolean().optional().describe("Include word-by-word breakdown"),
      translations: z.array(z.union([z.string(), z.number()])).optional().describe("Translation IDs to include"),
      tafsirs: z.array(z.union([z.string(), z.number()])).optional().describe("Tafsir IDs to include"),
    }).optional().describe("Additional options for the verse"),
  },
  execute: async (args: { options?: VerseOptions }, extra: any) => {
    const result = await quran.v4.verses.findRandom(args.options);
    return formatMcpResponse(result);
  }
};

export { 
  verseByKeyTool,
  versesByChapterTool, 
  versesByPageTool, 
  versesByJuzTool, 
  versesByHizbTool, 
  versesByRubTool, 
  randomVerseTool 
}; 