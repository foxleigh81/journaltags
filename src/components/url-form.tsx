"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { trpc } from "@/utils/trpc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const urlFormSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
});

type UrlFormValues = z.infer<typeof urlFormSchema>;

export function UrlForm() {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);
  
  const toastStyles = {
    success: { style: { backgroundColor: 'green', color: 'white' } },
    error: { style: { backgroundColor: 'red', color: 'white' } },
  };

  const createUrl = trpc.url.create.useMutation({
    onSuccess: (data) => {
      const baseUrl = window.location.origin;
      setShortUrl(`${baseUrl}/${data.code}`);
      setIsNew(data.isNew);
      
      if (data.isNew) {
        toast.success("URL shortened successfully!", toastStyles.success);
      } else {
        toast.info("This URL already exists in our system.");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to shorten URL", toastStyles.error);
    },
  });
  
  const form = useForm<UrlFormValues>({
    resolver: zodResolver(urlFormSchema),
    defaultValues: {
      url: "",
    },
  });
  
  function onSubmit(data: UrlFormValues) {
    createUrl.mutate({ url: data.url });
  }
  
  function copyToClipboard() {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      toast.success("Copied to clipboard!", toastStyles.success);
    }
  }
  
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Shorten your URL</CardTitle>
        <CardDescription>
          Enter a URL to generate a short link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com" 
                      {...field} 
                      disabled={createUrl.isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the URL you want to shorten
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={createUrl.isPending}
            >
              {createUrl.isPending ? "Shortening..." : "Shorten URL"}
            </Button>
          </form>
        </Form>
        
        {shortUrl && (
          <div className="mt-6 p-4 bg-muted rounded-md">
            <p className="text-sm font-medium mb-2">Your shortened URL:</p>
            <div className="flex items-center gap-2">
              <Input 
                value={shortUrl} 
                readOnly 
                className="font-mono text-sm"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyToClipboard}
              >
                Copy
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {isNew 
                ? "This is a new shortened URL." 
                : "This URL was already in our system."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
