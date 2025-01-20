'use client';

import { useState } from 'react';
import Image from 'next/image';
import CtaButton from './CtaButton';

const contactLinks = [
  {
    name: 'Gmail',
    link: 'mailto:mohamedazizbettaieb6@gmail.com',
    image: '/uploads/gmail-logo.svg',
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/mohamed-aziz-bettaieb/',
    image: '/uploads/linkedin-logo.svg',
  },
  {
    name: 'GitHub',
    link: 'https://github.com/Bettaieb45 ',
    image: '/uploads/github-logo.svg',
  },
  {
    name: 'Upwork',
    link: 'https://www.upwork.com/freelancers/~012e5d38cdd837edf8',
    image: '/uploads/upwork-logo.svg',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    message: string;
  }>({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: React.ChangeEvent<T>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send email');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Contact container-1120 py-16 " id="contact">
      <div className="contact-wrapper flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Contact Me</h2>
        <p>
          Feel free to reach out for any web development projects,
          collaborations, or questions.
        </p>

        <div className="contact-links-wrapper pointer-events-auto flex gap-6 content-center">
          {contactLinks.map((contactLink, index) => (
            <div
              key={index}
              className="
                single-link 
                relative 
                transition 
                duration-300 
                transform 
                hover:scale-110 
                hover:opacity-80
                flex
                content-center
              "
            >
              <Image
                src={contactLink.image}
                alt={`${contactLink.name} logo`}
                width={30}
                height={30}
              />
              <a
                href={contactLink.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
              ></a>
            </div>
          ))}
        </div>

        <div className="max-w-3xl pointer-events-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 flex flex-col">
                <label htmlFor="name" className="mb-2 font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="border border-black px-4 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex-1 flex flex-col">
                <label htmlFor="email" className="mb-2 font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="border border-black px-4 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="border border-black px-4 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <CtaButton
              text={loading ? 'Sending...' : 'Send Message'}
              type="submit"
              disabled={loading}
            />
            {success && (
              <p className="text-green-500">Message sent successfully!</p>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
