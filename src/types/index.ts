export type AlertaSaldo = 'NORMAL' | 'PROXIMO_DO_LIMITE' | 'BAIXO_CONSUMO';

export type StatusLancamento = 'ATIVO' | 'ESTORNADO';

export interface Contrato {
  id: string;
  nome: string;
  valorContratado: number;
  dataInicio: string;
  dataFim: string;
}

export interface CriarContratoRequest {
  nome: string;
  valorContratado: number;
  dataInicio: string;
}

export interface Lancamento {
  id: string;
  contratoId: string;
  data: string;
  valor: number;
  status: StatusLancamento;
  dataEstorno: string | null;
  motivoEstorno: string | null;
}

export interface RegistrarLancamentoRequest {
  contratoId: string;
  data: string;
  valor: number;
}

export interface EditarLancamentoRequest {
  data: string;
  valor: number;
}

export interface Saldo {
  contratoId: string;
  nome: string;
  valorContratado: number;
  totalLancado: number;
  saldoDisponivel: number;
  percentualConsumido: number;
  percentualVigenciaDecorrida: number;
  alerta: AlertaSaldo;
}

export interface SaldoConsolidado {
  valorTotalContratado: number;
  totalLancado: number;
  saldoDisponivel: number;
  contratos: Saldo[];
}

export interface ErroApi {
  status: number;
  title: string;
  detail: string;
}