"use client";

import React, { useState } from 'react';
import { User, MapPin, Phone, Briefcase, Send, CheckCircle2 } from 'lucide-react';
import Button from '../../global/ui/Button';

const RegistrationForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call/Email routing
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-green-100 text-center max-w-2xl mx-auto">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Received!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for joining the FarmerLift community. Our team will verify your details and contact you within 24-48 hours.
        </p>
        <Button variant="primary" href="/" size="lg">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">
      {/* Sidebar Info */}
      <div className="md:w-1/3 bg-green-900 p-8 text-white">
        <h3 className="text-2xl font-bold mb-6">Why Register?</h3>
        <ul className="space-y-6">
          <li className="flex items-start space-x-3">
             <div className="bg-green-800 p-2 rounded-lg">
                <Briefcase className="h-5 w-5 text-green-400" />
             </div>
             <div>
                <p className="font-semibold text-sm">Dealer Benefits</p>
                <p className="text-xs text-gray-300">Access wholesale pricing and direct brand support.</p>
             </div>
          </li>
          <li className="flex items-start space-x-3">
             <div className="bg-green-800 p-2 rounded-lg">
                <User className="h-5 w-5 text-green-400" />
             </div>
             <div>
                <p className="font-semibold text-sm">Farmer Benefits</p>
                <p className="text-xs text-gray-300">Get customized dosage charts and seasonal tips.</p>
             </div>
          </li>
        </ul>
        
        <div className="mt-12 p-4 bg-white/10 rounded-lg border border-white/20">
           <p className="text-xs italic text-gray-300">
             "Joining FarmerLift helped me increase my onion yield by 30% using their Bio-Stimulants."
           </p>
           <p className="text-xs font-bold mt-2">— Sandeep K., Farmer</p>
        </div>
      </div>

      {/* Form Area */}
      <div className="md:w-2/3 p-8 lg:p-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Join the Pilot</h2>
        <p className="text-gray-500 mb-8">Fill in the details below to register as a Dealer or Farmer.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <User className="h-4 w-4 mr-2" /> Full Name
              </label>
              <input 
                required
                type="text" 
                placeholder="E.g. Rajesh Kumar"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <Phone className="h-4 w-4 mr-2" /> Phone Number
              </label>
              <input 
                required
                type="tel" 
                placeholder="10 digit number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             {/* Role */}
             <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <Briefcase className="h-4 w-4 mr-2" /> Register As
              </label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none">
                <option value="farmer">I am a Farmer</option>
                <option value="dealer">I am a Dealer</option>
                <option value="distributor">I am a Distributor</option>
              </select>
            </div>

            {/* City/Village */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <MapPin className="h-4 w-4 mr-2" /> City / Village
              </label>
              <input 
                required
                type="text" 
                placeholder="Your location"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* District/State */}
          <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">District & State</label>
              <input 
                required
                type="text" 
                placeholder="E.g. Nashik, Maharashtra"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all"
              />
          </div>

          <div className="pt-4">
             <Button 
                type="submit" 
                variant="primary" 
                className="w-full py-4 text-lg"
                disabled={loading}
              >
                {loading ? "Processing..." : (
                  <>
                    Complete Registration
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
             </Button>
          </div>
          
          <p className="text-center text-xs text-gray-400">
            By registering, you agree to receive WhatsApp notifications about orders and farming tips.
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
