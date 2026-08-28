import { revalidatePath, revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

/**
 * Constants for HTTP Status codes.
 */
const STATUS_CODES = {
  UNAUTHORIZED: 401,
  PRECONDITION_FAILED: 412,
  INTERNAL_SERVER_ERROR: 500,
};

/**
 * Vérification de la configuration, faite à l'appel et non à l'import.
 *
 * Ce contrôle s'exécutait au niveau module. La phase « Collecting page data »
 * de `next build` évalue les modules de routes, donc l'absence de la variable
 * faisait échouer la construction entière plutôt qu'un seul appel — et
 * obligeait à fournir le secret au moment de la construction, où il se serait
 * retrouvé inscrit dans l'historique de l'image.
 *
 * Rien n'est masqué : la requête échoue toujours, mais avec un 500 explicite
 * au lieu d'un module qui refuse de se charger.
 */
export async function PUT(request: NextRequest) {
  const { REVALIDATE_SECRET_KEY } = process.env;

  if (!REVALIDATE_SECRET_KEY) {
    console.error('Missing REVALIDATE_SECRET_KEY environment variable');
    return new Response('Server misconfigured', {
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
    });
  }

  const { paths, tags }: { paths?: string[]; tags?: string[] } = await request.json();

  console.log('Received paths:', paths);
  console.log('Received tags:', tags);

  const headersList = headers();
  const authorizationHeader = headersList.get('authorization');

  // Les deux journalisations qui se trouvaient ici écrivaient l'en-tête
  // d'autorisation en clair, y compris quand il était correct. Un secret qui
  // transite par un journal cesse d'être un secret : les journaux se
  // recopient, s'exportent et se lisent par bien plus de monde que l'API.
  // On ne trace donc plus que le rejet, sans sa valeur.
  if (authorizationHeader !== `Bearer ${REVALIDATE_SECRET_KEY}`) {
    console.error('Invalid token');
    return new Response(`Invalid token`, { status: STATUS_CODES.UNAUTHORIZED });
  }

  if (!paths && !tags) {
    console.error(`Precondition Failed: Missing paths and tags`);
    return new Response(`Precondition Failed: Missing paths and tags`, {
      status: STATUS_CODES.PRECONDITION_FAILED,
    });
  }

  let revalidatePaths: string[] = [];
  let correctTags: string[] = [];

  if (paths) {
    revalidatePaths = paths.filter(path => path.startsWith('/'));

    console.log('Filtered correct paths:', revalidatePaths);
  }

  if (tags) {
    correctTags = tags.filter(tag => typeof tag === 'string');
    console.log('Filtered correct tags:', correctTags);
  }

  try {
    revalidatePaths.forEach(path => {
      revalidatePath(path);
    });

    correctTags.forEach(tag => {
      revalidateTag(tag);
    });

    console.log(
      `${new Date().toJSON()} - Paths and tags revalidated: ${revalidatePaths.join(
        ', '
      )} and ${correctTags.join(', ')}`
    );

    return new Response(
      JSON.stringify({
        revalidated: true,
        message: `Paths and tags revalidated: ${revalidatePaths.join(
          ', '
        )} and ${correctTags.join(', ')}`,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err: unknown) {
    let message: string;

    if (err instanceof Error) {
      message = err.message;
    } else {
      message = 'An error occurred';
    }
    console.error('Revalidation error:', message);
    return new Response(message, {
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
    });
  }
}