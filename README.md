# MCP Quran Server

<div align="center">
  <img src="media/logo.png" alt="MCP Quran Server Logo" width="200"/>
  
  [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
</div>

A Model Context Protocol (MCP) server that provides comprehensive access to the Quran through the [QuranJS API](https://quranjs.com/). This server enables AI assistants and applications to retrieve Quranic content including chapters, verses, translations, tafsirs, and more.

## 🌟 Features

- **Complete Quran Access**: All 114 chapters and 6,236 verses
- **Multiple Retrieval Methods**: By chapter, verse key, page, juz, hizb, rub
- **Rich Content**: Arabic text, translations, tafsirs, word-by-word breakdown
- **Search Functionality**: Full-text search across the Quran
- **Audio Support**: Recitation options and audio files
- **Type Safety**: Full TypeScript support with proper SDK types
- **MCP Compliance**: Standard Model Context Protocol implementation

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/mcp-quran.git
cd mcp-quran

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run in debug mode with MCP Inspector
pnpm debug
```

## 🚀 Quick Start

### Basic Usage

The MCP Quran server provides tools for accessing Quranic content. Here are some examples:

#### Get All Chapters
```json
{
  "name": "all_chapters",
  "arguments": {}
}
```

#### Get Verses by Chapter
```json
{
  "name": "verses_by_chapter",
  "arguments": {
    "chapterId": 1,
    "options": {
      "language": "en",
      "translations": [131, 85],
      "words": true
    }
  }
}
```

#### Search the Quran
```json
{
  "name": "search_quran",
  "arguments": {
    "query": "mercy",
    "options": {
      "language": "en",
      "size": 10,
      "page": 1
    }
  }
}
```

## ��️ Available Tools

This MCP server exposes the following tools that correspond to the QuranJS API endpoints:

### 📖 Chapters
- `all_chapters` - Get all chapters
- `chapter_by_id` - Get chapter by ID

### 📜 Verses
- `verse_by_key` - Get verse by chapter:verse key
- `verses_by_chapter` - Get verses by chapter ID
- `verses_by_page` - Get verses by page number
- `verses_by_juz` - Get verses by juz number
- `verses_by_hizb` - Get verses by hizb number
- `verses_by_rub` - Get verses by rub number
- `random_verse` - Get a random verse

### 🔍 Search
- `search_quran` - Search the Quran

### 📚 Juzs
- `all_juzs` - Get all juzs

## 📚 API Documentation

For detailed information about the available parameters, options, and response formats, please refer to the official QuranJS API documentation:

- **[QuranJS API Documentation](https://quranjs.com/)** - Complete API reference
- **[Chapters API](https://quranjs.com/chapters)** - Chapter-related endpoints
- **[Verses API](https://quranjs.com/verses)** - Verse-related endpoints
- **[Search API](https://quranjs.com/search)** - Search functionality
- **[Juzs API](https://quranjs.com/juzs)** - Juz-related endpoints

The MCP tools follow the same parameter structure and options as the QuranJS API.

## 🌐 Supported Languages

The server supports multiple languages through the `Language` enum. See the [QuranJS Language documentation](https://quranjs.com/languages) for the complete list of supported languages.

## 🔧 Configuration

### MCP Client Configuration

Add this to your MCP client configuration:

```json
{
  "mcpServers": {
    "quran": {
      "command": "node",
      "args": ["/path/to/your/mcp-quran/build/index.js"],
      "env": {}
    }
  }
}
```
## 🏗️ Architecture

The server is built with:

- **TypeScript**: For type safety and better development experience
- **Model Context Protocol SDK**: For MCP compliance
- **QuranJS API**: For Quranic data access
- **Zod**: For runtime validation
- **pnpm**: For package management

### Project Structure

```
mcp-quran/
├── src/
│   ├── index.ts          # Main server entry point
│   ├── tools/            # MCP tools implementation
│   │   ├── chapters.ts   # Chapter-related tools
│   │   ├── verses.ts     # Verse-related tools
│   │   ├── search.ts     # Search functionality
│   │   └── juzs.ts       # Juz-related tools
│   └── helper/           # Helper functions
├── media/
│   └── logo.png          # Project logo
├── build/                # Compiled JavaScript
└── package.json          # Project configuration
```

## 🧪 Development

### Setup Development Environment

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run in debug mode with MCP Inspector
pnpm debug
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🙏 Acknowledgments

- [QuranJS API](https://quranjs.com/) for providing the Quranic data
- [Model Context Protocol](https://modelcontextprotocol.io/) for the MCP specification
- The open-source community for inspiration and support

## 📞 Support

If you encounter any issues or have questions:

- Open an issue on GitHub
- Check the [QuranJS documentation](https://quranjs.com/)
- Review the [MCP specification](https://modelcontextprotocol.io/)

---

<div align="center">
  Made with ❤️ for the Quranic community
</div>
