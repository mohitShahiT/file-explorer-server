# File Explorer Server

A simple Express.js server that simulates a file explorer's backend. It supports creating folders and files, retrieving folder contents, and fetching file details. The data is stored in-memory and is reset on each server restart.

## Features

- Create folders and files with unique names and supported extensions
- Retrieve folder contents by path
- Fetch file details by ID
- CORS enabled for cross-origin requests

## Project Structure

```
.
├── src/
│   ├── fileRouter.ts      # File-related API routes
│   ├── folder.ts          # In-memory folder and file storage
│   ├── folderRouter.ts    # Folder-related API routes
│   ├── index.ts           # Server entry point
│   ├── types.ts           # TypeScript types and enums
│   ├── utils.ts           # Utility functions for file/folder operations
├── package.json
├── tsconfig.json
├── nodemon.json
├── .nvmrc
├── .gitignore
```

## Getting Started

### Prerequisites

- Node.js (see `.nvmrc` for version)
- npm

### Installation

```sh
npm install
```

### Development

Start the server in development mode (with auto-reload):

```sh
npm run dev
```

### Build

Compile TypeScript to JavaScript:

```sh
npm run build
```

### Production

Start the compiled server:

```sh
npm start
```

## API Endpoints

### Folder Endpoints

- `GET /api/folder?path=root/Documents`  
  Get folder contents by path. Path must start with `root`.

- `POST /api/folder`  
  Create a new folder.  
  **Body:**  
  ```json
  {
    "id": "parentFolderId",
    "name": "New Folder Name"
  }
  ```

### File Endpoints

- `GET /api/file/:id`  
  Get file details by file ID.

- `POST /api/file`  
  Create a new file.  
  **Body:**  
  ```json
  {
    "fileName": "example.txt",
    "parentId": "parentFolderId"
  }
  ```

### Test Endpoint

- `GET /test`  
  Returns a simple status message.

## Notes

- All data is stored in-memory and will be reset when the server restarts.
- Only certain file extensions are supported (see [`FileKinds`](src/types.ts)).

## License

ISC