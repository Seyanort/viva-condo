import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";


export async function middleware(req: NextRequest) {

  let res = NextResponse.next();

  // cria o client do Supabase no middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => {
          return req.cookies.getAll();
        },
        setAll: (cookiesToSet) => {
          // atualiza cookies no request
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          // recria resposta com novos cookies
          res = NextResponse.next();
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // se não logado, redireciona para /
  if (!user) {
    const url = new URL("/", req.url);
    url.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return res;
}

// rotas protegidas
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/condominios/:path*",
    "/usuarios/:path*",
    "/moradores/:path*",
    "/configuracoes/:path*"
  ],
};

// documentação: https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=environment&environment=middleware