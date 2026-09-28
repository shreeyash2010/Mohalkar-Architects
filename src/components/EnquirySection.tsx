import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle2, ArrowUpRight, Loader2 } from 'lucide-react';
import { studioContact } from '../data/siteData';
import { EnquiryLead } from '../data/adminData';

interface EnquirySectionProps {
  prefillData?: {
    typology?: string;
    sqft?: string;
    budget?: string;
    projectTitle?: string;
  };
  initialEstimate?: {
    type: string;
    area: number;
    tier: string;
    estimatedWeeks: string;
  } | null;
  onLeadSubmitted?: (lead: EnquiryLead) => void;
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({
  prefillData,
  initialEstimate,
  onLeadSubmitted
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    typology: initialEstimate?.type || prefillData?.typology || 'Residential',
    sqft: initialEstimate ? `${initialEstimate.area} sq.ft` : prefillData?.sqft || '',
    budget: initialEstimate ? `${initialEstimate.tier}` : prefillData?.budget || '',
    message: initialEstimate
      ? `Regarding calculated scope estimate for ${initialEstimate.type} (${initialEstimate.area} sq.ft, ${initialEstimate.tier}). Estimated timeline: ${initialEstimate.estimatedWeeks}.`
      : prefillData?.projectTitle
      ? `Regarding: ${prefillData.projectTitle}. We are interested in commissioning a similar architectural project.`
      : ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Please fill in Name, Phone, and Email.');
      return;
    }

    setStatus('submitting');
    setStatusMessage('Submitting architectural brief to studio principals...');

    const newLead: EnquiryLead = {
      id: `lead-${Date.now().toString().slice(-6)}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location || 'Maharashtra',
      typology: formData.typology,
      estimatedArea: formData.sqft || 'Not Specified',
      estimatedBudget: formData.budget || 'To be discussed',
      message: formData.message || 'General architectural consultation request.',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New'
    };

    try {
      // 1. Try Vercel Serverless Function endpoint
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submittedAt: newLead.submittedAt
        })
      });

      if (!response.ok) {
        // 2. Fallback to FormSubmit.co
        await fetch('https://formsubmit.co/ajax/mohalkararchitectsandplanners@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            _subject: `Architectural Enquiry: ${formData.typology} from ${formData.name}`,
            _cc: 'abhishekmohalkar0062@gmail.com',
            ...formData
          })
        });
      }

      if (onLeadSubmitted) {
        onLeadSubmitted(newLead);
      }

      setStatus('success');
      setStatusMessage('Your project brief has been received. Our principal architect will contact you within 24 hours.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        location: '',
        typology: 'Residential',
        sqft: '',
        budget: '',
        message: ''
      });
    } catch (err) {
      // Fallback lead register locally
      if (onLeadSubmitted) {
        onLeadSubmitted(newLead);
      }
      setStatus('success');
      setStatusMessage('Brief logged successfully. You can also connect directly on WhatsApp or phone for immediate consultation.');
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Ar. Abhishek Mohalkar,\n\nI would like to inquire about an architectural project:\n- Name: ${formData.name || 'Prospective Client'}\n- Typology: ${formData.typology}\n- Location: ${formData.location || 'Pune/Maharashtra'}\n\nPlease share your availability for a preliminary site or studio consultation.`
  );

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${studioContact.email}&cc=${studioContact.secondaryEmail}&su=${encodeURIComponent(`Architectural Commission Brief - ${formData.typology}`)}&body=${encodeURIComponent(`Dear Mohalkar Architects & Planners,\n\nI would like to discuss an architectural project:\n- Client Name: ${formData.name}\n- Phone: ${formData.phone}\n- Project Typology: ${formData.typology}\n- Scope/Location: ${formData.location}\n\nLooking forward to hearing from you.`)}`;

  return (
    <div className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mb-14 space-y-3"
      >
        <span className="section-label">
          Commission &amp; Consult
        </span>
        <h2 className="section-heading text-[#111827] dark:text-white">
          Initiate a Project Brief
        </h2>
        <p className="section-body">
          Whether you are planning a private luxury estate, commercial headquarters, or need UDCPR municipal sanction clearances, our studio is ready to consult.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left Side: Contact Information & Direct Channels (Reference site enquiry-info-panel) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5"
        >
          <div className="p-8 sm:p-10 rounded-[10px] bg-[#111827] text-white border border-[#c8a96e]/25 space-y-6 shadow-xl sticky top-24">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[3px] text-[#c8a96e] block mb-1">
                Studio Contacts
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Pune Headquarters
              </h3>
            </div>

            <div className="space-y-4 text-xs font-sans divide-y divide-white/10">
              <div className="flex items-start gap-3.5 pt-2 text-white/80">
                <div className="w-9 h-9 rounded-full bg-[#c8a96e]/15 flex items-center justify-center text-[#c8a96e] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="leading-relaxed">
                  <div className="font-semibold text-white uppercase text-[11px] tracking-wider mb-0.5">Studio Location</div>
                  <div className="text-white/70">{studioContact.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 text-white/80">
                <div className="w-9 h-9 rounded-full bg-[#c8a96e]/15 flex items-center justify-center text-[#c8a96e] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white uppercase text-[11px] tracking-wider mb-0.5">Direct Correspondence</div>
                  <a href={`mailto:${studioContact.email}`} className="text-[#c8a96e] hover:underline block text-xs font-mono">
                    {studioContact.email}
                  </a>
                  <a href={`mailto:${studioContact.secondaryEmail}`} className="text-white/50 hover:underline block text-[11px] font-mono mt-0.5">
                    {studioContact.secondaryEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 text-white/80">
                <div className="w-9 h-9 rounded-full bg-[#c8a96e]/15 flex items-center justify-center text-[#c8a96e] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white uppercase text-[11px] tracking-wider mb-0.5">Consultation Hours</div>
                  <div className="text-white/70">{studioContact.hours}</div>
                </div>
              </div>
            </div>

            {/* Direct Quick-Action Links */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <a
                href={`https://wa.me/${studioContact.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-[4px] flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#128C7E] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Consultation</span>
              </a>

              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-[4px] flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-xs font-semibold tracking-wider uppercase transition-colors text-white border border-white/15"
              >
                <Mail className="w-4 h-4 text-[#c8a96e]" />
                <span>Open Gmail Web Compose</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Detailed Project Brief Submission Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-[10px] border border-[#ebebeb] dark:border-[#252830] bg-white dark:bg-[#141822] space-y-6 shadow-xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#ebebeb] dark:border-[#252830]">
              <div>
                <span className="text-[10px] font-semibold text-[#c8a96e] uppercase tracking-[2px] block">
                  Studio RFP / Brief
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#111827] dark:text-white">
                  Architectural Project Brief
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#c8a96e] uppercase tracking-wider bg-[#c8a96e]/10 px-2 py-1 rounded">
                Confidential
              </span>
            </div>

            {status === 'success' && (
              <div className="p-4 bg-[#c8a96e]/15 border border-[#c8a96e] text-xs font-sans text-[#111827] dark:text-white flex items-start gap-3 rounded-[4px]">
                <CheckCircle2 className="w-5 h-5 text-[#c8a96e] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-[#c8a96e]">Brief Submitted Successfully</div>
                  <p>{statusMessage}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="space-y-1.5">
                <label className="text-[#3a3a3a] dark:text-neutral-400 font-semibold uppercase tracking-wider block text-[11px]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Vikramaditya Shinde"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-[#f7f5f2] dark:bg-[#1a1f2c] border border-[#ddd] dark:border-[#2b3140] rounded-[4px] focus:border-[#c8a96e] focus:bg-white dark:focus:bg-[#1f2535] focus:outline-hidden text-[#3a3a3a] dark:text-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#3a3a3a] dark:text-neutral-400 font-semibold uppercase tracking-wider block text-[11px]">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98220 00000"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 bg-[#f7f5f2] dark:bg-[#1a1f2c] border border-[#ddd] dark:border-[#2b3140] rounded-[4px] focus:border-[#c8a96e] focus:bg-white dark:focus:bg-[#1f2535] focus:outline-hidden text-[#3a3a3a] dark:text-white transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="space-y-1.5">
                <label className="text-[#3a3a3a] dark:text-neutral-400 font-semibold uppercase tracking-wider block text-[11px]">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="client@domain.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 bg-[#f7f5f2] dark:bg-[#1a1f2c] border border-[#ddd] dark:border-[#2b3140] rounded-[4px] focus:border-[#c8a96e] focus:bg-white dark:focus:bg-[#1f2535] focus:outline-hidden text-[#3a3a3a] dark:text-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#3a3a3a] dark:text-neutral-400 font-semibold uppercase tracking-wider block text-[11px]">
                  Project Site Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., Baner / Lonavala / Mulshi"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-3 bg-[#f7f5f2] dark:bg-[#1a1f2c] border border-[#ddd] dark:border-[#2b3140] rounded-[4px] focus:border-[#c8a96e] focus:bg-white dark:focus:bg-[#1f2535] focus:outline-hidden text-[#3a3a3a] dark:text-white transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
              <div className="space-y-1.5">
                <label className="text-[#3a3a3a] dark:text-neutral-400 font-semibold uppercase tracking-wider block text-[11px]">
                  Typology
                </label>
                <select
                  value={formData.typology}
                  onChange={e => setFormData({ ...formData, typology: e.target.value })}
                  className="w-full p-3 bg-[#f7f5f2] dark:bg-[#1a1f2c] border border-[#ddd] dark:border-[#2b3140] rounded-[4px] focus:border-[#c8a96e] focus:bg-white dark:focus:bg-[#1f2535] focus:outline-hidden text-[#3a3a3a] dark:text-white transition-colors"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Interior">Interior</option>
                  <option value="Landscape">Landscape</option>
                  <option value="Urban Planning">Urban Planning</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Sanctions">UDCPR Sanctions</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#3a3a3a] dark:text-neutral-400 font-semibold uppercase tracking-wider block text-[11px]">
                  Approx. Area (Sq.Ft)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 6,500 sq.ft"
                  value={formData.sqft}
                  onChange={e => setFormData({ ...formData, sqft: e.target.value })}
                  className="w-full p-3 bg-[#f7f5f2] dark:bg-[#1a1f2c] border border-[#ddd] dark:border-[#2b3140] rounded-[4px] focus:border-[#c8a96e] focus:bg-white dark:focus:bg-[#1f2535] focus:outline-hidden text-[#3a3a3a] dark:text-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#3a3a3a] dark:text-neutral-400 font-semibold uppercase tracking-wider block text-[11px]">
                  Projected Budget
                </label>
                <input
                  type="text"
                  placeholder="e.g., ₹2.5 - ₹3.5 Cr"
                  value={formData.budget}
                  onChange={e => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full p-3 bg-[#f7f5f2] dark:bg-[#1a1f2c] border border-[#ddd] dark:border-[#2b3140] rounded-[4px] focus:border-[#c8a96e] focus:bg-white dark:focus:bg-[#1f2535] focus:outline-hidden text-[#3a3a3a] dark:text-white transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-sans">
              <label className="text-[#3a3a3a] dark:text-neutral-400 font-semibold uppercase tracking-wider block text-[11px]">
                Project Vision &amp; Scope Requirements
              </label>
              <textarea
                rows={4}
                placeholder="Describe your site conditions, required spaces, timeline, or statutory requirements..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 bg-[#f7f5f2] dark:bg-[#1a1f2c] border border-[#ddd] dark:border-[#2b3140] rounded-[4px] focus:border-[#c8a96e] focus:bg-white dark:focus:bg-[#1f2535] focus:outline-hidden text-[#3a3a3a] dark:text-white text-sm transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-gold w-full py-4 text-xs font-semibold tracking-[2px] uppercase cursor-pointer disabled:opacity-50"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span>Submitting Brief...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  <span>Submit Project Brief</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
