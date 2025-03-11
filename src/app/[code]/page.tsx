"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/utils/trpc";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function RedirectPage({ params }: { params: { code: string } }) {
  const [countdown, setCountdown] = useState(5);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const { data, isLoading, error: queryError } = trpc.url.getByCode.useQuery(
    { code: params.code }
  );
  
  useEffect(() => {
    if (data) {
      setOriginalUrl(data.originalUrl);
    }
    if (queryError) {
      setError(queryError.message || "URL not found");
    }
  }, [data, queryError]);
  
  useEffect(() => {
    if (originalUrl && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (originalUrl && countdown === 0) {
      window.location.href = originalUrl;
    }
  }, [countdown, originalUrl]);
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>JournalTags</CardTitle>
            <CardDescription>Loading...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardFooter>
            <button
              onClick={() => router.push("/")}
              className="text-primary hover:underline"
            >
              Return to homepage
            </button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>JournalTags</CardTitle>
          <CardDescription>Redirecting you to the original URL</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg">
              Taking you to: <span className="font-medium break-all">{originalUrl}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              You will be redirected in {countdown} seconds...
            </p>
            
            {/* Space for future ad banner */}
            <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Ad space</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <button
            onClick={() => router.push("/")}
            className="text-primary hover:underline"
          >
            Return to homepage
          </button>
          <button
            onClick={() => {
              if (originalUrl) window.location.href = originalUrl;
            }}
            className="text-primary hover:underline"
          >
            Go now
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
