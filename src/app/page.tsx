'use client';

import { useState } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  useCase: string;
  regulatedIndustry: boolean;
  safetyRequirements: string;
  currentChallenges: string;
}

export default function EarlyAccessPage() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    useCase: '',
    regulatedIndustry: false,
    safetyRequirements: '',
    currentChallenges: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setFormState('success');
    } catch (err) {
      console.error('Submit error:', err);
      setFormState('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (formState === 'success') {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Request Received</h1>
            <p className="text-slate-300 text-lg">
              Thank you for your interest in DDR Early Governance Testing.
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-left">
            <h2 className="font-semibold mb-3">What happens next:</h2>
            <ol className="space-y-2 text-slate-300 text-sm">
              <li>1. We review your application within 48 hours</li>
              <li>2. If approved, you&apos;ll receive access credentials via email</li>
              <li>3. You&apos;ll get a structured testing guide with specific tasks</li>
              <li>4. We&apos;ll schedule a brief onboarding call if needed</li>
            </ol>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            Invite-Only Governance Testing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Test a Decision System That<br />
            <span className="text-blue-400">Proves Authority Before Execution</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            We&apos;re inviting teams to test a governed decision system where automation 
            boundaries are defined, sealed, and enforced — not hoped for.
          </p>
        </div>

        {/* What This Is / Is Not */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-green-400 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              This IS
            </h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• Decision-quality testing under real conditions</li>
              <li>• Governance validation with structured tasks</li>
              <li>• Integration sanity checks</li>
              <li>• Evidence collection for edge cases</li>
              <li>• Proving discipline under pressure</li>
            </ul>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-red-400 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              This is NOT
            </h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• Feature beta testing</li>
              <li>• UX optimization feedback</li>
              <li>• Growth experimentation</li>
              <li>• Free-form AI exploration</li>
              <li>• Quick-win automation</li>
            </ul>
          </div>
        </div>

        {/* What You'll Test */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">What You&apos;ll Be Asked To Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-300 mb-3">Structured Tasks</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>→ Define a decision that should NOT be automated</li>
                <li>→ Push the system into edge cases</li>
                <li>→ Attempt to override a refusal</li>
                <li>→ Replay a decision under changed conditions</li>
                <li>→ Upgrade runtime without re-finalizing contracts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-300 mb-3">Governance Feedback We Request</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>→ Where the system refused (and why)</li>
                <li>→ Where friction occurred</li>
                <li>→ Where discipline felt uncomfortable</li>
                <li>→ Where governance helped or hindered</li>
                <li>→ Edge cases we didn&apos;t anticipate</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Guarantees */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: '🔒', title: 'No PII Required', desc: 'Test with synthetic data' },
            { icon: '📖', title: 'Read-Only Observability', desc: 'No dashboards, no tuning' },
            { icon: '🔄', title: 'Deterministic Replay', desc: 'Every decision is provable' },
            { icon: '🛡️', title: 'Authority Sealed', desc: 'You cannot expand scope' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-semibold text-sm mb-1">{item.title}</div>
              <div className="text-xs text-slate-400">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Data Ownership */}
        <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg p-4 mb-12 text-center">
          <p className="text-slate-400 text-sm">
            <span className="text-slate-300 font-medium">Data Ownership:</span> All test data remains client-owned. 
            We do not retain or repurpose decision content beyond aggregated governance metrics.
          </p>
        </div>

        {/* Who This Is Best For */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Who This Is Best For</h2>
          <div className="grid md:grid-cols-2 gap-4 text-slate-300 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 mt-0.5">→</span>
              <span>Teams operating in regulated or safety-critical domains</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 mt-0.5">→</span>
              <span>Infrastructure or platform teams responsible for decision logic</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 mt-0.5">→</span>
              <span>Organizations needing provable refusal and escalation semantics</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 mt-0.5">→</span>
              <span>Teams replacing heuristic or ad-hoc automation with governed systems</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 mt-0.5">→</span>
              <span>Compliance-conscious founders building AI-adjacent products</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 mt-0.5">→</span>
              <span>Engineering leads who need audit trails, not just logs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-2 text-center">Apply for Governance Testing Access</h2>
          <p className="text-slate-400 text-center mb-8 text-sm">
            Access is reviewed to ensure alignment with governance testing goals. Not all applications are approved.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Work Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Company *</label>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role *</label>
                <select
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select your role</option>
                  <option value="engineering">Engineering / Platform</option>
                  <option value="product">Product</option>
                  <option value="compliance">Compliance / Legal</option>
                  <option value="founder">Founder / Executive</option>
                  <option value="research">Research / ML</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                What decision would you want to govern? *
              </label>
              <textarea
                name="useCase"
                required
                value={formData.useCase}
                onChange={handleChange}
                rows={3}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                placeholder="Describe a decision your system makes that needs governance boundaries..."
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="regulatedIndustry"
                id="regulatedIndustry"
                checked={formData.regulatedIndustry}
                onChange={handleChange}
                className="mt-1 w-4 h-4 bg-slate-900 border-slate-600 rounded text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="regulatedIndustry" className="text-sm text-slate-300">
                We operate in a regulated industry (healthcare, finance, legal, etc.) or have 
                safety-critical requirements
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                What makes this decision safety-critical or governance-sensitive?
              </label>
              <textarea
                name="safetyRequirements"
                value={formData.safetyRequirements}
                onChange={handleChange}
                rows={2}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                placeholder="E.g., regulatory requirements, user safety, financial impact..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                What&apos;s your current challenge with AI/automation governance?
              </label>
              <textarea
                name="currentChallenges"
                value={formData.currentChallenges}
                onChange={handleChange}
                rows={2}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                placeholder="E.g., audit trails, scope creep, unpredictable behavior..."
              />
            </div>

            <button
              type="submit"
              disabled={formState === 'submitting'}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {formState === 'submitting' ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>

            <p className="text-xs text-slate-500 text-center">
              By submitting, you agree to participate in structured governance evaluation. 
              No production claims. No PII required. Client-owned data. Read-only observability.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>DDR — Deterministic Decision Runtime</p>
          <p className="mt-1">A governance-grade decision system where authority is defined before execution.</p>
        </div>
      </footer>
    </main>
  );
}
