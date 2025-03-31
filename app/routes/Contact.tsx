import { motion } from "framer-motion";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { sendForm } from "emailjs-com";
import data from "../../data/data.json"; // Import data from JSON

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null); 
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    
    if (!formRef.current) {
      console.error("Form reference is null.");
      return;
    }

    sendForm(
      "service_q8x71ab", // Replace with EmailJS service ID
      "template_5ktnywb", // Replace with EmailJS template ID
      formRef.current, // Ensure formRef is used properly
      "jGgBNosKGYIv-0pVk" // Replace with EmailJS user/public key
    )
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      toast.success("Message sent successfully!");
      setEmailSent(true);
      formRef.current?.reset(); // Safe way to reset the form
  })
  .catch((err) => {
      console.error("FAILED...", err);
      toast.error("Failed to send message. Try again.");
  });
  
  };

  const { contact } = data; // Access data from JSON

  return (
    <div id="contact" className="min-h-screen bg-gray-900 rounded-xl mt-5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-[32px] md:text-4xl lg:text-5xl font-extralight text-white dark:text-white">
            {contact.title}
          </h2>
          <p className="mt-3.5 md:mt-5 max-w-sectionTitle text-white dark:text-white">
            {contact.subtitle}
          </p>
        </motion.div>

        {/* Contact Info and Form */}
        <div className="grid gap-12 md:grid-cols-12">
          {/* Contact Info */}
          <div className="md:col-span-5">
            <ul className="space-y-6 md:space-y-10">
              {contact.info.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex items-center gap-5"
                >
                  <div className="flex justify-center w-12">
                    {item.icon === "location" && (
                      <img src="icons/location.svg" alt="icons" />
                    )}
                    {item.icon === "email" && (
                      <img src="icons/email.svg" alt="icons" />
                    )}
                    {item.icon === "phone" && (
                      <img src="icons/contact-color.svg" alt="icons" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h6 className="text-lg text-white">{item.title}</h6>
                    {item.link ? (
                      <a href={item.link} className="text-sm text-white">
                        {item.description}
                      </a>
                    ) : (
                      <p className="text-sm text-white">{item.description}</p>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7">
            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="space-y-2"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                className="w-full p-4 rounded-lg border bg-transparent border-gray-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300 outline-none"
                required
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full p-4 rounded-lg border bg-transparent border-gray-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300 outline-none"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="9800000000"
                className="w-full p-4 rounded-lg border bg-transparent border-gray-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300 outline-none"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="something@gmail.com"
                className="w-full p-4 rounded-lg border bg-transparent border-gray-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300 outline-none"
                required
              />

              <textarea
                name="message"
                placeholder="Message"
                className="w-full p-4 rounded-lg border bg-transparent border-gray-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300 outline-none"
                required
              ></textarea>

              <button
                type="submit"
                disabled={emailSent}
                className="text-white py-2 w-full px-9 rounded-full bg-gradient-to-r from-orange-300 to-orange-700 hover:text-xl transition-all duration-500"
              >
                {emailSent ? "Message Sent" : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <iframe
            src={contact.map}
            title="Google Map Location"
            className="w-full h-80 2xl:h-96 rounded-2xl border-10 border-platinum dark:border-greyBlack"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
      <Toaster position="top-right" /> {/* Add the Toaster component here */}
    </div>
  );
}
