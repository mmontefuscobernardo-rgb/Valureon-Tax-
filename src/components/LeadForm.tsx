import React, { useState, useEffect } from 'react';
import { Send, Phone, User, Mail, Building, Briefcase, CheckCircle2, MessageSquareCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LeadSubmission } from '../types';

interface LeadFormProps {
  initialService?: 'precatorio_venda' | 'precatorio_compra' | 'consultoria_tributaria' | 'solucoes_mei' | 'outros';
  initialMessage?: string;
  initialValue?: number;
  onSuccess?: () => void;
}

export default function LeadForm({ initialService = 'outros', initialMessage = '', initialValue, onSuccess }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadSubmission>({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    service: initialService,
    message: initialMessage,
    value: initialValue,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Sync initial values if they change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      service: initialService,
      message: initialMessage,
      value: initialValue,
    }));
  }, [initialService, initialMessage, initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Basic phone formatting (Brazil format: (XX) XXXXX-XXXX)
  const formatPhone = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 2) return cleanValue;
    if (cleanValue.length <= 6) return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2)}`;
    if (cleanValue.length <= 10) return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2, 6)}-${cleanValue.slice(6)}`;
    return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2, 7)}-${cleanValue.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({
      ...prev,
      phone: formatted,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Por favor, preencha todos os campos obrigatórios (Nome, E-mail e Telefone).');
      return;
    }

    setLoading(true);

    // Simulate backend submission API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
    }, 1500);
  };

  // Generate dynamic WhatsApp link based on lead details to pass parameters directly to their sales team
  const getWhatsAppLink = () => {
    const dddAndPhone = '5511949862676'; // Real sales WhatsApp number
    const serviceLabel = {
      precatorio_venda: 'Venda de Precatório',
      precatorio_compra: 'Compra de Precatório / Investimentos',
      consultoria_tributaria: 'Consultoria e Auditoria Tributária',
      solucoes_mei: 'Serviços e Regularização de MEI',
      outros: 'Soluções Gerais de Negócios',
    }[formData.service];

    const valueInfo = formData.value ? ` (Valor estimado: R$ ${new Intl.NumberFormat('pt-BR').format(formData.value)})` : '';

    const text = `Olá, meu nome é *${formData.name}*.\nE-mail: ${formData.email}\nTelefone: ${formData.phone}\n${formData.companyName ? `Empresa: *${formData.companyName}*\n` : ''}Serviço de interesse: *${serviceLabel}${valueInfo}*\n\n*Mensagem/Caso:*\n${formData.message || 'Gostaria de agendar um diagnóstico gratuito.'}`;
    
    return `https://wa.me/${dddAndPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#E08200]/5 rounded-full blur-3xl -z-10" />

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="lead-form-fields"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Receba uma Análise Gratuita
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Fale diretamente com os diretores técnicos e consultores especialistas da Valureon Tax.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs text-slate-400 uppercase font-mono tracking-wider mb-1.5">
                  Seu Nome Completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#E08200] rounded-xl py-2.5 pl-11 pr-4 text-white text-sm outline-none transition-colors"
                    placeholder="João Silva"
                  />
                </div>
              </div>

              {/* Two Column Email / Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 uppercase font-mono tracking-wider mb-1.5">
                    E-mail Corporativo ou Pessoal *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-[#E08200] rounded-xl py-2.5 pl-11 pr-4 text-white text-sm outline-none transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 uppercase font-mono tracking-wider mb-1.5">
                    WhatsApp de Contato *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
                    <input
                      type="text"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-[#E08200] rounded-xl py-2.5 pl-11 pr-4 text-white text-sm outline-none transition-colors"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
              </div>

              {/* Company (Optional) */}
              <div>
                <label className="block text-xs text-slate-400 uppercase font-mono tracking-wider mb-1.5">
                  Nome da Empresa <span className="text-slate-600">(Opcional)</span>
                </label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#E08200] rounded-xl py-2.5 pl-11 pr-4 text-white text-sm outline-none transition-colors"
                    placeholder="Empresa S/A"
                  />
                </div>
              </div>

              {/* Service Select */}
              <div>
                <label className="block text-xs text-slate-400 uppercase font-mono tracking-wider mb-1.5">
                  Assunto de interesse
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5 pointer-events-none" />
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#E08200] text-white rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none transition-colors cursor-pointer appearance-none"
                  >
                    <option value="precatorio_venda">Venda de Precatório (Quero adiantar)</option>
                    <option value="precatorio_compra">Compra de Precatório (Quero investir)</option>
                    <option value="consultoria_tributaria">Consultoria / Auditoria Tributária</option>
                    <option value="solucoes_mei">Soluções e MEI (Regularização/Burocracia)</option>
                    <option value="outros">Outros assuntos</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-slate-400 uppercase font-mono tracking-wider mb-1.5">
                  Descreva seu caso ou dúvida
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-[#E08200] text-white text-sm rounded-xl py-2.5 px-4 outline-none transition-colors resize-none"
                  placeholder="Se possível, mencione valores, estado de origem do processo, ou o nome do seu setor para agilizar o retorno."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E08200] hover:bg-[#c67300] text-slate-950 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-xl cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-slate-950" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Processando solicitação...</span>
                  </div>
                ) : (
                  <>
                    <span>Solicitar Diagnóstico Gratuito</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="lead-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 space-y-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Solicitação Recebida com Sucesso!
              </h3>
              <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                Olá <strong>{formData.name}</strong>, nossa diretoria já recebeu suas informações e está preparando seu diagnóstico.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl max-w-sm mx-auto text-left text-xs text-slate-400 space-y-2">
              <p><strong>E-mail cadastrado:</strong> {formData.email}</p>
              <p><strong>WhatsApp:</strong> {formData.phone}</p>
              <p><strong>Foco:</strong> {formData.service === 'precatorio_venda' ? 'Venda de Precatório' : formData.service === 'precatorio_compra' ? 'Investimento em Precatórios' : formData.service === 'consultoria_tributaria' ? 'Consultoria Tributária' : 'Soluções de Negócios / MEI'}</p>
            </div>

            {/* Direct WhatsApp acceleration CTA (Direct Redirection) */}
            <div className="space-y-3 pt-2">
              <p className="text-xs text-amber-500 font-semibold uppercase tracking-wider font-mono">
                ⚡ Acelerar atendimento imediato
              </p>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex w-full items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-xl shadow-emerald-500/10 text-base"
              >
                <MessageSquareCode className="w-5.5 h-5.5" />
                <span>Enviar Dados & Chamar no WhatsApp</span>
              </a>
              <button
                onClick={() => setSuccess(false)}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Voltar ou enviar outra mensagem
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
