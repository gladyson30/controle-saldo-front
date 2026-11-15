import { requisitar } from './cliente';
import type { Contrato, CriarContratoRequest } from '../types';

export function listarContratos(): Promise<Contrato[]> {
  return requisitar<Contrato[]>('/api/contratos');
}

export function criarContrato(dados: CriarContratoRequest): Promise<Contrato> {
  return requisitar<Contrato>('/api/contratos', {
    method: 'POST',
    body: JSON.stringify(dados),
  });
}