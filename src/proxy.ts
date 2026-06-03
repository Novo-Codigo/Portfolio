import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: [
    'pt-BR',
    'pt',
    'en'
  ],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
