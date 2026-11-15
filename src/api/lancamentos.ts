import { requisitar } from './cliente';
import type {
  EditarLancamentoRequest,
  Lancamento,
  RegistrarLancamentoRequest,
} from '../types';

export function listarLancamentos(contratoId: string): Promise<Lancamento[]> {
  return requisitar<Lancamento[]>(`/lancamento/listar/${contratoId}`);
}

export function registrarLancamento(dados: RegistrarLancamentoRequest): Promise<Lancamento> {
  return requisitar<Lancamento>('/lancamento/registrar', {
    method: 'POST',
    body: JSON.stringify(dados),
  });
}

export function editarLancamento(id: string, dados: EditarLancamentoRequest): Promise<Lancamento> {
  return requisitar<Lancamento>(`/lancamento/editar/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  });
}

export function estornarLancamento(id: string): Promise<Lancamento> {
  return requisitar<Lancamento>(`/lancamento/estorno/${id}`, {
    method: 'POST',
  });
}