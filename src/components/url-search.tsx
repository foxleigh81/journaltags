"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { trpc } from "@/utils/trpc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const searchFormSchema = z.object({
  code: z.string().min(1, { message: "Please enter a code" }),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

export function UrlSearch() {
  const router = useRouter();
  
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      code: "",
    },
  });
  
  function onSubmit(data: SearchFormValues) {
    // If the input is exactly 5 characters, assume it's a code
    if (data.code.length === 5) {
      router.push(`/${data.code}`);
    } else {
      // Otherwise, search for URLs containing the query
      toast.info("Please enter a valid 5-character code");
    }
  }
  
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Find a shortened URL</CardTitle>
        <CardDescription>
          Enter a 5-character code to navigate to the original URL
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="5-character code" 
                      {...field} 
                      maxLength={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full"
            >
              Go to URL
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
