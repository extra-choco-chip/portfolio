import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, GuestbookEntry } from '../types';
import { JournalTabs } from './JournalTabs';
import { ISHANA_PROFILE } from '../data/portfolioData';
import { ASSET_IMAGES } from '../assets/images';
import { playStampSound, playTactileClick } from '../utils/audio';

interface ContactScreenProps {
  onNavigate: (page: PageId) => void;
  entries: GuestbookEntry[];
  onAddEntry: (entry: Omit<GuestbookEntry, 'id' | 'date'>) => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({
  onNavigate,
  entries,
  onAddEntry,
}) => {
  const [name, setName] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [subject, setSubject] = useState('Collaboration / Project Inquiry');
  const [message, setMessage] = useState('');
  const [stampType, setStampType] = useState<'lavender' | 'butterfly' | 'rose'>('lavender');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formError, setFormError] = useState('');

  const subjects = [
    'Collaboration / Project Inquiry',
    'Competitive Programming Discussion',
    'Tech Talk or Hackathon Teammate',
    'Warm Hello & Encouragement',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(ISHANA_PROFILE.email);
    setCopiedEmail(true);
    playTactileClick();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Please provide your name or handle.');
      return;
    }
    if (!message.trim()) {
      setFormError('Please write a short note or message.');
      return;
    }

    setFormError('');
    playStampSound();
    onAddEntry({
      name: name.trim(),
      location: affiliation.trim() || 'Fellow Explorer',
      topic: subject,
      message: message.trim(),
      stampType,
      sealColor: '#805365',
    });

