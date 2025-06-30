/**
 * Helper function to standardize API responses for MCP server tools
 * @param data - The data to be returned
 * @returns Standardized MCP tool response format
 */
export function formatMcpResponse(data: any) {
    return {
        content: [
            {
                type: "text" as const,
                text: typeof data === 'string' ? data : JSON.stringify(data, null, 2)
            }
        ]
    };
}

/**
 * Helper function to handle API errors and return standardized error response
 * @param error - The error that occurred
 * @returns Standardized MCP tool error response format
 */
export function formatMcpError(error: any) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
        content: [
            {
                type: "text" as const,
                text: `Error: ${errorMessage}`
            }
        ]
    };
}
