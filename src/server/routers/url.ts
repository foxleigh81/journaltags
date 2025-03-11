import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import UrlModel from '@/lib/db/models/url';
import { checkUrlExists, generateCode, normalizeUrl } from '@/lib/utils/url';

export const urlRouter = router({
  create: publicProcedure
    .input(
      z.object({
        url: z.string().url(),
      })
    )
    .mutation(async ({ input }) => {
      // Check if URL exists
      const { isValid, validUrl } = await checkUrlExists(input.url);
      
      if (!isValid || !validUrl) {
        throw new Error('URL does not exist or is not accessible');
      }
      
      // Normalize the URL to prevent duplicates
      const normalizedUrl = normalizeUrl(validUrl);
      
      // Check if URL already exists in database
      const existingUrl = await UrlModel.findOne({ normalizedUrl });
      
      if (existingUrl) {
        return {
          code: existingUrl.code,
          originalUrl: existingUrl.originalUrl,
          isNew: false,
        };
      }
      
      // Generate a new code
      const code = generateCode();
      
      // Create new URL entry
      const newUrl = await UrlModel.create({
        originalUrl: validUrl,
        normalizedUrl,
        code,
      });
      
      return {
        code: newUrl.code,
        originalUrl: newUrl.originalUrl,
        isNew: true,
      };
    }),
    
  getByCode: publicProcedure
    .input(
      z.object({
        code: z.string().length(5),
      })
    )
    .query(async ({ input }) => {
      const url = await UrlModel.findOne({ code: input.code });
      
      if (!url) {
        throw new Error('URL not found');
      }
      
      // Increment visit count
      url.visits += 1;
      await url.save();
      
      return {
        originalUrl: url.originalUrl,
        code: url.code,
      };
    }),
    
  search: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
      })
    )
    .query(async ({ input }) => {
      // If the query is exactly 5 characters, it might be a code
      if (input.query.length === 5) {
        const url = await UrlModel.findOne({ code: input.query });
        
        if (url) {
          return {
            results: [{
              originalUrl: url.originalUrl,
              code: url.code,
            }],
          };
        }
      }
      
      // Otherwise, search for URLs containing the query
      const urls = await UrlModel.find({
        originalUrl: { $regex: input.query, $options: 'i' },
      }).limit(10);
      
      return {
        results: urls.map((url) => ({
          originalUrl: url.originalUrl,
          code: url.code,
        })),
      };
    }),
});
