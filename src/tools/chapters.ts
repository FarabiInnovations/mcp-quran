import { quran, ChapterId, Language } from "@quranjs/api";
import z from "zod";

// Define the chapter options type based on the SDK
type ChapterOptions = Partial<{
  language: Language;
}>;

const chaptersAllTool = {
    name: "all_chapters",
    description: "Get all information about Quran chapters",
    inputSchema: {
        options: z.object({
        language: z.nativeEnum(Language).optional().describe("Language for the response"),
        }).optional().describe("Additional options for chapters"),
    },
    execute: async (args: { options?: ChapterOptions }, extra: any) => {
        const result = await quran.v4.chapters.findAll(args.options);
        return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
};

const chaptersByIdTool = {
    name: "chapter_by_id",
    description: "Get information about a Quran chapter by id",
    inputSchema: {
        id: z.number().describe("The ID of the chapter to get information about"),
        options: z.object({
          language: z.nativeEnum(Language).optional().describe("Language for the response"),
        }).optional().describe("Additional options for the chapter"),
    },
    execute: async (args: { id: number; options?: ChapterOptions }, extra: any) => {
        const result = await quran.v4.chapters.findById(args.id as ChapterId, args.options);
        return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
};

export { chaptersAllTool, chaptersByIdTool };