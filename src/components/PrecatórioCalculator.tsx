import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronRight, CheckCircle2, TrendingUp, ShieldCheck, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PrecatórioCalculatorProps {
  onLeadTrigger: (service: 'precatorio_venda' | 'precatorio_compra', initialValue: number, additionalMessage: string) => void;
}

export default function PrecatórioCalculator({ onLeadTrigger }: PrecatórioCalculatorProps) {
  const [action, setAction] = useState<'sell' | 'buy'>('sell');
  const [type, setType] = useState<'federal' | 'estadual' | 'municipal'>('federal');
  const [faceValue, setFaceValue] = useState<number>(150000);
  const [rawInput, setRawInput] = useState<string>('150.000');

  // Format currency on input change
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.replace(/\D/g, '');
    const numValue = cleanValue ? parseInt(cleanValue, 10) : 0;
    if (numValue <= 10000000) {
      setFaceValue(numValue);
      setRawInput(new Intl.NumberFormat('pt-BR').format(numValue));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setFaceValue(val);
    setRawInput(new Intl.NumberFormat('pt-BR').format(val));
  };

  // Rates and discount logic
  const discountRate = {
    federal: 0.22, // 22% discount for federal
    estadual: 0.38, // 38% discount for state
    municipal: 0.45, // 45% discount for municipal
  }[type];

  const netCashout = faceValue * (1 - discountRate);
  const savingsOrGain = faceValue * discountRate;

  // Investment yields logic
  const estimatedYieldPerYear = {
    federal: '18% a 22% a.a.',
    estadual: '24% a 32% a.a.',
    municipal: '26% a 36% a.a.',
  }[type];

  const estimatedTotalReturn = faceValue * 1.65; // Simulated multi-year average return

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const triggerCTA = () => {
    const serviceType = action === 'sell' ? 'precatorio_venda' : 'precatorio_compra';
    const message = action === 'sell'
      ? `Olá, gostaria de receber uma proposta para vender meu Precatório ${type.toUpperCase()} com valor de face de aproximadamente ${formatBRL(faceValue)}.`
      : `Olá, tenho interesse em investir cerca de ${formatBRL(faceValue)} em Precatórios ${type.toUpperCase()} de alta rentabilidade. Gostaria de ver as opções disponíveis.`;
    onLeadTrigger(serviceType, faceValue, message);
  };

  return (
    <div id="calculadora-precatorios" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E08200]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      {/* Title */}
      <div className="mb-6">
        <span className="text-[#E08200] font-mono text-xs tracking-wider uppercase font-semibold bg-[#E08200]/10 px-3 py-1 rounded-full">
          Simulador Inteligente
        </span>
        <h3 className="text-2xl font-semibold text-white mt-3 tracking-tight">
          Quanto vale seu precatório?
        </h3>
        <p className="text-slate-400 text-sm mt-1">
          Simule agora o valor líquido para adiantamento ou o retorno do seu investimento.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-950 rounded-xl mb-6">
        <button
          onClick={() => setAction('sell')}
          className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
            action === 'sell'
              ? 'bg-[#E08200] text-slate-950 shadow-lg font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Quero Vender Meu Precatório
        </button>
        <button
          onClick={() => setAction('buy')}
          className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
            action === 'buy'
              ? 'bg-[#E08200] text-slate-950 shadow-lg font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Quero Comprar / Investir
        </button>
      </div>

      {/* Calculator Body */}
      <div className="space-y-6">
        {/* Esfera / Type Selection */}
        <div>
          <label className="block text-xs text-slate-400 uppercase font-mono tracking-wider mb-2">
            Esfera do Precatório (Origem do Processo)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['federal', 'estadual', 'municipal'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`py-2 px-3 text-xs md:text-sm font-medium rounded-lg border transition-all duration-300 ${
                  type === t
                    ? 'border-[#E08200] bg-[#E08200]/5 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                {t === 'federal' && 'Federal (TRF)'}
                {t === 'estadual' && 'Estadual (TJ)'}
                {t === 'municipal' && 'Municipal'}
              </button>
            ))}
          </div>
        </div>

        {/* Input Value */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs text-slate-400 uppercase font-mono tracking-wider">
              {action === 'sell' ? 'Valor de Face do Precatório (R$)' : 'Valor que Deseja Investir (R$)'}
            </label>
            <span className="text-xs text-[#E08200] font-mono font-medium">
              Mínimo: R$ 10.000
            </span>
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-lg">
              R$
            </span>
            <input
              type="text"
              value={rawInput}
              onChange={handleValueChange}
              className="w-full bg-slate-950 border border-slate-800 focus:border-[#E08200] rounded-xl py-3 pl-12 pr-4 text-white text-xl font-semibold outline-none transition-colors"
              placeholder="0,00"
            />
          </div>

          {/* Slider */}
          <div className="mt-4">
            <input
              type="range"
              min="10000"
              max="1500000"
              step="5000"
              value={faceValue}
              onChange={handleSliderChange}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#E08200]"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>R$ 10 mil</span>
              <span>R$ 500 mil</span>
              <span>R$ 1.5 milhão+</span>
            </div>
          </div>
        </div>

        {/* Calculation Screen */}
        <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 md:p-5">
          <AnimatePresence mode="wait">
            {action === 'sell' ? (
              <motion.div
                key="sell-result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-start pb-3 border-b border-slate-800/60">
                  <div>
                    <span className="text-xs text-slate-400 block">Deságio Médio Estimado</span>
                    <span className="text-sm text-red-400 font-medium">
                      {(discountRate * 100)}% de desconto
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Tempo de Liquidação</span>
                    <span className="text-sm text-green-400 font-medium">15 a 45 dias úteis</span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-1">
                  <div>
                    <span className="text-xs text-slate-400 block">Você recebe imediatamente</span>
                    <span className="text-2xl md:text-3xl font-bold text-[#E08200] leading-none block mt-1">
                      {formatBRL(netCashout)}
                    </span>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    Retenção estimada: <br />
                    <span className="font-mono text-slate-400">{formatBRL(savingsOrGain)}</span>
                  </div>
                </div>

                <div className="bg-[#E08200]/5 rounded-xl p-3 flex items-start gap-3 mt-2 border border-[#E08200]/10">
                  <ShieldCheck className="w-5 h-5 text-[#E08200] shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Processo 100% Seguro:</strong> Cessão de crédito feita em cartório de notas, auditada juridicamente e homologada pelo Tribunal de Justiça competente. Sem riscos.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="buy-result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-start pb-3 border-b border-slate-800/60">
                  <div>
                    <span className="text-xs text-slate-400 block">Rentabilidade Estimada</span>
                    <span className="text-sm text-green-400 font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> {estimatedYieldPerYear}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Garantia Ativo</span>
                    <span className="text-xs font-medium text-slate-300 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800 mt-0.5 inline-block">
                      Orçamento Público
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-1">
                  <div>
                    <span className="text-xs text-slate-400 block">Retorno Estimado no Vencimento</span>
                    <span className="text-2xl md:text-3xl font-bold text-emerald-400 leading-none block mt-1">
                      {formatBRL(estimatedTotalReturn)}
                    </span>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    Lucro líquido est. <br />
                    <span className="font-mono text-emerald-400">+{formatBRL(estimatedTotalReturn - faceValue)}</span>
                  </div>
                </div>

                <div className="bg-emerald-500/5 rounded-xl p-3 flex items-start gap-3 mt-2 border border-emerald-500/10">
                  <Landmark className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Isenção Fiscal:</strong> Ganhos com cessão de precatórios federais e estaduais possuem vantagens fiscais robustas em relação à renda fixa convencional.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <button
          onClick={triggerCTA}
          className="w-full bg-[#E08200] hover:bg-[#c67300] text-slate-950 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-base shadow-xl hover:shadow-[#E08200]/20 cursor-pointer group"
        >
          {action === 'sell' ? 'Falar com Especialista & Vender' : 'Acessar Carteira de Precatórios'}
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>

        <div className="flex justify-center items-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#E08200]" /> Sem Custos Prévios
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#E08200]" /> Avaliação Grátis
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#E08200]" /> LGPD Segura
          </span>
        </div>
      </div>
    </div>
  );
}
