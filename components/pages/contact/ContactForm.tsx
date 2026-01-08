"use client";

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import Button from '../../global/ui/Button';

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 p-8 rounded-2xl border border-green-200 text-center">
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-900 mb-2">Message Sent!</h3>
        <p className="text-green-700">
          Thank you for reaching out. Our support representative will get back to you shortly.
        </p>
        <Button 
          variant="outline" 
          className="mt-6 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          onClick={() => setStatus('idle')}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
          <input 
            required
            type="text" 
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
          <input 
            required
            type="email" 
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
          <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none">
            <option>General Enquiry</option>
            <option>Product Support</option>
            <option>Bulk Order Query</option>
            <option>Dealer Partnership</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
          <textarea 
            required
            rows={4}
            placeholder="How can we help you?"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all resize-none"
          ></textarea>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full py-4"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : (
            <>
              Send Message
              <Send className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
