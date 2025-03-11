# JournalTags - URL Shortener

JournalTags is a simple URL shortening application built with modern web technologies. It allows users to create shortened URLs with 5-digit alphanumeric codes and easily access the original URLs using these codes.

## Features

- Shorten any valid URL to a 5-digit alphanumeric code
- Prevent duplicate entries by returning existing codes for previously shortened URLs
- Smart URL validation that handles trailing slashes and different protocols
- Direct access to original URLs via code in the URL path (e.g., `http://localhost:3000/5s5w4`)
- Search functionality to find shortened URLs by code
- Interstitial page with a 5-second countdown before redirection
- Space for future banner advertisements

## Tech Stack

- **Frontend**: React with TypeScript, Next.js
- **Styling**: Tailwind CSS with ShadCN UI components
- **API**: tRPC for type-safe API communication
- **Database**: MongoDB (containerized with Docker)
- **Form Handling**: React Hook Form with Zod validation
- **Notifications**: Sonner for toast notifications

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Docker and Docker Compose

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/foxleigh81/journaltags.git
   cd journaltags
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the MongoDB container:
   ```bash
   docker-compose up -d
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Shortening a URL

1. Enter a valid URL in the "Shorten a URL" form.
2. Click the "Shorten URL" button.
3. If the URL is valid, you'll receive a shortened URL with a 5-digit code.
4. Copy the shortened URL to use or share.

### Accessing a Shortened URL

There are two ways to access a shortened URL:

1. **Direct Access**: Navigate to `http://localhost:3000/[code]` where `[code]` is the 5-digit code.
2. **Search**: Enter the 5-digit code in the search box on the homepage and click "Go to URL".

Both methods will take you to an interstitial page with a 5-second countdown before redirecting to the original URL.

## Project Structure

```
├── docker-compose.yml    # Docker configuration for MongoDB
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── [code]/       # Dynamic route for shortened URLs
│   │   ├── api/          # API routes
│   │   └── page.tsx      # Homepage
│   ├── components/       # React components
│   │   ├── ui/           # ShadCN UI components
│   │   ├── url-form.tsx  # URL shortening form
│   │   └── url-search.tsx # URL search form
│   ├── lib/              # Library code
│   │   ├── db/           # Database connection and models
│   │   └── utils/        # Utility functions
│   ├── server/           # tRPC server code
│   │   └── routers/      # tRPC routers
│   └── utils/            # Client-side utilities
└── tailwind.config.js    # Tailwind CSS configuration
```

## Development

### Adding New Features

To add new features to the application:

1. Create new components in the `src/components` directory.
2. Add new API endpoints by extending the tRPC routers in `src/server/routers`.
3. Update the database models in `src/lib/db/models` if needed.

### Environment Variables

The application uses the following environment variables:

- `MONGODB_URI`: MongoDB connection string (default: `mongodb://localhost:27017/journaltags`)

Create a `.env.local` file in the root directory to override these variables.

## Deployment

### Production Build

To create a production build:

```bash
npm run build
npm start
```

### Docker Deployment

The application includes a Docker Compose configuration for MongoDB. In a production environment, you may want to use a managed MongoDB service or set up proper authentication and persistence for the MongoDB container.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
