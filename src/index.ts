import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { chaptersAllTool, chaptersByIdTool } from "./tools/chapters.js";
import { verseByKeyTool, versesByChapterTool, versesByPageTool, versesByJuzTool, versesByHizbTool, versesByRubTool, randomVerseTool } from "./tools/verses.js";
import { searchQuranTool } from "./tools/search.js";
import { juzsAllTool } from "./tools/juzs.js";
import { formatMcpError } from "./helper/index.js";

const USER_AGENT = "quran-app/1.0";

// Define the Tool interface
interface Tool {
  name: string;
  description: string;
  inputSchema: any;
  execute: (args: any, extra: any) => Promise<any>;
}

// Create server instance
const server = new McpServer({
  name: "quran",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Helper function to register a tool with proper typing
function registerTool(tool: Tool) {
  server.tool(
    tool.name,
    tool.description,
    tool.inputSchema,
    tool.execute
  );
}

// All tools array with proper typing
const allTools: Tool[] = [
  chaptersAllTool,
  chaptersByIdTool,
  verseByKeyTool,
  versesByChapterTool,
  versesByPageTool,
  versesByJuzTool,
  versesByHizbTool,
  versesByRubTool,
  randomVerseTool,
  searchQuranTool,
  juzsAllTool,
];

// Register all tools
allTools.forEach(registerTool);

async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } catch (error) {
    console.error("Fatal error in main():", error);
    process.exit(1);
  }
}

main().catch((error) => {
  formatMcpError(error);
  console.error("Fatal error in main():", error);
  process.exit(1);
});
