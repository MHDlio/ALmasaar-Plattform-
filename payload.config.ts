import { buildConfig } from 'payload/config';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';

import { Users } from './collections/Users';
import { Entities } from './collections/Entities';
import { JobListings } from './collections/JobListings';
import { Events } from './collections/Events';
import { Resources } from './collections/Resources';
import { Posts } from './collections/Posts';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, Entities, JobListings, Events, Resources, Posts],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  cors: ['http://localhost:3000', process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
});