import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from "../components/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false, message: '' });

    try {
      await emailjs.send(
        'service_fm2wsqm', // EmailJS service ID
        'template_bpxpupj', // EmailJS template ID
        {
          to_email: 'mcskny01@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setStatus({
        loading: false,
        success: true,
        error: false,
        message: 'Mesajınız başarıyla gönderildi!'
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#303030] text-white p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-[#202020] p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 text-[#D2D2D2] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium">Email</h3>
                  <p className="text-[#D2D2D2]">mcskny01@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 text-[#D2D2D2] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium">Phone</h3>
                  <p className="text-[#D2D2D2]">+90 (551) 981 86 54</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 text-[#D2D2D2] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium">Location</h3>
                  <p className="text-[#D2D2D2]">Istanbul, Turkey</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#202020] p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            {status.message && (
              <div className={`mb-4 p-4 rounded-lg ${
                status.success ? 'bg-green-500' : status.error ? 'bg-red-500' : ''
              }`}>
                {status.message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#D2D2D2] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#303030] border border-[#404040] rounded-lg focus:outline-none focus:border-[#D2D2D2] text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#D2D2D2] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#303030] border border-[#404040] rounded-lg focus:outline-none focus:border-[#D2D2D2] text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#D2D2D2] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#303030] border border-[#404040] rounded-lg focus:outline-none focus:border-[#D2D2D2] text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#D2D2D2] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 bg-[#303030] border border-[#404040] rounded-lg focus:outline-none focus:border-[#D2D2D2] text-white resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className={`w-full bg-[#303030] hover:bg-[#404040] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 ${
                  status.loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {status.loading ? 'Gönderiliyor...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;