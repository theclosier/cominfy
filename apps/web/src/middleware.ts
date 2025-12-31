import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    const response = await updateSession(request)

    // Check for protected admin routes
    if (request.nextUrl.pathname.startsWith('/yntm') && !request.nextUrl.pathname.startsWith('/yntm/login')) {
        const { data: { session } } = await (await import('@/utils/supabase/middleware')).createClient(request, response).auth.getSession()
        if (!session) {
            return NextResponse.redirect(new URL('/yntm/login', request.url))
        }
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
