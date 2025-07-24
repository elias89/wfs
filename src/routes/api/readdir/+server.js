import { json } from '@sveltejs/kit';
import { readDir } from '$lib/fs';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
  const dir = url.searchParams.get('path') || '';

  const files = readDir(process.env.HOME_PATH);

  return json({files});
}
