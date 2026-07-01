import React, { useState, useRef } from 'react';
import {
  Landmark,
  Receipt,
  Scale,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Check,
  CheckCircle2,
  Clock,
  Coins,
  TrendingUp,
  PhoneCall,
  FileText,
  BadgeAlert,
  UserCheck,
  Building,
  Users,
  MessageSquareCode,
  AlertTriangle,
  HelpCircle,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './components/Logo';
import PrecatórioCalculator from './components/PrecatórioCalculator';
import TaxCalculator from './components/TaxCalculator';
import LeadForm from './components/LeadForm';
import Accordion from './components/Accordion';

export default function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState<'precatorios' | 'tributario' | 'mei'>('precatorios');

  // Lead Form dynamic values
  const [selectedService, setSelectedService] = useState<'precatorio_venda' | 'precatorio_compra' | 'consultoria_tributaria' | 'solucoes_mei' | 'outros'>('precatorio_venda');
  const [prefilledMessage, setPrefilledMessage] = useState<string>('');
  const [prefilledValue, setPrefilledValue] = useState<number | undefined>(undefined);

  // References to scroll
  const formSectionRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Callback to populate lead form when an action occurs in the calculators
  const handleCalculatorLeadTrigger = (
    service: 'precatorio_venda' | 'precatorio_compra' | 'consultoria_tributaria',
    value: number,
    message: string
  ) => {
    setSelectedService(service);
    setPrefilledMessage(message);
    setPrefilledValue(value);
    
    // Smooth scroll to the form section
    setTimeout(() => {
      scrollToForm();
    }, 100);
  };

  // FAQ Items categorized
  const faqItems = [
    {
      id: 'p1',
      question: 'É 100% legal e seguro vender um Precatório?',
      answer: 'Sim, totalmente legal e regulamentado. A cessão de crédito de precatórios é expressamente prevista e autorizada pelos Parágrafos 13 e 14 do Artigo 100 da Constituição Federal Brasileira. O processo é formalizado por meio de Escritura Pública de Cessão de Crédito lavrada em Cartório de Notas e comunicada oficialmente ao Tribunal de origem para que o pagamento futuro seja direcionado ao comprador.',
      category: 'precatorio'
    },
    {
      id: 'p2',
      question: 'Qual é o deságio (desconto) aplicado na venda do precatório?',
      answer: 'O deságio varia de acordo com a esfera (Federal, Estadual ou Municipal), o estado ou município devedor, e a expectativa de tempo de pagamento do lote. Precatórios Federais possuem menor deságio (cerca de 20% a 30%), enquanto Estados e Municípios com filas de atraso mais longas podem ter deságios de 35% a 50%. Nós garantimos a melhor taxa de compra direta do mercado brasileiro devido ao nosso fundo de investimento parceiro.',
      category: 'precatorio'
    },
    {
      id: 'p3',
      question: 'Quanto tempo leva para o dinheiro entrar na conta?',
      answer: 'O adiantamento é extremamente rápido. Todo o trâmite — que inclui a análise de regularidade do processo, a confecção do parecer jurídico, a assinatura da escritura pública em cartório e a liberação do dinheiro — leva entre 15 e 45 dias úteis, comparado aos 10 ou 15 anos que você poderia esperar na fila do Governo.',
      category: 'precatorio'
    },
    {
      id: 't1',
      question: 'Como funciona a Auditoria Tributária para recuperação de impostos?',
      answer: 'Nossa auditoria é 100% digital e segura. Analisamos os arquivos fiscais e XMLs de vendas da sua empresa dos últimos 5 anos por meio de um software tributário de alta precisão. Identificamos produtos que possuem tributação monofásica ou isenções que foram tributados de forma duplicada. Não há nenhum custo inicial: você só paga um percentual sobre o valor que de fato recuperar.',
      category: 'tributario'
    },
    {
      id: 't2',
      question: 'O que são tributos monofásicos e quem tem direito de recuperar?',
      answer: 'No regime monofásico, o fabricante ou importador recolhe o PIS e a COFINS de toda a cadeia de uma vez só. Varejistas, distribuidores e revendedores desses produtos não devem pagar esses impostos novamente na hora da venda final. Setores como farmácias, autopeças, petshops, bares, restaurantes e depósitos de bebidas quase sempre pagam isso duplicado por erro de parametrização de software. Nós identificamos e recuperamos esses créditos em até 60 dias.',
      category: 'tributario'
    },
    {
      id: 'm1',
      question: 'Meu MEI está com guias DAS atrasadas ou CNPJ suspenso. Tem solução?',
      answer: 'Sim, regularizamos tudo online. Fazemos o levantamento completo de todas as pendências e declarações anuais de faturamento em atraso (DASN-SIMEI), parcelamos os débitos acumulados em até 60 parcelas mensais suaves para reativar seu CNPJ, evitar multas da Receita Federal e reestabelecer seus direitos previdenciários (aposentadoria, auxílio-doença, salário-maternidade).',
      category: 'mei'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 font-sans selection:bg-[#E08200] selection:text-slate-950">
      
      {/* 1. Header / Navigation */}
      <header className="sticky top-0 z-50 bg-[#0A0D14]/80 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <Logo variant="horizontal" iconSize={42} />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#solucoes" className="text-slate-300 hover:text-white hover:underline underline-offset-4 transition-colors">
              Nossas Soluções
            </a>
            <a href="#calculadoras" className="text-slate-300 hover:text-white hover:underline underline-offset-4 transition-colors">
              Simuladores
            </a>
            <a href="#por-que-nos" className="text-slate-300 hover:text-white hover:underline underline-offset-4 transition-colors">
              Segurança Legal
            </a>
            <a href="#faq" className="text-slate-300 hover:text-white hover:underline underline-offset-4 transition-colors">
              Dúvidas
            </a>
          </nav>

          {/* Contact Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToForm}
              className="bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-800 hover:border-slate-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#E08200]" />
              <span className="hidden sm:inline">Análise Sem Custos</span>
              <span className="sm:hidden">Análise</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. Hero Section / Primeira Dobra */}
      <section className="relative pt-8 pb-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-[#E08200]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute top-10 left-10 w-48 h-48 bg-[#E08200]/5 rounded-full blur-[80px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Copywriting Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Micro badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[#E08200] text-xs font-mono font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Auditoria e Liquidez Jurídica Homologada</span>
              </div>

              {/* Main Headline with Promessa Clara */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] max-w-2xl mx-auto lg:mx-0">
                Transforme precatórios em <span className="text-[#E08200] relative">liquidez imediata</span> ou recupere impostos pagos a maior.
              </h1>

              {/* Subheadline with Descrição Clara */}
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                A <strong>Valureon Tax</strong> destrava caixa oculto para empresários (PJs) e pessoas físicas. Realizamos adiantamento de precatórios federais e estaduais, auditoria tributária eletrônica de alta performance e regularização de MEIs. <strong>Tudo 100% online, sem taxas ocultas e pautado na lei.</strong>
              </p>

              {/* Instant Trust Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left max-w-md mx-auto lg:mx-0">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <div className="bg-emerald-500/10 text-emerald-400 p-1 rounded">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Escritura Pública e Homologação</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <div className="bg-emerald-500/10 text-emerald-400 p-1 rounded">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Análise de Crédito Gratuita</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <div className="bg-emerald-500/10 text-emerald-400 p-1 rounded">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Pague somente no êxito</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <div className="bg-emerald-500/10 text-emerald-400 p-1 rounded">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Suporte e LGPD Segura</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button
                  onClick={scrollToForm}
                  className="bg-[#E08200] hover:bg-[#c67300] text-slate-950 font-bold px-8 py-4 rounded-xl text-base shadow-lg shadow-[#E08200]/20 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Solicitar Análise Grátis</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="#calculadoras"
                  className="bg-slate-950 border border-slate-800 hover:border-[#E08200]/50 hover:bg-slate-900 text-slate-200 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Ver Simuladores</span>
                </a>
              </div>

            </div>

            {/* Interactive Simulator Column (Hero Placement for ultra high conversion) */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
              <PrecatórioCalculator onLeadTrigger={handleCalculatorLeadTrigger} />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Authority / Trust Banner */}
      <section className="bg-[#0D101A] border-y border-slate-900 py-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-slate-500 block">Segurança e Transparência</span>
              <p className="text-slate-300 text-sm mt-1">
                Processos estruturados de acordo com as diretrizes do <strong>Banco Central do Brasil</strong>, da <strong>Receita Federal</strong> e da <strong>OAB</strong>.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium border-r border-slate-800 pr-4">
                <Landmark className="w-5 h-5 text-[#E08200]" />
                <span>Tribunais de Justiça (TJs / TRFs)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium border-r border-slate-800 pr-4">
                <Scale className="w-5 h-5 text-[#E08200]" />
                <span>Auditoria Jurídica de Títulos</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium border-r border-slate-800 pr-4">
                <ShieldCheck className="w-5 h-5 text-[#E08200]" />
                <span>100% Protegido via LGPD</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <Coins className="w-5 h-5 text-[#E08200]" />
                <span>Sem Riscos Financeiros</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Soluções e Serviços Sections */}
      <section id="solucoes" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#E08200] font-mono text-xs uppercase tracking-widest font-bold">Nossa Atuação</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Soluções Inteligentes para Seus Ativos e Impostos
            </h2>
            <p className="text-slate-400 text-base">
              Nossa equipe técnica atua de ponta a ponta para analisar, diagnosticar e resolver suas demandas tributárias e financeiras com agilidade.
            </p>

            {/* Quick solution selector tabs */}
            <div className="flex justify-center p-1 bg-slate-900 border border-slate-800 rounded-xl max-w-lg mx-auto mt-6">
              <button
                onClick={() => setActiveTab('precatorios')}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-350 ${
                  activeTab === 'precatorios' ? 'bg-[#E08200] text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Precatórios (PF e PJ)
              </button>
              <button
                onClick={() => setActiveTab('tributario')}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-350 ${
                  activeTab === 'tributario' ? 'bg-[#E08200] text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Consultoria Tributária
              </button>
              <button
                onClick={() => setActiveTab('mei')}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-350 ${
                  activeTab === 'mei' ? 'bg-[#E08200] text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Soluções para MEI
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'precatorios' && (
              <motion.div
                key="tab-precatorios"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-6">
                  <div className="bg-[#E08200]/10 p-3 rounded-2xl w-fit text-[#E08200]">
                    <Landmark className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Cessão de Precatórios: Liquidez sem Esperar pela Fila do Governo
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    Se você possui um precatório (Federal, Estadual ou Municipal), sabe que a fila governamental pode levar anos, ou até décadas, para pagar. O adiantamento de precatórios é a melhor solução para reaver o capital imediatamente.
                  </p>
                  
                  <ul className="space-y-3">
                    {[
                      { title: 'Venda Rápida e Transparente', desc: 'Receba o valor acordado em conta em no máximo 45 dias úteis.' },
                      { title: 'Zero Burocracia', desc: 'Nossa equipe de assessoria jurídica cuida de todas as validações e trâmites de cartório.' },
                      { title: 'Melhor Cotação', desc: 'Parceria com fundos institucionais permite aplicar o menor deságio do mercado.' },
                      { title: 'Segurança Contratual', desc: 'Cessão homologada perante o Tribunal e registrada sob fé pública.' }
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#E08200] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => {
                        setSelectedService('precatorio_venda');
                        setPrefilledMessage('Gostaria de falar com um especialista sobre a venda do meu precatório para receber uma cotação gratuita.');
                        scrollToForm();
                      }}
                      className="bg-[#E08200] hover:bg-[#c67300] text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300 inline-flex items-center justify-center gap-2"
                    >
                      <span>Vender Meu Precatório</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedService('precatorio_compra');
                        setPrefilledMessage('Gostaria de ver as opções de precatórios disponíveis em carteira para investimento de alto rendimento.');
                        scrollToForm();
                      }}
                      className="bg-transparent hover:bg-slate-900 text-white border border-slate-800 hover:border-slate-700 px-6 py-3 rounded-xl text-sm transition-all duration-300 inline-flex items-center justify-center gap-2"
                    >
                      <span>Quero Investir em Ativos</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-slate-900/50 border border-slate-850 p-6 md:p-8 rounded-3xl space-y-6">
                  <h4 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#E08200]" />
                    <span>Comparativo de Tempo Real de Espera</span>
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Fila de Pagamento do Governo (Estadual/Municipal)</span>
                        <span className="text-red-400 font-semibold">10 a 20 Anos</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full w-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Fila de Pagamento do Governo (Federal)</span>
                        <span className="text-amber-400 font-semibold">2 a 5 Anos</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full w-[40%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Cessão de Crédito Valureon Tax (Imediato)</span>
                        <span className="text-green-400 font-bold">15 a 45 Dias</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full w-[5%]" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl text-xs text-slate-400 leading-relaxed border border-slate-850">
                    💡 <strong>Por que adiantar?</strong> O valor nominal acumulado sofre corrosão inflacionária, além de riscos políticos de parcelamento forçado por emendas constitucionais. Vender o título permite aplicar o dinheiro de imediato em negócios, imóveis ou liquidação de dívidas onerosas.
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'tributario' && (
              <motion.div
                key="tab-tributario"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-6">
                  <div className="bg-amber-500/10 p-3 rounded-2xl w-fit text-amber-500">
                    <Receipt className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Recuperação de Impostos: Dinheiro que Volta para o Caixa do seu Negócio
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    Nossa equipe realiza auditorias eletrônicas profundas para identificar impostos pagos duplicados ou calculados de forma indevida nos últimos 5 anos. Atuamos com recuperação de <strong>créditos de PIS/COFINS monofásicos</strong> e tese de <strong>Equiparação Hospitalar</strong> para clínicas.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 border border-slate-850 rounded-2xl">
                      <span className="text-amber-500 font-bold text-base block mb-1">PIS/COFINS Monofásico</span>
                      <p className="text-xs text-slate-400">
                        Isenção e créditos cumulativos automáticos para autopeças, farmácias, depósitos de bebidas, bares e cosméticos. Devolução em até 60 dias úteis diretamente em conta bancária.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-850 rounded-2xl">
                      <span className="text-amber-500 font-bold text-base block mb-1">Equiparação Hospitalar</span>
                      <p className="text-xs text-slate-400">
                        Clínicas médicas e odontológicas fora do Simples reduzem o IRPJ e CSLL de 32% para até 8% e 12%, além de obter a restituição retroativa com embasamento do STJ.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => {
                        setSelectedService('consultoria_tributaria');
                        setPrefilledMessage('Gostaria de agendar uma simulação gratuita dos créditos monofásicos ou equiparação hospitalar para minha empresa.');
                        scrollToForm();
                      }}
                      className="bg-[#E08200] hover:bg-[#c67300] text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300 inline-flex items-center justify-center gap-2"
                    >
                      <span>Auditar Meus Impostos Grátis</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-slate-900/50 border border-slate-850 p-6 md:p-8 rounded-3xl space-y-6">
                  <h4 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                    <Building className="w-5 h-5 text-amber-500" />
                    <span>Setores com Maior Índice de Recuperação</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {[
                      'Autopeças & Pneus',
                      'Farmácias & Clínicas Estéticas',
                      'Distribuidores & Lojas de Bebidas',
                      'Bares & Restaurantes',
                      'Clínicas Médicas & Dentistas',
                      'Petshops & Cosméticos'
                    ].map((sectorName, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-300 bg-slate-950/70 border border-slate-900 px-3 py-2.5 rounded-xl">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs font-medium">{sectorName}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl text-xs text-slate-400 leading-relaxed border border-slate-850 space-y-2">
                    <p>
                      🛡️ <strong>Compliance e Segurança:</strong> Todo o processo de compensação e restituição é administrativo, executado diretamente dentro do portal do E-CAC da Receita Federal. Sem discussões judiciais demoradas para créditos monofásicos simples.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'mei' && (
              <motion.div
                key="tab-mei"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-6">
                  <div className="bg-amber-500/10 p-3 rounded-2xl w-fit text-amber-500">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Soluções MEI: Regularização de CNPJ, Declarações e Parcelamento de Dívidas
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    Cuidamos de toda a burocracia do seu microempreendimento individual. Evite o cancelamento definitivo do seu CNPJ, multas pesadas da Receita Federal e perda do seu benefício previdenciário (INSS).
                  </p>

                  <div className="space-y-3">
                    {[
                      { title: 'Declaração Anual de Faturamento (DASN-SIMEI)', desc: 'Envio correto das receitas brutas para manter o MEI regularizado perante o fisco.' },
                      { title: 'Parcelamento de DAS em Atraso', desc: 'Negociamos guias pendentes em até 60 vezes para limpar o CNPJ imediatamente.' },
                      { title: 'Baixa ou Alteração de MEI', desc: 'Processo completo de encerramento de CNPJ sem pendências ou alteração de dados cadastrais.' },
                      { title: 'Migração para ME (Microempresa)', desc: 'Ultrapassou o limite do faturamento anual? Fazemos a transição tributária segura.' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        <Check className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSelectedService('solucoes_mei');
                        setPrefilledMessage('Gostaria de falar com o suporte de Soluções MEI para regularizar pendências ou parcelar impostos atrasados do meu CNPJ.');
                        scrollToForm();
                      }}
                      className="bg-[#E08200] hover:bg-[#c67300] text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300 inline-flex items-center justify-center gap-2"
                    >
                      <span>Regularizar MEI Agora</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-slate-900/50 border border-slate-850 p-6 md:p-8 rounded-3xl space-y-6">
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex gap-3.5 items-start">
                    <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Riscos de Deixar o MEI Irregular</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Manter guias pendentes ou deixar de declarar o faturamento anual acarreta no cancelamento definitivo do CNPJ, além de transferir toda a dívida diretamente para o CPF do titular na Dívida Ativa da União, bloqueando certidões negativas e dificultando empréstimos pessoais.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-xs text-slate-400 block font-mono">DÚVIDA COMUM</span>
                    <h5 className="text-sm font-semibold text-white mt-1">Como parcelar a dívida do MEI?</h5>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Nossa equipe realiza o levantamento no portal Simples Nacional de todas as guias vencidas, consolida o valor final com descontos de encargos se aplicável, e emite o plano de parcelamento oficial. O CNPJ volta a ficar ativo imediatamente após o pagamento da primeira parcela.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* 5. Pain Section / A Dor do Cliente */}
      <section className="bg-[#0B0D15] py-20 relative border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <span className="text-red-400 font-mono text-xs uppercase tracking-wider font-semibold bg-red-500/10 px-3 py-1 rounded-full">
                O Custo da Inação
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                Por que deixar seu capital travado na burocracia governamental?
              </h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Diariamente, milhares de reais são perdidos por empresários e pessoas físicas devido a prazos intermináveis da Justiça, guias fiscais emitidas erroneamente ou obrigações administrativas acumulando multas.
              </p>
              
              <div className="bg-slate-900 border border-slate-850 p-4 rounded-2xl flex items-center gap-3">
                <BadgeAlert className="w-6 h-6 text-amber-500 shrink-0" />
                <span className="text-xs text-slate-300">
                  <strong>Atenção:</strong> Deixar de resgatar direitos tributários em dia resulta em prescrição automática de 5 anos (valores expiram permanentemente).
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {[
                {
                  title: 'A longa e exaustiva fila dos precatórios',
                  desc: 'A fila de pagamento do Governo é imprevisível e pode ultrapassar 15 anos de atraso. Vender seu precatório te dá liquidez em dias para reverter em projetos produtivos reais.',
                  pain: 'O dinheiro desvaloriza com a inflação constante.'
                },
                {
                  title: 'Software de faturamento desconfigurado',
                  desc: 'A maioria dos sistemas de PDV de comércios e distribuidores não separa tributos monofásicos de PIS/COFINS de forma adequada, gerando bi-tributação absurda todo mês.',
                  pain: 'Sua margem líquida é destruída silenciosamente.'
                },
                {
                  title: 'Obrigações e impostos de MEI acumulados',
                  desc: 'Esquecer de declarar o faturamento anual do MEI acarreta em multas mensais e suspensão total do CNPJ, travando emissão de notas e acesso a crédito.',
                  pain: 'Seu nome e CPF podem ir parar no Cadastro Informativo de Créditos (CADIN).'
                },
                {
                  title: 'Falta de apoio especializado especializado',
                  desc: 'Contabilidades genéricas raramente possuem softwares eletrônicos dedicados para auditar arquivos tributários complexos ou homologar cessões judiciais em cartórios dedicados.',
                  pain: 'Erros operacionais geram autuações pesadas do Fisco.'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-850/60 text-[10px] text-red-300 italic">
                    Consequência: {item.pain}
                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

      {/* 6. Simuladores / Calculadora Tributária Secundária */}
      <section id="calculadoras" className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <TaxCalculator onLeadTrigger={handleCalculatorLeadTrigger} />
            </div>

            <div className="lg:col-span-5 space-y-6">
              <span className="text-[#E08200] font-mono text-xs uppercase tracking-widest font-bold">Diagnóstico Prático</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                Audite e recupere créditos tributários sem burocracia
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Utilize o nosso simulador inteligente à esquerda para estimar o tamanho da restituição acumulada de impostos ou o impacto da redução legal de alíquota do seu consultório clínico ou empresa comercial.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  { title: 'Auditoria Gratuita em até 48 Horas', text: 'Analisamos seus arquivos fiscais e SPEDs de forma eletrônica sem custo prévio ou taxa de adesão.' },
                  { title: 'Retorno Garantido e Homologado', desc: 'Sua empresa recupera o dinheiro de forma amigável em conta bancária (via compensação administrativa) ou deduz das próximas guias mensais.' },
                  { title: 'Suporte Técnico e Especializado', desc: 'Auxiliamos na parametrização fiscal do seu software para que você pare de recolher impostos indevidos daqui em diante.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E08200]/10 flex items-center justify-center text-[#E08200] shrink-0 mt-0.5 font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.text || item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedService('consultoria_tributaria');
                    setPrefilledMessage('Gostaria de agendar uma verificação gratuita de créditos fiscais para minha empresa.');
                    scrollToForm();
                  }}
                  className="text-sm font-bold text-[#E08200] hover:text-white flex items-center gap-1.5 group cursor-pointer"
                >
                  <span>Agendar diagnóstico gratuito</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. How it works / Como Funciona */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[#E08200] font-mono text-xs uppercase tracking-widest font-bold">Processo Simplificado</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Sua jornada para a resolução em 3 etapas
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Sem burocracias desnecessárias ou termos jurídicos complexos. Atuamos com total transparência e velocidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-slate-900 -z-10 -translate-y-12" />

            {[
              {
                step: '01',
                title: 'Contato & Simulação',
                desc: 'Preencha o formulário rápido com as informações básicas do seu caso ou utilize um de nossos simuladores inteligentes acima para iniciar.'
              },
              {
                step: '02',
                title: 'Auditoria Gratuita',
                desc: 'Nossa mesa técnica jurídica e tributária avalia o status do precatório ou audita os XMLs da sua empresa sem cobrar nenhum centavo adiantado.'
              },
              {
                step: '03',
                title: 'Liquidez ou Alívio Fiscal',
                desc: 'Assinamos a cessão em cartório e liberamos o dinheiro da venda do precatório na sua conta, ou protocolamos os pedidos de recuperação de impostos no fisco.'
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-850 p-6 md:p-8 rounded-3xl relative">
                <span className="absolute -top-4 -left-2 text-6xl font-extrabold text-[#E08200]/10 font-mono tracking-tight select-none">
                  {step.step}
                </span>
                <h4 className="text-lg font-bold text-white mt-4">{step.title}</h4>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">{step.desc}</p>
              </div>
            ))}

          </div>

          {/* Prompt final call for the structure */}
          <div className="mt-16 text-center bg-[#E08200]/5 border border-[#E08200]/15 p-6 rounded-2xl max-w-xl mx-auto">
            <span className="text-xs text-amber-500 font-mono font-bold block mb-1 uppercase tracking-widest">Compromisso Valureon Tax</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Você não corre nenhum risco. Se após a análise jurídica ou eletrônica não for constatado nenhum crédito tributário elegível ou se a proposta do precatório não for fechada, nenhum valor é cobrado. Atuamos estritamente sob o formato de <strong>taxa de sucesso sobre o resultado obtido</strong>.
            </p>
          </div>

        </div>
      </section>

      {/* 8. Conversion Capture Section (Formulário) */}
      <section ref={formSectionRef} className="py-16 md:py-24 bg-[#0A0D14] relative border-t border-slate-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-[#E08200]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#E08200] font-mono text-xs uppercase tracking-widest font-bold block">Fale com Diretores Técnicos</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Pronto para destravar seus ativos acumulados?
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Preencha as informações ao lado para receber um diagnóstico completo sem compromisso. Nossa equipe jurídica e fiscal responderá em até 24 horas úteis com os cenários mais vantajosos para você ou seu negócio.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <UserCheck className="w-5.5 h-5.5 text-[#E08200] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Auditoria realizada por Mestres e Especialistas</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Nada de respostas automáticas genéricas. Seus documentos são validados por consultores experientes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5.5 h-5.5 text-[#E08200] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Privacidade e Termos de Confidencialidade Absolutos</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Atuação em conformidade com as rígidas regras de proteção de dados (LGPD). Seus arquivos XML e certidões estão totalmente seguros e criptografados.</p>
                  </div>
                </div>
              </div>

              {/* Direct Support Contact line */}
              <div className="p-4 bg-slate-900/50 border border-slate-850 rounded-2xl inline-flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-xs text-slate-300">
                  Suporte comercial ativo hoje: <strong className="text-white">Segunda a Sexta, das 9h às 18h</strong>
                </span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm
                initialService={selectedService}
                initialMessage={prefilledMessage}
                initialValue={prefilledValue}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 9. Objection Handling & FAQs (Acordeão) */}
      <section id="faq" className="py-20 bg-slate-950 relative border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-3">
            <span className="text-amber-500 font-mono text-xs uppercase tracking-wider font-bold">Perguntas Frequentes</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Ainda tem alguma dúvida? Nós respondemos.
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Veja as respostas rápidas para as principais dúvidas dos nossos clientes sobre precatórios, recuperação fiscal e MEI.
            </p>
          </div>

          <Accordion items={faqItems} />

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-400">
              Sua dúvida não está listada acima?
            </p>
            <button
              onClick={() => {
                setSelectedService('outros');
                setPrefilledMessage('Olá, tenho uma dúvida que não está listada no FAQ. Gostaria de receber atendimento personalizado de um consultor.');
                scrollToForm();
              }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#E08200] font-semibold hover:text-white transition-colors uppercase font-mono tracking-widest cursor-pointer"
            >
              <span>Falar com consultor via formulário</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-[#06080D] border-t border-slate-900 pt-16 pb-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 items-start">
            
            <div className="md:col-span-5 space-y-4">
              <Logo variant="horizontal" iconSize={36} />
              <p className="text-slate-400 leading-relaxed max-w-sm">
                A <strong>Valureon Tax</strong> é uma empresa especializada em consultoria tributária administrativa, adiantamento de créditos judiciais (precatórios) e suporte para microempresas, gerando caixa rápido com segurança jurídica impecável.
              </p>
              <div className="text-slate-500 space-y-1">
                <p>Valureon Tax Soluções Tributárias Ltda.</p>
                <p>CNPJ: 62.118.561/0001-47</p>
                <p>AL RIO NEGRO 503 SALA 2020, Alphaville C I E E, SP</p>
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-sm font-semibold text-white">Nossos Serviços</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => { setActiveTab('precatorios'); scrollToForm(); }} className="hover:text-white transition-colors cursor-pointer text-left">
                    Venda de Precatórios
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('precatorios'); scrollToForm(); }} className="hover:text-white transition-colors cursor-pointer text-left">
                    Investimento de Alta Rentabilidade
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('tributario'); scrollToForm(); }} className="hover:text-white transition-colors cursor-pointer text-left">
                    Auditoria Monofásica de PIS/COFINS
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('tributario'); scrollToForm(); }} className="hover:text-white transition-colors cursor-pointer text-left">
                    Equiparação Hospitalar para Clínicas
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('mei'); scrollToForm(); }} className="hover:text-white transition-colors cursor-pointer text-left">
                    Regularização de Pendências MEI
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-4 bg-slate-900/40 p-5 rounded-2xl border border-slate-850">
              <h4 className="text-sm font-semibold text-white">Precisa de suporte imediato?</h4>
              <p className="text-slate-400 leading-normal">
                Nossa diretoria comercial está pronta para atender você via WhatsApp de forma instantânea para tirar dúvidas rápidas sobre seu título judicial ou notas fiscais.
              </p>
              <a
                href="https://wa.me/5511949862676?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20r%C3%A1pida%20com%20o%20especialista%20da%20Valureon%20Tax."
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs transition-all duration-300 shadow-lg"
              >
                <MessageSquareCode className="w-4 h-4" />
                <span>Chamar Plantão no WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Legal disclaimers in the footer for credibility */}
          <div className="border-t border-slate-900 pt-8 text-center md:text-left md:flex md:justify-between md:items-center text-slate-500 gap-4 space-y-4 md:space-y-0">
            <p>© {new Date().getFullYear()} Valureon Tax. Todos os direitos reservados. Landing page de alta conversão estruturada por Especialistas.</p>
            <div className="flex gap-4 justify-center md:justify-start">
              <span className="hover:text-slate-400">Termos de Uso</span>
              <span className="hover:text-slate-400">Políticas de Privacidade</span>
              <span className="hover:text-slate-400">Conformidade OAB / RFB</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
