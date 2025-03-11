import { initTRPC } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { connectToDatabase } from '@/lib/db/connect';

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  await connectToDatabase();
  return {
    req: opts.req,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
