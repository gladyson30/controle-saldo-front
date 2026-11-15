import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Lancamento } from '../../types';
import { formatarMoeda } from '../../utils/formatar';

interface GraficoEvolucaoProps {
  lancamentos: Lancamento[];
}

interface PontoMensal {
  mes: string;
  total: number;
}

function agruparPorMes(lancamentos: Lancamento[]): PontoMensal[] {
  const totais = new Map<string, number>();

  lancamentos
    .filter((l) => l.status === 'ATIVO')
    .forEach((l) => {
      const mes = l.data.slice(0, 7);
      totais.set(mes, (totais.get(mes) ?? 0) + l.valor);
    });

  return [...totais.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([mes, total]) => ({ mes, total }));
}

function rotuloMes(mes: string): string {
  const [ano, numero] = mes.split('-');
  return new Date(Number(ano), Number(numero) - 1, 1).toLocaleDateString('pt-BR', {
    month: 'short',
    year: '2-digit',
  });
}

export function GraficoEvolucao({ lancamentos }: GraficoEvolucaoProps) {
  const pontos = agruparPorMes(lancamentos).map((p) => ({
    ...p,
    rotulo: rotuloMes(p.mes),
  }));

  if (pontos.length === 0) {
    return <p className="estado-vazio">Sem lançamentos ativos para exibir a evolução.</p>;
  }

  return (
    <div className="grafico-evolucao">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={pontos} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="rotulo" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(valor: number) => formatarMoeda(valor).replace(',00', '')}
            width={96}
          />
          <Tooltip formatter={(valor) => formatarMoeda(Number(valor))} />
          <Bar dataKey="total" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}