    setSubmitted(true);
    setName('');
    setAffiliation('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <div className="relative w-full max-w-6xl flex flex-col md:flex-row bg-[#FFF8F0] shadow-tactile-heavy rounded-sm torn-edge-soft my-auto border-2 border-[#D8B5BD]">
      {/* Journal Right-edge Tabs */}
      <JournalTabs currentPage="contact" onNavigate={onNavigate} />

      {/* Book Spine Center Shadow & Stitches */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-transparent via-[#44343B]/10 to-transparent z-30 pointer-events-none mix-blend-multiply" />
      <div className="hidden md:flex absolute left-1/2 top-[8%] bottom-[8%] -ml-px w-px bg-[#B97891]/40 z-30 flex-col justify-between items-center py-6 pointer-events-none">
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
      </div>

      {/* LEFT PAGE - Direct Dispatch & Verified Contact Card */}
      <section className="w-full md:w-1/2 min-h-[660px] md:min-h-[740px] p-6 sm:p-10 md:p-12 relative bg-[#FFF8F0] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFEFC] via-[#FFF8F0] to-[#F8D7E2]/30 rounded-l-sm overflow-hidden z-10 border-b md:border-b-0 md:border-r border-[#D8B5BD] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="mb-4 pb-2 border-b border-[#D8B5BD]">
            <span className="font-label-sm text-xs text-[#805365] tracking-widest uppercase block font-bold">
              Postal Desk · Direct Correspondence
            </span>
            <h2 className="font-display-lg text-2xl sm:text-3xl text-[#805365] font-bold tracking-tight mt-0.5">
              Send a Note to Ishana
            </h2>
            <p className="font-accent-handwritten text-base text-[#B97891] mt-0.5">
              For project ideas, algorithmic challenges, or friendly hellos
            </p>
          </div>

          {/* Verified Contact Card with Vintage Envelope Image */}
          <div className="p-3.5 bg-[#FFFEFC] rounded-xs border border-[#D8B5BD] shadow-2xs mb-4 rotate-[-0.5deg]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-sm text-[10px] text-[#805365] uppercase tracking-wider font-bold">
                Direct Contact Card:
              </span>
              <div className="flex gap-1.5">
                <a
                  href={`mailto:${ISHANA_PROFILE.email}?subject=Hello%20Ishana`}
                  className="text-[10px] font-label-sm bg-[#F5EBCB] hover:bg-[#F8D7E2] text-[#44343B] px-2 py-0.5 rounded-xs border border-[#D8B5BD] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                  title="Compose directly in your email app"
                >
                  <span>Open Mail App</span>
                  <span className="material-symbols-outlined text-[11px]">send</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="text-[10px] font-label-sm bg-[#F8D7E2] hover:bg-[#F2BFCF] text-[#805365] px-2 py-0.5 rounded-xs border border-[#D8B5BD] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                >
                  <span>{copiedEmail ? 'Copied ✓' : 'Copy Email'}</span>
                  <span className="material-symbols-outlined text-[11px]">content_copy</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xs overflow-hidden border border-[#D8B5BD] bg-[#FFF8F0] shrink-0 shadow-2xs">
                <img
                  src={ASSET_IMAGES.vintageEnvelope}
                  alt="Vintage Postal Envelope"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5 text-xs font-body-md text-[#44343B] flex-1">
                <p className="flex items-center gap-1.5">
                  <span className="text-[#805365] font-bold">Email:</span>
                  <a
                    href={`mailto:${ISHANA_PROFILE.email}`}
                    className="text-[#805365] hover:underline font-mono text-[11px]"
                  >
                    {ISHANA_PROFILE.email}
                  </a>
                </p>
                <p className="flex items-center gap-1.5 text-[11px]">
                  <span className="text-[#805365] font-bold">College:</span>
                  <span>MKSSS Cummins College of Engg, Pune</span>
                </p>
                <p className="flex items-center gap-1.5 text-[11px]">
                  <span className="text-[#805365] font-bold">Degree:</span>
                  <span>B.Tech in E&TC Engineering</span>
                </p>
              </div>
            </div>
          </div>

          {/* Correspondence Form */}
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#F8D7E2]/70 p-6 rounded-xs border-2 border-[#B97891] text-center my-6 shadow-tactile"
              >
                <span className="material-symbols-outlined text-4xl text-[#805365] mb-2">
                  mark_email_read
                </span>
                <h3 className="font-display-lg text-2xl text-[#805365] font-bold">
                  Note Sealed & Pressed!
                </h3>
                <p className="font-accent-handwritten text-lg text-[#44343B] mt-1.5">
                  Your entry has been pinned to the Guestbook Ledger on the right spread with your selected wax seal.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5 relative z-10">
                {formError && (
                  <div className="p-2 bg-[#F2BFCF] text-[#805365] text-xs font-label-sm rounded-xs border border-[#805365] font-semibold">
                    ⚠ {formError}
                  </div>
                )}

                {/* Subject */}
                <div>
                  <label className="block text-[11px] font-label-sm uppercase tracking-wider text-[#805365] font-bold mb-0.5">
                    Subject / Topic:
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#FFFEFC] border border-[#D8B5BD] rounded-xs py-1 px-2 text-xs font-body-md text-[#44343B] focus:outline-hidden focus:border-[#805365]"
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name & Affiliation in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-label-sm uppercase tracking-wider text-[#805365] font-bold mb-0.5">
                      Your Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder="e.g. Fellow Student / Recruiter"
                      className="w-full bg-[#FFFEFC] border border-[#D8B5BD] rounded-xs p-1.5 text-xs font-body-md text-[#44343B] focus:outline-hidden focus:border-[#805365]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-label-sm uppercase tracking-wider text-[#805365] font-bold mb-0.5">
                      College / Organization:
                    </label>
                    <input
                      type="text"
                      value={affiliation}
                      onChange={(e) => setAffiliation(e.target.value)}
                      placeholder="e.g. Cummins / GitHub handle"
                      className="w-full bg-[#FFFEFC] border border-[#D8B5BD] rounded-xs p-1.5 text-xs font-body-md text-[#44343B] focus:outline-hidden focus:border-[#805365]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="flex justify-between items-center mb-0.5">
                    <label className="text-[11px] font-label-sm uppercase tracking-wider text-[#805365] font-bold">
                      Message / Ledger Note:
                    </label>
                    <span className="text-[10px] font-mono text-[#805365]/70">
                      {message.length}/300
                    </span>
                  </div>
                  <textarea
                    required
                    maxLength={300}
                    rows={3}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (formError) setFormError('');
                    }}
                    placeholder="Leave a thought, discuss competitive programming, or say hello..."
                    className="w-full bg-[#FFFEFC] border border-[#D8B5BD] rounded-xs p-2 text-xs font-body-md text-[#44343B] focus:outline-hidden focus:border-[#805365] resize-none"
                  />
                </div>

                {/* Stamp Selection */}
                <div>
                  <label className="block text-[11px] font-label-sm uppercase tracking-wider text-[#805365] font-bold mb-1">
                    Pick a Decorative Stamp:
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playTactileClick();
                        setStampType('lavender');
                      }}
                      className={`px-2.5 py-1 rounded-xs text-xs font-accent-handwritten text-sm border transition-all cursor-pointer flex items-center gap-1 ${
                        stampType === 'lavender'
                          ? 'bg-[#F2BFCF] text-[#805365] border-[#805365] font-bold shadow-xs'
                          : 'bg-white text-[#44343B] border-[#D8B5BD]'
                      }`}
                    >
                      <span>🪻 Wild Flora</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playTactileClick();
                        setStampType('butterfly');
                      }}
                      className={`px-2.5 py-1 rounded-xs text-xs font-accent-handwritten text-sm border transition-all cursor-pointer flex items-center gap-1 ${
                        stampType === 'butterfly'
                          ? 'bg-[#F5EBCB] text-[#44343B] border-[#805365] font-bold shadow-xs'
                          : 'bg-white text-[#44343B] border-[#D8B5BD]'
                      }`}
                    >
                      <span>🦋 Paper Moth</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playTactileClick();
                        setStampType('rose');
                      }}
                      className={`px-2.5 py-1 rounded-xs text-xs font-accent-handwritten text-sm border transition-all cursor-pointer flex items-center gap-1 ${
                        stampType === 'rose'
                          ? 'bg-[#F8D7E2] text-[#805365] border-[#805365] font-bold shadow-xs'
                          : 'bg-white text-[#44343B] border-[#D8B5BD]'
                      }`}
                    >
                      <span>🌹 Rose Petal</span>
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-2.5 bg-[#805365] hover:bg-[#683f50] text-white rounded-xs font-label-sm text-xs tracking-wider uppercase shadow-tactile cursor-pointer flex items-center justify-center gap-1.5 font-bold"
                >
                  <span className="material-symbols-outlined text-base">approval</span>
                  <span>Affix Stamp & Pin to Guestbook</span>
                </motion.button>
              </form>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#D8B5BD] flex items-center justify-between text-xs font-label-sm text-[#805365]">
          <span>Direct response within 48 hours</span>
          <span className="font-accent-handwritten text-sm text-[#B97891]">
            dattaishana@gmail.com
          </span>
        </div>
      </section>

      {/* RIGHT PAGE - The Visitor Guestbook Ledger */}
      <section className="w-full md:w-1/2 min-h-[660px] md:min-h-[740px] p-6 sm:p-10 md:p-12 relative bg-[#FFF8F0] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFEFC] via-[#FFF8F0] to-[#F8D7E2]/30 rounded-r-sm overflow-hidden z-10 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#D8B5BD]">
            <div>
              <span className="font-label-sm text-xs text-[#805365] tracking-widest uppercase block font-bold">
                The Visitor Guestbook Ledger
              </span>
              <h3 className="font-display-lg text-xl sm:text-2xl text-[#805365] font-bold">
                Signed Notes ({entries.length})
              </h3>
            </div>
            <span className="material-symbols-outlined text-2xl text-[#805365]/60">
              history_edu
            </span>
          </div>

          {/* Genuine Empty State or Real Entries List with Framer Motion */}
          {entries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-[#FFFEFC] rounded-xs border-2 border-dashed border-[#D8B5BD] text-center my-10 relative rotate-[-0.5deg]"
            >
              <div className="w-16 h-16 rounded-full bg-[#F8D7E2] mx-auto flex items-center justify-center text-[#805365] mb-3 shadow-xs">
                <span className="material-symbols-outlined text-3xl">rate_review</span>
              </div>
              <h4 className="font-display-lg text-xl text-[#805365] font-bold mb-1">
                The Ledger Awaits its First Note
              </h4>
              <p className="font-body-md text-xs sm:text-sm text-[#44343B] leading-relaxed max-w-sm mx-auto mb-3">
                No visitor testimonials have been fabricated. Leave an authentic note using the postal form on the left to sign Ishana's guestbook!
              </p>
              <span className="font-accent-handwritten text-base text-[#B97891]">
                ✎ Be the very first person to leave your mark.
              </span>
            </motion.div>
          ) : (
            <div className="space-y-3.5 max-h-[510px] overflow-y-auto pr-2">
              <AnimatePresence mode="popLayout">
                {entries.map((entry, idx) => (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 bg-[#FFFEFC] rounded-xs border border-[#D8B5BD] shadow-2xs relative transition-transform hover:scale-101 ${
                      idx % 2 === 0 ? 'rotate-[-0.5deg]' : 'rotate-[0.5deg]'
                    }`}
                  >
                    {/* Decorative Washi Tape strip */}
                    <div className="w-12 h-3.5 bg-[#F2BFCF] absolute -top-1.5 left-6 washi-tape-strip shadow-2xs border border-[#B97891]/40" />

                    <div className="flex justify-between items-start mb-1 pt-1">
                      <div>
                        <h4 className="font-display-lg text-base text-[#44343B] font-bold">
                          {entry.name}
                        </h4>
                        <span className="text-[11px] font-accent-handwritten text-[#B97891]">
                          {entry.location} · {entry.date}
                        </span>
                        {entry.topic && (
                          <span className="block text-[10px] font-label-sm text-[#805365] uppercase font-bold mt-0.5">
                            {entry.topic}
                          </span>
                        )}
                      </div>
                      <span className="text-xs bg-[#FFF8F0] px-2 py-0.5 rounded-xs border border-[#D8B5BD]">
                        {entry.stampType === 'lavender' ? '🪻' : entry.stampType === 'butterfly' ? '🦋' : '🌹'}
                      </span>
                    </div>

                    <p className="font-body-md text-xs sm:text-sm text-[#44343B] leading-relaxed italic mt-1">
                      "{entry.message}"
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="pt-3 border-t border-[#D8B5BD] flex items-center justify-between text-xs font-label-sm text-[#805365]">
          <span>End of Journal · Turn to Cover</span>
          <button
            onClick={() => onNavigate('cover')}
            className="hover:underline flex items-center gap-1 font-semibold text-[#805365] cursor-pointer"
          >
            <span>Close Journal</span>
            <span className="material-symbols-outlined text-sm">menu_book</span>
          </button>
        </div>
      </section>
    </div>
  );
};
