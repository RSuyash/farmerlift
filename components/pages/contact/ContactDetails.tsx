import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import Button from '../../global/ui/Button';

const ContactDetails = () => {
  return (
    <div className="space-y-8">
      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a href="tel:+919876543210" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
           <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600">
              <Phone className="h-6 w-6" />
           </div>
           <h4 className="font-bold text-gray-900">Call Us</h4>
           <p className="text-gray-600 text-sm">+91 98765 43210</p>
        </a>

        <a href="mailto:support@farmerlift.com" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
           <div className="bg-red-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors text-red-600">
              <Mail className="h-6 w-6" />
           </div>
           <h4 className="font-bold text-gray-900">Email Us</h4>
           <p className="text-gray-600 text-sm">support@farmerlift.com</p>
        </a>
      </div>

      {/* Office Details */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
         <h3 className="text-xl font-bold text-gray-900 mb-6">Head Office</h3>
         <div className="space-y-4">
            <div className="flex items-start space-x-4">
               <MapPin className="h-6 w-6 text-green-600 flex-shrink-0" />
               <p className="text-gray-600">
                  123 Agri-Innovation Hub, Industrial Area Phase II, 
                  Nashik, Maharashtra, India - 422007
               </p>
            </div>
            <div className="flex items-center space-x-4">
               <Clock className="h-6 w-6 text-green-600 flex-shrink-0" />
               <p className="text-gray-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
            </div>
         </div>

         {/* Maps Placeholder */}
         <div className="mt-8 aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative group">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
               <MapPin className="h-10 w-10 mb-2 opacity-20" />
               <p className="text-sm font-medium">Google Maps Embed Placeholder</p>
               <Button variant="ghost" size="sm" className="mt-4">
                  View on Google Maps <ExternalLink className="ml-2 h-3 w-3" />
               </Button>
            </div>
            {/* Real embed would go here: <iframe src="..." /> */}
         </div>
      </div>
    </div>
  );
};

export default ContactDetails;
