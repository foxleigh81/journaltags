import { UrlForm } from "@/components/url-form";
import { UrlSearch } from "@/components/url-search";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto py-4">
          <h1 className="text-2xl font-bold">JournalTags</h1>
          <p className="text-muted-foreground">Simple URL shortener</p>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Shorten a URL</h2>
            <UrlForm />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Find a URL</h2>
            <UrlSearch />
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} JournalTags. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
