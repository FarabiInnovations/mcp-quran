import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { chaptersAllTool, chaptersByIdTool } from "./tools/chapters.js";
import { verseByKeyTool, versesByChapterTool, versesByPageTool, versesByJuzTool, versesByHizbTool, versesByRubTool, randomVerseTool } from "./tools/verses.js";
import { searchQuranTool } from "./tools/search.js";
import { juzsAllTool } from "./tools/juzs.js";
import { formatMcpError } from "./helper/index.js";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { parse } from "url";

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
  instructions: "This is a MCP server for the Quran. It provides tools to get information about Chapters, Verses, and Juzs. Search tool is available to search the Quran for specific text. Or get a random verse.",
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

// Store active transport instances
const activeTransports = new Map<string, SSEServerTransport>();

async function main() {
  try {
    // Determine transport based on environment
    const isProduction = process.env.NODE_ENV === 'production';
    const useSSE = process.env.USE_SSE === 'true' || isProduction;
    
    if (useSSE) {
      // Use SSE for production/deployment
      const port = parseInt(process.env.PORT || '8080', 10);
      const host = process.env.HOST || '0.0.0.0';
      
      // Create HTTP server for SSE
      const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
        const parsedUrl = parse(req.url || '', true);
        const pathname = parsedUrl.pathname;
        const sessionId = parsedUrl.query.sessionId as string;
        
        if (req.method === 'GET' && pathname === '/mcp') {
          // Handle SSE connection
          const transport = new SSEServerTransport('/mcp', res);
          activeTransports.set(transport.sessionId, transport);
          
          // Set up transport event handlers
          transport.onclose = () => {
            activeTransports.delete(transport.sessionId);
          };
          
          transport.onerror = (error) => {
            console.error('Transport error:', error);
            activeTransports.delete(transport.sessionId);
          };
          
          await server.connect(transport);
        } else if (req.method === 'POST' && pathname === '/mcp' && sessionId) {
          // Handle POST messages
          const transport = activeTransports.get(sessionId);
          if (!transport) {
            res.writeHead(404).end('Session not found');
            return;
          }
          
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', async () => {
            try {
              const parsedBody = JSON.parse(body);
              await transport.handlePostMessage(req, res, parsedBody);
            } catch (error) {
              res.writeHead(400).end('Invalid JSON');
            }
          });
        } else {
          res.writeHead(404).end('Not Found');
        }
      });
      
      httpServer.listen(port, host, () => {
        console.log(`MCP Quran Server running on SSE at http://${host}:${port}/mcp`);
      });
    } else {
      // Use STDIO for local development
      const transport = new StdioServerTransport();
      console.log("MCP Quran Server running on STDIO (local development)");
      await server.connect(transport);
    }
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
