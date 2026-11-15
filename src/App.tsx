import { useCallback, useEffect, useState } from 'react';
import { requisitar } from './api/cliente';
import { ContratoPage } from './pages/ContratoPage/ContratoPage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import type { SaldoConsolidado } from './types';

export default function App() {
  const [saldo, setSaldo] = useState<SaldoConsolidado | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [contratoSelecionado, setContratoSelecionado] = useState<string | null>(null);

  const carregarSaldo = useCallback(() => {
    requisitar<SaldoConsolidado>('/saldo')
      .then((dados) => {
        setSaldo(dados);
        setErro(null);
      })
      .catch((e: Error) => setErro(e.message));
  }, []);

  useEffect(() => {
    carregarSaldo();
  }, [carregarSaldo]);

  if (erro) {
    return (
      <main className="container">
        <p className="form-contrato__erro">Não foi possível carregar o painel: {erro}</p>
      </main>
    );
  }

  if (!saldo) {
    return (
      <main className="container">
        <p className="estado-vazio">Carregando painel...</p>
      </main>
    );
  }

  if (contratoSelecionado) {
    const contrato = saldo.contratos.find((c) => c.contratoId === contratoSelecionado);

    return (
      <ContratoPage
        contratoId={contratoSelecionado}
        nome={contrato?.nome ?? ''}
        onVoltar={() => setContratoSelecionado(null)}
      />
    );
  }

  return (
    <DashboardPage
      saldo={saldo}
      onSelecionar={setContratoSelecionado}
      onCriado={carregarSaldo}
    />
  );
}