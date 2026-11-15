import { useCallback, useEffect, useState } from 'react';
import styles from './ContratoPage.module.css';
import { listarLancamentos } from '../../api/lancamentos';
import { ConfirmacaoEstorno } from '../../components/ConfirmacaoEstorno/ConfirmacaoEstorno';
import { FormLancamento } from '../../components/FormLancamento/FormLancamento';
import { GraficoEvolucao } from '../../components/GraficoEvolucao/GraficoEvolucao';
import { TabelaLancamentos } from '../../components/TabelaLancamentos/TabelaLancamentos';
import type { Lancamento } from '../../types';

interface ContratoPageProps {
  contratoId: string;
  nome: string;
  onVoltar: () => void;
}

export function ContratoPage({ contratoId, nome, onVoltar }: ContratoPageProps) {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [emEdicao, setEmEdicao] = useState<Lancamento | null>(null);
  const [paraEstornar, setParaEstornar] = useState<Lancamento | null>(null);

  useEffect(() => {
    let ativo = true;

    listarLancamentos(contratoId)
      .then((dados) => {
        if (!ativo) return;
        setLancamentos(dados);
        setErro(null);
      })
      .catch((e: Error) => {
        if (ativo) setErro(e.message);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [contratoId]);

  // Usada depois de salvar ou estornar: recarrega sem voltar ao estado de "carregando".
  const recarregar = useCallback(() => {
    listarLancamentos(contratoId)
      .then((dados) => {
        setLancamentos(dados);
        setErro(null);
      })
      .catch((e: Error) => setErro(e.message));
  }, [contratoId]);

  function aoSalvar() {
    setEmEdicao(null);
    recarregar();
  }

  function aoEstornar() {
    setParaEstornar(null);
    recarregar();
  }

  return (
    <main className="container">
      <button type="button" onClick={onVoltar} className={styles.voltar}>
        ← Voltar ao painel
      </button>

      <h1 className={styles.titulo}>{nome}</h1>

      <FormLancamento
        key={emEdicao?.id ?? 'novo'}
        contratoId={contratoId}
        lancamentoEmEdicao={emEdicao}
        onSalvo={aoSalvar}
        onCancelarEdicao={() => setEmEdicao(null)}
      />

      <h2 className={styles.secao}>Histórico</h2>

      {erro && <p className={styles.erro}>{erro}</p>}
      {carregando ? (
        <p className={styles.carregando}>Carregando lançamentos...</p>
      ) : (
        <TabelaLancamentos
          lancamentos={lancamentos}
          onEditar={setEmEdicao}
          onEstornar={setParaEstornar}
        />
      )}

      <h2 className={styles.secao}>Evolução mensal</h2>
      <div className={styles.grafico}>
        <GraficoEvolucao lancamentos={lancamentos} />
      </div>

      {paraEstornar && (
        <ConfirmacaoEstorno
          lancamento={paraEstornar}
          onConfirmado={aoEstornar}
          onCancelar={() => setParaEstornar(null)}
        />
      )}
    </main>
  );
}