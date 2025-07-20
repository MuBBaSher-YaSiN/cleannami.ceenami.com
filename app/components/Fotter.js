import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-white pt-10 pb-5 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="flex flex-wrap">
            {/* Left Section - SVG Image */}
            <div className="w-full md:w-1/4 mb-8 md:mb-0 pr-4">
              <img 
                src="https://www.losangeleshousecleaners.net/wp-content/uploads/2018/07/Woman-2.svg"
                alt="House Cleaning Services"
                className="max-w-full h-auto"
              />
            </div>
            
            {/* Middle Section */}
            <div className="w-full md:w-2/5 mb-8 md:mb-0 px-4">
              <h2 className="text-[#1115ac] text-2xl font-bold mb-5">Get Great Cleaners</h2>
              
              {/* Security Badge */}
              <div className="mb-6">
                <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                  HTTPS
                </div>
              </div>
              
              {/* Contact Information */}
              <div>
                <h3 className="text-[#1115ac] text-lg font-medium mb-3">Contacts</h3>
                <p className="mb-2">Los Angeles Maid Service<br />
                  & House Cleaners Referral Agency</p>
                <p className="mb-2">T: <a href="tel:18447001427" className="text-[#1115ac] hover:underline">1 (844) 700-1427</a><br />
                  E: <a href="mailto:contact@losangeleshousecleaners.net" className="text-[#1115ac] hover:underline">contact@losangeleshousecleaners.net</a></p>
                <p className="mb-4">Monday - Sunday:<br />8am - 7pm</p>
                
                {/* Links */}
                <ul className="space-y-2 mb-6">
                  <li><a href="#" className="text-[#1115ac] hover:underline">Our Locations</a></li>
                  <li><a href="#" className="text-[#1115ac] hover:underline">Gift Cards</a></li>
                  <li>For Cleaners: <a href="#" className="text-[#1115ac] hover:underline">Cleaners Register</a></li>
                </ul>
                
                {/* Social Icons */}
                <div>
                  <p className="mb-2">Find us on:</p>
                  <div className="flex space-x-3">
                    <a href="#" className="w-10 h-10 rounded-full bg-[#1115ac] flex items-center justify-center text-white" aria-label="Facebook">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#1115ac] flex items-center justify-center text-white" aria-label="Instagram">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Section */}
            <div className="w-full md:w-1/3 pl-4">
              <h3 className="text-[#1115ac] text-lg font-medium mb-3">Get Free Estimate</h3>
              <a href="tel:18447001427" className="text-2xl font-bold text-[#1115ac] block mb-3 hover:underline">1 (844) 700-1427</a>
              <p className="mb-4">Our online scheduling and payment system is safe.</p>
              <a href="#" className="inline-block bg-yellow-400 text-gray-800 font-bold py-3 px-6 rounded-full hover:bg-yellow-500 transition-colors">ONLINE BOOKING</a>
            </div>
          </div>
          
          {/* Service Areas */}
          <div className="mt-10 text-center text-sm text-gray-500 leading-relaxed">
            <p>We serve all major areas: Agoura Hills, Alhambra, Arcadia, Artesia, Avalon, Azusa, Baldwin Park, Bell, Bell Gardens, Bellflower, Beverly Hills, Bradbury, Burbank, Calabasas, Carson, Cerritos, Claremont, Commerce, Compton, Covina, Cudahy, Culver City, Diamond Bar, Duarte, El Monte, ElGardena, Glendora, Hawaiian Gardens, Hawthorne, Hermosa Beach, Hidden Hills, Huntington Park, Industry, Inglewood, La Cañada Flintridge, La Mirada, LaLa Verne, Lakewood, Lancaster, Lawndale, Lomita, Los Angeles, Lynwood, Malibu, Manhattan Beach, Maywood, Monrovia, Montebello, Monterey Park, Norwalk, Palmdale, Palos Verdes Estates, Paramount, Pasadena, Pico Rivera, Pomona, Rancho Palos Verdes, Redondo Beach, Rolling Hills Estates, Rosemead, San Fernando, San Gabriel, San Marino, Santa Clarita, Santa Fe Springs, Santa Monica, Sierra Madre, Signal Hill, South El Monte, South Gate, South Pasadena, Temple City, Torrance, Vernon, Walnut, West Covina, West Hollywood, Westlake Village, Whittier, Orange County, Anaheim, Laguna Beach, Ontario, And more</p>
          </div>
          
          {/* Copyright */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center text-sm text-gray-500">
            <p>2024 LA House Cleaning Referral Agency, Formerly Emerald House Cleaning</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
