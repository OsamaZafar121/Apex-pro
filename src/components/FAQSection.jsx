import { useState } from 'react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      <button
        className="w-full px-6 py-5 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
        onClick={onClick}
      >
        <span className="font-semibold text-[#1169a9] text-lg pr-4">{question}</span>
        <svg
          className={`w-6 h-6 text-[#F08A7F] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">{answer}</div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'How do I prepare for my first cleaning appointment?',
      answer: 'We recommend tidying up your space before we arrive so our team can focus on deep cleaning. Please secure any pets and ensure parking is available. If you have specific areas of concern, make a note to share with our team upon arrival.',
    },
    {
      question: 'Are your cleaning products safe for pets and children?',
      answer: 'Yes! We use eco-friendly, non-toxic cleaning products that are safe for pets, children, and anyone with allergies or sensitivities. If you have specific product preferences, we\'re happy to accommodate them.',
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'We understand that schedules can change. We require at least 24 hours notice for cancellations or rescheduling. Cancellations made within 24 hours may be subject to a cancellation fee.',
    },
    {
      question: 'Are your cleaners insured and bonded?',
      answer: 'Absolutely! All our cleaners are fully insured, bonded, and background-checked. We take your security and peace of mind seriously. Our insurance also covers any accidental damage that may occur during cleaning.',
    },
    {
      question: 'How long does a typical cleaning session take?',
      answer: 'The duration depends on your home\'s size and the service selected. A standard cleaning for a 2-bedroom home typically takes 2-3 hours, while a deep clean may take 4-6 hours. We\'ll provide an estimated timeframe when booking.',
    },
    {
      question: 'Do I need to be home during the cleaning?',
      answer: 'Not at all! Many of our clients prefer to be away while we work. We can arrange key pickup/drop-off or use a lockbox. If you\'d like to be home, that\'s perfectly fine too.',
    },
    {
      question: 'What if I\'m not satisfied with the cleaning?',
      answer: 'We offer a 100% satisfaction guarantee. If you\'re not completely happy, let us know within 24 hours and we\'ll return to re-clean the areas at no additional cost. Your satisfaction is our priority.',
    },
    {
      question: 'Do you offer recurring cleaning discounts?',
      answer: 'Yes! We offer discounts for weekly, bi-weekly, and monthly recurring services. Our most popular option is bi-weekly cleaning, which comes with a 15% discount off the standard rate.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1169a9] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers!
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="tel:5551234567"
            className="inline-flex items-center bg-[#1169a9] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#14566d] transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call Us: (555) 123-4567
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
