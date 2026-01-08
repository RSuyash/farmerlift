import React from 'react';
import Container from '../../global/ui/Container';
import { ShieldCheck, Truck, Users, Award } from 'lucide-react';

const TrustSection = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      title: "Certified Quality",
      description: "All products undergo rigorous lab testing to ensure maximum yield."
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Expert Support",
      description: "Direct access to agricultural experts for dosage and crop advice."
    },
    {
      icon: <Truck className="h-8 w-8 text-green-600" />,
      title: "Reliable Delivery",
      description: "Efficient logistics network ensuring timely delivery to rural hubs."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-green-600" />,
      title: "Trusted Brand",
      description: "Partnering with over 500+ dealers across the state."
    }
  ];

  return (
    <section className="bg-green-50 py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FarmerLift?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to the prosperity of the Indian farmer through technology and trust.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrustSection;
