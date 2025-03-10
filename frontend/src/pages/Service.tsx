import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTaxi, 
  faCar, 
  faTruckPickup, 
  faVanShuttle,
  faBoxes,
  faLocationDot,
  faClock,
  faShieldHalved
} from '@fortawesome/free-solid-svg-icons';

const Service: React.FC = () => {
  const services = [
    { icon: faTaxi, color: 'text-yellow-500', title: 'Standard Cabs', description: 'Comfortable and economical taxi services available 24/7 with professional drivers.' },
    { icon: faCar, color: 'text-blue-500', title: 'Luxury Cars', description: 'Premium sedan cars for executive travel and special occasions, offering maximum comfort and style.' },
    { icon: faTruckPickup, color: 'text-green-500', title: 'SUV Service', description: 'Spacious SUVs perfect for family trips and long journeys with added comfort.' },
    { icon: faVanShuttle, color: 'text-purple-500', title: 'Van Transport', description: 'Versatile van services for larger groups and luggage, ideal for airport transfers and tours.' },
    { icon: faBoxes, color: 'text-red-500', title: 'Goods Transportation', description: 'Secure and reliable goods transportation services with timely delivery and careful handling.' },
    { icon: faLocationDot, color: 'text-indigo-500', title: 'GPS Tracking', description: 'Real-time GPS tracking and live updates for all services, ensuring safety and transparency.' },
  ];

  const features = [
    { icon: faClock, color: 'text-blue-600 animate-pulse', title: '24/7 Service', description: 'Available round the clock for your convenience.' },
    { icon: faLocationDot, color: 'text-green-600 animate-bounce', title: 'Live Tracking', description: 'Monitor your ride or shipment in real-time.' },
    { icon: faShieldHalved, color: 'text-red-600', title: 'Secure Service', description: 'Guaranteed safety and protection for all services.' },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20 bg-gray-50">
        <div className="p-8 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Experience premium transportation solutions with our diverse fleet and innovative services.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="p-6 rounded-xl shadow-lg bg-white hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
                <FontAwesomeIcon icon={service.icon} className={`text-4xl ${service.color} mb-4`} />
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Additional Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-4">
                <FontAwesomeIcon icon={feature.icon} className={`text-3xl ${feature.color}`} />
                <h4 className="text-lg font-semibold mt-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Service;
