import type { ErroApi } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL;

export class ErroDeRequisicao extends Error {
  readonly status: number;

  constructor(erro: ErroApi) {
    super(erro.detail);
    this.name = 'ErroDeRequisicao';
    this.status = erro.status;
  }
}

export async function requisitar<T>(caminho: string, init?: RequestInit): Promise<T> {
  const resposta = await fetch(`${BASE_URL}${caminho}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => null);
    throw new ErroDeRequisicao({
      status: resposta.status,
      title: corpo?.title ?? resposta.statusText,
      detail: corpo?.detail ?? 'Erro inesperado ao comunicar com a API',
    });
  }

  if (resposta.status === 204) {
    return undefined as T;
  }

  return resposta.json() as Promise<T>;
}