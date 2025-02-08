import React from "react";
import './UserDashboard.css';
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Header />  {/* Include the Header */}
      
      <main className="bg-gray-100 min-h-screen p-6">
        <section className="text-center py-12 bg-blue-600 text-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold">Welcome to Club Management</h2>
          <p className="mt-4">Manage your clubs, events, and memberships easily.</p>
        </section>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Upcoming Events</h3>
            <p className="mt-2">Stay updated with the latest events happening around.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Featured Clubs</h3>
            <p className="mt-2">Discover and join exciting clubs of your interest.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Membership</h3>
            <p className="mt-2">Sign up for exclusive membership benefits.</p>
          </div>
        </section>
      </main>

      <Footer />  {/* Include the Footer */}
    </div>
  );
};

export default HomePage;
