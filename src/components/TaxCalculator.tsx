import React, { useState } from 'react';
import { Percent, ArrowRight, ShieldAlert, Sparkles, Building2, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TaxCalculatorProps {
  onLeadTrigger: (service: 'consultoria_tributaria', value: number, additionalMessage: string) => void;
}

export default function TaxCalculator({ onLeadTrigger }: TaxCalculatorProps) {
  const [regime, setRegime] = useState<'simples' | 'presumido' | 'real'>('simples');
  const [sector, setSector] = useState<string>('autopecas');
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(120000);
  const [rawInput, setRawInput] = useState<string>('120.000');

  const sectors = [
    { id: 'autopecas', name: 'Autopeças & Pneus', rate: 0.038, hasMonofasico: true },
    { id: 'farmacia', name: 'Farmácias & Cosméticos', rate: 0.042, hasMonofasico: true },
    { id: 'bebidas', name: 'Distribuidores de Bebidas', rate: 0.035, hasMonofasico: true },
    { id: 'clinicas', name: 'Clínicas Médicas & Dentistas', rate: 0.028, hasMonofasico: false, specialRule: 'Equiparação Hospitalar' },
    { id: 'servicos', name: 'Prestadores de Serviço TI/Eng/etc', rate: 0.022, hasMonofasico: false },
    { id: 'comercio', name: 'Comércio Varejista Geral', rate: 0.018, hasMonofasico: true },
    { id: 'industria', name: 'Indústrias', rate: 0.025, hasMonofasico: false },
  ];

  const currentSector = sectors.find(s => s.id === sector) || sectors[0];

  // Logic for calculations:
  // For monofasico, recovery is calculated over last 60 months (5 years)
  // Typically, 40-60% of the revenue is products with monofasico, and PIS/COFINS represents ~4-9% of the tax
  // We approximate the overpaid recovery:
  const monthlySavingsRate = regime === 'simples'
    ? currentSector.rate * 0.7 // slightly lower for simples nacional due to unified rate
    : currentSector.rate;

  const estimatedRecovery5YearsMin = monthlyRevenue * monthlySavingsRate * 60 * 0.75;
  const estimatedRecovery5YearsMax = monthlyRevenue * monthlySavingsRate * 60 * 1.25;

  const annualRecurringSavingsMin = monthlyRevenue * monthlySavingsRate * 12 * 0.8;
  const annualRecurringSavingsMax = monthlyRevenue * monthlySavingsRate * 12 * 1.3;

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.replace(/\D/g, '');
    const numValue = cleanValue ? parseInt(cleanValue, 10) : 0;
    if (numValue <= 20000000) {
      setMonthlyRevenue(numValue);
      setRawInput(new Intl.NumberFormat('pt-BR').format(numValue));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setMonthlyRevenue(val);
    setRawInput(new Intl.NumberFormat('pt-BR').format(val));
  };

  const triggerCTA = () => {
    const sectorName = currentSector.name;
    const regimeLabel = regime === 'simples' ? 'Simples Nacional' : regime === 'presumido' ? 'Lucro Presumido' : 'Lucro Real';
    const message = `Olá, fiz uma simulação tributária para minha empresa do setor de ${sectorName} (${regimeLabel}), com faturamento mensal de ${formatBRL(monthlyRevenue)}. Gostaria de agendar uma auditoria gratuita e sem compromisso para verificar créditos acumulados de impostos pagos a maior nos últimos 5 anos.`;
    onLeadTrigger('consultoria_tributaria', monthlyRevenue, message);
  };

  return (
    <div id="calculadora-tributaria" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      {/* Badge */}
      <div className="mb-6">
        <span className="text-amber-500 font-mono text-xs tracking-wider uppercase font-semibold bg-amber-500/10 px-3 py-1 rounded-full">
          Planejamento & Recuperação
        </span>
        <h3 className="text-2xl font-semibold text-white mt-3 tracking-tight">
          Sua empresa paga impostos a maior?
        </h3>
        <p className="text-slate-400 text-sm mt-1">
          95% das empresas do Simples, Lucro Presumido ou Real pagam mais impostos do que deveriam. Descubra quanto você pode recuperar.
        </p>
      </div>

      <div className="space-y-5">
        {/* Tax Regime Selector */}
        <div>
          <label className="block text-xs text-slate-400 uppercase font-mono tracking-wider mb-2">
            Regime Tributário Atual
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['simples', 'presumido', 'real'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setRegime(reg)}
                className={`py-2 px-3 text-xs md:text-sm font-medium rounded-lg border transition-all duration-300 ${
                  regime === reg
                    ? 'border-amber-500 bg-amber-500/5 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                {reg === 'simples' && 'Simples Nac.'}
                {reg === 'presumido' && 'Presumido'}
                {reg === 'real' && 'Lucro Real'}
              </button>
            ))}
          </div>
        </div>

        {/* Sector Selector */}
        <div>
          <label className="block text-xs text-slate-400 uppercase font-mono tracking-wider mb-2">
            Segmento de Atuação
          </label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-white rounded-xl py-3 px-4 outline-none text-sm transition-colors cursor-pointer"
          >
            {sectors.map((s) => (
              <option key={s.id} value={s.id} className="bg-slate-950 text-white">
                {s.name} {s.hasMonofasico ? '⚡ (Crédito Monofásico)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Revenue Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs text-slate-400 uppercase font-mono tracking-wider">
              Faturamento Mensal Médio (R$)
            </label>
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-lg">
              R$
            </span>
            <input
              type="text"
              value={rawInput}
              onChange={handleRevenueChange}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl py-3 pl-12 pr-4 text-white text-xl font-semibold outline-none transition-colors"
              placeholder="0,00"
            />
          </div>

          {/* Slider */}
          <div className="mt-4">
            <input
              type="range"
              min="20000"
              max="2000000"
              step="10000"
              value={monthlyRevenue}
              onChange={handleSliderChange}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>R$ 20 mil</span>
              <span>R$ 500 mil</span>
              <span>R$ 2 milhões+</span>
            </div>
          </div>
        </div>

        {/* Output Screen */}
        <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 md:p-5">
          <div className="space-y-4">
            {/* Direct recovery estimation (last 5 years) */}
            <div className="pb-4 border-b border-slate-800/60">
              <span className="text-xs text-amber-500 font-mono flex items-center gap-1.5 uppercase tracking-wider mb-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Potencial Recuperável (Últimos 5 Anos)
              </span>
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mt-1.5 gap-1">
                <span className="text-2xl md:text-3xl font-extrabold text-white leading-none">
                  {formatBRL(estimatedRecovery5YearsMin)} a {formatBRL(estimatedRecovery5YearsMax)}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  (Auditoria retroativa)
                </span>
              </div>
            </div>

            {/* Recurring tax optimization (annual savings) */}
            <div className="pt-1 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400 block">Redução de Imposto Anual Estimada</span>
                <span className="text-base md:text-lg font-bold text-emerald-400 mt-1 block">
                  {formatBRL(annualRecurringSavingsMin)} a {formatBRL(annualRecurringSavingsMax)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Taxa de Sucesso</span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/5 px-2.5 py-0.5 rounded border border-emerald-500/10 mt-1 inline-block">
                  98.4%
                </span>
              </div>
            </div>

            {/* Warning block depending on segment */}
            {currentSector.hasMonofasico && (
              <div className="bg-amber-500/5 rounded-xl p-3 flex items-start gap-2.5 mt-2 border border-amber-500/10">
                <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  <strong>Impostos Monofásicos Pendentes:</strong> Seu setor ({currentSector.name}) possui direito ao abatimento automático de PIS/COFINS monofásico na saída. A Receita Federal devolve esses valores em conta em até 60 dias após a auditoria administrativa.
                </p>
              </div>
            )}
            {!currentSector.hasMonofasico && currentSector.specialRule && (
              <div className="bg-amber-500/5 rounded-xl p-3 flex items-start gap-2.5 mt-2 border border-amber-500/10">
                <Coins className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  <strong>Equiparação Hospitalar:</strong> Clínicas médicas e odontológicas podem reduzir legalmente a alíquota tributária de IRPJ e CSLL de 32% para 8% e 12% respectivamente via equiparação. Nós fazemos essa reestruturação legal com segurança absoluta.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={triggerCTA}
          className="w-full bg-transparent hover:bg-amber-500 text-amber-500 hover:text-slate-950 border border-amber-500 hover:border-transparent font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-base cursor-pointer group"
        >
          Solicitar Auditoria Gratuita de Impostos
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="text-center text-[10px] text-slate-500 leading-normal">
          *A simulação é uma estimativa com base em médias de mercado. O valor real depende de uma auditoria fiscal eletrônica detalhada baseada nos arquivos XML de faturamento (sem qualquer custo inicial).
        </p>
      </div>
    </div>
  );
}
