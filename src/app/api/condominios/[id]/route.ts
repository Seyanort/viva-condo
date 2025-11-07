import { NextResponse } from "next/server";
import { deleteCondominio } from "@/services/condominio.service";

// DELETE /api/condominios/:id
export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> } // 👈 declare como Promise
) {
  try {
    const { id } = await ctx.params; // 👈 aguarde antes de usar
    console.log("🔥 DELETE /api/condominios/:id chamado com ID:", id);

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID não informado." },
        { status: 400 }
      );
    }

    const deleted = await deleteCondominio(id);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Condomínio não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Condomínio excluído com sucesso." },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e.message ?? "Erro ao excluir condomínio." },
      { status: 500 }
    );
  }
}